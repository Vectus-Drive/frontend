import { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; 

function CarManageForm({ car, onClose }) {
  const isEdit = !!car;
  const [previewImage, setPreviewImage] = useState(car?.image || ""); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4"> {/* Added p-4 for mobile safety */}
      <div className="bg-white w-full max-w-[900px] rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] p-6 relative animate-fadeIn">

        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Car Details" : "Add New Car"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
            aria-label="Close form"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          <div className="flex flex-col items-center md:items-start order-1">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Car Image
            </label>
            <div className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center overflow-hidden bg-gray-50 hover:border-orange-500 transition cursor-pointer shadow-sm">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                name="carImage"
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
                defaultValue={isEdit ? car.description : ""}
                placeholder="Write a brief description of the car's condition and features..."
                rows="4"
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                name="description"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col gap-6 order-2"> 
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  defaultValue={isEdit ? car.name : ""}
                  placeholder="e.g. Toyota"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  name="brand"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  defaultValue={isEdit ? car.type : ""}
                  placeholder="e.g. Corolla"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  name="model"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Fuel Type
                </label>
                <select
                  defaultValue={isEdit ? car.fuel : ""}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                  name="fuelType"
                  required
                >
                  <option value="" disabled>Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <input
                  type="text"
                  defaultValue={isEdit ? car.transmission : ""}
                  placeholder="e.g. Automatic or Manual"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  name="transmission"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Seats
                </label>
                <input
                  type="number"
                  defaultValue={isEdit ? car.seats : ""}
                  placeholder="e.g. 4"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  name="seats"
                  min="1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Doors
                </label>
                <input
                  type="number"
                  defaultValue={isEdit ? car.doors : ""}
                  placeholder="e.g. 2"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  name="doors"
                  min="1"
                />
              </div>
             <div>
              <label className="text-sm font-medium text-gray-700">
                Price per Day (Rs)
              </label>
              <input
                type="text" 
                defaultValue={isEdit ? car.price_per_day : ""}
                placeholder="e.g. 5000"
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                name="price"
                required
              />
            </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">
                Key Features
              </label>
              <input
                type="text"
                defaultValue={isEdit ? car.features : ""}
                placeholder="e.g. Air Conditioning, GPS, Bluetooth"
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                name="features"
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
            type="submit"
            form="car-form" 
            className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg"
          >
            {isEdit ? "Save Changes" : "Add Car"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarManageForm;