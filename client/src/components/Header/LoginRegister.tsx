import { IoPersonOutline } from "react-icons/io5";

export default function LoginRegister() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-orange-500 cursor-pointer">
      <IoPersonOutline size={24} />
      <p className="mb-0">Login/Register</p>
    </div>
  );
}
