import { useState } from "react";
import {
  FaArrowLeft,
  FaLock,
  FaEdit,
  FaSave,
  FaKey,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("./car.jpg");
  const [profile, setProfile] = useState({
    name: "Dilusha Madushan",
    nic: "200132456V",
    employeeId: "E001",
    email: "dilusha@example.com",
    address: "Galle, Sri Lanka",
    telephone: "0771234567",
    status: "Active",
  });

  const arr = [
                ["Full Name", "name", "text"],
                ["NIC Number", "nic", "text"],
                ["Email Address", "email", "email"],
                ["Phone Number", "telephone", "tel"],
              ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1729] to-[#1a1f35] py-8 px-4">
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-full text-sm transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-xl">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="absolute bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                ✏️
              </label>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {profile.name}
              </h1>
              <p className="text-white/90 text-lg mb-3">Employee</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm">
                  {profile.email}
                </span>
                <span className="bg-green-500/30 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {profile.status}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm flex items-center gap-1">
                  <FaCalendarAlt />
                  Joined
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-white hover:bg-gray-100 text-orange-500 p-3 rounded-xl transition-all hover:scale-105 shadow-lg">
                <FaLock className="text-xl" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all hover:scale-105">
                <MdOutlineLogout className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1e2942] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Personal Information
                </h2>
                <button
                  onClick={isEditing ? handleSave : handleEditToggle}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all text-sm font-semibold flex items-center gap-2"
                >
                  {isEditing ? <FaSave /> : <FaEdit />}
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {arr.map(([label, field, type]) => (
                  <div key={field}>
                    <label className="block text-slate-400 text-sm mb-2 font-medium">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={field}
                      value={profile[field]}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-[#2a3f5f] text-white px-4 py-3 rounded-lg border-2 border-transparent focus:border-orange-500 focus:outline-none disabled:opacity-60 transition-all"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-sm mb-2 font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-[#2a3f5f] text-white px-4 py-3 rounded-lg border-2 border-transparent focus:border-orange-500 focus:outline-none disabled:opacity-60 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">

            <div className="bg-[#1e2942] rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-all font-semibold flex items-center justify-center gap-2">
                  <FaKey />
                  Change Password
                </button>
                <button className="w-full bg-[#2a3f5f] hover:bg-[#344b6b] text-white py-3 rounded-lg transition-all font-semibold flex items-center justify-center gap-2">
                  <FaLock />
                  Performance Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
