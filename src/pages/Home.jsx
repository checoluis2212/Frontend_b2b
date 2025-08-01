import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { sendResponse } from '../services/api';

// Logos
import logo from '../assets/logo.png';
import amazon from '../assets/amazon.png';
import bbva from '../assets/bbva.png';
import dhl from '../assets/dhl.png';
import netflix from '../assets/netflix.png';
import Walmart from '../assets/Walmart.png';
import salinas from '../assets/salinas.png';
import palacio from '../assets/palacio.png';
import thomson from '../assets/thomson.png';
import lala from '../assets/lala.png';

import { motion } from 'framer-motion';
import '../index.css';

export default function Home() {
  const navigate = useNavigate();
  const [visitorId, setVisitorId] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [loadingVisitorId, setLoadingVisitorId] = useState(true);

  // Guardar UTM al cargar
  useEffect(() => {
    if (!localStorage.getItem('utmParams')) {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
        if (params.has(key)) utm[key.replace('utm_', '')] = params.get(key);
      });
      if (Object.keys(utm).length) {
        localStorage.setItem('utmParams', JSON.stringify(utm));
      }
    }
  }, []);

  // Obtener visitorId
  useEffect(() => {
    (async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        setVisitorId(visitorId);
        localStorage.setItem('visitorId', visitorId);
      } catch (err) {
        console.error("❌ Error cargando visitorId:", err);
      } finally {
        setLoadingVisitorId(false);
      }
    })();
  }, []);

  const options = [
    { title: 'Solicitar Cotización (+10 vacantes)', key: 'cotizar', url: 'https://reclutamiento.occ.com.mx/contactanos' },
    { title: 'Publicar Mi Primera Vacante', key: 'publicar', url: 'https://www.occ.com.mx/empresas/inicia-sesion/crear-cuenta' },
    { title: 'Buscar Empleo', key: 'empleo', url: 'https://www.occ.com.mx/' }
  ];

  const handleClick = async (option) => {
    if (!visitorId) return console.error("🚨 visitorId no está listo");
    if (!option.key) return console.error("🚨 key del botón está vacío");

    const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');

    try {
      await sendResponse({ visitorId, button: option.key, utmParams });
      window.location.href = option.url;
    } catch (error) {
      console.error("❌ Error al enviar:", error);
    }
  };

  const getButtonClass = (key) => {
    const activeKey = hoveredButton || 'cotizar';
    return activeKey === key ? 'btn-primary' : 'btn-outline-light';
  };

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="me-2" viewBox="0 0 16 16">
      <path d="M13.485 1.929a.75.75 0 0 1 1.06 1.06l-8.5 8.5a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06L5.5 9.439l7.985-7.51z" />
    </svg>
  );

  return (
    <motion.div className="home-wrapper text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* Header */}
      <header className="header text-center">
        <img src={logo} alt="OCC" className="logo-header" />
        <p className="intro-text">
          Sin importar el tamaño, sector o ubicación de tu empresa,<br />
          estamos listos para ayudarte a crecer.
        </p>
      </header>

      {/* Botones */}
      <main className="main-content text-center">
        <h2 className="title">¿Qué deseas hacer?</h2>
        <div className="buttons-container">
          {options.map(option => (
            <button
              key={option.key}
              className={`btn-action ${getButtonClass(option.key)}`}
              onMouseEnter={() => setHoveredButton(option.key)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => handleClick(option)}
              disabled={loadingVisitorId}
            >
              {loadingVisitorId ? 'Cargando...' : option.title}
            </button>
          ))}
        </div>

        {/* Beneficios */}
        <section className="benefits-section">
          <h3 className="benefits-title">¿Por qué elegir OCC?</h3>
          <ul className="benefits-list">
            <li><CheckIcon /> Amplia base de candidatos y empleos</li>
            <li><CheckIcon /> Proceso ágil y personalizado</li>
            <li><CheckIcon /> Soporte especializado en reclutamiento</li>
            <li><CheckIcon /> Más de 1000 empresas confían en nosotros</li>
          </ul>
        </section>

        {/* Logos */}
        <section className="logos-section">
          <h3 className="logos-title">Marcas que confían en nosotros</h3>
          <div className="logo-carousel">
            {[amazon, bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson].map((logoSrc, i) => (
              <img key={i} src={logoSrc} alt={`Logo ${i}`} className="logo-item" />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
      </footer>
    </motion.div>
  );
}
