import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactoB2B() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // visitorId desde tu implementación actual
  const visitorId = useMemo(() => localStorage.getItem('visitorId') || null, []);
  // UTM desde URL
  const utm = useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    return {
      source: p.get('utm_source') || null,
      medium: p.get('utm_medium') || null,
      campaign: p.get('utm_campaign') || null,
      term: p.get('utm_term') || null,
      content: p.get('utm_content') || null,
    };
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      visitorId,
      nombre: form.get('nombre').trim(),
      email: form.get('email').trim(),
      telefono: form.get('telefono').trim(),
      empresa: form.get('empresa').trim(),
      mensaje: form.get('mensaje').trim(),
      utm,
      page: {
        uri: window.location.href,
        name: document.title
      }
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || 'Error al enviar');

      setMsg({ type: 'success', text: '¡Gracias! Recibimos tu solicitud.' });
      e.currentTarget.reset();
      // navega o muestra success UX si quieres
      // navigate('/gracias');
    } catch (err) {
      setMsg({ type: 'danger', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5" style={{maxWidth: 800}}>
      {/* Hero / encabezado simple con UX tipo tu landing */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Solicita asesoría para publicar vacantes</h1>
        <p className="text-muted mb-0">
          Déjanos tus datos y te contactamos en minutos.
        </p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          {msg && (
            <div className={`alert alert-${msg.type} mb-4`} role="alert">
              {msg.text}
            </div>
          )}

          <form onSubmit={onSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre completo</label>
                <input name="nombre" type="text" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Empresa</label>
                <input name="empresa" type="text" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Correo</label>
                <input name="email" type="email" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input name="telefono" type="tel" pattern="[0-9\s+()-]{8,}" className="form-control" required />
              </div>
              <div className="col-12">
                <label className="form-label">¿Qué necesitas?</label>
                <textarea name="mensaje" rows="4" className="form-control" required />
              </div>
              <div className="col-12 d-flex align-items-center">
                <input id="consent" type="checkbox" className="form-check-input me-2" required />
                <label htmlFor="consent" className="form-check-label">
                  Acepto ser contactado y el tratamiento de mis datos.
                </label>
              </div>
              <div className="col-12 d-grid d-md-flex gap-2 mt-2">
                <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar solicitud'}
                </button>
                <button type="reset" className="btn btn-outline-secondary" disabled={loading}>
                  Limpiar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Pie con marcas / confianza si quieres replicar tu UX */}
      <div className="text-center text-muted small mt-3">
        Operamos de L–V 9:00–18:00. Respuesta en menos de 1 hora.
      </div>
    </div>
  );
}
