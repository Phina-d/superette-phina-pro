import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../data/productsManager";
import { CATEGORIES } from "../../data/categories";
import "../../styles/AdminProducts.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    category: "alimentaire",
    image: "",
    stock: "",
    promo: false,
  });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const refresh = () => setProducts(getProducts());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, image: url }));
      setPreview(url);
    } catch (err) {
      console.error(err);
      alert("Erreur upload image ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Nom, prix et image obligatoires !");
      return;
    }

    if (editingId) {
      updateProduct({ id: editingId, ...form });
      setEditingId(null);
    } else {
      addProduct(form);
    }

    setForm({
      name: "",
      price: "",
      oldPrice: "",
      category: "alimentaire",
      image: "",
      stock: "",
      promo: false,
    });

    setPreview("");
    refresh();
  };

  const handleEdit = (p) => {
    setForm(p);
    setPreview(p.image);
    setEditingId(p.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      deleteProduct(id);
      refresh();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryLabel = (value) => {
    const cat = CATEGORIES.find((c) => c.value === value);
    return cat ? cat.label : value;
  };

  return (
    <div className="admin-products">
      <h2>🛍️ Admin Produits</h2>

      <form className="admin-products-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Nom du produit"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Prix (FCFA)"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Ancien prix"
            value={form.oldPrice}
            onChange={handleChange}
          />

          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <label className="promo-check">
            <input
              type="checkbox"
              name="promo"
              checked={form.promo}
              onChange={handleChange}
            />
            Produit en promotion 🔥
          </label>
        </div>

        <div className="upload-box">
          <input type="file" onChange={handleImageUpload} />
          {loading && <p>⏳ Upload en cours...</p>}
          {preview && <img src={preview} alt="preview" />}
        </div>

        <button className="btn-submit">
          {editingId ? "✏️ Modifier" : "➕ Ajouter"}
        </button>
      </form>

      <input
        className="admin-products-search"
        type="text"
        placeholder="🔍 Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="6">Aucun produit</td>
            </tr>
          ) : (
            filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} />
                </td>
                <td>{p.name}</td>
                <td>
                  {p.price} FCFA
                  {p.oldPrice && (
                    <div className="old-price">{p.oldPrice} FCFA</div>
                  )}
                </td>
                <td>{getCategoryLabel(p.category)}</td>
                <td>{p.stock || 0}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>✏️</button>
                  <button onClick={() => handleDelete(p.id)}>❌</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
