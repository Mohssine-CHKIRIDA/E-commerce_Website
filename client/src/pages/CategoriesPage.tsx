import { CartProvider } from "../components/Cart/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CategoriesPage() {
  return (
    <>
      <CartProvider>
        <Header />
        <Footer />
      </CartProvider>
    </>
  );
}
