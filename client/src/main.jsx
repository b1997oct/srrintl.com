import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers.authorization = Cookies.get('token')

createRoot(document.getElementById('root')).render(
  <RouterProvider router={createBrowserRouter(App())} />
)
