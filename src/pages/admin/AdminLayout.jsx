import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/Admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  // 🔐 Vérification connexion admin
  useEffect(() => {
    const adminAuth = localStorage.getItem("admin_auth");
    if (!adminAuth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin-login");
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Phina 💎</h2>

        <nav>
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/admin/products">🛍️ Produits</Link>
          <Link to="/admin/orders">📦 Commandes</Link>
          <Link to="/admin/clients">👥 Clients</Link>
          <Link to="/">🏠 Retour site</Link>
        </nav>

        {/* 🔐 Bouton déconnexion */}
        <button className="admin-logout-btn" onClick={logout}>
          🚪 Déconnexion
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
