
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-b from-slate-900/95 via-[#0f1729]/95 to-slate-950/95 backdrop-blur-lg shadow-xl shadow-orange-500/5' 
        : 'bg-gradient-to-b from-slate-900/80 via-[#0f1729]/80 to-slate-950/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with animated car icon */}
          <Link to="/" className="flex items-center gap-3 group">
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 100 100" 
              className="group-hover:scale-110 transition-transform duration-300"
            >
              <path
                d="M20 55 L30 40 L70 40 L80 55 L75 55 L75 65 L25 65 L25 55 Z"
                fill="#1e293b"
                stroke="#f97316"
                strokeWidth="2"
              />
              <path
                d="M35 40 L40 48 L60 48 L65 40"
                fill="#334155"
                stroke="#f97316"
                strokeWidth="1.5"
              />
              <rect x="32" y="48" width="14" height="7" fill="#475569" stroke="#f97316" strokeWidth="1" />
              <rect x="54" y="48" width="14" height="7" fill="#475569" stroke="#f97316" strokeWidth="1" />
              <circle cx="32" cy="65" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 32 65"
                  to="360 32 65"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="32" cy="65" r="4" fill="#f97316" />
              <circle cx="68" cy="65" r="8" fill="#1e293b" stroke="#f97316" strokeWidth="2">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 68 65"
                  to="360 68 65"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="68" cy="65" r="4" fill="#f97316" />
              <circle cx="78" cy="52" r="2" fill="#fbbf24">
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <div>
              <h2 className="text-2xl md:text-2xl font-extrabold leading-none">
                Vectus<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Drive</span>
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center font-semibold space-x-8">
            {pages.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-orange-400 cursor-pointer transition-all duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none group"
                >
                  <div className="relative">
                    <img
                      src={user?.image || "./default-user.png"}
                      alt="User"
                      className="w-11 h-11 rounded-full border-2 border-orange-500 object-cover group-hover:border-orange-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-16 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl shadow-2xl shadow-orange-500/10 py-2 w-48 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-700/50">
                      <span className="text-white font-semibold truncate">Welcome ! </span>
                      <span className="text-sm text-gray-400">{user?.role || "User"} </span>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2.5 text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 text-gray-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 duration-300">
                  Sign Up
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl hover:text-orange-400 transition-colors"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-slate-900/98 to-slate-950/98 backdrop-blur-lg border-t border-slate-700/50">
          <div className="flex flex-col items-center space-y-4 py-6 font-semibold">
            {pages.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-orange-400 cursor-pointer transition-colors text-lg"
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex flex-col items-center space-y-3 pt-4 border-t border-slate-700/50 w-full px-6">
                <div className="relative">
                  <img
                    src={user?.image || "./default-user.png"}
                    alt="User"
                    className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <p className="text-white font-semibold">{user?.username || "User"}</p>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-5 py-2.5 rounded-lg text-white text-center transition-all shadow-lg shadow-orange-500/30"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full max-w-xs bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-5 py-2.5 rounded-lg text-white transition-all shadow-lg shadow-red-500/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="pt-4">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-2.5 rounded-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50">
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