import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import Header from "../Header";
import Footer from "../Footer";
import { CartProvider } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import api from "../../api/axiosInstance";

const Register1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.accessToken;
      const user = res.data.user;

      login(token, user);
      navigate("/"); // Redirection après enregistrement
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <CartProvider>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>
            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link
                to={routes.login}
                className="text-blue-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
};

export default Register1;
