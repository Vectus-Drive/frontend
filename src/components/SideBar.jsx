import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCarSide,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import {
  MdBookOnline,
} from "react-icons/md";
import { useAuth } from "../hooks/AuthContext";

export default function Sidebar() {
  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { label: "Bookings", icon: <MdBookOnline />, path: "/dashboard/bookings" },
    { label: "Car Management", icon: <FaCarSide />, path: "/dashboard/cars" },
    { label: "User Management", icon: <FaUsers />, path: "/dashboard/users" },
    { label: "Employees Management", icon: <FaUsers />, path: "/dashboard/employee" },
    { label: "Transaction", icon: <GrTransaction />, path: "/dashboard/transaction" },
    { label: "Review Management", icon: <MdOutlineReviews />, path: "/dashboard/review" },
  ];

  const { logout } = useAuth();

  return (
    <div className="w-20 sm:w-64 h-screen flex flex-col bg-[#0f172a] shadow-md">
      <div className="px-4 sm:px-8 py-6 border-b border-gray-700 text-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <span className="text-orange-500">Vectus</span>
          <span className="text-white">Drive</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-8 py-6 space-y-2 text-gray-300">
        {menuItems.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </div>

      <div className="px-2 sm:px-8 mb-6">
        <button className="flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 w-full text-red-400 hover:text-white hover:bg-red-600 px-4 py-2 rounded transition-colors" onClick={logout}>
          <FaSignOutAlt className="text-lg" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, path }) {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `flex items-center justify-center sm:justify-start space-x-0 sm:space-x-3 p-2 rounded transition-colors ${
          isActive
            ? "bg-[#162033] text-orange-400"
            : "text-gray-300 hover:bg-[#162033] hover:text-orange-400"
        }`
      }
    >
      <div className="text-lg">{icon}</div>
      <span className="hidden sm:inline font-medium">{label}</span>
    </NavLink>
  );
}
