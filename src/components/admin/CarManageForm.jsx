import { useState, useRef } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useFormik } from "formik";

export default function CarManageForm({ car, onClose }) {
  const isEdit = !!car;
  const [previewImage, setPreviewImage] = useState(car?.image || "");
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
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
    validate: (values) => {
      const errors = {};
      if (!values.brand) errors.brand = "Brand is required";
      if (!values.model) errors.model = "Model is required";
      if (!values.fuelType) errors.fuelType = "Fuel type is required";
      if (!values.transmission) errors.transmission = "Transmission is required";
      if (!values.price) errors.price = "Price per day is required";
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      console.log("🚗 Car Form Submitted:", { ...values, image: previewImage });
      alert(`${isEdit ? "Car updated" : "Car added"} successfully!`);
      resetForm();
      onClose();
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        formik.setFieldValue("image", `./upload/${file.name}`);
        console.log("Simulated uploaded image path:", `./upload/${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] p-6 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Car Details" : "Add New Car"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          <div className="flex flex-col items-center md:items-start order-1">
            <label className="text-sm font-medium text-gray-700 mb-2">Car Image</label>
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
                <img src={previewImage} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <div className="text-center text-gray-400 p-2">
                  <FaCloudUploadAlt className="text-3xl mx-auto mb-1" />
                  <span className="text-sm">Click to Upload</span>
                  <span className="block text-xs mt-1">(Max 5MB)</span>
                </div>
              )}
            </div>

            <div className="w-full mt-6">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...formik.getFieldProps("description")}
                placeholder="Write a brief description of the car..."
                rows="4"
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col gap-6 order-2">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Brand</label>
                <input
                  type="text"
                  {...formik.getFieldProps("brand")}
                  placeholder="e.g. Toyota"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {formik.touched.brand && formik.errors.brand && (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.brand}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  {...formik.getFieldProps("model")}
                  placeholder="e.g. Corolla"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
                {formik.touched.model && formik.errors.model && (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.model}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Fuel Type</label>
                <select
                  {...formik.getFieldProps("fuelType")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="" disabled>Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
                {formik.touched.fuelType && formik.errors.fuelType && (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.fuelType}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Transmission</label>
                <input
                  type="text"
                  {...formik.getFieldProps("transmission")}
                  placeholder="Automatic / Manual"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Seats</label>
                <input type="number" {...formik.getFieldProps("seats")} min="1" className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Doors</label>
                <input type="number" {...formik.getFieldProps("doors")} min="1" className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Price per Day (Rs)</label>
                <input type="text" {...formik.getFieldProps("price")} className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"/>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Key Features</label>
              <input type="text" {...formik.getFieldProps("features")} className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"/>
            </div>

          </div>
        </form>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">Cancel</button>
          <button onClick={formik.handleSubmit} className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg">
            {isEdit ? "Save Changes" : "Add Car"}
          </button>
        </div>
      </div>
    </div>
  );
}
