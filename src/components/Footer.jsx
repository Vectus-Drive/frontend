import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const resources = [
    { name: "Home", path: "/" },
    { name: "Car List", path: "/car" },
    { name: "About", path: "/about" },
  ];

  const community = [
    { name: "Newsletter", path: "/newsletter" },
    { name: "Reviews", path: "/reviews" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Social Group", path: "/social-group" },
    { name: "Helpdesk", path: "/helpdesk" },
  ];

  return (
    <footer className="bg-[#162033] text-gray-300 py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold">
              Vectus<span className="text-orange-500">Drive</span>
            </h2>
          </Link>
          <p>
            57 Heol Isaf Station Road, <br />
            Cardiff, UK
          </p>
          <p className="font-semibold">info@example.com</p>
          <p>029 2021 4012</p>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            {resources.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-orange-400 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4">Community</h3>
          <ul className="space-y-2">
            {community.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-orange-400 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4">
            Subscribe Newsletter
          </h3>
          <p className="text-sm mb-4">
            Join our newsletter to stay updated on our latest offers and news.
          </p>
          <div className="flex flex-col sm:flex-row items-center border border-gray-600 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent px-3 py-2 focus:outline-none text-sm"
            />
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 px-5 py-2 text-white font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm space-y-4 md:space-y-0">
        <p className="text-gray-400 text-center md:text-left">
          © 2025{" "}
          <span className="font-semibold text-white">VectusDrive</span>. All
          Rights Reserved.
        </p>

        <div className="flex items-center space-x-4">
          <span className="hidden sm:block">Follow Us:</span>
          <a
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
