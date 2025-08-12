// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cotizar from './pages/Cotizar';
import Publicar from './pages/Publicar';
import Buscando from './pages/Buscando';
import ResponsesList from './pages/ResponsesList';
import ReclutamientoNative from './pages/ReclutamientoNative'; // <-- NUEVO

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cotizar" element={<Cotizar />} />
      <Route path="/publicar" element={<Publicar />} />
      <Route path="/buscando" element={<Buscando />} />
      <Route path="/respuestas" element={<ResponsesList />} />
      <Route path="/reclutamiento-native" element={<ReclutamientoNative />} /> {/* <-- NUEVO */}
    </Routes>
  );
}
