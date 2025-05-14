import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './Login/Login.jsx';
import Dictionary from './Dictionary/Dictionary.jsx';
import App from './App.jsx';

import { AuthProvider } from './contexts/AuthContext';
import Translator from './Translator/Translator.jsx';
import Study from './Study/Study.jsx';
import StudyHome from './Study_home_page/study_home.jsx';
import StudyAlphabet from './Study/alphabet/StudyAlphabet.jsx';
import StudyNumber from './Study/number/StudyAlphabet.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/study" element={<StudyHome />} />
          <Route path="/study/chữ cái" element={<StudyAlphabet />} />
          <Route path="/study/chữ số" element={<StudyNumber />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
