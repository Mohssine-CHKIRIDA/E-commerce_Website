import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import Login1 from "../components/LoginRegister/Login1";
import Register1 from "../components/LoginRegister/Register1";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductReviewPage from "../pages/ProductReviewPage";

import slugify from "slugify";

const slugifyParam = (text: string | number) =>
  slugify(String(text), { lower: true, strict: true });

export type RoutePath = (param: string | number, subparam?: string) => string;

// eslint-disable-next-line react-refresh/only-export-components
export const routes: {
  home: string;
  login: string;
  register: string;
  cart: string;
  all: string;
  category: RoutePath;
  product: RoutePath;
  subcategory: RoutePath;
} = {
  home: "/",
  login: "/login",
  register: "/register",
  cart: "/cart",
  all: "/products",
  category: (name) => `/products/${slugifyParam(name)}`,
  product: (id) => `/product/${slugifyParam(id)}`,
  subcategory: (cat, sub) =>
    `/products/${slugifyParam(cat)}/${slugifyParam(sub)}`,
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<MainPage />} />
      <Route path={routes.login} element={<Login1 />} />
      <Route path={routes.register} element={<Register1 />} />
      <Route path={routes.cart} element={<CartPage />} />

      {/* Category routes using ProductsListing */}
      <Route path={routes.all} element={<CategoriesPage />} />
      <Route path="/products/:name" element={<CategoriesPage />} />
      <Route path="/products/:parent/:child" element={<CategoriesPage />} />

      {/* Product review */}
      <Route path="/product/:id" element={<ProductReviewPage />} />

      {/* Fallback route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
