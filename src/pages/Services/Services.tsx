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

                <h2>Fonoaudiología</h2>
                <p>El ser humano es un ser social que utiliza la comunicación para interactuar con las personas que lo rodean y para aprender de su entorno. Estas acciones de interacción y comunicación son consideradas habilidades innatas del hombre, las cuales adquiere y perfecciona en cada etapa de su vida. No obstante, a lo largo de su crecimiento pueden ocurrir situaciones que ponen en riesgos dichas capacidades, es a partir de allí en donde la fonoaudiología empieza a aplicar sus conocimientos, métodos y herramientas.

                    <br />
                    Pero ¿qué es fonoaudiología? Pues bien,  la fonoaudiología es una disciplina de la salud que estudia la comunicación humana y la discapacidad comunicativa, reconociendo los factores individuales, interpersonales y sociales de los individuos. Sus actividades no solo están centradas en identificar y tratar las deficiencias de los pacientes, sino también en la creación de métodos para la rehabilitación de las capacidades comunicativas del individuo. De igual forma, interviene en los procesos de prevención de dichas deficiencias y en la promoción del bienestar comunicativo, de la calidad de vida y de la inclusión social de las comunidades, poblaciones y sujetos.

                    <br />

                    Cabe resaltar que, los profesionales en esta disciplina, formulan y gestionan proyectos investigativos para mejorar e impulsar el desarrollo social y para el avance científico y tecnológico. De igual forma, son actores que ayudan a la inclusión social en los ámbitos comunicacionales, sociales, políticos y culturales. </p>

            </div>
        </div>
    )
}