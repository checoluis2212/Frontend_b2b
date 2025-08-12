// src/pages/ReclutamientoNative.jsx
import { useState, useEffect, useRef } from 'react';

function getCookie(n){
  return decodeURIComponent((document.cookie.split('; ').find(r => r.startsWith(n+'='))||'').split('=')[1]||'');
}
function getLS(k){ try { return localStorage.getItem(k)||''; } catch { return ''; } }

export default function ReclutamientoNative() {
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const formRef = useRef(null);

  // Rellena hidden con visitorid/UTMs como respaldo (tu script global también lo hace)
  useEffect(() => {
    const f = formRef.current;
    if (!f) return;
    const vid = getCookie('vid') || getLS('visitorId') || '';
    const us = getCookie('utm_source')   || getLS('utm_source')   || '';
    const um = getCookie('utm_medium')   || getLS('utm_medium')   || '';
    const uc = getCookie('utm_campaign') || getLS('utm_campaign') || '';

    if (vid) f.visitorid.value = vid;
    if (us) f.utm_source.value = us;
    if (um) f.utm_medium.value = um;
    if (uc) f.utm_campaign.value = uc;
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    setPending(true); setOk(false); setErr('');

    const fd = new FormData(e.currentTarget);
    const fields = Object.fromEntries(fd.entries());

    // payload esperado por /api/lead (backend ya creado)
    const payload = {
      fields,
      context: {
        pageUri: location.href,
        pageName: document.title,
        hutk: getCookie('hubspotutk') // si cargas el tracking de HS
      }
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('HTTP '+res.status);
      setOk(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'hubspot_lead',
        event_id: Date.now()+':'+Math.random().toString(36).slice(2,8),
        form_id: 'native_reclutamiento',
        visitor_id: fields.visitorid || '',
        page_location: location.href,
        page_title: document.title,
        page_referrer: document.referrer || '',
        utm_source: fields.utm_source || '',
        utm_medium: fields.utm_medium || '',
        utm_campaign: fields.utm_campaign || ''
      });
      e.currentTarget.reset();
    } catch (e) {
      setErr('No se pudo enviar. Intenta de nuevo.');
      console.error(e);
    } finally {
      setPending(false);
    }
  }

  return (
    <div style={{background:'#0b1b46', minHeight:'100vh'}}>
      <header style={{background:'#0f4ec7', height:56}}/>
      <main className="container" style={{maxWidth:1180, margin:'0 auto', padding:'32px 16px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:28, alignItems:'center'}}>
          <section style={{color:'#fff', padding:'8px 8px'}}>
            <h1 style={{fontSize:48, lineHeight:1.05, margin:'0 0 16px'}}>Publicar tus vacantes nunca fue tan fácil…</h1>
            <p style={{fontSize:18, opacity:.9, margin:0}}>
              Conoce la forma más eficiente de encontrar al candidato ideal con OCC,
              la bolsa de empleo <strong>#1 en México</strong>
            </p>
          </section>

          <section style={{background:'#fff', borderRadius:24, padding:28, boxShadow:'0 10px 30px rgba(0,0,0,.18)'}}>
            <h2 style={{fontSize:22, margin:'0 0 18px', color:'#0b1b46'}}>¡Cotiza tu paquete de vacantes!</h2>

            {ok && <div style={{background:'#e7f6ee', color:'#1b6b3a', padding:'10px 12px', borderRadius:10, marginBottom:12}}>¡Enviado! Pronto nos pondremos en contacto.</div>}
            {err && <div style={{background:'#fdecea', color:'#b3261e', padding:'10px 12px', borderRadius:10, marginBottom:12}}>{err}</div>}

            <form ref={formRef} onSubmit={handleSubmit} className="hs-lookalike">
              {/* Fila 1 */}
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <div>
                  <label>Nombre*</label>
                  <input name="firstname" required placeholder="Nombre" />
                </div>
                <div>
                  <label>Apellidos*</label>
                  <input name="lastname" required placeholder="Apellidos" />
                </div>
              </div>

              {/* Fila 2 */}
              <div style={{marginTop:12}}>
                <label>Email empresarial*</label>
                <input name="email" type="email" required placeholder="tucorreo@empresa.com" />
              </div>

              {/* Fila 3 */}
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
                <div>
                  <label>Número de teléfono*</label>
                  <input name="phone" required placeholder="+52 ..." />
                </div>
                <div>
                  <label>Nombre de la empresa*</label>
                  <input name="company" required placeholder="Empresa" />
                </div>
              </div>

              {/* Fila 4 */}
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
                <div>
                  <label>Puesto*</label>
                  <select name="puesto" required defaultValue="">
                    <option value="" disabled>Selecciona</option>
                    <option>Director General</option>
                    <option>Recursos Humanos</option>
                    <option>Reclutador</option>
                    <option>Compras</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label>Número de vacantes anuales*</label>
                  <select name="vacantes_anuales" required defaultValue="">
                    <option value="" disabled>Selecciona</option>
                    <option>1</option>
                    <option>2 a 4</option>
                    <option>5 a 10</option>
                    <option>11 a 50</option>
                    <option>50+</option>
                  </select>
                </div>
              </div>

              {/* Fila 5 */}
              <div style={{marginTop:12}}>
                <label>RFC*</label>
                <input name="rfc" required placeholder="RFC de la empresa" />
              </div>

              {/* Consent opcional (GDPR) */}
              <div style={{marginTop:14, display:'flex', gap:8, alignItems:'flex-start', color:'#334155', fontSize:13}}>
                <input type="checkbox" id="consent" name="consent_marketing" value="1" />
                <label htmlFor="consent">Acepto recibir otras comunicaciones de OCC.</label>
              </div>

              {/* Hidden para tracking */}
              <input type="hidden" name="visitorid" />
              <input type="hidden" name="utm_source" />
              <input type="hidden" name="utm_medium" />
              <input type="hidden" name="utm_campaign" />

              <button disabled={pending}
                style={{
                  marginTop:18, width:'100%', height:52, borderRadius:999,
                  background:'#0f4ec7', color:'#fff', fontSize:18, border:'none', cursor:'pointer',
                  opacity: pending ? .7 : 1
                }}>
                {pending ? 'Enviando…' : 'Enviar'}
              </button>

              <p style={{marginTop:10, fontSize:11, color:'#6b7280'}}>
                Al dar clic en “Enviar” declaro haber leído y aceptado los Términos y Condiciones,
                así como el Aviso de Privacidad.
              </p>
            </form>
          </section>
        </div>
      </main>

      {/* estilos básicos de inputs para que luzcan como HS */}
      <style>{`
        .hs-lookalike label { display:block; font-size:14px; color:#0b1b46; margin:0 0 6px; }
        .hs-lookalike input, .hs-lookalike select, .hs-lookalike textarea {
          width:100%; height:44px; padding:10px 14px; border-radius:999px;
          border:1px solid #d1d5db; background:#f1f5f9; outline:none;
        }
        .hs-lookalike textarea { height:88px; border-radius:16px; resize:vertical; }
        .hs-lookalike input:focus, .hs-lookalike select:focus, .hs-lookalike textarea:focus {
          border-color:#0f4ec7; box-shadow:0 0 0 3px rgba(15,78,199,.15);
          background:#fff;
        }
      `}</style>
    </div>
  );
}
