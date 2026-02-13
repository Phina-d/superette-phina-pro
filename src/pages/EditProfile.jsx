import { useState, useEffect } from "react";
import "../styles/EditProfile.css";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("profileUser"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileUser", JSON.stringify(user));
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="edit-profile-page">
      <div className="profile-card">
        <h1>⚙️ Modifier le profil</h1>

        {success && (
          <div className="success-message">
            ✅ Profil mis à jour avec succès !
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-save-profile">
            💾 Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}
