import { useEffect, useState } from "react";
import "../styles/Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];

    const updated = savedOrders.map((order) => {
      const orderDate = new Date(order.date);
      const today = new Date();
      const diffDays = (today - orderDate) / (1000 * 60 * 60 * 24);

      if (diffDays >= 2 && order.status === "En cours") {
        return { ...order, status: "Livrée" };
      }

      return order;
    });

    setOrders(updated);
    localStorage.setItem("userOrders", JSON.stringify(updated));
  }, []);


  const handleCancel = (id) => {
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: "Annulée" } : o
    );

    setOrders(updatedOrders);
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));

    // ✅ Fermer les détails si ouverts
    if (openOrder === id) {
      setOpenOrder(null);
    }
  };


  const getProgress = (status) => {
    if (status === "En cours") return 33;
    if (status === "Expédiée") return 66;
    if (status === "Livrée") return 100;
    return 0;
  };

  return (
    <div className="orders-page">
      <h1>📦 Mes commandes</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${order.status?.toLowerCase()}`}
            >

              <div className="order-header">
                <div>
                  <strong>Commande #{order.id}</strong>
                  <p className="order-date">🗓 {order.date}</p>
                </div>

                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {/* Barre de progression */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${getProgress(order.status)}%` }}
                ></div>
              </div>

              <div className="order-summary">
                <p><strong>Total :</strong> {order.total} FCFA</p>
                <p><strong>Articles :</strong> {order.items.length}</p>
              </div>

              <button
                className="btn-details"
                onClick={() => {
                  if (order.status !== "Annulée") {
                    setOpenOrder(openOrder === order.id ? null : order.id);
                  }
                }}
              >
                {openOrder === order.id ? "❌ Fermer" : "👁 Voir détails"}
              </button>

              <button
                className="btn-invoice-small"
                onClick={() => window.print()}
              >
                🧾 Télécharger facture
              </button>


              {order.status === "En cours" && (
                <button
                  className="btn-cancel"
                  onClick={() => handleCancel(order.id)}
                >
                  ❌ Annuler la commande
                </button>
              )}

              {openOrder === order.id && (
                <div className="order-details">
                  {order.items.map((item) => (
                    <div key={item.id} className="detail-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <p>{item.qty} x {item.price} FCFA</p>
                      </div>
                      <strong>{item.qty * item.price} FCFA</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
