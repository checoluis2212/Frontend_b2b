import { useEffect } from "react";
import './ReclutamientoNative.css';

export default function ReclutamientoNative() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "49514148",
          formId: "5f745bfa-8589-40c2-9940-f9081123e0b4",
          region: "na1",
          target: "#hubspot-form"
        });
      }
    };
    document.body.appendChild(script);
  }, []);

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

            {/* Cards de beneficios */}
            <div className="RN__benefitsGrid">
              {/* Compra de vacantes */}
              <div className="RN__benefit">
                <div className="RN__iconBox">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 6h15l-1.5 9h-13z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="20" r="1.5"/>
                    <circle cx="18" cy="20" r="1.5"/>
                  </svg>
                </div>
                <h3>Compra de vacantes</h3>
                <p>Adquiere paquetes flexibles y publica en la bolsa de empleo líder en México.</p>
              </div>

              {/* Compra especializada */}
              <div className="RN__benefit">
                <div className="RN__iconBox">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 2l4 4-4 4-4-4zM2 12h20M12 22l-4-4 4-4 4 4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Compra especializada</h3>
                <p>Soluciones diseñadas a la medida para cubrir perfiles estratégicos y posiciones clave.</p>
              </div>

              {/* Seguimiento */}
              <div className="RN__benefit">
                <div className="RN__iconBox">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 12l2-2 4 4 10-10 2 2-12 12z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Seguimiento</h3>
                <p>Monitorea y optimiza el desempeño de tus vacantes con reportes claros y efectivos.</p>
              </div>

              {/* Capacitación personalizada */}
              <div className="RN__benefit">
                <div className="RN__iconBox">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14v7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 19h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Capacitación personalizada</h3>
                <p>Accede a asesoría y entrenamientos especializados para tu equipo de reclutamiento.</p>
              </div>
            </div>
          </section>

          {/* Columna derecha */}
          <div className="RN__right">
            <h2 className="RN__titleOutside">¡Cotiza tu paquete de vacantes!</h2>

            <section className="RN__card">
              {/* Aquí se renderiza el form de HubSpot */}
              <div id="hubspot-form"></div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
