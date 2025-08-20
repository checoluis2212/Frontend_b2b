// src/utils/ga4.js

// === CONFIG ===
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX"; // <-- tu ID GA4 (empieza con G-)
const GA4_API_SECRET = "YOUR_API_SECRET";  // <-- tu API Secret de GA4
const GA4_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

// === Helper para obtener clientId / sessionId ===
function getOrCreateClientId() {
  const key = "_ga4_cid";
  let cid = localStorage.getItem(key);
  if (!cid) {
    cid = crypto.randomUUID();
    localStorage.setItem(key, cid);
  }
  return cid;
}

// === TRACKER PRINCIPAL ===
export async function trackGA4Click(eventName, {
  placement = "",
  params = {},
  newTab = false,
  timeoutMs = 200,
} = {}) {
  try {
    const clientId = getOrCreateClientId();

    const payload = {
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: {
            placement,
            ...params,
            page_location: window.location.href,
            page_referrer: document.referrer || "",
          }
        }
      ]
    };

    // dispara sin bloquear navegación
    navigator.sendBeacon(
      GA4_ENDPOINT,
      JSON.stringify(payload)
    );

    // fallback por si sendBeacon falla
    if (!navigator.sendBeacon) {
      await fetch(GA4_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      });
    }

    // pequeño delay si se va a redirigir
    if (!newTab && timeoutMs) {
      await new Promise(r => setTimeout(r, timeoutMs));
    }
  } catch (err) {
    console.warn("[GA4 track error]", err);
  }
}

// === TRACK + GO (ej: botón de prueba gratis) ===
export async function trackAndGo_PruebaGratis(url, opts = {}) {
  await trackGA4Click("cta_prueba_gratis", opts);
  if (opts.newTab) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
}
