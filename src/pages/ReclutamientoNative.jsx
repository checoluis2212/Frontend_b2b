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
      if (!window.hbspt) return;

      // === Helpers para rellenar campos ocultos ===
      const getCookie = (k) =>
        decodeURIComponent(
          ((document.cookie.split("; ").find(r => r.startsWith(k + "=")) || "").split("=")[1]) || ""
        );

      const fillHiddenFields = ($form) => {
        const root = $form?.get ? $form.get(0) : $form; // <-- DOM node real del iframe

        const setVal = (name, val) => {
          const input = root.querySelector(`input[name="${name}"]`);
          if (input && val && !input.value) {
            input.value = val;
            // notifica al iframe de HS
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        };

        // Usa exactamente los INTERNAL NAMES del form
        const vid =
          getCookie("vid") ||               // si la guardaste como cookie
          localStorage.getItem("visitorId") // o desde tu localStorage
          || "";

        setVal("visitorid", vid);
        setVal("utm_source", getCookie("utm_source"));
        setVal("utm_medium", getCookie("utm_medium"));
        setVal("utm_campaign", getCookie("utm_campaign"));
      };

      window.hbspt.forms.create({
        portalId: "49514148",
        formId: "5f745bfa-8589-40c2-9940-f9081123e0b4",
        region: "na1",
        target: "#hubspot-form",
        onFormReady: ($form) => fillHiddenFields($form),
        onBeforeSubmit: ($form) => fillHiddenFields($form),

        // 👇 NUEVO: espejo del submit hacia tu backend
        onFormSubmit: ($form) => {
          try {
            const root = $form?.get ? $form.get(0) : $form;

            // 1) Recolecta todos los valores del form del iframe
            const payload = {};
            root.querySelectorAll('input, textarea, select').forEach(el => {
              if (el.name) payload[el.name] = el.value;
            });

            // 2) Añade metadatos útiles (VID + UTM + página)
            payload.visitorId    = localStorage.getItem('visitorId') || '';
            payload.vid_cookie   = getCookie('vid') || '';
            payload.utm_source   = getCookie('utm_source') || '';
            payload.utm_medium   = getCookie('utm_medium') || '';
            payload.utm_campaign = getCookie('utm_campaign') || '';
            payload.page         = window.location.href;
            payload.referrer     = document.referrer || '';
            payload.form_id      = 'hubspot_embed';

            // 3) Envía al backend (URL ABSOLUTA a Render)
            fetch('https://backend-b2b-a3up.onrender.com/api/lead', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                // Descomenta si tu server requiere API key:
                // 'x-api-key': 'TU_API_KEY_AQUI'
              },
              body: JSON.stringify(payload)
            })
              .then(r => r.ok ? r.json() : Promise.reject(r.status))
              .then(d => console.log('[mirror /api/lead OK]', d))
              .catch(e => console.warn('[mirror /api/lead ERR]', e));
          } catch (e) {
            console.warn('mirror /api/lead failed:', e);
          }
        }
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="RN__wrap">
      {/* Header con logo */}
      <header className="RN__bar">
        <div className="RN__barContainer">
          <img src="/occ1.png" alt="OCC" className="RN__logo" />
        </div>
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
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>Compra de vacantes</strong>
                  <p>Adquiere paquetes flexibles y publica en la bolsa de empleo líder en México.</p>
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9h3V6a3 3 0 0 1 6 0v3h3a3 3 0 0 1 0 6h-3v3a3 3 0 0 1-6 0v-3H3a3 3 0 0 1 0-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>Compra especializada</strong>
                  <p>Soluciones diseñadas a la medida para cubrir perfiles estratégicos y posiciones clave.</p>
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
                  <strong>Seguimiento</strong>
                  <p>Monitorea y optimiza el desempeño de tus vacantes con reportes claros y efectivos.</p>
                </div>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            <section className="RN__promoHeader">
              <h3>Prueba OCC Empresas gratis</h3>
              <p>Sin compromiso y sin necesidad de tarjeta de crédito.</p>
            <button
              type="button"
              className="RN__promoBtn"
              onClick={handlePromoClick}
              aria-label="Empieza gratis"
                >
              Empieza gratis
              </button>
            </section> 
            <div className="RN__divider">
              <span>o</span>
            </div>
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
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <strong>Compra de vacantes</strong>
                <p>Adquiere paquetes flexibles y publica en la bolsa de empleo líder en México.</p>
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
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="RN__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
