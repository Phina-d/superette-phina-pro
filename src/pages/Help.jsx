import "../styles/Help.css";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      {/* HEADER */}
      <div className="help-header">
        <h1>🆘 Centre d’aide - Supérette Chez Phina</h1>
        <p>Besoin d’aide ? Nous sommes là pour vous 💬</p>
      </div>

      {/* ACTIONS RAPIDES */}
      <div className="help-actions">
        <button onClick={() => navigate("/faq")}>❓ Voir la FAQ</button>
        <button onClick={() => navigate("/contact")}>📞 Contact</button>
        <a
          href="https://wa.me/221775664237"
          target="_blank"
          className="whatsapp-link"
        >
          💬 WhatsApp
        </a>
      </div>

      {/* SECTIONS AIDE */}
      <div className="help-sections">
        <div className="help-card">
          <h3>🛒 Commander un produit</h3>
          <p>
            Parcourez les produits, ajoutez-les au panier ou commandez directement
            via WhatsApp.
          </p>
        </div>

        <div className="help-card">
          <h3>💳 Paiement</h3>
          <p>
            Paiement à la livraison, Orange Money, Wave ou espèces selon votre
            choix.
          </p>
        </div>

        <div className="help-card">
          <h3>🚚 Livraison</h3>
          <p>
            Livraison rapide à Dakar et environs. Les délais varient selon votre
            zone.
          </p>
        </div>

        <div className="help-card">
          <h3>❤️ Favoris & Panier</h3>
          <p>
            Ajoutez vos produits préférés aux favoris ou au panier pour les
            retrouver facilement.
          </p>
        </div>

        <div className="help-card">
          <h3>👤 Compte client</h3>
          <p>
            Consultez votre profil pour voir vos informations et vos commandes.
          </p>
        </div>

        <div className="help-card">
          <h3>📦 Commandes</h3>
          <p>
            Suivez l’état de vos commandes : En cours, Livré ou Annulé.
          </p>
        </div>
      </div>

      {/* BLOC CONTACT */}
      <div className="help-contact">
        <h2>Besoin d’aide immédiate ?</h2>
        <p>Contactez-nous directement :</p>

        <div className="help-contact-actions">
          <a href="tel:+221775664237">📞 Appeler</a>
          <a
            href="https://wa.me/221775664237"
            target="_blank"
            className="whatsapp-btn"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
