import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ AJOUT
import "../styles/Profile.css";
import { getCart, getFavorites } from "../data/cartManager";

export default function Profile() {
  const navigate = useNavigate(); // ✅ AJOUT

  const [user, setUser] = useState({
  name: "Admin Phina",
  phone: "+221 77 566 42 37",
  address: "Tivaouane Peulh, Cité Keur Salam",
});
useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("profileUser"));
  if (savedUser) {
    setUser(savedUser);
  }
}, []);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("profileAvatar") || ""
  );

  useEffect(() => {
    if (avatar) {
      localStorage.setItem("profileAvatar", avatar);
    }
  }, [avatar]);

  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    setCartCount(getCart().length);
    setFavCount(getFavorites().length);
  }, []);

  return (
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-avatar">
          {avatar ? <img src={avatar} alt="Profil" /> : <span>👤</span>}

          <label className="upload-btn">
            📸
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setAvatar(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.phone}</p>
          <p>{user.address}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="profile-stats">
        <div className="stat-card">
          <h3>{cartCount}</h3>
          <p>Produits au panier</p>
        </div>
        <div className="stat-card">
          <h3>{favCount}</h3>
          <p>Favoris</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Commandes</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="profile-actions">
  <button onClick={() => navigate("/cart")}>
    🛒 Voir le panier
  </button>

  <button onClick={() => navigate("/favorites")}>
    ❤️ Mes favoris
  </button>

 <button onClick={() => navigate("/orders")}>
  📦 Mes commandes
</button>

<button onClick={() => navigate("/edit-profile")}>
  ⚙️ Modifier le profil
</button>

</div>


      {/* INFO DETAIL */}
      <div className="profile-details">
        <h2>📋 Informations personnelles</h2>
        <div className="detail-item">
          <span>Nom :</span>
          <strong>{user.name}</strong>
        </div>
        <div className="detail-item">
          <span>Téléphone :</span>
          <strong>{user.phone}</strong>
        </div>
        <div className="detail-item">
          <span>Adresse :</span>
          <strong>{user.address}</strong>
        </div>
      </div>

      {/* MAP */}
      <div className="profile-map">
        <h2>📍 Localisation du client</h2>
        <iframe
          title="Localisation client"
          src="https://www.google.com/maps?q=Tivaouane%20Peulh%20Keur%20Salam&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
