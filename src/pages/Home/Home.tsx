import { useEffect, useState } from 'react'
import BG from '../../assets/images/site/BG.jpg'
import { useHistory } from 'react-router-dom'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import WhatsappChat from '../../components/WhatsappChat/WhatsappChat'
import ServiceCard from '../../components/ServiceCard/ServiceCard'

type Props = {}

export default function Home({ }: Props) {
  const [showWhatsapp, setShowWhatsapp] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const history = useHistory()
  const message = 'Hola Agustina! Me gustaría ponerme en contacto contigo para conocer más sobre tus servicios.'

  useEffect(() => {
    setTimeout(() => setShowWhatsapp(true), 3000)
  }, [])

  useEffect(() => {
    const body = document.querySelector('body')
    if (body) {
      if (showChat) body.style.overflow = 'hidden'
      else body.style.overflow = 'auto'
    }
  }, [showChat])

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
            <ServiceCard
              image='https://eduka.occidente.co/wp-content/uploads/2022/10/Ventajas-de-la-carrera-de-Fonoaudiologia.jpg'
              title='Fonoaudiología'
              description='La fonoaudiología es una disciplina de la salud que estudia la comunicación humana y la discapacidad comunicativa, reconociendo los factores individuales, interpersonales y sociales de los individuos. Sus actividades no solo están centradas en identificar y tratar las deficiencias de los pacientes, sino también en la creación de métodos para la rehabilitación de las capacidades comunicativas del individuo. De igual forma, interviene en los procesos de prevención de dichas deficiencias y en la promoción del bienestar comunicativo, de la calidad de vida y de la inclusión social de las comunidades, poblaciones y sujetos.'
              buttonLabel='Reservar'
              handleButton={() => history.push('/new-booking?serviceId=664f21e7067722000c2aa2a4')}
              delay='1.5s'
              handleReadMore={() => history.push('/services?serviceId=fonoaudiologia')}
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

  return renderHome()
}