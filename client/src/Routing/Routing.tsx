import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import Login1 from "../components/LoginRegister/Login1";
import Register1 from "../components/LoginRegister/Register1";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductReviewPage from "../pages/ProductReviewPage";
import slugify from "slugify";
import AccountPage from "../pages/AccountPage";
import Dashboard from "../pages/Dashboard";
import ProductsLayout from "../pages/CategoriesPage"; // <--- nouvelle ligne
import ProductsListing from "../components/ProductsListing/ProductsListing";

const slugifyParam = (text: string | number) =>
  slugify(String(text), { lower: true, strict: true });

type SingleParamPath = (param: string | number) => string;
type DualParamPath = (
  param1: string | number,
  param2: string | number
) => string;

// eslint-disable-next-line react-refresh/only-export-components
export const routes: {
  home: string;
  login: string;
  register: string;
  cart: string;
  all: string;
  account: string;
  dashboard: string;
  category: SingleParamPath;
  product: SingleParamPath;
  subcategory: DualParamPath;
} = {
  home: "/",
  login: "/login",
  register: "/register",
  cart: "/cart",
  all: "/products",
  account: "/account",
  dashboard: "/dashboard",
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
      <Route path={routes.account} element={<AccountPage />} />
      <Route path={routes.dashboard} element={<Dashboard />} />
      <Route path={routes.cart} element={<CartPage />} />

      {/* Layout pour les produits */}
      <Route path="/products" element={<ProductsLayout />}>
        <Route index element={<ProductsListing />} /> {/* /products */}
        <Route path=":category" element={<ProductsListing />} />{" "}
        {/* /products/:category */}
        <Route
          path=":category/:subcategory"
          element={<ProductsListing />}
        />{" "}
        {/* /products/:category/:subcategory */}
      </Route>

      <Route path="/search" element={<CategoriesPage />} />
      <Route path="/product/:id" element={<ProductReviewPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
