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
              {/* … tus <li> se mantienen igual … */}
            </ul>
          </section>

          {/* Columna derecha */}
          <div className="RN__right">
            <h2 className="RN__titleOutside">¡Cotiza tu paquete de vacantes!</h2>

            <section className="RN__card">
              {/* Aquí se renderiza el form de HubSpot */}
              <div id="hubspot-form"></div>
            </section>
          </div>
        </div>

        {/* Carrusel Logos */}
        <div className="logos-section mt-5">
          <h3 className="mb-3">Marcas que confían en nosotros</h3>
          <div className="logo-carousel">
            <div className="logo-track">
              {[amazon, bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson,
                amazon, bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson].map((logoSrc, idx) => (
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
