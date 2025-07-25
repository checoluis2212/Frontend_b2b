const API_BASE = import.meta.env.VITE_API_URL || '';  

export async function sendResponse(payload) {
  const res = await fetch(`${API_BASE}/api/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al enviar respuesta: ${res.status} ${text}`);
  }
  return res.json();
}
