import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { sendResponse } from '../services/api';

import logo from '../assets/logo.png';
import bg from '../assets/background.jpg';
import amazon from '../assets/amazon.png';
import bbva from '../assets/bbva.png';
import dhl from '../assets/dhl.png';
import netflix from '../assets/netflix.png';
import Walmart from '../assets/Walmart.png';
import salinas from '../assets/salinas.png';

import { motion } from 'framer-motion';
import '../index.css'; 

export default function Home() {
  const navigate = useNavigate();
  const [visitorId, setVisitorId] = useState(null);
  const [flashButton, setFlashButton] = useState('cotizar'); // Control dinámico de flash

  // Capturar UTM una vez
  useEffect(() => {
    if (!localStorage.getItem('utmParams')) {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(key => {
        if (params.has(key)) utm[key.replace('utm_','')] = params.get(key);
      });
      if (Object.keys(utm).length) {
        localStorage.setItem('utmParams', JSON.stringify(utm));
      }
    }
  }, []);

  // Generar visitorId
  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
      localStorage.setItem('visitorId', visitorId);
    })();
  }, []);

  const options = [
    { title: 'Solicitar Cotización', key: 'cotizar', style: 'btn-primary', url: 'https://reclutamiento.occ.com.mx/contactanos' },
    { title: 'Publicar Vacante', key: 'publicar', style: 'btn-outline-light', url: 'https://www.occ.com.mx/empresas/inicia-sesion/crear-cuenta' },
    { title: 'Buscar Empleo', key: 'empleo', style: 'btn-outline-light', url: 'https://www.occ.com.mx/' }
  ];

  const handleClick = async (option) => {
    if (!visitorId) return;
    const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');
    await sendResponse({ visitorId, button: option.key, utmParams });
    window.location.href = option.url;
  };

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }, hover: { scale: 1.05 } };

  return (
    <motion.div className="home-wrapper text-white" variants={container} initial="hidden" animate="visible">
      
      {/* HEADER */}
      <motion.header className="py-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.img src={logo} alt="OCC B2B" className="logo-header" />
        <p className="mt-2 fs-6">
          Sin importar el tamaño, sector o ubicación de tu empresa,<br />
          estamos listos para ayudarte a crecer.
        </p>
      </motion.header>

      {/* MAIN */}
      <motion.main className="content-container text-center">
        
        {/* Botones */}
        <motion.h2 className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          ¿Qué deseas hacer?
        </motion.h2>
        <section className="row g-3 mb-4 justify-content-center">
          {options.map(option => (
            <motion.div 
              key={option.key} 
              className="col-12 col-md-4" 
              variants={item} 
              whileHover="hover"
            >
              <button
                className={`btn ${option.style} w-100 py-3 ${flashButton === option.key ? 'btn-flash' : ''}`}
                onMouseEnter={() => setFlashButton(option.key)}
                onClick={() => handleClick(option)}
              >
                {option.title}
              </button>
            </motion.div>
          ))}
        </section>

        {/* Beneficios con palomas SVG Bootstrap blancas */}
        <motion.section className="mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="mb-3">¿Por qué elegir OCC?</h3>
          <ul className="benefits-list list-unstyled">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.07-.02L10.97 7l-1.414-1.414L7.5 8.086 6.354 6.94 4.94 8.354 6.97 10.03z"/>
              </svg>
              Amplia base de candidatos y empleos
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.07-.02L10.97 7l-1.414-1.414L7.5 8.086 6.354 6.94 4.94 8.354 6.97 10.03z"/>
              </svg>
              Proceso ágil y personalizado
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.07-.02L10.97 7l-1.414-1.414L7.5 8.086 6.354 6.94 4.94 8.354 6.97 10.03z"/>
              </svg>
              Soporte especializado en reclutamiento
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.07-.02L10.97 7l-1.414-1.414L7.5 8.086 6.354 6.94 4.94 8.354 6.97 10.03z"/>
              </svg>
              Más de 1000 empresas confían en nosotros
            </li>
          </ul>
        </motion.section>

        {/* Carrusel de logos */}
        <h3 className="mt-5 mb-3">Marcas que confían en nosotros</h3>
        <div className="logo-carousel">
          <div className="logo-track">
            <img src={amazon} alt="Amazon" className="logo-item" />
            <img src={bbva} alt="BBVA" className="logo-item" />
            <img src={dhl} alt="DHL" className="logo-item" />
            <img src={netflix} alt="Netflix" className="logo-item" />
            <img src={Walmart} alt="Walmart" className="logo-item walmart" />
            <img src={salinas} alt="salinas" className="logo-item" />
            <img src={amazon} alt="Amazon" className="logo-item" />
            <img src={bbva} alt="BBVA" className="logo-item" />
            <img src={dhl} alt="DHL" className="logo-item" />
            <img src={netflix} alt="Netflix" className="logo-item" />
            <img src={Walmart} alt="Walmart" className="logo-item walmart" />
            <img src={salinas} alt="salinas" className="logo-item" />
          </div>
        </div>

        {/* Footer */}
        <motion.footer className="mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </motion.footer>
      </motion.main>
    </motion.div>
  );
}
