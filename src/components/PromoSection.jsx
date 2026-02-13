import { Link } from "react-router-dom";
import "../styles/PromoSection.css";

export default function PromoSection() {
  return (
    <section className="promo-section">
      <h2>🔥 Promotions du moment</h2>
      <div className="promo-box">
        <p>Profitez jusqu’à -30% sur vos produits préférés 💎</p>
        <Link to="/promo" className="promo-btn">
          Voir les promos
        </Link>
      </div>
    </section>
  );
}
