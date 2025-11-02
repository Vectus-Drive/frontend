import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api, { uploadImage } from "../../api/api";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  nic: yup
    .string()
    .required("NIC is required")
    .matches(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, "Invalid NIC format"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  address: yup.string().required("Address is required"),
  telephone_no: yup
    .string()
    .required("Telephone number is required")
    .matches(/^\d{10}$/, "Must be 10 digits"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "At least 6 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/\d/, "Must contain a number"),
  role: yup.string().default("employee"),
});

function AddEmployee({ onClose, onSave }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("../default-user.png");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return null;
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const res = await uploadImage(formData);
      return res?.image_url || res?.filename || null;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      const imageUrl = await handleImageUpload();
      const payload = {
        username: data.username,
        name: data.name,
        nic: data.nic,
        email: data.email,
        password: data.password,
        image: imageUrl || null,
        telephone_no: data.telephone_no,
        address: data.address,
        role: "employee",
      };

      const res = await api.post("/auth/register", payload);

      if (res?.data?.success) {
        toast.success("Employee added successfully!");
        reset();
        if (onSave) onSave(res.data.data || payload);
        onClose(); 
      } 
    } catch (error) {
      toast.error("Something went wrong while adding employee!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 relative">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Employee</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        >
          {/* Image Upload */}
          <div className="flex flex-col gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-300 shadow-sm">
              <img src={preview} alt="Profile" className="object-cover w-full h-full" />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 hover:opacity-100 cursor-pointer transition">
                <FaCloudUploadAlt className="text-2xl" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
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
                value="employee"
                disabled
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Other Fields */}
          <div className="flex flex-col gap-4">
            {["name", "username", "password", "email", "telephone_no", "address"].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-gray-700 capitalize">{field.replace("_", " ")}</label>
                {field === "address" ? (
                  <textarea
                    rows="2"
                    {...register(field)}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  ></textarea>
                ) : (
                  <input
                    type={field === "password" ? "password" : "text"}
                    {...register(field)}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
