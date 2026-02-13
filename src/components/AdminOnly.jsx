import { Navigate } from "react-router-dom";

export default function AdminOnly({ children }) {
  const isAdmin = localStorage.getItem("admin_auth") === "true";

   if (!isAuth) {
  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h2>🚫 Accès réservé à l'administrateur</h2>
      <p>Veuillez vous connecter.</p>
    </div>
  );
}

  return children;
}
