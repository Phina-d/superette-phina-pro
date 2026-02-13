import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/AdminLogin.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ on utilise le context

  const ADMIN_PASSWORD = "phina123"; // 🔐 change le mot de passe

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      login(); // ✅ utilise le context
      navigate("/admin");
    } else {
      setError("❌ Mot de passe incorrect");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-box" onSubmit={handleLogin}>
        <h2>🔐 Connexion Admin</h2>

        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
