import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/productsManager";
import "../styles/Promo.css";

// 🔹 Bannières locales
import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import banner3 from "../assets/banners/banner3.jpg";

export default function Promo() {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(7200); // 2h promo
  const banners = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  // 🔹 Récupération produits en promo
  useEffect(() => {
    const all = getProducts();
    const promos = all.filter(
      (p) =>
        p.promo === true ||
        (p.oldPrice && Number(p.oldPrice) > Number(p.price))
    );
    setProducts(promos);
  }, []);

  // ⏳ Compteur promo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🎞️ Slider bannières
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(slider);
  }, []);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="promo-page">
      {/* 🎞️ Bannières */}
      <div className="promo-banner-img">
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Promo banner ${index + 1}`}
            className={index === current ? "active" : ""}
          />
        ))}
        <div className="promo-banner-overlay">
          <h1>🔥 Flash Promotions</h1>
          <p>Jusqu’à -50% chez Supérette Chez Phina</p>
        </div>
      </div>

      {/* ⏳ Compteur */}
      <div className="promo-timer">
        ⏳ Fin des promos dans : <strong>{formatTime(timeLeft)}</strong>
      </div>

      {/* 🛍️ Produits en promo */}
      <section className="promo-products">
        <h2>🔥 Produits en promotion</h2>

        {products.length === 0 ? (
          <p className="empty">Aucun produit en promotion 😢</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
