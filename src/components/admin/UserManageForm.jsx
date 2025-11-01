import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  nic: yup
    .string()
    .required("NIC is required")
    .matches(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, "Invalid NIC format"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  address: yup.string().required("Address is required"),
  telephone_no: yup.string().required("Telephone number is required").matches(/^\d{10}$/, "Must be 10 digits"),
  username: yup.string().required("Username is required"),
  role: yup.string().required(),
  image: yup.string(),
});

function UserManageForm({ user, role, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset({
        id: user.user?.u_id || "",
        name: user.name || "",
        nic: user.nic || "",
        email: user.email || "",
        address: user.address || "",
        telephone_no: user.telephone_no || "",
        username: user.user?.username || "",
        role: user.user?.role || role || "customer",
        image: user.image || "",
      });
    }
  }, [user, reset, role]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      user: {
        u_id: user.user?.u_id,
        username: data.username,
        role: data.role,
      },
      image: data.image || user.image,
    };

    if (onSave) onSave(formattedData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 relative">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit {user.user?.role === "employee" ? "Employee" : "Customer"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300 shadow-sm">
              <img
                src={user.image || "../default-user.png"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">NIC</label>
              <input
                type="text"
                {...register("nic")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                {...register("role")}
                disabled
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                {...register("username")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Telephone No</label>
              <input
                type="tel"
                {...register("telephone_no")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.telephone_no && <p className="text-red-500 text-sm mt-1">{errors.telephone_no.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <textarea
                rows="2"
                {...register("address")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserManageForm;
