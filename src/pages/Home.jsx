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

  // 1) Capturar UTM SOLO la primera vez
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

  // 2) Generar y guardar visitorId
  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
      localStorage.setItem('visitorId', visitorId);
    })();
  }, []);

  const options = [
    { title: 'Cotizar Más de 10 vacantes',  btn: 'Cotizar ahora',    opt: 'cotizar',      path: '/cotizar' },
    { title: 'Publicar Mi Primera Vacante', btn: 'Publicar ya',      opt: 'publicar',     path: '/publicar' },
    { title: 'Estoy Buscando Empleo',       btn: 'Ver oportunidades',opt: 'oportunidades',path: '/buscando' },
  ];

  // 3) Envío de clics
  const handleClick = async (buttonKey, path) => {
    if (!visitorId) return;
    const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');
    await sendResponse({ visitorId, button: buttonKey, utmParams });
    navigate(path);
  };

  // Animaciones
  const container = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.2}} };
  const item      = { hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{type:'spring',stiffness:100}}, hover:{scale:1.05} };

  return (
    <motion.div
      className="text-white"
      style={{ backgroundImage:`url(${bg})`, backgroundSize:'cover', backgroundPosition:'center', minHeight:'100vh' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="py-4 mb-5 text-white" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
        <div className="container d-flex align-items-center">
          <motion.img src={logo} alt="OCC B2B" style={{height:'120px'}} className="me-3" initial={{scale:0.8}} animate={{scale:1}} transition={{type:'spring',stiffness:120}} />
          <div className="ms-auto w-50 d-none d-md-block">
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="fs-6 text-end mb-0">
              Sin importar el tamaño, sector o ubicación de tu empresa,<br/>
              estamos listos para ayudarte a crecer.
            </motion.p>
          </div>
        </div>
      </motion.header>

      <motion.main className="container d-flex flex-column py-5">
        <motion.section className="row mb-5 d-block d-md-none" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
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

        <motion.h2 className="text-start mb-4" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.4}}>
          ¿Qué deseas hacer?
        </motion.h2>

        <section className="row g-4 mb-5 justify-content-center">
          {options.map(({ title, btn, opt, path }) => (
            <motion.div key={opt} className="col-12 col-md-4" variants={item} whileHover="hover">
              <motion.div className="card h-100 shadow-sm bg-dark bg-opacity-50 text-white" variants={item}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{title}</h5>
                  <button type="button" className="btn btn-primary mt-auto" onClick={() => handleClick(opt, path)}>
                    {btn}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </section>

        <motion.section className="row mb-5 d-none d-md-flex" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}>
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

        <hr className="my-4" />

        <motion.footer className="text-center py-4 border-top" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </motion.footer>
      </motion.main>
    </motion.div>
  );
}
