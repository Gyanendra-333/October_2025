import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md mb-2">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome Back 👋</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Please login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50 dark:bg-gray-900">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormdata({ ...formData, email: e.target.value })}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50 dark:bg-gray-900">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
