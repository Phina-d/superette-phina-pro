import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../data/productsManager";
import { addToCart, addToFavorites } from "../data/cartManager";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const products = getProducts();
    const p = products.find((item) => String(item.id) === String(id));
    setProduct(p);

    if (p) {
      setActiveImage(p.image);
      const sim = products.filter(
        (item) => item.id !== p.id && item.category === p.category
      );
      setSimilar(sim.slice(0, 4));
    }
  }, [id]);

  if (!product) return <p>Produit introuvable ❌</p>;

  const whatsappMessage = `Bonjour, je veux commander le produit : ${product.name} au prix de ${product.price} FCFA.`;
  const whatsappUrl = `https://wa.me/221775664237?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const stars = Math.round(product.rating || 4);

  return (
    <div className="detail-container">
      <div className="detail-card">
        {/* IMAGES */}
        <div className="detail-images">
          <img className="main-image" src={activeImage} alt={product.name} />

          <div className="thumbs">
            {[product.image, ...(product.images || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={activeImage === img ? "active" : ""}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* INFOS */}
        <div className="detail-info">
          <h2>{product.name}</h2>

          <div className="rating">
            {"⭐".repeat(stars)}
            <span> ({product.rating || 4}/5)</span>
          </div>

          <div className="price-box">
            <span className="price">{product.price} FCFA</span>
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice} FCFA</span>
            )}
          </div>

          <div className="badges">
            <span className="badge new">Nouveau</span>
            {product.oldPrice && <span className="badge promo">Promo</span>}
            <span className="badge stock">
              {product.stock > 0 ? "En stock ✅" : "Rupture ❌"}
            </span>
          </div>

          <p className="desc">
            Produit disponible chez <b>Supérette Chez Phina</b>. Qualité garantie
            et livraison rapide 🚚.
          </p>

          <div className="actions">
            <button onClick={() => addToCart(product)}>🛒 Ajouter au panier</button>
            <button onClick={() => addToFavorites(product)}>❤️ Favoris</button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              📱 Commander WhatsApp
            </a>
          </div>

          <div className="payment-box">
            <h4>Moyens de paiement 💳</h4>
            <p>💵 Espèces | 📱 Orange Money | 💳 Wave | 🏦 Virement</p>
          </div>
        </div>
      </div>

      {/* PRODUITS SIMILAIRES */}
      <h3 className="similar-title">Produits similaires 🔥</h3>
      <div className="similar-grid">
        {similar.map((s) => (
          <Link to={`/product/${s.id}`} key={s.id} className="similar-card">
            <img src={s.image} alt={s.name} />
            <h4>{s.name}</h4>
            <p>{s.price} FCFA</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
