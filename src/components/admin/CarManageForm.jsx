import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import api , {uploadImage} from "../../api/api";

const carSchema = yup.object().shape({
  license_no: yup.string().required("License number is required"),
  make: yup.string().required("Make is required"),
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
  condition: yup.string().required("Car condition is required"),
  availability_status: yup.boolean(),
});

export default function CarManageForm({ car, onClose, onSaved }) {
  const isEdit = !!car;

  const [previewImage, setPreviewImage] = useState(car?.image || "");
  const [selectedFile, setSelectedFile] = useState(null);
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
      license_no: car?.license_no || "",
      make: car?.make || "",
      model: car?.model || "",
      fuelType: car?.fuel || "",
      transmission: car?.transmission || "",
      seats: car?.seats || "",
      doors: car?.doors || "",
      price: car?.price_per_day || "",
      features: Array.isArray(car?.features)
        ? car.features.join(", ")
        : car?.features || "",
      description: car?.description || "",
      condition: car?.condition || "Excellent",
      availability_status: car?.availability_status ?? true,
    },
  });

  // Handle selecting a new image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // store file for upload
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Upload image and return URL
  const handleImageUpload = async () => {
    if (!selectedFile) return car?.image || null; // keep existing image if no new file

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await uploadImage(formData, isEdit ? car.car_id : null);
      return res.image_url || res.filename || null; // adjust according to backend
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed!");
      return null;
    }
  };

  // Submit form
  const onSubmit = async (data) => {
    try {
      const uploadedImage = await handleImageUpload();

      const payload = {
        license_no: data.license_no,
        make: data.make,
        model: data.model,
        fuel: data.fuelType,
        transmission: data.transmission,
        seats: data.seats,
        doors: data.doors,
        price_per_day: data.price,
        features: data.features
          ? data.features.split(",").map((f) => f.trim())
          : [],
        description: data.description,
        image: uploadedImage,
        condition: data.condition,
        availability_status: data.availability_status,
      };

      let res;
      if (isEdit) {
        res = await api.put(`/cars/${car.car_id}`, payload);
        toast.success("🚗 Car updated successfully!");
      } else {
        res = await api.post("/cars", payload);
        toast.success("🚗 Car added successfully!");
      }

      onSaved(res.data);
      reset();
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save car");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative flex p-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-[#0f172a] text-white"
        }
      />

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
            {/* Left side - Image & Description */}
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

            {/* Right side - Car Details */}
            <div className="flex flex-col gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  License Number
                </label>
                <input
                  type="text"
                  {...register("license_no")}
                  placeholder="e.g. ADD3005"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {errors.license_no && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.license_no.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Make
                  </label>
                  <input
                    type="text"
                    {...register("make")}
                    placeholder="e.g. Toyota"
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  {errors.make && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.make.message}
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
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
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
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Key Features
                </label>
                <input
                  type="text"
                  {...register("features")}
                  placeholder="Air Conditioning, Bluetooth, Backup Camera"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <select
                    {...register("condition")}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Needs Maintenance">Needs Maintenance</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <label className="text-sm font-medium text-gray-700">
                    Available
                  </label>
                  <input
                    type="checkbox"
                    {...register("availability_status")}
                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t col-span-full">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg"
              >
                {isEdit ? "Save Changes" : "Add Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
