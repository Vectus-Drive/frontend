import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-20 sm:w-64 h-screen bg-[#0f172a] shadow-md sticky top-0">
        <SideBar />
      </div>

      <main className="flex-1 p-6 bg-gray-50 text-black overflow-y-auto hide-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
