import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Footer.css";

export default function Footer() {

  const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const auth = localStorage.getItem("admin_auth") === "true";
  setIsAdmin(auth);
}, []);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo & description */}
        <div className="footer-brand">
          <h3>🛍️ Supérette Chez Phina</h3>
          <p>Votre boutique en ligne de confiance 💎</p>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <h4>Pages</h4>
          <Link to="/cgv">CGV</Link>
          <Link to="/contact">Contact</Link>
          {isAdmin ? (
  <Link to="/profile">👤 Profil</Link>
) : (
  <Link to="/admin-login">🔐 Admin</Link>
)}

          <Link to="/support">Support</Link>
        </div>

        {/* Aide */}
        <div className="footer-links">
          <h4>Aide</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/help">Aide</Link>
          <Link to="/promo">Promotions</Link>
        </div>

        {/* Paiements */}
        <div className="footer-payments">
          <h4>Moyens de paiement</h4>
          <div className="payment-icons">
            <span>💳 Visa</span>
            <span>💳 MasterCard</span>
            <span>📱 Wave</span>
            <span>📱 Orange Money</span>
            <span>📱 Free Money</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Supérette Chez Phina - Tous droits réservés 💎</p>
      </div>
    </footer>
  );
}
