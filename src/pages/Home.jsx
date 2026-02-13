import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import StatsBar from "../components/StatsBar";
import PromoSection from "../components/PromoSection";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/productsManager";
import CategoryMenu from "../components/CategoryMenu";

import "../styles/Home.css";

export default function Home({ search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="home">
      <HeroBanner />
      <StatsBar />
      <CategoryMenu />
      <PromoSection />

      <section className="home-products">
        <h2>Produits populaires 🛒</h2>
        <div className="products-grid">
          {filtered.slice(0, 8).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
