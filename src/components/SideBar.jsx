import { FaHome, FaUsers, FaCarSide, FaSignOutAlt } from "react-icons/fa";
import { MdBookOnline, MdNotificationsActive, MdSettings } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="w-20 sm:w-64 h-screen flex flex-col bg-[#0f172a] shadow-md">

      <div className="px-4 sm:px-8 py-6 border-b border-gray-700 text-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <span className="text-orange-500">Vectus</span>
          <span className="text-white">Drive</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-8 py-6 space-y-4 text-gray-300">
        <MenuItem icon={<FaHome />} label="Dashboard" />
        <MenuItem icon={<MdBookOnline />} label="Booking" />
        <MenuItem icon={<FaCarSide />} label="Car Management" />
        <MenuItem icon={<FaUsers />} label="User Management" />
        <MenuItem icon={<MdNotificationsActive />} label="Notifications" />
        <MenuItem icon={<MdSettings />} label="Settings" />
      </div>

      <div className="px-2 sm:px-8 mb-6">
        <button
          className="flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 w-full text-red-400 hover:text-white hover:bg-red-600 px-4 py-2 rounded transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
function MenuItem({ icon, label }) {
  return (
    <div className="flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 p-2 rounded cursor-pointer hover:bg-[#162033] transition-colors">
      <div className="text-lg text-orange-400">{icon}</div>
      <span className="hidden sm:inline text-white font-medium">{label}</span>
    </div>
  );
}
