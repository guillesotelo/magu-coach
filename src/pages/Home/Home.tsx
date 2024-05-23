import React, { useContext, useEffect, useState } from 'react'
import BG from '../../assets/images/site/BG.jpg'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { APP_COLORS } from '../../constants'
import { AppContext } from '../../AppContext'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import WhatsappChat from '../../components/WhatsappChat/WhatsappChat'
import ServiceCard from '../../components/ServiceCard/ServiceCard'

type Props = {}

export default function Home({ }: Props) {
  const [showWhatsapp, setShowWhatsapp] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const history = useHistory()
  const { isMobile } = useContext(AppContext)
  const message = 'Hola Agustina! Me gustaría ponerme en contacto contigo para conocer más sobre tus servicios.'

  useEffect(() => {
    setTimeout(() => setShowWhatsapp(true), 3000)
  }, [])

  const renderDesktop = () => {
    return (
      <div className='page__row'>
        <div className='home__container' style={{ backgroundImage: `url(${BG})` }}>

          <div className="home__section-wrap">
          <h2 className='page__title'>Servicios</h2>
            <ServiceCard
              image='https://www.danielalencina.com/wp-content/uploads/2019/07/coaching-ontologico-1.jpg'
              title='Coaching Ontológico'
              description='El Coaching Ontológico es un servicio de desarrollo personal y profesional que se centra en transformar la manera en que las personas interpretan y enfrentan su realidad. Mediante el uso del lenguaje, la gestión emocional y la conciencia corporal, se facilita que los clientes amplíen sus posibilidades y alcancen sus objetivos. A través de conversaciones profundas, preguntas poderosas y una escucha activa, se guía a los clientes para que identifiquen y superen creencias limitantes, desarrollen nuevas competencias y vivan de manera más coherente y efectiva. Este enfoque holístico promueve un autoconocimiento profundo y un cambio duradero en la vida de las personas.'
              buttonLabel='Reservar'
              handleButton={() => history.push('/new-booking?serviceId=664efdab7bd965baf98c585f')}
              delay='1s'
              handleReadMore={() => history.push('/services?serviceId=coaching-ontologico')}
            />
          </div>
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

  const renderMobile = () => {
    return (
      <div className='page__row'>

      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}