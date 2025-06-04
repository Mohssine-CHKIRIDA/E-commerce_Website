import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routing/Routing";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
