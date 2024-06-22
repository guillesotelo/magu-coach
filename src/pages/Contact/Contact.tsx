import { useContext } from 'react'
import { AppContext } from '../../AppContext'
type Props = {}

export default function Contact({ }: Props) {
    const { isMobile } = useContext(AppContext)
    return (
        <div className="page__centered">
            <div className="privacy__container" style={{ width: isMobile ? '95%' : '50%', margin: '2rem' }}>
                <h1>Contacto</h1>

                <p>Si tienes alguna pregunta o deseas agendar una cita, por favor no dudes en contactarnos.</p>

                <h2>Información de Contacto</h2>

                <ul>
                    <li>Teléfono: <a href="tel:+5493468649280">+54911 3289 5449</a></li>
                    <li>Email: <a href="mailto:magu.sotelo25@gmail.com">magu.sotelo25@gmail.com</a></li>
                    {/* <li>Dirección: Calle Falsa 123, Ciudad, País</li> */}
                </ul>
            </div>
        </div>
    )
}