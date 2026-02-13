import React, { useEffect, useState } from "react";
import { getProducts } from "../../data/productsManager";
import { getOrders } from "../../data/ordersManager";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../../styles/AdminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const products = getProducts() || [];
    const orders = getOrders() || [];

    const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

    setStats({
      products: products.length,
      orders: orders.length,
      revenue,
    });
  }, []);

  const chartData = {
    labels: ["Produits", "Commandes", "Revenus"],
    datasets: [
      {
        label: "Statistiques",
        data: [stats.products, stats.orders, stats.revenue],
        backgroundColor: ["#ff7a00", "#2563eb", "#16a34a"],
        borderRadius: 10,
        barThickness: 50,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">📊 Dashboard Admin</h2>

      {/* Cards stats */}
      <div className="stats-grid">
        <div className="stat-box orange">
          <div className="stat-icon">🛍️</div>
          <div>
            <p>Produits</p>
            <h3>{stats.products}</h3>
          </div>
        </div>

        <div className="stat-box blue">
          <div className="stat-icon">📦</div>
          <div>
            <p>Commandes</p>
            <h3>{stats.orders}</h3>
          </div>
        </div>

        <div className="stat-box green">
          <div className="stat-icon">💰</div>
          <div>
            <p>Revenus</p>
            <h3>{stats.revenue.toLocaleString()} FCFA</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-card">
        <h3>📈 Statistiques globales</h3>
        <div style={{ height: "320px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
