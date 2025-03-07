import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Register} from './register.jsx'
import { Login } from './login.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />    
      <Route path="/login" element={<Login />} />   
    </Routes>
  </BrowserRouter>,
)
