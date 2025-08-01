const API_BASE = import.meta.env.VITE_API_URL || '';

export async function sendResponse(payload) {
  const endpoint = `${API_BASE}/api/responses`;
  console.log('🌐 [sendResponse] endpoint →', endpoint, payload);

  const res = await fetch(endpoint, {
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
  const endpoint = `${API_BASE}/api/responses/all`;
  console.log('🌐 [getResponses] endpoint →', endpoint);

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
