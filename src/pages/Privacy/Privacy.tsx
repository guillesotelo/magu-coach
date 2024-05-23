import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {}

export default function Privacy({ }: Props) {
    const { isMobile } = useContext(AppContext)

    return (
        <div className="page__centered">
            <div className="privacy__container" style={{ width: isMobile ? '95%' : '50%', margin: '2rem' }}>
                <h1>Política de Privacidad</h1>

                <p>La privacidad de nuestros visitantes es de suma importancia para nosotros. Esta Política de Privacidad describe detalladamente cómo recopilamos, utilizamos y protegemos tu información personal.</p>

                <h2>Recopilación de Información</h2>

                <p>Recopilamos información personal únicamente cuando nos la proporcionas directamente, como al completar formularios de contacto o suscripción. Esta información puede incluir tu nombre, dirección de correo electrónico y cualquier otra información que decidas compartir con nosotros.</p>

                <h2>Uso de la Información</h2>

                <p>Utilizamos la información que recopilamos para comunicarnos contigo y brindarte los servicios que solicitas. No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley o proteger nuestros derechos.</p>

                <h2>Seguridad de la Información</h2>

                <p>Tomamos medidas para proteger la seguridad de tu información personal y mantenerla segura. Sin embargo, no podemos garantizar la seguridad absoluta de la información transmitida a través de Internet.</p>

                <h2>Consentimiento</h2>

                <p>Al utilizar nuestro sitio web, aceptas nuestra Política de Privacidad y nos das tu consentimiento para recopilar y utilizar tu información personal de acuerdo con lo establecido en esta política.</p>

                <h2>Cambios en la Política de Privacidad</h2>

                <p>Podemos actualizar esta Política de Privacidad en cualquier momento. Te recomendamos que revises esta página periódicamente para estar al tanto de cualquier cambio. Al continuar utilizando nuestro sitio web después de realizar cambios en esta política, aceptas dichos cambios.</p>

            </div>
        </div>
    )
}