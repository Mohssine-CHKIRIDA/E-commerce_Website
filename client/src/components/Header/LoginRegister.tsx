import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";

export default function LoginRegister() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-indigo-100 hover:text-orange-500 cursor-pointer">
      <Link to={routes.login}>
        <IoPersonOutline size={24} />
      </Link>
      <Link to={routes.login}>
        <p className="mb-0">Login/Register</p>
      </Link>
    </div>
  );
}
