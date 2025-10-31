import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const carSchema = yup.object().shape({
  brand: yup.string().required("Brand is required"),
  model: yup.string().required("Model is required"),
  fuelType: yup.string().required("Fuel type is required"),
  transmission: yup.string().required("Transmission is required"),
  seats: yup
    .number()
    .typeError("Seats must be a number")
    .min(1, "Must have at least 1 seat")
    .required("Number of seats is required"),
  doors: yup
    .number()
    .typeError("Doors must be a number")
    .min(1, "Must have at least 1 door")
    .required("Number of doors is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price per day is required"),
  features: yup.string().nullable(),
  description: yup.string().max(500, "Description too long"),
  image: yup.string().required("Car image is required"),
});

export default function CarManageForm({ car, onClose }) {
  const isEdit = !!car;
  const [previewImage, setPreviewImage] = useState(car?.image || "");
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(carSchema),
    defaultValues: {
      brand: car?.make || "",
      model: car?.model || "",
      fuelType: car?.fuel || "",
      transmission: car?.transmission || "",
      seats: car?.seats || "",
      doors: car?.doors || "",
      price: car?.price_per_day || "",
      features: car?.features || "",
      description: car?.description || "",
      image: car?.image || "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("image", file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log("🚗 Car Form Submitted:", { ...data, image: previewImage });
    alert(`${isEdit ? "Car updated" : "Car added"} successfully!`);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] p-6 relative">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Car Details" : "Add New Car"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div className="flex flex-col items-center md:items-start">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Car Image
            </label>
            <div
              className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center overflow-hidden bg-gray-50 hover:border-orange-500 transition cursor-pointer shadow-sm"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-center text-gray-400 p-2">
                  <FaCloudUploadAlt className="text-3xl mx-auto mb-1" />
                  <span className="text-sm">Click to Upload</span>
                  <span className="block text-xs mt-1">(Max 5MB)</span>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">
                {errors.image.message}
              </p>
            )}

            <div className="w-full mt-6">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Write a brief description of the car..."
                rows="4"
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              ></textarea>
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  {...register("brand")}
                  placeholder="e.g. Toyota"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.brand && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  {...register("model")}
                  placeholder="e.g. Corolla"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.model && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.model.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Fuel Type
                </label>
                <select
                  {...register("fuelType")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>

                {errors.fuelType && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.fuelType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <input
                  type="text"
                  {...register("transmission")}
                  placeholder="Automatic / Manual"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.transmission && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.transmission.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Seats
                </label>
                <input
                  type="number"
                  {...register("seats")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.seats && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.seats.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Doors
                </label>
                <input
                  type="number"
                  {...register("doors")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.doors && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.doors.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Price per Day (Rs)
                </label>
                <input
                  type="number"
                  {...register("price")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.price && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Key Features
              </label>
              <input
                type="text"
                {...register("features")}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg"
          >
            {isEdit ? "Save Changes" : "Add Car"}
          </button>
        </div>
      </div>
    </div>
  );
}
