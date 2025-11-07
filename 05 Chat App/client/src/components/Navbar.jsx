import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleLogout } from "../store/slices/authSlice"

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo / Brand Name */}
      <div className="flex items-center space-x-3">
        <Link to={"/"}>
          <img
            src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
            alt="Logo"
            className="w-9 h-9 object-cover rounded-full"
          />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          My App
        </h1>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex items-center space-x-8 text-gray-600 dark:text-gray-300 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-600 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
      </div>

      {/* Right Section - User Options */}
      <div className="flex items-center space-x-4">
        {authUser ? (
          <>
            <Link
              to="/messages"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <MessageSquare className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                Messages
              </span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                Settings
              </span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                Profile
              </span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-600 text-white hover:bg-blue-600 hover:text-white transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
