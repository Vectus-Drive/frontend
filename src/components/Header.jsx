import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  

  const pages = [
    { name: "Home", path: "/" },
    { name: "Car", path: "/car" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-[#0b1223]/90 backdrop-blur-md shadow-md p-2">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-orange-500 font-bold text-2xl">Vectus</span>
            <span className="text-white font-semibold text-2xl">Drive</span>
          </Link>

          <div className="hidden md:flex items-center font-semibold space-x-8">
            {pages.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-orange-400 cursor-pointer transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* <div className="text-white font-medium">
                  Hi, <span className="text-orange-400">{user?.username || "User"}</span>
                </div> */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={user?.image || "./default-user.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-14 bg-[#1e293b] border border-gray-700 rounded-lg shadow-lg py-2 w-40 animate-fadeIn">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-200 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-200 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition-colors">
                  Sign Up
                </button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0f172a]/95 backdrop-blur-md border-t border-gray-700">
          <div className="flex flex-col items-center space-y-4 py-5 font-semibold text-white">
            {pages.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-orange-400 cursor-pointer transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={user?.image || "./default-user.png"}
                  alt="User"
                  className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover"
                />
                {/* <div>
                  Hi, <span className="text-orange-400">{user?.username || "User"}</span>
                </div> */}
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
