import { BsCart3 } from "react-icons/bs";
import CartSlide from "./CartSlide";
import { useState } from "react";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm text-gray-800 hover:bg-indigo-100 hover:text-orange-500 cursor-pointer"
      >
        <BsCart3 size={24} />
        <p className="mb-0">Cart</p>
      </div>

      <CartSlide isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
