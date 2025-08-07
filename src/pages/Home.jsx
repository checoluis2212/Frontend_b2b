import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { sendResponse } from '../services/api';

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
  const [visitorId, setVisitorId] = useState(localStorage.getItem('visitorId') || null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [loadingVisitorId, setLoadingVisitorId] = useState(!visitorId);

  const isMobileDevice = window.innerWidth <= 768;

  // 🔹 Reset focus en mobile
  useEffect(() => {
    if (isMobileDevice) {
      setTimeout(() => {
        document.activeElement?.blur();
        document.querySelectorAll('button').forEach(btn => btn.blur());
      }, 50);
    }
  }, [isMobileDevice]);

  // 🔹 Guardar UTM params
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

  // 🔹 Obtener visitorId si no existe
  useEffect(() => {
    if (!visitorId) {
      (async () => {
        try {
          const fp = await FingerprintJS.load();
          const { visitorId: fpId } = await fp.get();
          setVisitorId(fpId);
          localStorage.setItem('visitorId', fpId);
        } catch (err) {
          console.error("❌ Error cargando visitorId:", err);
        } finally {
          setLoadingVisitorId(false);
        }
      })();
    } else {
      setLoadingVisitorId(false);
    }
  }, [visitorId]);

  const options = [
    { title: 'Solicitar Cotización (+10 vacantes)', key: 'cotizar', url: 'https://reclutamiento.occ.com.mx/contactanos' },
    { title: 'Publicar Mi Primera Vacante', key: 'publicar', url: 'https://www.occ.com.mx/empresas/inicia-sesion/crear-cuenta' },
    { title: 'Buscar Empleo', key: 'empleo', url: 'https://www.occ.com.mx/' }
  ];

  const handleClick = (option) => {
    const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');

    // 🔹 Enviar tracking sin bloquear la redirección
    sendResponse({ visitorId, button: option.key, utmParams }).catch(() => {});

    // 🔹 Redirigir con visitorId como query param
    const url = new URL(option.url);
    url.searchParams.set('visitorId', visitorId);
    window.location.href = url.toString();
  };

  const getButtonClass = (key) => {
    if (isMobileDevice) return 'btn-outline-light';
    return hoveredButton === key || (!hoveredButton && key === 'cotizar')
      ? 'btn-primary'
      : 'btn-outline-light';
  };

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }, hover: { scale: 1.05 } };

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="me-2" viewBox="0 0 16 16">
      <path d="M13.485 1.929a.75.75 0 0 1 1.06 1.06l-8.5 8.5a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06L5.5 9.439l7.985-7.51z"/>
    </svg>
  );

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
              whileHover={!isMobileDevice ? "hover" : undefined}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`btn w-100 py-3 ${getButtonClass(option.key)}`}
                onMouseEnter={() => !isMobileDevice && setHoveredButton(option.key)}
                onMouseLeave={() => !isMobileDevice && setHoveredButton(null)}
                onClick={() => handleClick(option)}
              >
                {loadingVisitorId ? 'Procesando…' : option.title}
              </motion.button>
            </motion.div>
          ))}
        </section>

        {/* Beneficios */}
        <motion.section className="mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="mb-3">¿Por qué elegir OCC?</h3>
          <ul className="benefits-list list-unstyled">
            <li><CheckIcon /> Amplia base de candidatos y empleos</li>
            <li><CheckIcon /> Proceso ágil y personalizado</li>
            <li><CheckIcon /> Soporte especializado en reclutamiento</li>
            <li><CheckIcon /> Más de 1000 empresas confían en nosotros</li>
          </ul>
        </motion.section>

        {/* Carrusel */}
        <div className="logos-section mt-5">
          <h3 className="mb-3">Marcas que confían en nosotros</h3>
          <div className="logo-carousel">
            <div className="logo-track">
              {[amazon, bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson,
                amazon, bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson].map((logoSrc, idx) => (
                <img key={idx} src={logoSrc} alt="Logo" className="logo-item" />
              ))}
            </div>
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
