import { useState } from "react";
import "../styles/Support.css";

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Message envoyé ! Nous vous répondrons bientôt.");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="support-page">
      {/* HERO */}
      <section className="support-hero">
        <h1>🛠️ Support & Assistance</h1>
        <p>Une équipe disponible pour vous aider 24/7 💎</p>

        <div className="support-buttons">
          <a
            href="https://wa.me/221775664237"
            target="_blank"
            rel="noreferrer"
            className="btn-support whatsapp"
          >
            💬 WhatsApp
          </a>
          <a href="tel:+221775664237" className="btn-support call">
            📞 Appeler
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section className="support-services">
        <div className="support-card">
          <h3>📦 Commandes</h3>
          <p>Suivez vos commandes en temps réel.</p>
        </div>
        <div className="support-card">
          <h3>🚚 Livraison</h3>
          <p>Infos sur les délais et zones.</p>
        </div>
        <div className="support-card">
          <h3>💳 Paiement</h3>
          <p>Assistance sur les paiements.</p>
        </div>
        <div className="support-card">
          <h3>🔄 Retours</h3>
          <p>Politique de retour et remboursement.</p>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="support-grid">
        {/* FORMULAIRE */}
        <div className="support-form">
          <h2>📩 Envoyer un message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Téléphone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Votre message..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Envoyer 🚀</button>
          </form>
        </div>

        {/* MAP */}
        <div className="support-map">
          <h2>📍 Notre localisation</h2>
          <iframe
            title="Map Supérette Chez Phina"
            src="https://www.google.com/maps?q=Tivaouane%20Peulh%20Keur%20Salam&output=embed"
            loading="lazy"
          ></iframe>

          <div className="map-info">
            <p>📍 Tivaouane Peulh, Cité Keur Salam, Villa n°314</p>
            <p>📞 +221 77 566 42 37</p>
            <p>⏰ 8h00 - 22h00</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="support-faq">
        <h2>❓ Questions fréquentes</h2>

        <details>
          <summary>Comment passer une commande ?</summary>
          <p>Ajoutez des produits au panier puis validez votre commande.</p>
        </details>

        <details>
          <summary>Quels sont les moyens de paiement ?</summary>
          <p>Paiement à la livraison et mobile money.</p>
        </details>

        <details>
          <summary>Quels sont les délais de livraison ?</summary>
          <p>Entre 30 minutes et 2 heures selon la zone.</p>
        </details>
      </section>
    </div>
  );
}
