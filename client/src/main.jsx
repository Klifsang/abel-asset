import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './Components/AdminDashboard/Admin/Admin.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './Components/Form/Form.jsx'
import { AuthProvider } from './Components/AuthProvider.jsx' // Import the AuthProvider
import User from './Components/UserDashboard/User/User.jsx'
import { AuthContext } from './Components/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider> {/* Wrap the AuthProvider around your BrowserRouter */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/form/*" element={<Login />}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path='/user' element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
)
