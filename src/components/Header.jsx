import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Car", path: "/car" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0f172a]/100 backdrop-blur-md shadow-md p-2">
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

          <div className="hidden md:block">
            <Link to = 'login'>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition-colors">
              Sign Up
            </button>
            </Link>
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
