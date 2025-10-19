import {
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaGift,
  FaPhone,
} from "react-icons/fa";
function Infor() {
  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-500">
        <FaPhone className="text-orange-500" /> Our Information
      </h2>

      <div className="space-y-4 text-gray-300">
        <div className="flex items-center gap-3">
          <FaWhatsapp className="text-green-500 text-xl" />
          <div>
            <p className="font-medium text-white">WhatsApp</p>
            <p className="text-sm text-gray-400">+91 8294313275</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-orange-400 text-xl" />
          <div>
            <p className="font-medium text-white">Email</p>
            <p className="text-sm text-gray-400">contact@hexagonservices.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaClock className="text-yellow-400 text-xl" />
          <div>
            <p className="font-medium text-white">Hours</p>
            <p className="text-sm text-gray-400">Mon–Sat: 8AM–8PM</p>
            <p className="text-sm text-gray-400">Sunday: 10AM–6PM</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg border border-orange-500">
          <FaGift className="text-orange-400 text-xl" />
          <div>
            <p className="font-medium text-orange-400">Special Offer!</p>
            <p className="text-sm text-gray-300">
              Book for 3+ days and get 10% discount
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infor;
