import "../styles/CategoryMenu.css";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories";

export default function CategoryMenu() {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <h2 className="category-title">Catégories populaires</h2>

      <div className="category-grid">
        {/* Toutes */}
        <div
          className="category-card"
          onClick={() => navigate("/products")}
        >
          🛍️ Toutes
        </div>

        {CATEGORIES.map((cat) => (
          <div
            key={cat.value}
            className="category-card"
            onClick={() =>
              navigate(`/products?category=${cat.value}`)
            }
          >
            {cat.label}
          </div>
        ))}
      </div>
    </section>
  );
}
