import { useEffect } from "react";
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

// === NUEVO: helper para leer UTMs de la URL ===
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

export default function ReclutamientoNative() {
  useEffect(() => {
    // ===== LAZY LOAD HUBSPOT (se carga solo cuando #hubspot-form es visible) =====
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

          // 👇 Espejo del submit hacia tu backend
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

              // 🔔 Evento GA4: intento de envío del formulario (frontend)
              trackGA4Click('lead_form_submit', {
                placement: 'hubspot_embed',
                params: { form_id: 'hubspot_embed' },
                newTab: false,
                timeoutMs: 200,
              });

              // 3) Envía al backend (URL ABSOLUTA a Render)
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
                  // 🔔 Evento GA4: espejo al backend exitoso
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
                  // 🔔 Evento GA4: espejo falló
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
