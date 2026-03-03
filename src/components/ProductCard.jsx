import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { addToCart, addToFavorites } from "../data/cartManager";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { updateCounts } = useContext(CartContext);

  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;

  let discountPercent = 0;
  if (oldPrice && oldPrice > price) {
    discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  const whatsappMessage = `Bonjour, je veux commander le produit : ${product.name} au prix de ${price} FCFA.`;
  const whatsappUrl = `https://wa.me/221775664237?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="product-card">
      {/* IMAGE */}
      <div className="product-image">
        {discountPercent > 0 && (
          <div className="promo-badge">-{discountPercent}%</div>
        )}

        <button
          className="fav-top"
          onClick={() => {
            addToFavorites(product);
            updateCounts();
          }}
        >
          ❤️
        </button>

        <img src={product.image} alt={product.name} />
      </div>

      {/* INFOS */}
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <p className="price">
          {price} F CFA
          {discountPercent > 0 && (
            <span className="old-price">{oldPrice} F CFA</span>
          )}
        </p>

        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn-detail">
            👁️ Détails
          </Link>

          <button
            className="btn-cart"
            onClick={() => {
              addToCart(product);
              updateCounts();
            }}
          >
            🛒 Ajouter
          </button>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          Commander WhatsApp 📱
        </a>
      </div>
    </div>
  );
}
