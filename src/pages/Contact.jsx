import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* 📞 Header */}
      <div className="contact-header">
        <h1>📞 Contactez Supérette Chez Phina</h1>
        <p>Nous sommes à votre écoute 7j/7</p>

        <a
          href="https://wa.me/221775664237"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          💬 Commander sur WhatsApp
        </a>
      </div>

      <div className="contact-container">
        {/* 📍 Infos */}
        <div className="contact-info">
          <h2>Nos coordonnées</h2>

          <div className="info-box">
            <span>📍 Adresse</span>
            <p>Tivaouane Peulh, Cité Keur Salam, Villa n°314</p>
          </div>

          <div className="info-box">
            <span>📞 Téléphone</span>
            <p>+221 77 566 42 37</p>
          </div>

          <div className="info-box">
            <span>⏰ Horaires</span>
            <p>Lundi - Dimanche : 8h00 - 22h00</p>
          </div>
        </div>

        {/* 🗺️ Carte */}
        <div className="contact-map">
          <iframe
            title="Map Supérette Chez Phina"
            src="https://www.google.com/maps?q=Tivaouane%20Peulh%20Cité%20Keur%20Salam&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
