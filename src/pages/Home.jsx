import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendResponse } from '../services/api';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import bg from '../assets/background.jpg';

export default function Home() {
  const navigate = useNavigate();
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        console.log('⭐ visitorId:', visitorId);
        setVisitorId(visitorId);
        localStorage.setItem('visitorId', visitorId);
      } catch (err) {
        console.error('Error FingerprintJS:', err);
      }
    })();
  }, []);

  const options = [
    { title: 'Cotizar >10 vacantes', btn: 'Cotizar ahora',    opt: 'cotizar',       path: '/cotizar' },
    { title: 'Publicar mi 1ª vacante', btn: 'Publicar ya',      opt: 'publicar',      path: '/publicar' },
    { title: 'Buscando empleo',        btn: 'Ver oportunidades',opt: 'oportunidades',  path: '/buscando' },
  ];

  const handleClick = async (opt, path) => {
    console.log('🔘 Click en', opt, 'visitorId:', visitorId);
    if (!visitorId) return console.warn('Esperando visitorId…');
    try {
      await sendResponse({
        visitorId,
        button:     opt,
        currentUrl: window.location.href,
      });
      console.log('✅ Datos enviados');
    } catch (err) {
      console.error('❌ Error envío:', err);
    }
    navigate(path);
  };

  const container = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.2}} };
  const item      = { hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{type:'spring',stiffness:100}},hover:{scale:1.05} };

  return (
    <motion.div style={{ background:`url(${bg}) center/cover`, minHeight:'100vh' }} variants={container} initial="hidden" animate="visible" className="text-white">
      {/* header… */}
      <motion.main className="container py-5">
        <motion.h2 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.4}}>¿Qué deseas hacer?</motion.h2>
        <div className="row g-4 mb-5 justify-content-center">
          {options.map(o=>(
            <motion.div key={o.opt} className="col-12 col-md-4" variants={item} whileHover="hover">
              <div className="card h-100 bg-dark bg-opacity-50 text-white">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{o.title}</h5>
                  <button type="button" className="btn btn-primary mt-auto" onClick={()=>handleClick(o.opt,o.path)}>
                    {o.btn}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </motion.div>
  );
}
