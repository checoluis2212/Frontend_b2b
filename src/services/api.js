// src/services/api.js

// 🔹 URL Base de la API
// En desarrollo (archivo .env.local):
// VITE_API_URL=http://localhost:3001
//
// En producción (Vercel):
// VITE_API_URL=https://backend-b2b.onrender.com

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.warn("⚠️ [API] VITE_API_URL no está definida. Usando dominio actual como fallback.");
}

/**
 * 🔹 Helper para construir URLs
 */
function buildUrl(path) {
  return `${API_BASE || ''}${path}`;
}

/**
 * 🔹 Enviar respuesta (POST /api/responses)
 * @param {Object} payload - Datos a enviar
 * @returns {Promise<Object>}
 */
export async function sendResponse(payload) {
  const url = buildUrl('/api/responses');

  console.log("📤 [sendResponse] URL:", url);
  console.log("📦 [sendResponse] Payload:", payload);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ [sendResponse] Error ${res.status}: ${text}`);
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("✅ [sendResponse] Respuesta:", data);
    return data;
  } catch (err) {
    console.error("🔥 [sendResponse] Falló la petición:", err);
    throw err;
  }
}

/**
 * 🔹 Obtener todas las respuestas (GET /api/responses/all)
 * @returns {Promise<Array>}
 */
export async function getResponses() {
  const url = buildUrl('/api/responses/all');

  console.log("📥 [getResponses] URL:", url);

  try {
    const res = await fetch(url);

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

/**
 * 🔹 Ejemplo extra: Obtener respuesta por ID (GET /api/responses/:id)
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getResponseById(id) {
  const url = buildUrl(`/api/responses/${id}`);

  console.log(`📥 [getResponseById] URL: ${url}`);

  try {
    const res = await fetch(url);

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

/**
 * 🔹 Ejemplo extra: Eliminar respuesta por ID (DELETE /api/responses/:id)
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function deleteResponse(id) {
  const url = buildUrl(`/api/responses/${id}`);

  console.log(`🗑️ [deleteResponse] URL: ${url}`);

  try {
    const res = await fetch(url, { method: "DELETE" });

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
