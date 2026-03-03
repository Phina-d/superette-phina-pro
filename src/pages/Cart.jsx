import React, { useEffect, useState, useContext } from "react";
import {
  getCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../data/cartManager";
import { addOrder } from "../data/ordersManager";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { downloadInvoicePDF } from "../utils/invoiceUtils";
import "../styles/Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { updateCounts } = useContext(CartContext);

  // 👤 Infos client
  const [client, setClient] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 🚚 Livraison
  const [deliveryMode, setDeliveryMode] = useState("home");

  const zones = [
    { name: "Plateau", price: 2500 },
    { name: "Dakar", price: 1500 },
    { name: "Pikine", price: 2000 },
    { name: "Guédiawaye", price: 1800 },
    { name: "Tivaouane Peulh", price: 1000 },
  ];

  const [zone, setZone] = useState(zones[0]);

  const refresh = () => {
    setCart(getCart());
    updateCounts();
  };

  useEffect(() => {
    refresh();
  }, []);

  const subtotal = cart.reduce((sum, p) => sum + Number(p.price) * p.qty, 0);
  const deliveryFee = deliveryMode === "pickup" ? 0 : zone.price;
  const total = subtotal + deliveryFee;

  // ✅ 🗑️ FONCTION VIDER PANIER
const handleClearCart = () => {
  if (!cart.length) {
    toast.error("Panier déjà vide ❌");
    return;
  }

  clearCart();
  setCart([]);
  updateCounts();

  toast.success("Panier vidé avec succès 🗑️");
};

  // 💬 WhatsApp message
  const cartList = cart
    .map((p) => `- ${p.name} x${p.qty} = ${p.price * p.qty} FCFA`)
    .join("\n");

  const whatsappMessage = `
🛒 COMMANDE SUPÉRETTE CHEZ PHINA

👤 Nom: ${client.name || "Non renseigné"}
📞 Téléphone: ${client.phone || "Non renseigné"}
📍 Adresse: ${client.address || zone.name}

📦 Produits:
${cartList}

💰 Sous-total: ${subtotal} FCFA
🚚 Livraison: ${deliveryFee} FCFA
✅ Total: ${total} FCFA
`;

  const whatsappUrl = `https://wa.me/221775664237?text=${encodeURIComponent(
    whatsappMessage
  )}`;

// 🧾 Facture PDF PREMIUM
const handleDownloadInvoice = () => {
  downloadInvoicePDF(cart, client, zone);
};

  const handleSaveOrder = () => {
  if (cart.length === 0) {
  toast.error("Panier vide ❌");
  return;
}

if (!client.name || !client.phone) {
  toast.warning("Remplissez nom et téléphone ⚠️");
  return;
}

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      client,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      status: "En cours",
    };

    addOrder(newOrder);

    const existingOrders =
      JSON.parse(localStorage.getItem("userOrders")) || [];

    localStorage.setItem(
      "userOrders",
      JSON.stringify([...existingOrders, newOrder])
    );

    clearCart();
    refresh();

    toast.success("Commande validée avec succès 🎉");
  };

  return (
    <div className="cart-page">
      <h2>🛒 Mon panier</h2>

      {cart.length === 0 ? (
        <p className="empty">Votre panier est vide.</p>
      ) : (
        <div className="cart-container">
          {/* 🛍️ LISTE PRODUITS */}
          <div className="cart-list">
            {cart.map((p) => (
              <div key={p.id} className="cart-item">
                <img src={p.image} alt={p.name} />

                <div className="cart-info">
                  <h4>{p.name}</h4>
                  <p>{p.price} FCFA</p>
                </div>

                <div className="cart-qty">
                  <button onClick={() => { decreaseQty(p.id); refresh(); }}>➖</button>
                  <span>{p.qty}</span>
                  <button onClick={() => { increaseQty(p.id); refresh(); }}>➕</button>
                </div>

                <div className="cart-subtotal">
                  {p.price * p.qty} FCFA
                </div>

                <button
                  className="cart-remove"
                  onClick={() => { removeFromCart(p.id); refresh(); }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* 💎 RÉSUMÉ COMMANDE */}
          <div className="cart-summary">
            <h3>🧾 Résumé de la commande</h3>

            <div className="summary-row">
              <span>Sous-total</span>
              <strong>{subtotal} FCFA</strong>
            </div>

            <div className="delivery-section">
              <p>🚚 Mode de réception</p>

              <select
                value={deliveryMode}
                onChange={(e) => setDeliveryMode(e.target.value)}
              >
                <option value="home">Livraison à domicile</option>
                <option value="pickup">Retrait sur place 🏪</option>
              </select>

              {deliveryMode === "home" && (
                <select
                  value={zone.name}
                  onChange={(e) =>
                    setZone(zones.find((z) => z.name === e.target.value))
                  }
                >
                  {zones.map((z) => (
                    <option key={z.name} value={z.name}>
                      {z.name} - {z.price} FCFA
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="summary-row">
              <span>Livraison</span>
              <strong>{deliveryFee} FCFA</strong>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <strong>{total} FCFA</strong>
            </div>

            <div className="client-section">
              <p>👤 Informations client</p>

              <input
                type="text"
                placeholder="Nom du client"
                value={client.name}
                onChange={(e) =>
                  setClient({ ...client, name: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="Téléphone"
                value={client.phone}
                onChange={(e) =>
                  setClient({ ...client, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Adresse"
                value={client.address}
                onChange={(e) =>
                  setClient({ ...client, address: e.target.value })
                }
              />
            </div>

            <div className="payment-section">
              <p>💳 Moyens de paiement (bientôt disponibles)</p>
              <div className="payment-icons">
                <span>💛 Wave</span>
                <span>🧡 Orange Money</span>
                <span>💙 Free Money</span>
              </div>
            </div>

           <button className="btn-invoice" onClick={handleDownloadInvoice}>
  🧾 Télécharger la facture PDF
</button>

            {/* ✅ BOUTON AJOUTÉ ICI */}
            <button className="btn-clear-cart" onClick={handleClearCart}>
              🗑️ Vider le panier
            </button>

            <button className="btn-save-order" onClick={handleSaveOrder}>
              ✅ Valider la commande
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-order"
            >
              💬 Commander via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}