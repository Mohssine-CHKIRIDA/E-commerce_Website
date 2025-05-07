import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routing/Routing";
import { CartProvider } from "./components/Cart/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
