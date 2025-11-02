import {
  FaCar,
  FaKey,
  FaHeadset,
  FaShieldAlt,
  FaThumbsUp,
  FaClock,
} from "react-icons/fa";

import FeedBackForm from "../components/about/FeedBackForm";
import MemberCard from "../components/about/MemberCard";
import BannerHeader from "../components/BannerHeader";

function About() {
const teamMembers = [
    {
      name: "Dilusha Madushan",
      role: "Car Rental Specialist",
      img: "./team/Car_Rental_Specialist.jpg",
      description:
        "Passionate about providing excellent service and keeping customers happy.",
    },
    {
      name: "Kavishan Rathnayake",
      role: "Customer Support",
      img: "./team/Customer_Support.jpg",
      description: "Always ready to assist customers with a smile.",
    },
    {
      name: "Amila Bandara",
      role: "Fleet Manager",
      img: "./team/Fleet_Manager.jpeg",
      description: "Ensures all cars are in perfect condition for our clients.",
    },
    {
      name: "Kaveesha Keshali",
      role: "Marketing Specialist",
      img: "./team/Marketing_Specialist.jpg",
      description: "Spreads the word about our amazing car rental services.",
    },
    {
      name: "Ishan Sivmal",
      role: "Operations Lead",
      img: "./team/Operations_Lead.jpg",
      description: "Manages daily operations efficiently and smoothly.",
    },
    {
      name: "Jayani Madusha",
      role: "Finance Manager",
      img: "./team/Finance_Manager.jpg",
      description: "Keeps track of all financial activities accurately.",
    },
    {
      name: "Kolitha Gayanath",
      role: "Customer Relations",
      img: "./team/Customer_Relations.jpg",
      description: "Builds strong relationships with our valued clients.",
    },
  ];  

  return (
    <div className="text-white px-6 md:px-20 py-10 space-y-20">
      <BannerHeader
        t1="About"
        t2="Us"
        des="We provide reliable, affordable, and comfortable car rental solutions for all your travel needs. Our mission is to deliver seamless experiences with modern vehicles, flexible plans, and 24/7 support."
        page="ABOUT US"
      />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent rounded-3xl blur-2xl"></div>
        <div className="relative">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Our Services
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 text-center transform hover:-translate-y-2 transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 rounded-3xl transition duration-300"></div>
              <div className="relative">
                <div className="bg-orange-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300">
                  <FaCar className="text-5xl text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  Car Rentals
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Wide range of vehicles for daily, weekly, or monthly rentals.
                </p>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 text-center transform hover:-translate-y-2 transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 rounded-3xl transition duration-300"></div>
              <div className="relative">
                <div className="bg-orange-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300">
                  <FaKey className="text-5xl text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  Long-Term Leasing
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Affordable leasing options for individuals and businesses.
                </p>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 text-center transform hover:-translate-y-2 transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 rounded-3xl transition duration-300"></div>
              <div className="relative">
                <div className="bg-orange-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300">
                  <FaHeadset className="text-5xl text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  24/7 Support
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our team is always ready to assist you anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 transition duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              To be the most trusted car rental service by offering innovation,
              safety, and superior customer experiences.
            </p>
          </div>
        </div>

        <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 transition duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Deliver reliable and affordable transportation solutions with a
              customer-first approach while ensuring comfort and safety.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Why Choose Us
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 text-center transform hover:-translate-y-2 transition duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 rounded-3xl transition duration-300"></div>
            <div className="relative">
              <div className="bg-orange-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition duration-300">
                <FaShieldAlt className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Safe & Reliable
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our vehicles undergo regular inspections to ensure your safety.
              </p>
            </div>
          </div>

          <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 text-center transform hover:-translate-y-2 transition duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 rounded-3xl transition duration-300"></div>
            <div className="relative">
              <div className="bg-orange-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition duration-300">
                <FaThumbsUp className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Trusted Service
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Over 1000+ satisfied customers with excellent reviews.
              </p>
            </div>
          </div>

          <div className="relative group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 hover:border-orange-500 text-center transform hover:-translate-y-2 transition duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 rounded-3xl transition duration-300"></div>
            <div className="relative">
              <div className="bg-orange-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition duration-300">
                <FaClock className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                24/7 Availability
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our team and vehicles are ready whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-center mb-10 text-orange-400">
          Meet Our Team
        </h2>
        <MemberCard teamMembers={teamMembers} />
      </div>

      <div className="max-w-3xl mx-auto">
        <FeedBackForm />
      </div>
    </div>
  );
}

export default About;
