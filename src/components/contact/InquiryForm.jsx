import { FaEnvelope, FaUser, FaPhone, FaCarSide, FaWhatsapp } from "react-icons/fa";

function InquiryForm() {
  return (
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
  );
}

export default InquiryForm;
