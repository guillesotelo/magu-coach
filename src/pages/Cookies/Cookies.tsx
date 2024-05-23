import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {}

export default function Cookies({ }: Props) {
    const { isMobile } = useContext(AppContext)

    return (
        <div className="page__centered">
            <div className="cookies__container" style={{ width: isMobile ? '95%' : '50%', margin: '2rem' }}>
                <h1>Mmm... Cookies</h1>

                <p>Esta Política de Cookies explica cómo utilizamos las cookies y tecnologías similares en nuestro sitio web. Al utilizar nuestro sitio, aceptas el uso de cookies de acuerdo con esta política.</p>

                <h2>¿Qué son las Cookies?</h2>

                <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Estas cookies nos ayudan a mejorar tu experiencia de navegación al recordar tus preferencias y proporcionar contenido relevante.</p>

                <h2>Tipos de Cookies que Utilizamos</h2>

                <p>Utilizamos cookies de sesión y cookies persistentes en nuestro sitio web. Las cookies de sesión se eliminan automáticamente cuando cierras tu navegador, mientras que las cookies persistentes permanecen en tu dispositivo durante un período más prolongado.</p>

                <h2>Control de Cookies</h2>

                <p>Puedes controlar y/o eliminar las cookies según tus preferencias. La mayoría de los navegadores web te permiten gestionar tus opciones de cookies a través de la configuración del navegador. Sin embargo, desactivar ciertas cookies puede afectar la funcionalidad de nuestro sitio web.</p>

                <h2>Cambios en la Política de Cookies</h2>

                <p>Nos reservamos el derecho de actualizar esta Política de Cookies en cualquier momento. Te recomendamos que revises esta página periódicamente para estar al tanto de cualquier cambio. Al continuar utilizando nuestro sitio web después de realizar cambios en esta política, aceptas dichos cambios.</p>

            </div>
        </div>
    )
}