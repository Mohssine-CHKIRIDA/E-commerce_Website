// src/layouts/ProductsLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../Context/CartContext";
import { Toaster } from "react-hot-toast";

export default function ProductsLayout() {
  return (
    <CartProvider>
      <Header />
      <Toaster position="top-right" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
}
