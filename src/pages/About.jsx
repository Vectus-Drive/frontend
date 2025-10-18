import { useState } from "react";
import { FaCar, FaKey, FaHeadset, FaStar, FaShieldAlt, FaThumbsUp, FaClock } from "react-icons/fa";

function About() {
  const [rating, setRating] = useState(0);

  return (
    <div className="text-white px-6 md:px-20 py-16 space-y-20">
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          About <span className="text-orange-500">Our Company</span>
        </h1>
        <p className="text-gray-400 text-lg">
          We provide reliable, affordable, and comfortable car rental solutions for all your travel needs.
          Our mission is to deliver seamless experiences with modern vehicles, flexible plans, and 24/7 support.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-center mb-8 text-orange-400">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaCar className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Car Rentals</h3>
            <p className="text-gray-400">Wide range of vehicles for daily, weekly, or monthly rentals.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaKey className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Long-Term Leasing</h3>
            <p className="text-gray-400">Affordable leasing options for individuals and businesses.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaHeadset className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400">Our team is always ready to assist you anytime, anywhere.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-400 mb-3">Our Vision</h2>
          <p className="text-gray-300">
            To be the most trusted car rental service by offering innovation, safety, and superior customer experiences.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-400 mb-3">Our Mission</h2>
          <p className="text-gray-300">
            Deliver reliable and affordable transportation solutions with a customer-first approach while ensuring comfort and safety.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-center mb-8 text-orange-400">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaShieldAlt className="text-3xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Safe & Reliable</h3>
            <p className="text-gray-400 text-sm">Our vehicles undergo regular inspections to ensure your safety.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaThumbsUp className="text-3xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Trusted Service</h3>
            <p className="text-gray-400 text-sm">Over 1000+ satisfied customers with excellent reviews.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaClock className="text-3xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">24/7 Availability</h3>
            <p className="text-gray-400 text-sm">Our team and vehicles are ready whenever you need them.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-center mb-10 text-orange-400">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {[...Array(7)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-2xl text-center w-full max-w-xs shadow-lg hover:scale-105 transition"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${idx + 10}`}
                alt="Team Member"
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-orange-500"
              />
              <h3 className="text-xl font-semibold">Team Member {idx + 1}</h3>
              <p className="text-gray-400 text-sm mb-2">Car Rental Specialist</p>
              <p className="text-gray-500 text-sm">
                Passionate about providing excellent service and keeping customers happy.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">Share Your Feedback</h2>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg space-y-5">
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-3xl transition ${
                  rating >= star ? "text-yellow-400" : "text-gray-500"
                }`}
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none"
          />
          <input
            type="text"
            placeholder="Feedback Topic"
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none"
          />
          <textarea
            placeholder="Your Feedback..."
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none h-32 resize-none"
          ></textarea>
          <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
