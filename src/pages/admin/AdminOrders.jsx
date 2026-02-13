import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../data/ordersManager";
import { exportOrdersPDF, exportOrdersExcel } from "../../utils/exportUtils";

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
    <div style={{ padding: 30 }}>
      <h2>📦 Commandes</h2>
<div style={{ marginBottom: 15 }}>
  <button onClick={() => exportOrdersPDF(orders)}>📄 Export PDF</button>
  <button onClick={() => exportOrdersExcel(orders)}>📊 Export Excel</button>
</div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">Aucune commande</td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.date}</td>
                <td>{o.total || 0} FCFA</td>
                <td>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      background:
                        o.status === "Livré"
                          ? "#22c55e"
                          : o.status === "Annulé"
                          ? "#ef4444"
                          : "#facc15",
                      color: "#fff",
                    }}
                  >
                    {o.status}
                  </span>
                </td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => changeStatus(o.id, e.target.value)}
                  >
                    <option>En cours</option>
                    <option>Livré</option>
                    <option>Annulé</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
