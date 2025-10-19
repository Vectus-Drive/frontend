import { useState } from "react";

function ProfileCard({ onChangePassword }) {
  const [previewImage, setPreviewImage] = useState("./car.jpg");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Dilusha Madushan",
    nic: "200132456V",
    customer_id: "C001", 
    email: "dilusha@example.com",
    address: "Galle, Sri Lanka",
    telephone_no: "0771234567",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={previewImage}
          alt="User"
          className="w-full h-full object-cover rounded-full border-4 border-orange-500"
        />
        <label className="absolute bottom-0 right-0 bg-orange-600 rounded-full p-2 cursor-pointer">
          <input type="file" className="hidden" onChange={handleImageChange} />
          ✏️
        </label>
      </div>

      <form className="text-left space-y-3">
        {Object.keys(userData).map((key) => (
          <div key={key}>
            <label className="text-gray-400 capitalize block text-sm">
              {key.replace("_", " ")}:
            </label>
            <input
              type="text"
              value={userData[key]}
              disabled={!isEditing || key === "customer_id"} 
              onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
              className={`w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white ${
                isEditing && key !== "customer_id" ? "focus:ring-2 focus:ring-orange-500" : ""
              }`}
            />
          </div>
        ))}
      </form>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex-1 bg-orange-600 hover:bg-orange-700 py-2 rounded-lg"
        >
          {isEditing ? "Save" : "Edit Profile"}
        </button>
        <button
          onClick={onChangePassword}
          className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
