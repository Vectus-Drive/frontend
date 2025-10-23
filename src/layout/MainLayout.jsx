import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import ScrollToTop from "../components/ScrollToTop"; 

function MainLayout() {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const noHeaderFooterRoutes = ['/login', '/register', '/user', '/transaction','/NotFoundPage ', '/employee-profile'];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname) && !isAdminRoute;

  return (
    <>
      <ScrollToTop /> 
      {isAdminRoute ? (
        <div className="flex h-screen">
          <div className="w-20 sm:w-64 h-screen bg-[#0f172a] shadow-md sticky top-0">
            <SideBar />
          </div>
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto hide-scrollbar">
            <Outlet />
          </main>
        </div>
      ) : !showHeaderFooter ? (
        <div className="min-h-screen bg-[#0f172a]">
          <Outlet />
        </div>
      ) : (
        <div className="text-white min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow bg-[#0f172a]">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default MainLayout;
