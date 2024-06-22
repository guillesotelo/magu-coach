import { useEffect, useState } from 'react'
import BG from '../../assets/images/site/BG.jpg'
import { useHistory } from 'react-router-dom'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import WhatsappChat from '../../components/WhatsappChat/WhatsappChat'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { getAllServices } from '../../services'

type Props = {}

export default function Home({ }: Props) {
  const [showWhatsapp, setShowWhatsapp] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [services, setServices] = useState<any>([])
  const history = useHistory()
  const message = 'Hola Agustina! Me gustaría ponerme en contacto contigo para conocer más sobre tus servicios.'

  useEffect(() => {
    setTimeout(() => setShowWhatsapp(true), 3000)
    getServices()
  }, [])

  useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      if (showChat) body.style.overflow = 'hidden'
      else body.style.overflow = 'auto'
    }
  }, [showChat])

  const getServices = async () => {
    try {
      const allServices = await getAllServices()
      if (allServices && Array.isArray(allServices)) setServices(allServices)
    } catch (error) {
      console.error(error)
    }
  }

  const renderHome = () => {
    return (
      <div className='page__row'>
        <div
          className='home__container'
          style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: 'cover',
            filter: showChat ? 'contrast(.3)' : 'contrast(1)'
          }}>

          {services.length ?
            <>
              <h2 className='page__title' style={{ animation: 'fade-in-down 2s ease-in forwards' }}>Servicios</h2>
              <div style={{ borderBottom: '1px solid black', width: '40vw', marginTop: '1rem', animation: 'fade-in-up 2s ease-in forwards' }}></div>
              <div className="home__section-wrap">
                {
                  services.map((service: any, i: number) =>
                    <ServiceCard
                      image={service.image}
                      title={service.title}
                      description={service.description}
                      buttonLabel='Reservar'
                      handleButton={() => history.push(`/new-booking?serviceId=${service._id}`)}
                      delay={`${(i + 1)/2}s`}
                      handleReadMore={() => history.push(`/services?serviceId=${service.name}`)}
                    />
                  )}
              </div>
            </> : ''}
        </div>

        {showWhatsapp ?
          <div className="home__whatsapp">
            {showChat ?
              <WhatsappChat onClose={() => setShowChat(false)} message={message} />
              :
              <img src={Whatsapp} alt="Whatsapp Me" onClick={() => setShowChat(true)} className="home__whatsapp-img" />
            }
          </div>
          : ''}
      </div>
    )
  }

  return renderHome()
}