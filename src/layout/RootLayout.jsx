import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className=" text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow  bg-[#0f172a]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
