import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getFavorites, removeFromFavorites } from "../data/productsManager";
import "../styles/Favorites.css";

const banners = ["/banners/banner1.jpg", "/banners/banner2.jpg", "/banners/banner3.jpg"];

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentBanner(prev => (prev + 1) % banners.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const refresh = () => setFavorites(getFavorites());

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="favorites-page">
      <div className="favorites-banner" style={{ backgroundImage: `url(${banners[currentBanner]})` }}>
        <div className="banner-overlay">
          <h1>❤️ Mes Favoris</h1>
          <p>Retrouvez vos produits préférés chez Supérette Chez Phina</p>
        </div>
      </div>

      <div className="favorites-container">
        {favorites.length === 0 ? (
          <div className="empty-fav">
            <p>💔 Aucun produit favori pour le moment</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(p => (
              <div key={p.id} className="fav-card">
                <ProductCard product={p} />
                <button className="btn-remove-fav" onClick={() => { removeFromFavorites(p.id); refresh(); }}>
                  ❌ Retirer des favoris
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
