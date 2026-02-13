import { useEffect, useState } from "react";
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
} from "../../data/clientsManager";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import "../../styles/AdminClients.css";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    photo: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setClients(getClients());
  }, []);

  function refresh() {
    setClients(getClients());
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm({ ...form, photo: url });
    } catch (err) {
      alert("Erreur upload image ❌");
    }
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert("Nom et téléphone obligatoires !");
      return;
    }

    if (editingId) {
      updateClient({ id: editingId, ...form });
      setEditingId(null);
    } else {
      addClient(form);
    }

    setForm({ name: "", phone: "", address: "", photo: "" });
    refresh();
  }

  function handleEdit(client) {
    setForm(client);
    setEditingId(client.id);
  }

  function handleDelete(id) {
    if (window.confirm("Supprimer ce client ?")) {
      deleteClient(id);
      refresh();
    }
  }

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-clients-page">
      <h2>👥 Gestion des clients</h2>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-left">
          <input
            type="text"
            name="name"
            placeholder="Nom du client"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-right">
          <div className="photo-preview">
            {form.photo ? (
              <img src={form.photo} alt="client" />
            ) : (
              <span>📷 Photo</span>
            )}
          </div>

          <input type="file" onChange={handleImageUpload} />
          {loading && <p className="loading">Upload...</p>}

          <button type="submit">
            {editingId ? "Modifier ✏️" : "Ajouter ➕"}
          </button>
        </div>
      </form>

      {/* RECHERCHE */}
      <input
        type="text"
        placeholder="🔍 Rechercher un client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="client-search"
      />

      {/* LISTE CLIENTS */}
      <div className="clients-grid">
        {filtered.length === 0 ? (
          <p className="empty">Aucun client trouvé</p>
        ) : (
          filtered.map((c) => (
            <div key={c.id} className="client-card">
              <img
                src={
                  c.photo ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={c.name}
              />

              <div className="client-info">
                <h4>{c.name}</h4>
                <p>📞 {c.phone}</p>
                <p>📍 {c.address || "Non renseignée"}</p>
              </div>

              <div className="client-actions">
                <button onClick={() => handleEdit(c)}>✏️</button>
                <button onClick={() => handleDelete(c.id)}>❌</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
