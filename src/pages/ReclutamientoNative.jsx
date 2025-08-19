import { useEffect } from "react";
import './ReclutamientoNative.css';
import '../index.css';

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
      {/* Header con logo */}
      <header className="RN__bar">
        <img src="/occ1.png" alt="OCC" className="RN__logo" />
      </header>

      <main className="RN__container">
        <div className="RN__grid">
          {/* Columna izquierda */}
          <section className="RN__left">
            <h1>Publicar tus vacantes nunca fue tan fácil…</h1>

            {/* Bullets con título + descripción */}
            <ul className="RN__benefitsList">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 6h15l-1.5 9h-13z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="20" r="1.5"/>
                  <circle cx="18" cy="20" r="1.5"/>
                </svg>
                <div>
                  <strong>Compra de vacantes</strong>
                  <p>Adquiere paquetes flexibles y publica en la bolsa de empleo líder en México.</p>
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l4 4-4 4-4-4zM2 12h20M12 22l-4-4 4-4 4 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>Compra especializada</strong>
                  <p>Soluciones diseñadas a la medida para cubrir perfiles estratégicos y posiciones clave.</p>
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                <div>
                  <strong>Seguimiento</strong>
                  <p>Monitorea y optimiza el desempeño de tus vacantes con reportes claros y efectivos.</p>
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <polyline points="6 14 10 10 14 13 18 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="6" cy="14" r="1" fill="currentColor"/>
  <circle cx="10" cy="10" r="1" fill="currentColor"/>
  <circle cx="14" cy="13" r="1" fill="currentColor"/>
  <circle cx="18" cy="8" r="1" fill="currentColor"/>
</svg>


                <div>
                  <strong>Capacitación personalizada</strong>
                  <p>Accede a asesoría y entrenamientos especializados para tu equipo de reclutamiento.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Columna derecha */}
          <div className="RN__right">
            <h1 className="RN__mobileTitle">Publicar tus vacantes nunca fue tan fácil…</h1>
            <h2 className="RN__titleOutside">¡Cotiza tu paquete de vacantes!</h2>
            <section className="RN__card">
              <div id="hubspot-form"></div>
            </section>
          </div>
        </div>

        {/* Bullets versión mobile */}
        <section className="RN__benefitsList--mobile">
          <ul>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 6h15l-1.5 9h-13z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1.5"/>
                <circle cx="18" cy="20" r="1.5"/>
              </svg>
              <div>
                <strong>Compra de vacantes</strong>
                <p>Adquiere paquetes flexibles y publica en la bolsa de empleo líder en México.</p>
              </div>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l4 4-4 4-4-4zM2 12h20M12 22l-4-4 4-4 4 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <strong>Compra especializada</strong>
                <p>Soluciones diseñadas a la medida para cubrir perfiles estratégicos y posiciones clave.</p>
              </div>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

              <div>
                <strong>Seguimiento</strong>
                <p>Monitorea y optimiza el desempeño de tus vacantes con reportes claros y efectivos.</p>
              </div>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <polyline points="6 14 10 10 14 13 18 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="6" cy="14" r="1" fill="currentColor"/>
  <circle cx="10" cy="10" r="1" fill="currentColor"/>
  <circle cx="14" cy="13" r="1" fill="currentColor"/>
  <circle cx="18" cy="8" r="1" fill="currentColor"/>
</svg>


              <div>
                <strong>Capacitación personalizada</strong>
                <p>Accede a asesoría y entrenamientos especializados para tu equipo de reclutamiento.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Carrusel Logos */}
        <div className="logos-section mt-5">
          <h3 className="mb-3">Marcas que confían en nosotros</h3>
          <div className="logo-carousel">
            <div className="logo-track">
              {[bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson, amazon,
                bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson, amazon].map((logoSrc, idx) => (
                <img key={idx} src={logoSrc} alt="Logo" className="logo-item uniform-logo" />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-5 text-center">
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </footer>
      </main>
    </div>
  );
}
