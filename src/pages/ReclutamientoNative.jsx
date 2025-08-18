import React from "react";
import "./ReclutamientoNative.css";

export default function ReclutamientoNative() {
  return (
    <div className="RN__wrap">
      {/* === HEADER === */}
      <header className="RN__bar">
        <img
          src="/Images/sax_logo.png"
          alt="Logo"
          className="RN__logo"
        />
      </header>

      {/* === MAIN === */}
      <div className="RN__container">
        <div className="RN__grid">
          
          {/* === LEFT: Título === */}
          <div className="RN__left">
            <h1>Publicar tus vacantes nunca fue tan fácil</h1>
          </div>

          {/* === RIGHT: Cotización + Formulario === */}
          <div className="RN__right">
            <h2 className="RN__titleOutside">Recibe tu cotización ajustada a tus necesidades</h2>
            <p>
              Cotiza tu paquete de vacantes y un ejecutivo se pondrá en
              contacto contigo para darte más detalles.
            </p>

            <div className="RN__card">
              {/* Aquí va tu formulario */}
              <form>
                <div>
                  <label>Nombre</label>
                  <input type="text" name="nombre" required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" required />
                </div>
                <div>
                  <label>Teléfono</label>
                  <input type="tel" name="telefono" required />
                </div>
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>

          {/* === BULLETS === */}
          <div className="RN__bullets">
            <ul className="RN__benefitsList">
              <li>
                <img src="/icons/check.svg" alt="" className="RN__icon" />
                <div>
                  <strong>Alcance masivo</strong>
                  Llega a millones de candidatos en toda la república.
                </div>
              </li>
              <li>
                <img src="/icons/check.svg" alt="" className="RN__icon" />
                <div>
                  <strong>Fácil de usar</strong>
                  Publica en minutos sin procesos complicados.
                </div>
              </li>
              <li>
                <img src="/icons/check.svg" alt="" className="RN__icon" />
                <div>
                  <strong>Soporte dedicado</strong>
                  Nuestro equipo te asesora en cada paso.
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* === LOGOS === */}
      <section className="logos-section">
        <div className="logo-carousel">
          <div className="logo-track">
            <img src="/logos/logo1.png" alt="logo1" className="logo-item" />
            <img src="/logos/logo2.png" alt="logo2" className="logo-item" />
            <img src="/logos/logo3.png" alt="logo3" className="logo-item" />
            {/* ...agrega más logos */}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer>
        <p>© 2025 OCCMundial - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
