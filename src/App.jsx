import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// ===== PAGES ADMIN =====
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminClients from "./pages/admin/AdminClients";
import AdminGuard from "./components/AdminGuard";
import AdminLogin from "./pages/admin/AdminLogin";
import Support from "./pages/Support";
import ScrollTopButton from "./components/ScrollTopButton";
import AdminOnly from "./components/AdminOnly";

// ===== PAGES CLIENT =====
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Promo from "./pages/Promo";
import CGV from "./pages/CGV";
import Orders from "./pages/Orders";
import EditProfile from "./pages/EditProfile";

// ===== COMPONENTS =====
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        {/* 🌍 ROUTES CLIENT */}
        <Route path="/" element={<Home search={search} />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<Help />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/support" element={<Support />} />
        <Route path="/orders" element={<Orders />} />
        <Route
  path="/profile"
  element={
    <AdminGuard>
      <Profile />
    </AdminGuard>
  }
/>

<Route
  path="/edit-profile"
  element={
    <AdminGuard>
      <EditProfile />
    </AdminGuard>
  }
/>


        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 ROUTES ADMIN PROTÉGÉES */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="clients" element={<AdminClients />} />
        </Route>
      </Routes>
      
     <ScrollTopButton />
      <Footer />
    </div>
  );
}
