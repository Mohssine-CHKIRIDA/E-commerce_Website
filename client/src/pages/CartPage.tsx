import CartPageIntern from "../components/Cart/Cart";
import { CartProvider } from "../Context/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage() {
  return (
    <>
      <CartProvider>
        <Header />
        <CartPageIntern />
        <Footer />
      </CartProvider>
    </>
  );
}
