import { useState, useRef } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { updateCustomer, uploadImage } from "../../api/api";

export default function EditProfileImageModal({ show, setShow, userData, id}) {
  const [preview, setPreview] = useState(userData.image);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const imageId = userData.image ? userData.image.split("/").pop().split(".")[0] : null;

  if (!show) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // ✅ store actual file for later upload

      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return null;

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await uploadImage(formData, imageId); // if your API expects id
      return res.image_url;
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      const img_url = await handleImageUpload();

      if (img_url) {
        const updatedData = { ...userData, image: img_url };
        await updateCustomer(updatedData, id);
      }

      setShow(false);
    } catch (err) {
      console.error("Error saving profile image:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-sm w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Change Profile Image</h2>
          <button onClick={() => setShow(false)} className="text-slate-400 hover:text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            <FaUpload /> Choose Image
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            disabled={!selectedFile} // ✅ disable until file selected
            className={`flex-1 py-2 rounded-lg text-white ${
              selectedFile
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Save
          </button>
          <button
            onClick={() => setShow(false)}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
