import { BsCart3 } from "react-icons/bs";

export default function Cart() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-orange-500 cursor-pointer">
      <BsCart3 size={24} />
      <p className="mb-0">Cart</p>
    </div>
  );
}
