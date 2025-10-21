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

  // Helper function for the eye icon click handler
  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-full text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Increased overall container width slightly to prevent squishing */}
      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] md:w-[65%] lg:w-[50%] xl:w-[45%] text-center">
        <h1 className="text-2xl font-semibold tracking-wide mb-1">
          <span className="text-orange-500 font-bold">VECTUS</span>
          <span className="text-white">DRIVE</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6">Join the PremiumDrive family</p>

        <form className="space-y-4 text-left">
          {/* Main two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* === Left Side: Image Upload and Basic Info === */}
            <div className="space-y-4">
              {/* Image Upload is a consistent height */}
              <div className="flex justify-center mb-4">
                <label className="relative cursor-pointer">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-gray-600 hover:border-orange-500 transition-all">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <FaUpload className="text-xl md:text-2xl mb-1" />
                        <span className="text-xs">Upload Profile</span>
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

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="text-gray-300 text-sm">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
              </div>

              {/* NIC */}
              <div>
                <label htmlFor="nic" className="text-gray-300 text-sm">NIC</label>
                <input
                  id="nic"
                  type="text"
                  placeholder="Enter your NIC"
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
              </div>

              {/* Telephone No */}
              <div>
                <label htmlFor="telNo" className="text-gray-300 text-sm">Telephone No</label>
                <input
                  id="telNo"
                  type="tel"
                  placeholder="Enter your telephone number"
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* === Right Side: Contact and Credentials === */}
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-gray-300 text-sm">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
              </div>

              {/* Address - Changed to rows="2" for better alignment */}
              <div>
                <label htmlFor="address" className="text-gray-300 text-sm">Address</label>
                <textarea
                  id="address"
                  placeholder="Enter your address"
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all resize-none"
                  rows="2" // Adjusted rows for better vertical balance
                ></textarea>
              </div>
              
              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="text-gray-300 text-sm">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-2.5 md:p-3 pr-10 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                <span
                  onClick={() => togglePasswordVisibility(setShowPassword)}
                  // Adjusted top position to be consistent with the field height
                  className="absolute right-3 top-[37px] md:top-[41px] text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="text-gray-300 text-sm">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full p-2.5 md:p-3 pr-10 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                <span
                  onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                  // Adjusted top position to be consistent with the field height
                  className="absolute right-3 top-[37px] md:top-[41px] text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            
          </div>
          {/* End of two-column layout */}

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 md:py-3 rounded-md font-semibold tracking-wide transition-all shadow-md hover:shadow-lg mt-6"
          >
            SIGN UP
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white transition-all py-1.5 px-5 mt-2 rounded-md text-sm font-medium"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;