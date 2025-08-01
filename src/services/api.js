// src/services/api.js

// En .env.local (desarrollo):
// VITE_API_URL=http://localhost:3001
//
// En producción (Render):
// VITE_API_URL=https://backend-b2b.onrender.com

// Si no está definida VITE_API_URL, usamos rutas relativas ('')
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function sendResponse(payload) {
  const url = `${API_BASE}/api/responses`;
  // eslint-disable-next-line no-console
  console.log('🌐 [sendResponse] →', url, payload);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function getResponses() {
  const url = `${API_BASE}/api/responses/all`;
  // eslint-disable-next-line no-console
  console.log('🌐 [getResponses] →', url);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}
