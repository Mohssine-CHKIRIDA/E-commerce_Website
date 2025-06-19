import { useState, useRef } from "react";
import { BsCart3 } from "react-icons/bs";
import CartSlide from "./CartSlide";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  const count = cartItems.length;

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/cart">
        <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-indigo-100 hover:text-orange-500 cursor-pointer">
          <div className="relative">
            <BsCart3 size={24} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {count}
              </span>
            )}
          </div>
          <p className="mb-0">Cart</p>
        </div>
      </Link>

      {isOpen && <CartSlide isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
