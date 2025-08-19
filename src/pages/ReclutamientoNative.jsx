import { useEffect } from "react";
import './ReclutamientoNative.css';

import amazon from '../assets/amazon.png';
import bbva from '../assets/bbva.png';
import dhl from '../assets/dhl.png';
import netflix from '../assets/netflix.png';
import Walmart from '../assets/Walmart.png';
import salinas from '../assets/salinas.png';
import palacio from '../assets/palacio.png';
import thomson from '../assets/thomson.png';
import lala from '../assets/lala.png';

export default function ReclutamientoNative() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "49514148",
          formId: "5f745bfa-8589-40c2-9940-f9081123e0b4",
          region: "na1",
          target: "#hubspot-form"
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="RN__wrap">
      <header className="RN__bar">
        <img src="/occ1.png" alt="OCC" className="RN__logo" />
      </header>

      <main className="RN__container">
        <div className="RN__grid">
          {/* Izquierda: título + bullets desktop */}
          <div className="RN__left">
            <h1>Publicar tus vacantes nunca fue tan fácil…</h1>
            <ul className="RN__benefitsList">
              {bullets.map((item, idx) => (
                <li key={idx}>
                  {item.icon}
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Derecha: formulario */}
          <div className="RN__right">
            <h2 className="RN__titleOutside">¡Cotiza tu paquete de vacantes!</h2>
            <p>Recibe una cotización ajustada a tus necesidades. Un ejecutivo te guiará en el proceso.</p>
            <section className="RN__card">
              <div id="hubspot-form"></div>
            </section>
          </div>
        </div>

        {/* Bullets mobile */}
        <section className="RN__benefitsList--mobile">
          <ul>
            {bullets.map((item, idx) => (
              <li key={idx}>
                {item.icon}
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Carrusel */}
        <div className="logos-section mt-5">
          <h3 className="mb-3">Marcas que confían en nosotros</h3>
          <div className="logo-carousel">
            <div className="logo-track">
              {[bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson, amazon].map((logo, i) => (
                <img key={i} src={logo} alt="Logo" className="logo-item uniform-logo" />
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-5 text-center">
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </footer>
      </main>
    </div>
  );
}

const bullets = [
  {
    title: "Compra de vacantes",
    text: "Adquiere paquetes flexibles y publica en la bolsa de empleo líder en México.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path d="M6 6h15l-1.5 9h-13z" strokeWidth="2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
      </svg>
    )
  },
  {
    title: "Compra especializada",
    text: "Soluciones diseñadas a la medida para cubrir perfiles estratégicos y posiciones clave.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path d="M12 2l4 4-4 4-4-4zM2 12h20M12 22l-4-4 4-4 4 4z" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "Seguimiento",
    text: "Monitorea y optimiza el desempeño de tus vacantes con reportes claros y efectivos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path d="M3 12l2-2 4 4 10-10 2 2-12 12z" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "Capacitación personalizada",
    text: "Accede a asesoría y entrenamientos especializados para tu equipo de reclutamiento.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" strokeWidth="2" />
        <path d="M12 14v7" strokeWidth="2" />
        <path d="M5 19h14" strokeWidth="2" />
      </svg>
    )
  }
];
