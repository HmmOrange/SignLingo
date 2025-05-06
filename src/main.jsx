import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './Login/Login.jsx';
import Dictionary from './Dictionary/Dictionary.jsx';
import App from './App.jsx';

import { AuthProvider } from './contexts/AuthContext';
import Translator from './Translator/Translator.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/translator" element={<Translator />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
