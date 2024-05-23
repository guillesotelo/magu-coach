import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../components/InputField/InputField'
import { dataObj, onChangeEventType } from '../../types'
import Dropdown from '../../components/Dropdown/Dropdown'
import Button from '../../components/Button/Button'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { APP_COLORS, dateOptions, paisesHispanohablantes, timeOptions, weekDays } from '../../constants'
import Calendar from "react-calendar"
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types"
import { AppContext } from '../../AppContext'
import { createBooking, getAllBookings, getAllServices } from '../../services'
import Ok from '../../assets/icons/ok.svg'
import { useReactToPrint } from "react-to-print"
import { getAges, getDate, parsePrice } from '../../helpers'
type Props = {}

const defaultData: dataObj = {
  fullname: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  age: 18,
}

const parseData: dataObj = {
  fullname: 'Nombre completo',
  email: 'Email',
  phone: 'Teléfono',
  country: 'País de residencia',
  city: 'Ciudad',
  service: 'Servicio',
  age: 'Edad',
  date: 'Fecha y hora'
}

export default function Booking({ }: Props) {
  const [data, setData] = useState(defaultData)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [booked, setBooked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [service, setService] = useState<dataObj>({})
  const [allServices, setAllServices] = useState<any[]>([])
  const [openCalendars, setOpenCalendars] = useState<any>({})
  const [selectedDates, setSelectedDates] = useState<any>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [hideButtons, setHideButtons] = useState(false)
  const history = useHistory()
  const { isMobile } = useContext(AppContext)
  const location = useLocation()
  const printRef = React.useRef(null)

  const reactToPrintContent = React.useCallback(() => {
    return printRef.current
  }, [printRef.current])

  useEffect(() => {
    getServices()
    getBookings()
  }, [])

  useEffect(() => {
    if (allServices && allServices.length) {
      const id = new URLSearchParams(document.location.search).get('serviceId')
      const selected = allServices.find(s => s._id === id)
      if (selected && selected._id) setService(selected)
    }
  }, [allServices])

  useEffect(() => {
    setOpenCalendars({})
  }, [selectedDates])

  const updateData = (key: string, e: onChangeEventType) => {
    const value = e.target.value
    setData({ ...data, [key]: value })
  }

  const getBookings = async () => {
    setLoading(true)
    try {
      const _bookings = await getAllBookings()
      if (_bookings && Array.isArray(_bookings)) setBookings(_bookings)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const discard = () => history.goBack()

  const book = async () => {
    try {
      setLoading(true)

      const bookingData = {
        ...data,
        serviceId: service._id,
        service: JSON.stringify(service),
        serviceName: service.name,
        dateObjects: JSON.stringify(selectedDates),
        price: service.price,
        totalPrice: service.price * quantity,
      }

      const created = await createBooking(bookingData)

      if (created) {
        toast.success('Reserva creada con éxito')
        setTimeout(() => {
          setBooked(true)
          setLoading(false)
        }, 2000)
      } else toast.error('Ocurrió un error. Intenta nuevamente.')

    } catch (error) {
      setLoading(false)
      toast.error('Ocurrió un error. Intenta nuevamente.')
      console.error(error)
    }
  }

  const getServices = async () => {
    try {
      const services = await getAllServices()
      if (services && services.length) {
        setService(services[0])
        setAllServices(services)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const tileDisabled: TileDisabledFunc = ({ activeStartDate, date, view }): boolean => {
    const day = date.getDay()
    const today = new Date()
    const isTodayOrBefore = date <= today
    const allSlots: any = []
    let count = 0
    let processedDates: any[] = []

    allSlots.forEach((d: Date) => {
      if (!processedDates.includes(d) && d.toLocaleDateString() === date.toLocaleDateString()) {
        processedDates.push(d)
        count++
      }
    })
    const serviceDays = (service.days || '').toLowerCase()
    let disabled = [0, 1, 2, 3, 4, 5, 6]
    weekDays.map((weekday: string, i) => {
      if (serviceDays.includes(weekday.toLowerCase())) disabled = disabled.filter(n => n !== i)
    })
    if (serviceDays) return disabled.includes(day) || isTodayOrBefore || count > 1
    return false
  }

  const checkData = () => data.fullname && data.fullname.includes(' ')
    && data.email && data.email.includes('.')
    && data.email.includes('@') && selectedDates.length

  const handlePrint =
    useReactToPrint({
      content: reactToPrintContent,
      documentTitle: "AwesomeFileName",
      onAfterPrint: () => setHideButtons(false),
      onBeforeGetContent: () => setHideButtons(true),
      onBeforePrint: () => setHideButtons(true),
      removeAfterPrint: true
    })

  const getQuantityOptions = () => {
    return Array.from({ length: 20 })
      .map((_, i) => i === 0 ? `${i + 1} sesión` : `${i + 1} sesiones`)
  }

  const handleDateChange = (value: any, index: number): void => {
    if (value instanceof Date) {
      const updatedDates = [...selectedDates]
      const mapDates = updatedDates.map(date => new Date(date).toLocaleDateString())
      const dateVal = new Date(value).toLocaleDateString()

      if (!mapDates.includes(dateVal) || mapDates.indexOf(dateVal) === index) updatedDates[index] = value
      setSelectedDates(updatedDates)
    }
  }

  const getBookingSlots = (date: Date, start: number | null = null, end: number | null = null) => {
    const timeSlots = []
    const unavailableTime = getBookedSlots(bookings, true)
    const startTime = new Date(date)
    const endTime = new Date(date)

    const serviceStart = service.startTime ? Number(service.startTime.split(':')[0]) : null
    const serviceEnd = service.endTime ? Number(service.endTime.split(':')[0]) : null

    startTime.setHours(start || serviceStart || 9, 0, 0, 0)
    endTime.setHours(end || serviceEnd || 18, 0, 0, 0)
    const step = 60 * 60 * 1000

    for (let currentTime = startTime; currentTime <= endTime; currentTime.setTime(currentTime.getTime() + step)) {
      const freeSlot = new Date(currentTime)
      if (!unavailableTime.includes(freeSlot.getTime())) timeSlots.push(freeSlot)
    }
    return timeSlots
  }

  const getBookedSlots = (bookingArray: any[], miliseconds = false) => {
    let slots: any[] = []
    bookingArray.forEach((booking: any) => {
      if (booking.dateObjects) {
        const dateObjs = JSON.parse(booking.dateObjects || '[]')
        dateObjs.forEach((date: any) => {
          slots.push(miliseconds ? new Date(date).getTime() : new Date(date))
        })
      }
      else if (booking.date) slots.push(miliseconds ? new Date(booking.date).getTime() : new Date(booking.date))
    })
    return slots
  }

  const renderNewBooking = () => {
    return (
      <div
        className="page__row"
        style={{
          flexDirection: isMobile ? 'column' : 'row',
          margin: isMobile ? '2rem 1rem' : '',
        }}
      >
        <div className="page__col booking__text-col" style={{ width: isMobile ? '90vw' : '' }}>
          <h1 className='booking__title'>{service.name || 'Cargando Servicios...'}</h1>
          <h2 className='booking__subtitle'>Reserva tu cita</h2>
          <p className='booking__text'>
            Completa el formulario con tus datos para asegurar tu consulta. Estamos aquí para ayudarte en tu viaje hacia el bienestar emocional y mental.
          </p>
        </div>
        <div className="page__col">
          <div className="booking__form-container">
            <div className="booking__form" style={{ width: isMobile ? '80vw' : '' }}>
              {/* <h2 className='booking__form-title'>Nueva reserva</h2> */}
              <InputField
                label='Nombre completo'
                name='fullname'
                value={data.fullname}
                updateData={updateData}
              />
              <InputField
                label='Email'
                name='email'
                value={data.email}
                updateData={updateData}
              />
              <InputField
                label='Teléfono (opcional)'
                name='phone'
                value={data.phone}
                updateData={updateData}
                placeholder='+549-1234-5678'
              />
              <Dropdown
                label='Edad'
                options={getAges()}
                selected={data.age}
                value={data.age}
                setSelected={(value: number) => setData({ ...data, age: value })}
                maxHeight='20vh'
              />
              <Dropdown
                label='País de residencia'
                options={paisesHispanohablantes}
                selected={data.country}
                value={data.country}
                setSelected={(value: string) => setData({ ...data, country: value })}
                maxHeight='20vh'
              />
              {data.country && (data.country === 'Otro' || !paisesHispanohablantes.includes(data.country)) ?
                <InputField
                  label='Especificar país de residencia'
                  name='country'
                  value={data.country === 'Otro' ? '' : data.country}
                  updateData={updateData}
                /> : ''}
              <InputField
                label='Ciudad de residencia'
                name='city'
                value={data.city}
                updateData={updateData}
              />
              <Dropdown
                label='Servicio'
                options={allServices}
                selected={service}
                value={service}
                setSelected={setService}
                maxHeight='20vh'
                objKey='name'
              />
              <Dropdown
                label='Sesiones'
                options={getQuantityOptions()}
                selected={quantity}
                value={quantity}
                setSelected={val => setQuantity(val.split(' ')[0])}
                maxHeight='20vh'
              />
              <div className="booking__form-datepicker">
                <div className="booking__various-dates">
                  {Array.from({ length: quantity }).map((_, i) =>
                    <div
                      key={i}
                      className="booking__various-dates-item"
                      style={{
                        width: '100%'
                      }}
                    >
                      <h4 className="booking__various-dates-item-label">{i + 1}</h4>
                      {openCalendars[i] ?
                        <Calendar
                          locale='es'
                          onChange={(date) => handleDateChange(date, i)}
                          value={selectedDates[i]}
                          tileDisabled={tileDisabled}
                          className='react-calendar'
                        />
                        :
                        <div className='booking__date-time'>
                          <Button
                            label={selectedDates[i] ? getDate(selectedDates[i]) : 'Seleccionar fecha'}
                            handleClick={() => setOpenCalendars({ ...openCalendars, [i]: true })}
                            bgColor="#B0BCEB"
                            style={{ width: 'fit-content' }}
                          />
                          <Dropdown
                            label='Seleccionar hora'
                            options={getBookingSlots(selectedDates[i])}
                            selected={selectedDates[i]}
                            setSelected={(date) => handleDateChange(date, i)}
                            value={selectedDates[i]}
                            isTime={true}
                            maxHeight='10rem'
                          />
                        </div>
                      }
                    </div>)}
                </div>
              </div>
              <div className="booking__price-list">
                <p className="booking__price-item">
                  <span>Precio de la sesión</span>
                  <span>{parsePrice(service.price)}</span>
                </p>
                <h3 className="booking__price-item">
                  <span>Total</span>
                  <span>{parsePrice(service.price * quantity)}</span>
                </h3>
              </div>
              {loading ? <p>Creando reserva...</p>
                :
                <>
                  <Button
                    label='Reservar'
                    handleClick={book}
                    bgColor={APP_COLORS.METAL}
                    textColor='white'
                    style={{ marginTop: '1rem' }}
                    disabled={!checkData()}
                  />
                  <Button
                    label='Descartar'
                    handleClick={discard}
                    style={{ marginTop: '.5rem' }}
                  />
                </>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentBooking = () => {
    return (
      <div
        className="page__row"
        style={{
          flexDirection: isMobile ? 'column' : 'row',
          margin: isMobile ? '2rem 1rem' : '',
        }}
        ref={printRef}>
        <div className="page__col booking__text-col" style={{ width: 'fit-content', margin: 0 }}>
          <div className='booking__confirmed'>
            <h1>Cita confirmada!</h1>
            <img src={Ok} alt="" className="booking__ok" />
          </div>
          <p className='booking__text'>
            Estos son los datos de tu reserva:
          </p>
          <h2 className='booking__confirmed-service'>{service.name}</h2>
          <div className='booking__text'>
            {Object.keys(data).map((key: string, i) => <p key={i}><strong>{parseData[key]}: </strong>
              {data[key] instanceof Date ?
                new Date(data[key]).toLocaleString('es-ES', dateOptions) + ', ' + new Date(data[key]).toLocaleString('es-ES', timeOptions)
                : data[key]}</p>)}
            <p><strong>Fechas: </strong><ul>{selectedDates.map((date: Date) => <li>∘ {getDate(date)}</li>)}</ul></p>
            <p style={{ marginTop: '3rem' }}><strong>Precio por sesión: </strong>{parsePrice(service.price)}</p>
            <p><strong>Precio final: </strong>{parsePrice(service.price * quantity)}</p>
          </div>
          {hideButtons ? '' :
            <>
              <Button
                label='Imprimir'
                bgColor={APP_COLORS.ATOMIC}
                textColor='black'
                handleClick={handlePrint}
                style={{ margin: '1rem 0' }} />
              <Button
                label='Listo'
                bgColor={APP_COLORS.METAL}
                textColor='white'
                handleClick={() => history.push('/')} />
            </>}
        </div>
      </div>
    )
  }

  return (
    <div className="page__container">
      {booked ? renderCurrentBooking() : renderNewBooking()}
    </div>
  )
}