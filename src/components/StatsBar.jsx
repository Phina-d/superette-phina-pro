import "../styles/StatsBar.css";

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stat">
        <h3>+500</h3>
        <p>Produits</p>
      </div>
      <div className="stat">
        <h3>+1200</h3>
        <p>Clients</p>
      </div>
      <div className="stat">
        <h3>+300</h3>
        <p>Commandes</p>
      </div>
      <div className="stat">
        <h3>24h/24</h3>
        <p>Service</p>
      </div>
    </div>
  );
}
