// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendResponse } from '../services/api';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';
import bg from '../assets/background.jpg';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function Home() {
  const navigate = useNavigate();
  const [visitorId, setVisitorId] = useState(null);

  // 1) Carga FingerprintJS, guarda visitorId en estado y en localStorage
  useEffect(() => {
    (async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        console.log('⭐ visitorId generado:', visitorId);
        setVisitorId(visitorId);
        localStorage.setItem('visitorId', visitorId);
      } catch (err) {
        console.error('Error FingerprintJS:', err);
      }
    })();
  }, []);

  // 2) Opciones de botones
  const options = [
    { title: 'Cotizar Más de 10 vacantes',  btn: 'Cotizar ahora',    opt: 'cotizar',      path: '/cotizar' },
    { title: 'Publicar Mi Primera Vacante', btn: 'Publicar ya',      opt: 'publicar',     path: '/publicar' },
    { title: 'Estoy Buscando Empleo',       btn: 'Ver oportunidades',opt: 'oportunidades', path: '/buscando' },
  ];

  // 3) Envío de datos y navegación
  const handleClick = async (buttonKey, path) => {
    console.log(`🔘 Botón pulsado: ${buttonKey}; visitorId actual:`, visitorId);
    if (!visitorId) {
      console.warn('⏳ Aún no hay visitorId. Esperando…');
      return;
    }
    try {
      console.log('📤 Llamando a sendResponse…', { visitorId, button: buttonKey });
      await sendResponse({ visitorId, button: buttonKey });
      console.log('✅ sendResponse completado para:', buttonKey);
    } catch (err) {
      console.error('❌ Error en sendResponse:', err);
    }
    console.log('➡ Navegando a:', path);
    navigate(path);
  };

  // Animaciones (Framer Motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    hover:   { scale: 1.05 }
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
      {/* Header */}
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
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          />
          <div className="ms-auto w-50 d-none d-md-block">
            <motion.p
              className="fs-6 text-end mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sin importar el tamaño, sector o ubicación de tu empresa,<br/>
              estamos listos para ayudarte a crecer.
            </motion.p>
          </div>
        </div>
      </motion.header>

      {/* Main */}
      <motion.main className="container d-flex flex-column py-5">
        {/* Mobile Why OCC */}
        <motion.section
          className="row mb-5 d-block d-md-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="col-12">
            <h2 className="h4 mb-3">¿Por qué elegir OCC?</h2>
            <ul>
              <li>Amplia base de datos de candidatos.</li>
              <li>Proceso ágil y personalizado.</li>
              <li>Soporte especializado en reclutamiento.</li>
              <li>Más de 1000 empresas confían en nosotros.</li>
            </ul>
          </div>
        </motion.section>

        {/* Title */}
        <motion.h2
          className="text-start mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          ¿Qué deseas hacer?
        </motion.h2>

        {/* Buttons */}
        <section className="row g-4 mb-5 justify-content-center">
          {options.map(({ title, btn, opt, path }) => (
            <motion.div key={opt} className="col-12 col-md-4" variants={itemVariants} whileHover="hover">
              <motion.div className="card h-100 shadow-sm bg-dark bg-opacity-50 text-white" variants={itemVariants}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{title}</h5>
                  <button
                    type="button"
                    className="btn btn-primary mt-auto text-white"
                    onClick={() => handleClick(opt, path)}
                  >
                    {btn}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </section>

        {/* Desktop Why OCC */}
        <motion.section
          className="row mb-5 d-none d-md-flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="col-md-4 offset-md-8">
            <h2 className="h4 mb-3">¿Por qué elegir OCC?</h2>
            <ul>
              <li>Amplia base de datos de candidatos.</li>
              <li>Proceso ágil y personalizado.</li>
              <li>Soporte especializado en reclutamiento.</li>
              <li>Más de 1000 empresas confían en nosotros.</li>
            </ul>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="text-center py-4 border-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </motion.footer>
      </motion.main>
    </motion.div>
  );
}
