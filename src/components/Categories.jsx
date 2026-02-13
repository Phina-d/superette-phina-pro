import "../styles/Categories.css";

export default function Categories() {
  const categories = [
    "🥫 Alimentaire",
    "🧼 Hygiène & Entretien",
    "💄 Cosmétiques",
    "🥛 Produits laitiers",
    "🌶️ Épices",
  ];

  return (
    <section className="categories">
      <h2>Catégories</h2>
      <div className="categories-grid">
        {categories.map((c, i) => (
          <div key={i} className="category-card">
            {c}
          </div>
        ))}
      </div>
    </section>
  );
}
