import { CartProvider } from "../Context/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsListing from "../components/ProductsListing/ProductsListing";

export default function CategoriesPage() {
  return (
    <>
      <CartProvider>
        <Header />
        <ProductsListing />
        <Footer />
      </CartProvider>
    </>
  );
}
