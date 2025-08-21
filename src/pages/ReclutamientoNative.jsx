// ReclutamientoNative.jsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './ReclutamientoNative.css';
import '../index.css';
import { trackAndGo_PruebaGratis, trackGA4Click } from '../utils/ga4.js';

import amazon from '../assets/amazon.png';
import bbva from '../assets/bbva.png';
import dhl from '../assets/dhl.png';
import netflix from '../assets/netflix.png';
import Walmart from '../assets/Walmart.png';
import salinas from '../assets/salinas.png';
import palacio from '../assets/palacio.png';
import thomson from '../assets/thomson.png';
import lala from '../assets/lala.png';

const getUTMs = () => {
  const q = new URLSearchParams(window.location.search);
  return {
    utm_source:   q.get('utm_source')   || '',
    utm_medium:   q.get('utm_medium')   || '',
    utm_campaign: q.get('utm_campaign') || '',
    utm_content:  q.get('utm_content')  || '',
    utm_term:     q.get('utm_term')     || '',
  };
};

function ConfirmLeaveModal({ open, onClose, onConfirm }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    setTimeout(() => panelRef.current?.querySelector("button")?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="m-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={panelRef}
            className="m-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title" className="m-title">¿Quieres ir a buscar trabajo?</h2>
            <p className="m-text">
              Te llevaremos a la página de búsqueda de empleo. Esta acción te sacará de la página de empresas.
            </p>
            <div className="m-actions">
              <button className="btn-primary" onClick={onConfirm}>Sí, llévame</button>
              <button className="btn-ghost" onClick={onClose}>No, quedarme aquí</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ReclutamientoNative() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let loaded = false;
    const loadHubspot = () => {
      if (loaded) return;
      loaded = true;

      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (!window.hbspt) return;

        const getCookie = (k) =>
          decodeURIComponent(
            ((document.cookie.split("; ").find(r => r.startsWith(k + "=")) || "").split("=")[1]) || ""
          );

        const fillHiddenFields = ($form) => {
          const root = $form?.get ? $form.get(0) : $form;
          const setVal = (name, val) => {
            const input = root.querySelector(`input[name="${name}"]`);
            if (input && val && !input.value) {
              input.value = val;
              input.dispatchEvent(new Event("input", { bubbles: true }));
              input.dispatchEvent(new Event("change", { bubbles: true }));
            }
          };

          const vid =
            getCookie("vid") ||
            localStorage.getItem("visitorId") ||
            "";

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
          onFormSubmit: ($form) => {
            try {
              const root = $form?.get ? $form.get(0) : $form;
              const payload = {};
              root.querySelectorAll('input, textarea, select').forEach(el => {
                if (el.name) payload[el.name] = el.value;
              });

              payload.visitorId    = localStorage.getItem('visitorId') || '';
              payload.vid_cookie   = getCookie('vid') || '';
              payload.utm_source   = getCookie('utm_source') || '';
              payload.utm_medium   = getCookie('utm_medium') || '';
              payload.utm_campaign = getCookie('utm_campaign') || '';
              payload.page         = window.location.href;
              payload.referrer     = document.referrer || '';
              payload.form_id      = 'hubspot_embed';

              trackGA4Click('lead_form_submit', {
                placement: 'hubspot_embed',
                params: { form_id: 'hubspot_embed' },
                newTab: false,
                timeoutMs: 200,
              });

              fetch('https://backend-b2b-a3up.onrender.com/api/lead', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
              })
                .then(r => r.ok ? r.json() : Promise.reject(r.status))
                .then(d => {
                  console.log('[mirror /api/lead OK]', d);
                  trackGA4Click('lead_mirror_sent', {
                    placement: 'hubspot_embed',
                    params: {
                      form_id: 'hubspot_embed',
                      mirror_status: 'ok'
                    },
                    newTab: false,
                    timeoutMs: 200,
                  });
                })
                .catch(e => {
                  console.warn('[mirror /api/lead ERR]', e);
                  trackGA4Click('lead_mirror_error', {
                    placement: 'hubspot_embed',
                    params: {
                      form_id: 'hubspot_embed',
                      mirror_status: 'error'
                    },
                    newTab: false,
                    timeoutMs: 200,
                  });
                });
            } catch (e) {
              console.warn('mirror /api/lead failed:', e);
            }
          }
        });
      };

      document.body.appendChild(script);
    };

    const target = document.querySelector('#hubspot-form');
    if (target && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadHubspot();
              io.disconnect();
            }
          });
        },
        { root: null, rootMargin: '200px', threshold: 0 }
      );
      io.observe(target);

      const fallback = setTimeout(() => {
        loadHubspot();
        io.disconnect();
      }, 7000);

      return () => {
        io.disconnect();
        clearTimeout(fallback);
      };
    } else {
      loadHubspot();
    }
  }, []);

  const handleConfirm = () => {
    const base = 'https://www.occ.com.mx/empleos';
    const utm = new URLSearchParams(window.location.search).toString();
    const url = utm ? `${base}?${utm}` : base;
    window.location.href = url;
  };

  return (
    <div className="RN__wrap">
      <header className="RN__bar">
        <div className="RN__barContainer">
          <div className="RN__barLeft">
            <img
              src="/occ1.png"
              alt="OCC"
              className="RN__logo"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </div>
          <div className="RN__barRight">
            <button
              type="button"
              className="RN__jobLink"
              onClick={() => setOpenModal(true)}
              aria-haspopup="dialog"
            >
              Estoy buscando trabajo
            </button>
          </div>
        </div>
      </header>

      <main className="RN__container">
        <div className="RN__grid">
          <section className="RN__left">
            <h1>Publicar tus vacantes nunca fue tan fácil…</h1>
            <ul className="RN__benefitsList">
              <li> ... aquí van tus bullets ... </li>
            </ul>
          </section>

          <div className="RN__right">
            <h1 className="RN__mobileTitle">Publicar tus vacantes nunca fue tan fácil…</h1>
            <section className="RN__promoHeader">
              <h3>Prueba OCC Empresas gratis</h3>
              <p>Sin compromiso y sin necesidad de tarjeta de crédito.</p>
              <button
                type="button"
                className="RN__promoBtn"
                onClick={() => {
                  const url = 'https://scrappy.occ.com.mx/api/create?utm_source=bing&utm_medium=cpc&utm_campaign=short-lp';
                  const payload = {
                    visitorId:  localStorage.getItem('visitorId') || '',
                    page:       window.location.href,
                    referrer:   document.referrer || '',
                    placement:  'promo_header',
                    eventName:  'cta_prueba_gratis_click',
                  };
                  fetch('https://backend-b2b-a3up.onrender.com/api/click', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  })
                    .catch(() => {}) 
                    .finally(() => { window.location.href = url; });
                }}
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

        <section className="RN__benefitsList--mobile">
          <ul>
            <li> ... versión mobile ... </li>
          </ul>
        </section>

        <div className="logos-section mt-5">
          <h3 className="mb-3">Marcas que confían en nosotros</h3>
          <div className="logo-carousel">
            <div className="logo-track">
              {[bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson, amazon,
                bbva, dhl, netflix, palacio, Walmart, lala, salinas, thomson, amazon].map((logoSrc, idx) => (
                <img
                  key={idx}
                  src={logoSrc}
                  alt="Logo"
                  className="logo-item uniform-logo"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  sizes="(max-width: 768px) 120px, 160px"
                />
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-5 text-center">
          <small>© {new Date().getFullYear()} OCC. Todos los derechos reservados.</small>
        </footer>
      </main>

      <ConfirmLeaveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
