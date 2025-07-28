// src/services/api.js

// Base URL de la API: en producción Vercel injecta VITE_API_URL, en local cae a localhost:3001
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

// Opcional: helper para obtener respuestas en React
export async function getResponses() {
  const endpoint = `${API_BASE}/api/responses`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Error al obtener respuestas: ${res.status}`);
  return res.json();
}
