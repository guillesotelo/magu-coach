import { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { scrollToSection } from '../../helpers'
import { useLocation } from 'react-router-dom'
type Props = {}

export default function Services({ }: Props) {
    const { isMobile } = useContext(AppContext)
    const location = useLocation()

    useEffect(() => {
        const serviceId = new URLSearchParams(document.location.search).get('serviceId')
        if (serviceId) scrollToSection(serviceId)
    }, [location])

    return (
        <div className="page__centered">
            <div className="privacy__container" style={{ width: isMobile ? '95%' : '50%', margin: '2rem' }}>
                <h1>Servicios</h1>

                <h2>Coach Ontológico</h2>
                <p>El Coaching Ontológico es un servicio de desarrollo personal y profesional que se centra en transformar la manera en que las personas interpretan y enfrentan su realidad. Mediante el uso del lenguaje, la gestión emocional y la conciencia corporal, se facilita que los clientes amplíen sus posibilidades y alcancen sus objetivos. A través de conversaciones profundas, preguntas poderosas y una escucha activa, se guía a los clientes para que identifiquen y superen creencias limitantes, desarrollen nuevas competencias y vivan de manera más coherente y efectiva. Este enfoque holístico promueve un autoconocimiento profundo y un cambio duradero en la vida de las personas.</p>
            </div>
        </div>
    )
}