import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth") === "true";
    setIsAdmin(auth);
  }, []);

  const login = () => {
    localStorage.setItem("admin_auth", "true");
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
