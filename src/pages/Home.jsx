// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { sendResponse } from '../services/api';
import logo from '../assets/logo.png';
import bg from '../assets/background.jpg';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
      localStorage.setItem('visitorId', result.visitorId);
    })();
  }, []);

  const options = [
    { title: 'Cotizar Más de 10 vacantes',    btn: 'Cotizar ahora',    opt: 'cotizar',       path: '/cotizar' },
    { title: 'Publicar Mi Primera Vacante',   btn: 'Publicar ya',      opt: 'publicar',      path: '/publicar' },
    { title: 'Estoy Buscando Empleo',         btn: 'Ver oportunidades',opt: 'oportunidades',  path: '/buscando' },
  ];

  const handleClick = async (buttonKey, path) => {
    if (!visitorId) return;
    await sendResponse({ visitorId, button: buttonKey });
    navigate(path);
  };

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    hover:    { scale: 1.05 }
  };

  return (
    <motion.div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
      className="text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="py-4 mb-5 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container d-flex align-items-center">
          <motion.img
            src={logo}
            alt="OCC B2B"
            style={{ height: '120px' }}
            className="me-3"
            initial={{ scale: 0.8
