import { useState } from "react";
import "../styles/FAQ.css";

export default function FAQ() {
  const faqs = [
    {
      question: "🛒 Comment passer une commande ?",
      answer:
        "Vous pouvez ajouter des produits au panier puis valider votre commande ou commander directement via WhatsApp.",
    },
    {
      question: "🚚 Quels sont les délais de livraison ?",
      answer:
        "La livraison se fait généralement entre 30 minutes et 2 heures selon votre localisation.",
    },
    {
      question: "💳 Quels sont les moyens de paiement ?",
      answer:
        "Nous acceptons le paiement en espèces, Wave, Orange Money et Free Money.",
    },
    {
      question: "📍 Où êtes-vous situés ?",
      answer:
        "Nous sommes situés à Tivaouane Peulh, Cité Keur Salam, Villa n°314.",
    },
    {
      question: "🔄 Puis-je retourner un produit ?",
      answer:
        "Oui, vous pouvez retourner un produit sous 24h si celui-ci est défectueux ou non conforme.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  function toggle(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div className="faq-page">
      {/* HEADER */}
      <div className="faq-header">
        <h1>❓ Foire Aux Questions</h1>
        <p>Tout ce que vous devez savoir sur Supérette Chez Phina</p>
      </div>

      {/* FAQ LIST */}
      <div className="faq-container">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggle(index)}
          >
            <div className="faq-question">
              <span>{item.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "➖" : "➕"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
