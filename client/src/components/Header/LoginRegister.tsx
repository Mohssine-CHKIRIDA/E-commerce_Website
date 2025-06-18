import { IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import { useAuth } from "../../Context/AuthContext";

export default function LoginRegister() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-indigo-100 hover:text-orange-500 cursor-pointer px-2 py-1 rounded">
        <IoPersonOutline size={24} />
        {isAuthenticated ? (
          <span>Account</span>
        ) : (
          <Link to={routes.login}>Login/Register</Link>
        )}
      </div>

      {isAuthenticated && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 shadow-md rounded-md z-20 hidden group-hover:block">
          <Link
            to={routes.account}
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
