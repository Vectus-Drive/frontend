import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import OTPModal from "../OTPModal";
import { generateOTP, updateUser } from "../../api/api";

export default function ChangePassword({ setShowPasswordModal, userData, id }) {
  const [showOTP, setShowOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // ✅ Eye toggle states
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const schema = yup.object().shape({
    newPass: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm: yup
      .string()
      .oneOf([yup.ref("newPass")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setNewPassword(data.newPass);
    generateOTP(userData.email).then((res) => console.log("OTP sent:", res));
    setShowOTP(true);
  };

  useEffect(() => {
    if (otpVerified) {
      const data = { password: newPassword };
      updateUser(data, id)
        .then((res) => {
          console.log("Password updated successfully:", res);
          setShowPasswordModal(false);
          reset();
        })
        .catch((err) => console.error("Failed to update password:", err));
    }
  }, [otpVerified]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-800 text-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative space-y-4 border border-slate-700"
        >
          <button
            type="button"
            onClick={() => setShowPasswordModal(false)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Change Password
          </h2>

          {/* New Password */}
          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              placeholder="New Password"
              {...register("newPass")}
              className={`w-full px-3 py-2 rounded-lg bg-slate-700 border ${
                errors.newPass
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-600 focus:ring-orange-500"
              } focus:outline-none focus:ring-2 text-white`}
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400 hover:text-white"
            >
              {showNewPass ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.newPass && (
              <p className="text-red-400 text-sm mt-1">{errors.newPass.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirm")}
              className={`w-full px-3 py-2 rounded-lg bg-slate-700 border ${
                errors.confirm
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-600 focus:ring-orange-500"
              } focus:outline-none focus:ring-2 text-white`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400 hover:text-white"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirm && (
              <p className="text-red-400 text-sm mt-1">{errors.confirm.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>

      {showOTP && (
        <OTPModal
          show={showOTP}
          setShow={setShowOTP}
          setOtpVerified={setOtpVerified}
          userData={userData}
        />
      )}
    </>
  );
}
