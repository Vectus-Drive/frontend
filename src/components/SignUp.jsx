import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[45%] text-center">
        <h1 className="text-2xl font-semibold tracking-wide mb-1">
          <span className="text-orange-500 font-bold">VECTUS</span>
          <span className="text-white">DRIVE</span>
        </h1>
        <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
        <p className="text-gray-400 text-sm mb-8">Join the PremiumDrive family</p>

        <div className="flex justify-center mb-8">
          <label className="relative cursor-pointer">
            <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-gray-600 hover:border-orange-500 transition-all">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FaUpload className="text-2xl mb-1" />
                  <span className="text-xs">Upload</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="space-y-5 text-left mx-auto w-full md:w-[90%]">
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-300 text-sm">NIC</label>
              <input
                type="text"
                placeholder="Enter your NIC"
                className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Telephone No</label>
              <input
                type="tel"
                placeholder="Enter your telephone number"
                className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Address</label>
            <textarea
              placeholder="Enter your address"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
              rows="2"
            ></textarea>
          </div>

          <div className="relative">
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label className="text-gray-300 text-sm">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-9 text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-semibold tracking-wide transition-all shadow-md hover:shadow-lg mt-4"
          >
            SIGN UP
          </button>
        </form>

        <div className="mt-8">
          <p className="text-gray-400 text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white transition-all py-2 px-6 mt-2 rounded-md text-sm font-medium"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
