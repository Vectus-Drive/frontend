import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Car List", path: "/car" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-[#0f1729] to-slate-950 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 md:py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 pb-8 border-b border-slate-700/50">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <Link to="/" className="inline-block group">
                <div className="flex items-center gap-4">
                  <svg 
                    width="70" 
                    height="70" 
                    viewBox="0 0 100 100" 
                    className="animate-bounce flex-shrink-0"
                    style={{ animationDuration: '2s' }}
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
                        dur="1s"
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
                        dur="1s"
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
                    <h2 className="text-4xl md:text-5xl font-extrabold">
                      Vectus<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Drive</span>
                    </h2>
                  </div>
                </div>
              </Link>
              <div className="lg:max-w-md lg:pt-3">
                <p className="text-gray-400 text-base leading-relaxed">
                  Your trusted partner for premium car rentals. Experience luxury, comfort, and reliability on every journey.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-12 border-b border-slate-700/50">
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </h3>
              <div className="flex items-start gap-3 text-sm group">
                <FaMapMarkerAlt className="text-orange-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-gray-400">
                  57 Heol Isaf Station Road,<br />
                  Cardiff, UK
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm group">
                <FaEnvelope className="text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@example.com" className="text-gray-400 hover:text-orange-400 transition-colors">
                  info@example.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm group">
                <FaPhone className="text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:02920214012" className="text-gray-400 hover:text-orange-400 transition-colors">
                  029 2021 4012
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Follow Us
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Stay connected with us on social media for the latest updates and offers.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:border-orange-500 transition-all flex items-center justify-center group hover:scale-110 duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:border-orange-500 transition-all flex items-center justify-center group hover:scale-110 duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:border-orange-500 transition-all flex items-center justify-center group hover:scale-110 duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:border-orange-500 transition-all flex items-center justify-center group hover:scale-110 duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025{" "}
              <span className="font-semibold text-white">VectusDrive</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}