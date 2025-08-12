import { useState, useEffect, useRef } from 'react';
import './ReclutamientoNative.css';

function getCookie(n){
  return decodeURIComponent((document.cookie.split('; ').find(r => r.startsWith(n+'='))||'').split('=')[1]||'');
}
function getLS(k){ try { return localStorage.getItem(k)||''; } catch { return ''; } }

export default function ReclutamientoNative() {
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const formRef = useRef(null);

  function fillHidden() {
    const f = formRef.current; if (!f) return;
    const vid = getCookie('vid') || getLS('visitorId') || '';
    const us  = getCookie('utm_source')   || getLS('utm_source')   || '';
    const um  = getCookie('utm_medium')   || getLS('utm_medium')   || '';
    const uc  = getCookie('utm_campaign') || getLS('utm_campaign') || '';
    if (vid) f.visitorid.value = vid;
    if (us)  f.utm_source.value = us;
    if (um)  f.utm_medium.value = um;
    if (uc)  f.utm_campaign.value = uc;
  }
  useEffect(() => { fillHidden(); }, []);

  async function handleSubmit(e){
    e.preventDefault();
    setPending(true); setOk(false); setErr('');

    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = {
      fields,
      context: {
        pageUri: location.href,
        pageName: document.title,
        hutk: getCookie('hubspotutk') || ''
      }
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      setOk(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'hubspot_lead', form_id: 'native_reclutamiento' });

      e.currentTarget.reset();
      fillHidden();
    } catch (err) {
      console.error(err);
      setErr('No se pudo enviar. Intenta de nuevo.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="RN__wrap">
      {/* Header con logo */}
      <header className="RN__bar">
        <img src="/occ1.png" alt="OCC" className="RN__logo" />
      </header>

      <main className="RN__container">
        <div className="RN__grid">
          {/* Columna izquierda */}
          <section className="RN__left">
            <h1>Publicar tus vacantes nunca fue tan fácil…</h1>
            <p>
              Conoce la forma más eficiente de encontrar al candidato ideal con OCC,
              la bolsa de empleo <strong>#1 en México</strong>
            </p>
          </section>

          {/* Columna derecha */}
          <div className="RN__right">
            <h2 className="RN__titleOutside">¡Cotiza tu paquete de vacantes!</h2>

            <section className="RN__card">
              {ok && <div className="RN__alert-ok">¡Enviado! Pronto nos pondremos en contacto.</div>}
              {err && <div className="RN__alert-err">{err}</div>}

              <form ref={formRef} onSubmit={handleSubmit} className="hs-lookalike">
                {/* Fila 1 */}
                <div className="RN__row RN__field">
                  <div>
                    <label>Nombre*</label>
                    <input name="firstname" required placeholder="Nombre" />
                  </div>
                  <div>
                    <label>Apellidos*</label>
                    <input name="lastname" required placeholder="Apellidos" />
                  </div>
                </div>

                {/* Email */}
                <div className="RN__field">
                  <label>Email empresarial*</label>
                  <input name="email" type="email" required placeholder="tucorreo@empresa.com" />
                </div>

                {/* Teléfono / Empresa */}
                <div className="RN__row RN__field">
                  <div>
                    <label>Número de teléfono*</label>
                    <input name="phone" type="tel" required placeholder="+52 ..." />
                  </div>
                  <div>
                    <label>Nombre de la empresa*</label>
                    <input name="company" required placeholder="Empresa" />
                  </div>
                </div>

                {/* Puesto / Vacantes */}
                <div className="RN__row RN__field">
                  <div>
                    <label>Puesto*</label>
                    <div className="RN__select">
                      <select name="puesto" required defaultValue="">
                        <option value="" disabled>Selecciona</option>
                        <option>Director General</option>
                        <option>Recursos Humanos</option>
                        <option>Reclutador</option>
                        <option>Compras</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Número de vacantes anuales*</label>
                    <div className="RN__select">
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
                </div>

                {/* RFC */}
                <div className="RN__field">
                  <label>RFC*</label>
                  <input
                    name="rfc"
                    required
                    placeholder="RFC de la empresa"
                    pattern="[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}"
                    title="Formato RFC válido"
                  />
                </div>

                {/* Checkbox */}
                <label className="RN__check">
                  <input type="checkbox" name="consent_marketing" value="1" />
                  <span>Acepto recibir otras comunicaciones de OCC.</span>
                </label>

                {/* Hidden tracking */}
                <input type="hidden" name="visitorid" />
                <input type="hidden" name="utm_source" />
                <input type="hidden" name="utm_medium" />
                <input type="hidden" name="utm_campaign" />

                <button className="RN__btn" disabled={pending}>
                  {pending ? 'Enviando…' : 'Enviar'}
                </button>

                <p className="RN__legal">
                  Al dar clic en “Enviar” declaro haber leído y aceptado los Términos y Condiciones,
                  así como el Aviso de Privacidad.
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
