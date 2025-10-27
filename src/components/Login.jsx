import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[90%] max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-wide mb-2">
          <span className="text-orange-500 font-bold">VECTUS</span>
          <span className="text-white">DRIVE</span>
        </h1>
        <h2 className="text-3xl font-bold text-white mb-1">PremiumDrive</h2>

        <form className="space-y-5">
          <div className="text-left">
            <input
              type="email"
              placeholder="Enter your username"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
            />
          </div>
          <div className="text-left relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-semibold tracking-wide transition-all shadow-md hover:shadow-lg"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-8">
          Don’t have an account?
        </p>
        <Link
          to="/register"
          className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white transition-all py-2 px-6 mt-2 rounded-md text-sm font-medium"
        >
          CREATE ACCOUNT
        </Link>
      </div>
    </div>
  );
}

export default Login;
