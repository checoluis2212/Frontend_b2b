// src/utils/formatDate.js
export function formatDate24(dateString) {
  const date = new Date(dateString);
  // toLocaleString sin timeZone forzará el uso de la zona del navegador
  return date.toLocaleString('es-MX', {
    day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
