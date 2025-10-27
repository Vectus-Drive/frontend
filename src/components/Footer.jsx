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
  const resources = [
    { name: "Home", path: "/" },
    { name: "Car List", path: "/car" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const community = [
    { name: "Newsletter", path: "/newsletter" },
    { name: "Reviews", path: "/reviews" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Social Group", path: "/social-group" },
    { name: "Helpdesk", path: "/helpdesk" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-[#0f1729] to-slate-950 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 md:py-16  lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 border-b border-slate-700/50 pb-12  mx-auto">
          
          <div className="space-y-5 lg:pr-4">
            <Link to="/" className="inline-block group">
              <h2 className="text-2xl md:text-3xl font-extrabold">
                Vectus<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Drive</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your trusted partner for premium car rentals. Experience luxury, comfort, and reliability on every journey.
            </p>
            
            <div className="space-y-3 pt-2">
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
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 relative inline-block">
              Resources
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3 mt-6">
              {resources.map((item) => (
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
            <h3 className="text-white font-bold text-lg mb-5 relative inline-block">
              Community
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3 mt-6">
              {community.map((item) => (
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
            <h3 className="text-white font-bold text-lg mb-5 relative inline-block">
              Subscribe Newsletter
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed mt-6">
              Join our newsletter to stay updated on our latest offers and news.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500/50 text-sm text-white placeholder:text-gray-500 transition-all backdrop-blur-sm"
              />
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-5 py-3 text-white font-semibold rounded-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 text-sm space-y-6 md:space-y-0 max-w-7xl mx-auto">
          <p className="text-gray-400 text-center md:text-left">
            © 2025{" "}
            <span className="font-semibold text-white">VectusDrive</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-gray-400 hidden sm:block">Follow Us:</span>
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
      </div>
    </footer>
  );
}
