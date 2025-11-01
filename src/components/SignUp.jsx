import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa";
import { uploadImage, signUpUser } from "../api/api.js"

// ✅ Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  nic: yup
    .string()
    .matches(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, "Enter a valid NIC number")
    .required("NIC is required"),
  telephone_no: yup
    .string()
    .matches(/^[0-9]{10}$/, "Telephone number must be 10 digits")
    .required("Telephone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  profileImage: yup
    .mixed()
    .notRequired()
    .test("fileType", "Only images are allowed", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),
});

function SignUp() {
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profileImage", [file]); // register file manually
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  const handleImageUpload = async (imgData) => {
    try {
      const formData = new FormData();
      formData.append("image", imgData[0]);

      const res = await uploadImage(formData);
      return res.image_url;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const onSubmit = async (data) => {
  try {
    const img_url = data.profileImage && data.profileImage.length > 0
      ? await handleImageUpload(data.profileImage)
      : null;

    const finalData = {
      ...data,
      image: img_url,
    };

    console.log(finalData);

    await signUpUser(finalData);
  } catch (err) {
    console.error(err);
  }
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

      <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] md:w-[65%] lg:w-[50%] xl:w-[45%] text-center">
        <h1 className="text-2xl font-semibold tracking-wide mb-1">
          <span className="text-orange-500 font-bold">VECTUS</span>
          <span className="text-white">DRIVE</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Join the PremiumDrive family
        </p>

        <form className="space-y-4 text-left" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              {/* Profile Upload */}
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
                    {...register("profileImage")}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.profileImage && (
                <p className="text-red-500 text-xs text-center">
                  {errors.profileImage.message}
                </p>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="text-gray-300 text-sm">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">{errors.fullName.message}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="text-gray-300 text-sm">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  {...register("username")}
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username.message}</p>
                )}
              </div>

              {/* NIC */}
              <div>
                <label htmlFor="nic" className="text-gray-300 text-sm">
                  NIC
                </label>
                <input
                  id="nic"
                  type="text"
                  placeholder="Enter your NIC"
                  {...register("nic")}
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                {errors.nic && (
                  <p className="text-red-500 text-xs">{errors.nic.message}</p>
                )}
              </div>

              {/* Telephone */}
              <div>
                <label htmlFor="telNo" className="text-gray-300 text-sm">
                  Telephone No
                </label>
                <input
                  id="telNo"
                  type="tel"
                  placeholder="Enter your telephone number"
                  {...register("telephone_no")}
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                {errors.telNo && (
                  <p className="text-red-500 text-xs">{errors.telNo.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-gray-300 text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="text-gray-300 text-sm">
                  Address
                </label>
                <textarea
                  id="address"
                  placeholder="Enter your address"
                  {...register("address")}
                  className="w-full p-2.5 md:p-3 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all resize-none"
                  rows="2"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className="text-gray-300 text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full p-2.5 md:p-3 pr-10 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                <span
                  onClick={() => togglePasswordVisibility(setShowPassword)}
                  className="absolute right-3 top-[37px] md:top-[41px] text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="text-gray-300 text-sm">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  className="w-full p-2.5 md:p-3 pr-10 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-all"
                />
                <span
                  onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                  className="absolute right-3 top-[37px] md:top-[41px] text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

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
