import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Navigate } from 'react-router-dom';
import { Register } from './register.jsx'
import { Login } from './login.jsx';
import { Shop } from './shop.jsx';
import { Departments } from './departments.jsx';
import { isAuthenticated } from './auth.js';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AccessDenied } from './access-denied.jsx';
import { Profile } from './profile.jsx';

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/access-denied" replace/>;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />    
      <Route path="/login" element={<Login />} />   
      <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/departments" element={<PrivateRoute element={<Departments />} />} />
      <Route path="/access-denied" element={<AccessDenied />} />

    </Routes>
  </BrowserRouter>,
)
