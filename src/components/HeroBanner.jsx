import "../styles/HeroBanner.css";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Supérette Chez Phina 🛍️</h1>
        <p>Le meilleur du quotidien, livré rapidement 🚚</p>

        <div className="hero-buttons">
          <button
            className="btn-primary"
            type="button"
            onClick={() => navigate("/products")}
          >
            Voir les produits 🛒
          </button>

          <button
            className="btn-secondary"
            type="button"
            onClick={() => navigate("/promo")}
          >
            Promotions 🔥
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://res.cloudinary.com/dbiltufxo/image/upload/v1770811660/xaacgqxcc3vtqbgt9wzo.jpg"
          alt="Supérette Chez Phina"
          className="hero-img"
        />
      </div>
    </section>
  );
}
