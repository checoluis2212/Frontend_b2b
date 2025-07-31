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

  // 1) Capturar UTM una sola vez
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

  // 2) Generar visitorId
  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
      localStorage.setItem('visitorId', visitorId);
    })();
  }, []);

  // Opciones con estilo y microcopy optimizado
  const options = [
    { title: 'Solicitar Cotización', key: 'cotizar', style: 'btn-primary', url: 'https://reclutamiento.occ.com.mx/contactanos' },
    { title: 'Publicar Vacante', key: 'publicar', style: 'btn-outline-light', url: 'https://www.occ.com.mx/empresas/inicia-sesion/crear-cuenta' },
    { title: 'Buscar Empleo', key: 'empleo', style: 'btn-outline-light', url: 'https://www.occ.com.mx/' }
  ];

  // 3) Manejo de clics
  const handleClick = async (option) => {
    if (!visitorId) return;
    const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');
    await sendResponse({ visitorId, button: option.key, utmParams });
    window.location.href = option.url;
  };

  // Animaciones
  const container = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.2}} };
  const item      = { hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{type:'spring',stiffness:100}}, hover:{scale:1.05} };

  return (
    <motion.div
      className="text-white"
      style={{
        backgroundImage:`linear-gradient(rgba(0,0,40,0.7), rgba(0,0,40,0.7)), url(${bg})`,
        backgroundSize:'cover', backgroundPosition:'center', minHeight:'100vh'
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="py-4 text-center" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
        <motion.img src={logo} alt="OCC B2B" style={{height:'100px'}} />
        <p className="mt-2 fs-6">
          Sin importar el tamaño, sector o ubicación de tu empresa,<br/>
          estamos listos para ayudarte a crecer.
        </p>
      </motion.header>

      <motion.main className="container py-5 text-center">
        <motion.h2 className="mb-4" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
          ¿Qué deseas hacer?
        </motion.h2>

        <section className="row g-3 mb-4 justify-content-center">
          {options.map(option => (
            <motion.div key={option.key} className="col-12 col-md-4" variants={item} whileHover="hover">
              <button
                className={`btn ${option.style} w-100 py-3`}
                onClick={() => handleClick(option)}
              >
                {option.title}
              </button>
            </motion.div>
          ))}
        </section>

        <motion.section className="mt-5" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
          <h3 className="mb-3">¿Por qué elegir OCC?</h3>
          <ul className="list-unstyled beneficios-list">
            <li><i className="bi bi-check-circle-fill"></i><span>Amplia base de candidatos y empleos</span></li>
            <li><i className="bi bi-check-circle-fill"></i><span>Proceso ágil y personalizado</span></li>
           <li><i className="bi bi-check-circle-fill"></i><span>Soporte especializado en reclutamiento</span></li>
           <li><i className="bi bi-check-circle-fill"></i><span>Más de 1000 empresas confían en nosotros</span></li>
        </ul>
        </motion.section>

        <motion.footer className="mt-5" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </motion.footer>
      </motion.main>
    </motion.div>
  );
}
