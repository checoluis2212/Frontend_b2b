// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResponsesList from './pages/ResponsesList';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/respuestas" element={<ResponsesList />} />
    </Routes>
  );
}
