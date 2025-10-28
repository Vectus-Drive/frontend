import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function RootLayout() {
  const location = useLocation();
  
  const hideHeaderFooterPaths = [
    "/login",
    "/register",
    "/user",
    "/transaction",
    "/notfoundpage",
    "/employee-profile",
    "/dashboard",
    "/*"
  ];

  const shouldHide = hideHeaderFooterPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path.toLowerCase())
  );

  return (
    <>
      <ScrollToTop />
      <div className="text-white min-h-screen flex flex-col">
        {!shouldHide && <Header />}
        <main className="flex-grow min-h-screen bg-gradient-to-b from-[#0f172a] via-[#141c2e] to-[#121c32]">
          <Outlet />
        </main>
        {!shouldHide && <Footer />}
      </div>
    </>
  );
}

export default RootLayout;
