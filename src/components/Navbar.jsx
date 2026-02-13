import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar({ search, setSearch }) {
  const { cartCount } = useContext(CartContext);
  const { isAdmin, logout } = useAuth(); // ✅ utilisation du context
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ logout via context
    navigate("/");
  };

  return (
    <header className="navbar-premium">
      <div className="nav-wrapper">

        {/* LOGO */}
        <Link to="/" className="nav-logo">
          🛍️ <span>PhinaMarket</span>
        </Link>

        {/* SEARCH BAR */}
        <div className="nav-search-box">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>

        {/* MENU LINKS */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>

          <Link
            to="/products"
            className="nav-products"
            onClick={() => setMenuOpen(false)}
          >
            🛍️ Produits
          </Link>

          <Link
            to="/promo"
            className="nav-promo"
            onClick={() => setMenuOpen(false)}
          >
            🔥 Promo
          </Link>

          {isAdmin && (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              👤 Profil
            </Link>
          )}

          {isAdmin ? (
            <>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                ⚙️ Dashboard
              </Link>

              <button
                className="nav-logout"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                🚪 Déconnexion
              </button>
            </>
          ) : (
            <Link to="/admin-login" onClick={() => setMenuOpen(false)}>
              🔐 Admin
            </Link>
          )}
        </nav>

        {/* ICONS */}
        <div className="nav-icons">
          <Link to="/favorites" className="icon-btn">
            ❤️
          </Link>

          <Link to="/cart" className="icon-btn cart-btn">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>

        {/* HAMBURGER */}
        <div
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>
    </header>
  );
}
