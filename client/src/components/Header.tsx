import Cart from "./Header/Cart";
import Help from "./Header/Help";
import LoginRegister from "./Header/LoginRegister";
import SearchBar from "./Header/SearchBar";

export default function Header() {
  return (
    <header className="px-3 py-2 bg-gray-100">
      <div className="container-fluid flex flex-wrap items-center justify-between">
        <div className="font-bold text-xl flex-grow">
          {/* MyBrand */}
          MyBrand
        </div>

        <div className="flex-grow d-flex justify-center my-2 lg:my-0">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3 flex-grow justify-end flex-wrap">
          <LoginRegister />
          <Help />
          <Cart />
        </div>
      </div>
    </header>
  );
}
