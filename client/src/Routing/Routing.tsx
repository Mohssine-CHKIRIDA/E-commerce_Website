import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import Login1 from "../components/LoginRegister/Login1";
import Register1 from "../components/LoginRegister/Register1";
import ProductsListing from "../components/ProductsListing/ProductsListing";

type RoutePath = (id: string | number) => string;

export const routes: {
  home: string;
  login: string;
  register: string;
  product: RoutePath;
} = {
  home: "/",
  login: "/login",
  register: "/register",
  product: (id) => `/products/${id}`,
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<MainPage />} />
      <Route path="/products" element={<ProductsListing />} />
      <Route path={routes.login} element={<Login1 />}></Route>
      <Route path={routes.register} element={<Register1 />}></Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
