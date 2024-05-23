import React, { useContext } from 'react'
import Instagram from '../../assets/icons/instagram.svg'
import LinkedIn from '../../assets/icons/linkedin.svg'
import Youtube from '../../assets/icons/youtube.svg'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { toast } from 'react-toastify'

type Props = {}

export default function Footer({ }: Props) {
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        setIsLoggedIn(false)
        toast.info('Nos vemos pronto!')
    }

    return (
        <div className="footer__container">
            <div className="footer__col">
                <nav className="footer__nav">
                    <ul className="footer__nav-list">
                        <li onClick={() => history.push('/new-booking')} className="footer__nav-list-item">Reservar</li>
                        <li onClick={() => history.push('/subscripcion')} className="footer__nav-list-item">Blog</li>
                        <li onClick={() => history.push('/cursos-inline')} className="footer__nav-list-item">Cursos Online</li>
                        <li onClick={() => history.push('/sobre-mi')} className="footer__nav-list-item">Sobre mí</li>
                    </ul>
                </nav>
            </div>
            <div className="footer__col">
                <div className="footer__social">
                    <img onClick={() => history.push('/')} src={LinkedIn} alt="LinkedIn" className="footer__social-svg" />
                    <img onClick={() => history.push('/')} src={Youtube} alt="Youtube" className="footer__social-svg" />
                    <img onClick={() => history.push('/')} src={Instagram} alt="Instagram" className="footer__social-svg" />
                </div>
            </div>
            <div className="footer__col">
                <nav className="footer__nav">
                    <ul className="footer__nav-list">
                        <li onClick={() => history.push('/contacto')} className="footer__nav-list-item">Contacto</li>
                        <li onClick={() => history.push('/politicas-de-privacidad')} className="footer__nav-list-item">Políticas de Privacidad</li>
                        <li onClick={() => history.push('/cookies')} className="footer__nav-list-item">Cookies</li>
                        {isLoggedIn ?
                            <li onClick={logout} className="footer__nav-list-item">Cerrar Sesión</li>
                            :
                            <li onClick={() => history.push('/login')} className="footer__nav-list-item">Iniciar Sesión</li>}
                    </ul>
                </nav>
            </div>
        </div>
    )
}