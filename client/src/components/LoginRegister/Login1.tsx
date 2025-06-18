import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import Header from "../Header";
import Footer from "../Footer";
import { CartProvider } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import api from "../../api/axiosInstance";

const Login1: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data.accessToken;
      const user = res.data.user;

      login(token, user);

      if (user.role === "ADMIN") {
        navigate("/dashboard"); // ou la route exacte de ton tableau de bord admin
      } else {
        navigate("/"); // utilisateur classique
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <CartProvider>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          className="bg-white p-8 rounded-xl shadow-lg w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Log In
          </h2>

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Log In
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link
              to={routes.register}
              className="text-blue-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </CartProvider>
  );
};

export default Login1;
