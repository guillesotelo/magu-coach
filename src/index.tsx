import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './AppContext';
import ReactGA from 'react-ga4';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
const TRACKING_ID = "G-";
ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const darkMode = JSON.parse(localStorage.getItem('preferredMode') || 'false')

root.render(
  <BrowserRouter>
  <ToastContainer autoClose={2000} theme={darkMode ? 'dark' : 'light'} />
  <AppProvider>
    <App />
  </AppProvider>
</BrowserRouter>,
);