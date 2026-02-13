import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";
import { useLocation } from "react-router-dom";
import { CATEGORIES } from "../data/categories";

export default function Products() {
  const [search, setSearch] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  // 🔹 Label catégorie
  const categoryLabel = selectedCategory
    ? CATEGORIES.find((c) => c.value === selectedCategory)?.label
    : null;

  // 🔹 Filtrage produits (catégorie + recherche)
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;

    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="products-page">
      <h2>
        🛍️ Produits {categoryLabel && <span>- {categoryLabel}</span>}
      </h2>

      <div className="products-search">
        <input
          type="text"
          placeholder="🔍 Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-product">Aucun produit 😢</p>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        )}
      </div>
    </div>
  );
}
