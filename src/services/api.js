// src/services/api.js

// Base URL de la API, lee de la variable de entorno VITE_API_URL o usa localhost en dev
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Crea un nuevo estudio: sube datos + CV + arranca Checkout
 * @param {{ nombreCandidato: string, ciudad: string, puesto: string, clientId?: string, cac?: number }} payload
 * @returns {Promise<{ ok: boolean, docId: string, cvUrl: string, checkoutUrl: string }>}
 */
export async function createEstudio(payload) {
  const endpoint = `${API_BASE}/api/estudios`;
  console.log('🌐 [createEstudio]', endpoint, payload);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('❌ [createEstudio] Error:', res.status, text);
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}

/**
 * Obtiene todos los estudios (si implementas GET /api/estudios)
 * @returns {Promise<any[]>}
 */
export async function getEstudios() {
  const endpoint = `${API_BASE}/api/estudios`;
  console.log('🌐 [getEstudios]', endpoint);

  const res = await fetch(endpoint);
  if (!res.ok) {
    const text = await res.text();
    console.error('❌ [getEstudios] Error:', res.status, text);
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}
