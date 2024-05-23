import { AppContext, AppProvider } from './AppContext';
import ReactGA from 'react-ga4';
import { Switch, Route, useLocation } from "react-router-dom";
import React, { useContext, useEffect } from 'react'; import './App.css';
import Home from "./pages/Home/Home";
import Header from './components/Header/Header';
import './scss/app.scss'
import Footer from './components/Footer/Footer';
import Privacy from './pages/Privacy/Privacy';
import Cookies from './pages/Cookies/Cookies';
import Login from './pages/Login/Login';
import NewBooking from './pages/NewBooking/NewBooking';
import Bookings from './pages/Bookings/Bookings';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {
  const location = useLocation()
  const { isLoggedIn } = useContext(AppContext)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname
    })
  }, [location, window.location.pathname])

  return (
    <Switch>
      <Route exact path="/">
        <div className={`page__wrapper`}>
          <Header />
            <Home />
          <Footer />
        </div>
      </Route>

      <Route exact path="/politicas-de-privacidad">
        <div className={`page__wrapper`}>
          <Header />
            <Privacy />
          <Footer />
        </div>
      </Route>

      <Route exact path="/cookies">
        <div className={`page__wrapper`}>
          <Header />
            <Cookies />
          <Footer />
        </div>
      </Route>

      <Route exact path="/login">
        <div className={`page__wrapper`}>
          <Header />
            <Login />
          <Footer />
        </div>
      </Route>


      <Route exact path="/new-booking">
        <div className={`page__wrapper`}>
          <Header />
            <NewBooking />
          <Footer />
        </div>
      </Route>

      <Route exact path="/bookings">
        <div className={`page__wrapper`}>
          <Header />
            <Bookings />
          <Footer />
        </div>
      </Route>

      <Route exact path="/services">
        <div className={`page__wrapper`}>
          <Header />
            <Services />
          <Footer />
        </div>
      </Route>

      <Route exact path="/sobre-mi">
        <div className={`page__wrapper`}>
          <Header />
            <About />
          <Footer />
        </div>
      </Route>

      <Route exact path="/contacto">
        <div className={`page__wrapper`}>
          <Header />
            <Contact />
          <Footer />
        </div>
      </Route>

      <Route>
        <div className={`page__wrapper`}>
          <Header />
            <Home />
          <Footer />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
