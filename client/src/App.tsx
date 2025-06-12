import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routing/Routing";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
