const API_BASE = import.meta.env.VITE_API_URL;
const API_KEY  = import.meta.env.VITE_API_KEY;

if (!API_BASE) {
  console.warn("⚠️ [API] VITE_API_URL no está definida.");
}
if (!API_KEY) {
  console.warn("⚠️ [API] VITE_API_KEY no está definida.");
}

function buildUrl(path) {
  return `${API_BASE || ''}${path}`;
}

// 🔹 POST /api/responses
export async function sendResponse(payload) {
  const url = buildUrl('/api/responses');

  // 🔹 Recuperar UTM de localStorage
  const utmParams = JSON.parse(localStorage.getItem('utmParams') || '{}');

  // 🔹 Fusionar payload con UTM
  const fullPayload = {
    ...payload,
    utm_source: utmParams.source || '(not set)',
    utm_medium: utmParams.medium || '(not set)',
    utm_campaign: utmParams.campaign || '(not set)'
  };

  console.time("⏱️ [sendResponse] Tiempo total");
  console.log("📤 [sendResponse] URL:", url);
  console.log("📦 [sendResponse] Payload:", fullPayload);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": API_KEY // 👈 API Key obligatoria
      },
      body: JSON.stringify(fullPayload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ [sendResponse] Error ${res.status}: ${text}`);
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("✅ [sendResponse] Respuesta:", data);
    console.timeEnd("⏱️ [sendResponse] Tiempo total");
    return data;
  } catch (err) {
    console.error("🔥 [sendResponse] Falló la petición:", err);
    console.timeEnd("⏱️ [sendResponse] Tiempo total");
    throw err;
  }
}

// 🔹 GET /api/responses/all
export async function getResponses() {
  const url = buildUrl('/api/responses/all');

  console.log("📥 [getResponses] URL:", url);

  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY // 👈 API Key obligatoria
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ [getResponses] Error ${res.status}: ${text}`);
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("✅ [getResponses] Respuesta:", data);
    return data;
  } catch (err) {
    console.error("🔥 [getResponses] Falló la petición:", err);
    throw err;
  }
}

// 🔹 GET /api/responses/:id
export async function getResponseById(id) {
  const url = buildUrl(`/api/responses/${id}`);

  console.log(`📥 [getResponseById] URL: ${url}`);

  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY // 👈 API Key obligatoria
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ [getResponseById] Error ${res.status}: ${text}`);
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("✅ [getResponseById] Respuesta:", data);
    return data;
  } catch (err) {
    console.error("🔥 [getResponseById] Falló la petición:", err);
    throw err;
  }
}

// 🔹 DELETE /api/responses/:id
export async function deleteResponse(id) {
  const url = buildUrl(`/api/responses/${id}`);

  console.log(`🗑️ [deleteResponse] URL: ${url}`);

  try {
    const res = await fetch(url, { 
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY // 👈 API Key obligatoria
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ [deleteResponse] Error ${res.status}: ${text}`);
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("✅ [deleteResponse] Respuesta:", data);
    return data;
  } catch (err) {
    console.error("🔥 [deleteResponse] Falló la petición:", err);
    throw err;
  }
}
