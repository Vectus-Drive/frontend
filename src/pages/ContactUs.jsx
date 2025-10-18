import {
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaGift,
  FaUser,
  FaPhone,
  FaCarSide,
} from "react-icons/fa";

function ContactUs() {
  return (
    <div className="text-white md:px-25 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-4xl font-extrabold text-white">
          Contact <span className="text-orange-500">Our Team</span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Have questions about our premium fleet? Our team is ready to assist
          you with your car rental needs.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
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
                  <p className="text-sm text-gray-400">
                    contact@hexagonservices.com
                  </p>
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

          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-orange-500">
              <FaEnvelope className="text-orange-500" /> Send Your Inquiry
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Fill out the form and we'll get back to you promptly.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-gray-700 rounded-md px-3">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center bg-gray-700 rounded-md px-3">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-gray-700 rounded-md px-3">
                  <FaPhone className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-transparent w-full py-3 text-white outline-none placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center bg-gray-700 rounded-md px-3">
                  <FaCarSide className="text-gray-400 mr-2" />
                  <select className="bg-transparent w-full py-3 text-white outline-none cursor-pointer">
                    <option className="bg-gray-700">Select Car Type</option>
                    <option className="bg-gray-700">Sedan</option>
                    <option className="bg-gray-700">SUV</option>
                    <option className="bg-gray-700">Luxury</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start bg-gray-700 rounded-md px-3 py-2">
                <FaEnvelope className="text-gray-400 mt-3 mr-2" />
                <textarea
                  placeholder="Tell us about your rental needs..."
                  rows="3"
                  className="bg-transparent w-full text-white outline-none placeholder-gray-400 resize-none py-2"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Send Message <FaWhatsapp />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
