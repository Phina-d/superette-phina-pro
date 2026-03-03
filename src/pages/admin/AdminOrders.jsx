import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../data/ordersManager";
import { exportOrdersPDF, exportOrdersExcel } from "../../utils/exportUtils";
import "../../styles/AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const refresh = () => setOrders(getOrders());

  const changeStatus = (id, status) => {
    updateOrderStatus(id, status);
    refresh();
  };

  return (
    <div className="admin-page">
      <h2>📦 Commandes</h2>

      <div className="admin-export">
        <button onClick={() => exportOrdersPDF(orders)}>📄 Export PDF</button>
        <button onClick={() => exportOrdersExcel(orders)}>📊 Export Excel</button>
      </div>

      <div className="admin-orders-wrapper">
        {orders.length === 0 ? (
          <p>Aucune commande</p>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="admin-order-card">
              <div className="order-row">
                <span className="label">ID:</span>
                <span>{o.id}</span>
              </div>
              <div className="order-row">
                <span className="label">Date:</span>
                <span>{o.date}</span>
              </div>
              <div className="order-row">
                <span className="label">Total:</span>
                <span>{o.total || 0} FCFA</span>
              </div>
              <div className="order-row">
                <span className="label">Statut:</span>
                <span
                  className={`admin-status ${
                    o.status === "Livré"
                      ? "livre"
                      : o.status === "Annulé"
                      ? "annule"
                      : "en-cours"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <div className="order-row">
                <span className="label">Action:</span>
                <select
                  value={o.status}
                  onChange={(e) => changeStatus(o.id, e.target.value)}
                >
                  <option>En cours</option>
                  <option>Livré</option>
                  <option>Annulé</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}