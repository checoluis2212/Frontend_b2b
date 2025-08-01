// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import logo from '../assets/logo.png';
import '../index.css';

export default function Home() {
  const navigate = useNavigate();
  const [visitorId, setVisitorId] = useState(null);

  // Captura visitorId
  useEffect(() => {
    FingerprintJS.load().then(fp =>
      fp.get().then(result => setVisitorId(result.visitorId))
    );
  }, []);

  const handleClick = (ruta) => {
    navigate(`/${ruta}`);
  };

  return (
    <div className="home bg">
      <div className="container text-center px-3 py-5 text-white">

        <img src={logo} alt="Logo OCC" className="logo mb-3" />

        <p className="intro">
          Sin importar el tamaño, sector o ubicación de tu empresa,<br />
          estamos listos para ayudarte a crecer.
        </p>

        <h2 className="mt-4 mb-3">¿Qué deseas hacer?</h2>

        <button className="btn btn-primary w-100 mb-3"
          onClick={() => handleClick('cotizar')}>
          Solicitar Cotización (+10 vacantes)
        </button>

        <button className="btn btn-outline-light w-100 mb-3"
          onClick={() => handleClick('publicar')}>
          Publicar Mi Primera Vacante
        </button>

        <button className="btn btn-outline-light w-100 mb-4"
          onClick={() => handleClick('empleo')}>
          Buscar Empleo
        </button>

        <h3 className="mb-3">¿Por qué elegir OCC?</h3>

        <ul className="benefits list-unstyled text-start mx-auto">
          <li>Amplia base de candidatos y empleos</li>
          <li>Proceso ágil y personalizado</li>
          <li>Soporte especializado en reclutamiento</li>
          <li>Más de 1000 empresas confían en nosotros</li>
        </ul>

      </div>
    </div>
  );
}
🎨 index.css (estilos móviles optimizados)
Agrega esto en tu index.css o crea uno nuevo llamado home.css y lo importas en Home.jsx.

css
Copiar
Editar
/* Fondo con overlay */
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
              url('./assets/background.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
}

/* Logo responsivo */
.logo {
  max-width: 100px;
}

/* Intro texto */
.intro {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

/* Títulos */
h2, h3 {
  font-weight: 700;
}

/* Beneficios con check */
.benefits {
  max-width: 320px;
}

.benefits li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.benefits li::before {
  content: '✔';
  position: absolute;
  left: 0;
  color: white;
  font-weight: bold;
}
¿Quieres también la versión desktop/tablet responsive con media queries o mantienes este enfoque solo para móviles?








Tú dijiste:
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
  const [visitorId, setVisitorId] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [loadingVisitorId, setLoadingVisitorId] = useState(true);

  // Guardar UTM en primera carga
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
    if (!visitorId) {
      console.error("🚨 visitorId no está listo");
      return;
    }
    if (!option.key) {
      console.error("🚨 key del botón está vacío");
      return;
    }

    const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');

    console.log("📤 Enviando:", { visitorId, button: option.key, utmParams });

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
              whileHover="hover"
            >
              <button
                className={btn w-100 py-3 ${getButtonClass(option.key)}}
                onMouseEnter={() => setHoveredButton(option.key)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => handleClick(option)}
                disabled={loadingVisitorId}
              >
                {loadingVisitorId ? 'Cargando...' : option.title}
              </button>
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
              <img src={amazon} alt="Amazon" className="logo-item" />
              <img src={bbva} alt="BBVA" className="logo-item" />
              <img src={dhl} alt="DHL" className="logo-item" />
              <img src={netflix} alt="Netflix" className="logo-item" />
              <img src={palacio} alt="Palacio de Hierro" className="logo-item" />
              <img src={Walmart} alt="Walmart" className="logo-item walmart" />
              <img src={lala} alt="Lala" className="logo-item" />
              <img src={salinas} alt="Salinas" className="logo-item" />
              <img src={thomson} alt="Thomson" className="logo-item" />

              <img src={amazon} alt="Amazon" className="logo-item" />
              <img src={bbva} alt="BBVA" className="logo-item" />
              <img src={dhl} alt="DHL" className="logo-item" />
              <img src={netflix} alt="Netflix" className="logo-item" />
              <img src={palacio} alt="Palacio de Hierro" className="logo-item" />
              <img src={Walmart} alt="Walmart" className="logo-item walmart" />
              <img src={lala} alt="Lala" className="logo-item" />
              <img src={salinas} alt="Salinas" className="logo-item" />
              <img src={thomson} alt="Thomson" className="logo-item" />
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
