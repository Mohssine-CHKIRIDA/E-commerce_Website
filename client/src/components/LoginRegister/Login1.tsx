import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import Footer from "../Footer";
import Header from "../Header";
import { CartProvider } from "../Cart/CartContext";

const Login1: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
    // Handle login logic here
    alert(`Logged in with email: ${email}`);
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

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Log In
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 font-semibold hover:underline">
              <Link to={routes.register}>Register</Link>
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </CartProvider>
  );
};

export default Login1;
