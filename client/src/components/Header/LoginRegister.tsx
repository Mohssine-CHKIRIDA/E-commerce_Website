import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import { useAuth } from "../../Context/AuthContext";

export default function LoginRegister() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-indigo-100 hover:text-orange-500 cursor-pointer">
      <IoPersonOutline size={24} />
      {isAuthenticated ? (
        <Link to={routes.account}>Account</Link>
      ) : (
        <Link to={routes.login}>Login/Register</Link>
      )}
    </div>
  );
}
