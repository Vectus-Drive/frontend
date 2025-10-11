import Header from "../components/Header";
import Footer from "../components/Footer";
import CarList from "../pages/CarList";
import CarContent from "../components/CarContent";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className=" text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-20 bg-[#0f172a]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
