import Cart from "./Cart/CartIcon";
import Help from "./Header/Help";
import LoginRegister from "./Header/LoginRegister";
import SearchBar from "./Header/SearchBar";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="px-4 py-3 bg-indigo-100 sticky top-0 z-20 transition-all duration-300 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="font-bold text-xl w-full md:w-1/4">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 transition-colors flex items-center"
          >
            <ShoppingBag className="mr-2 w-6 h-6" />
            MyBrand
          </a>
        </div>

        <div className="w-full md:w-2/4 my-2 md:my-0">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4 justify-end w-full md:w-1/4">
          <LoginRegister />
          <Help />
          <Cart />
        </div>
      </div>
    </header>
  );
}
