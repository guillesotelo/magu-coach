import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import Logo from '../../assets/images/logo/logo-magu.png'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import User from '../../assets/icons/user.svg'
import Bookings from '../../assets/icons/bookings.svg'
import Services from '../../assets/icons/services.svg'
import Exit from '../../assets/icons/exit.svg'
import { toast } from 'react-toastify'
import Menu from '../../assets/icons/menu.svg'

type Props = {}

export default function Header({ }: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const [toggleMenu, setToggleMenu] = useState('--toggled')
  const [openMenu, setOpenMenu] = useState(false)
  const history = useHistory()
  const { isLoggedIn, setIsLoggedIn, isMobile } = useContext(AppContext)

  useEffect(() => {
    setOpenMenu(false)
  }, [history.length])

  useEffect(() => {
    const menuHandler = (e: any) => {
      if (e.target.className !== 'header__menu-account-svg') {
        setToggleMenu('')
        setTimeout(() => setShowMenu(false), 500)
      }
      else toggleDropdown()
    }
    document.addEventListener('click', menuHandler)
    return () => document.removeEventListener('click', menuHandler)
  }, [])

  const logout = () => {
    setToggleMenu('--toggled')
    localStorage.clear()
    toast.info('Nos vemos pronto!')
    setTimeout(() => {
      setIsLoggedIn(false)
      setShowMenu(false)
      history.push('/')
    }, 1000)
  }

  const toggleDropdown = () => {
    setShowMenu(!showMenu)
    setToggleMenu(showMenu ? '' : '--toggled')
  }


  const renderMobile = () => {
    return (
      <div className="header__container">
        <div className="header__col">
          <div className="header__logo" onClick={() => history.push('/')}>
            <img src={Logo} alt="Lic. M. Agustina Sotelo" className="header__logo-img-iso" />
          </div>
        </div>
        <div className="header__col">
          <img
            src={Menu}
            onClick={() => setOpenMenu(!openMenu)}
            alt='Menu'
            className='header__menu-svg'
            draggable={false}
          />
          <div className={`header__menu-sidebar${openMenu ? '--togled' : ''}`}>
            <nav className="header__nav">
              <ul className='header__menu'>
                <li><a onClick={() => history.push('/')} className='header__menu-item'>Inicio</a></li>
                <li><a onClick={() => history.push('/recursos')} className='header__menu-item'>Recursos</a></li>
                <li><a onClick={() => history.push('/new-booking')} className='header__menu-item'>Reservar</a></li>
                <li><a onClick={() => history.push('/blog')} className='header__menu-item'>Blog</a></li>
                <li><a onClick={() => history.push('/cursos-online')} className='header__menu-item'>Cursos Online</a></li>
                <li><a onClick={() => history.push('/contacto')} className='header__menu-item'>Contacto</a></li>
                <li><a onClick={() => history.push('/sobre-mi')} className='header__menu-item'>Sobre mí</a></li>
                {isLoggedIn ?
                  <div>
                    <nav className="header__menu-account-drop-nav">
                      <ul className='header__menu-account-drop-list'>
                        <li className='header__menu-account-item' onClick={() => history.push('/bookings?view=Reservas')}>
                          <img src={Bookings} className='header__menu-account-item-svg' alt='Reservas' draggable={false} />
                          <p className="header__menu-account-item-text">Reservas</p>
                        </li>
                        <li className='header__menu-account-item' onClick={() => history.push('/bookings?view=Servicios')}>
                          <img src={Services} className='header__menu-account-item-svg' alt='Servicios' draggable={false} />
                          <p className="header__menu-account-item-text">Servicios</p>
                        </li>
                        <li className='header__menu-account-item' onClick={logout}>
                          <img src={Exit} className='header__menu-account-item-svg' alt='Logout' draggable={false} />
                          <p className="header__menu-account-item-text">Logout</p>
                        </li>
                      </ul>
                    </nav>
                  </div> : ''}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="header__container">
        <div className="header__col">
          <div className="header__logo" onClick={() => history.push('/')}>
            <img src={Logo} alt="Lic. M. Agustina Sotelo" className="header__logo-img-iso" />
          </div>
        </div>
        <div className="header__col">
          <nav className="header__nav">
            <ul className='header__menu'>
              <li><a onClick={() => history.push('/')} className='header__menu-item'>Inicio</a></li>
              <li><a onClick={() => history.push('/recursos')} className='header__menu-item'>Recursos</a></li>
              <li><a onClick={() => history.push('/new-booking')} className='header__menu-item'>Reservar</a></li>
              <li><a onClick={() => history.push('/blog')} className='header__menu-item'>Blog</a></li>
              <li><a onClick={() => history.push('/cursos-online')} className='header__menu-item'>Cursos Online</a></li>
              <li><a onClick={() => history.push('/contacto')} className='header__menu-item'>Contacto</a></li>
              <li><a onClick={() => history.push('/sobre-mi')} className='header__menu-item'>Sobre mí</a></li>
              {isLoggedIn ?
                <li>
                  <div className="header__menu-account" onClick={toggleDropdown}>
                    <img src={User} className='header__menu-account-svg' alt='User' draggable={false} />
                  </div>
                </li> : ''}
              {showMenu ?
                <div className={`header__menu-account-drop${toggleMenu}`}>
                  <nav className="header__menu-account-drop-nav">
                    <ul className='header__menu-account-drop-list'>
                      <li className='header__menu-account-item' onClick={() => history.push('/bookings?view=Reservas')}>
                        <img src={Bookings} className='header__menu-account-item-svg' alt='Reservas' draggable={false} />
                        <p className="header__menu-account-item-text">Reservas</p>
                      </li>
                      <li className='header__menu-account-item' onClick={() => history.push('/bookings?view=Servicios')}>
                        <img src={Services} className='header__menu-account-item-svg' alt='Servicios' draggable={false} />
                        <p className="header__menu-account-item-text">Servicios</p>
                      </li>
                      <li className='header__menu-account-item' onClick={logout}>
                        <img src={Exit} className='header__menu-account-item-svg' alt='Logout' draggable={false} />
                        <p className="header__menu-account-item-text">Logout</p>
                      </li>
                    </ul>
                  </nav>
                </div> : ''}
            </ul>
          </nav>
        </div>
      </div >
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}