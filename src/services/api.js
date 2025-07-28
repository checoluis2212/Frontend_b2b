// src/services/api.js

// Base URL de la API (inyectada por Vite en producción o localhost en dev)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Envía un clic de botón al backend
 */
export async function sendResponse(payload) {
  const endpoint = `${API_BASE}/api/responses`;
  console.log('🔔 Enviando al backend a:', endpoint, payload);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('❌ Error del backend:', res.status, text);
    throw new Error(`Error al enviar respuesta: ${res.status} ${text}`);
  }

  return res.json();
}

/**
 * Obtiene todas las respuestas guardadas
 */
export async function getResponses() {
  const endpoint = `${API_BASE}/api/responses/all`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    const text = await res.text();
    console.error('❌ Error al obtener respuestas:', res.status, text);
    throw new Error(`Error al obtener respuestas: ${res.status}`);
  }
  return res.json();
}
