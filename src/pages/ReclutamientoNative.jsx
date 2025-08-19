:root {
  --blue: #0f4ec7;
  --ink: #0b1b46;
  --card: #fff;
  --muted: #64748b;
  --ring: rgba(15, 78, 199, 0.16);
  --pill-bg: #eaf1ff;
  --pill-bd: #c9d8ff;
  --placeholder: #8a96b3;
}

/* ====== Layout ====== */
.RN__wrap {
  position: relative;
  min-height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url('https://b2b.occ.com.mx/assets/background-DJI9DYek.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* ====== Barra Azul ====== */
.RN__bar {
  background: var(--blue);
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.RN__logo {
  height: 36px;
  width: auto;
}

/* ====== Container ====== */
.RN__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 50px 24px;
  margin-top: 30px;
}

.RN__grid {
  display: grid;
  grid-template-columns: 1fr 640px;
  gap: 60px;
  align-items: flex-start;
}

/* ====== Izquierda ====== */
.RN__left {
  color: #fff;
  padding: 8px;
}

.RN__left h1 {
  font-size: 56px;
  line-height: 1.1;
  margin: 0 0 28px;
  letter-spacing: 0.3px;
}

.RN__left p {
  font-size: 15px;
  opacity: 0.92;
  margin: 0 0 24px;
  max-width: 580px;
}

/* ====== Bullets Desktop ====== */
.RN__benefitsList {
  margin-top: 100px;
  padding: 0;
  list-style: none;
}

.RN__benefitsList li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.5;
  color: #fff;
  max-width: 580px;
}

.RN__benefitsList strong {
  display: block;
  margin-bottom: 6px;
  font-size: 19px;
}

.RN__benefitsList svg {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  stroke: #aaaeff;
  margin-top: 4px;
}

/* ====== Derecha ====== */
.RN__right {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 640px;
}

.RN__titleOutside {
  width: 100%;
  text-align: center;
  color: #fff;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  box-shadow: 0 8px 20px rgba(3, 10, 36, 0.16);
}

/* ====== Card ====== */
.RN__card {
  width: 75%;
  background-color: azure;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 16px 36px rgba(3, 10, 36, 0.2);
  border: 1px solid rgba(15, 78, 199, 0.06);
}

/* Fix HubSpot */
.RN__card input,
.RN__card select,
.RN__card textarea {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box;
}

/* ====== Logos ====== */
.logos-section {
  max-width: 900px;
  margin: 0 auto;
}

.mb-3 {
  text-align: center;
  color: #fff;
}

.mt-5 {
  color: #fff;
}

/* ====== Bullets Mobile ====== */
.RN__benefitsList--mobile {
  display: none;
  padding: 0 24px;
}

.RN__benefitsList--mobile ul {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}

.RN__benefitsList--mobile li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
  font-size: 16px;
  color: #fff;
}

.RN__benefitsList--mobile strong {
  display: block;
  margin-bottom: 4px;
  font-size: 17px;
}

.RN__benefitsList--mobile svg {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  stroke: #aaaeff;
  margin-top: 4px;
}

/* ====== Mobile Title ====== */
.RN__mobileTitle {
  display: none;
  font-size: 36px;
  color: #fff;
  text-align: center;
  margin-bottom: 32px;
  padding: 0 20px;
  line-height: 1.2;
}

/* ====== Responsive Mobile ====== */
@media (max-width: 768px) {
  .RN__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .RN__left {
    display: none;
  }

  .RN__right {
    width: 100% !important;
  }

  .RN__card {
    width: 100% !important;
    padding: 24px;
  }

  .hs-form iframe {
    width: 100% !important;
    min-height: 600px !important;
    display: block !important;
  }

  .RN__benefitsList--mobile {
    display: block;
  }

  .RN__mobileTitle {
    display: block;
  }
}
