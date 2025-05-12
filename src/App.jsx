import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar/NavBar';
import signLogo from './assets/logo.svg'
import landingImage from './assets/landing.png'
import './App.css'

import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';

function App() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
		navigate("/login");
  };

  return (
    <>
      <NavBar />

      {user ? (
        <Dashboard username={user.name || 'abc'} />
      ) : (
        <div className="fullscreen-image-container">
          <img src={landingImage} alt="Landing" className="fullscreen-image" />
          <button className="overlay-button" onClick={handleLogin}>Đăng nhập</button>
        </div>
      )}
    </>
  )
}

export default App
