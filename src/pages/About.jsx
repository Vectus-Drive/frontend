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
      img: "https://i.pravatar.cc/150?img=10",
      description:
        "Passionate about providing excellent service and keeping customers happy.",
    },
    {
      name: "Shireen Fernando",
      role: "Customer Support",
      img: "https://i.pravatar.cc/150?img=11",
      description: "Always ready to assist customers with a smile.",
    },
    {
      name: "Kasun Perera",
      role: "Fleet Manager",
      img: "https://i.pravatar.cc/150?img=12",
      description: "Ensures all cars are in perfect condition for our clients.",
    },
    {
      name: "Nadeesha Silva",
      role: "Marketing Specialist",
      img: "https://i.pravatar.cc/150?img=13",
      description: "Spreads the word about our amazing car rental services.",
    },
    {
      name: "Hiran Jayasuriya",
      role: "Operations Lead",
      img: "https://i.pravatar.cc/150?img=14",
      description: "Manages daily operations efficiently and smoothly.",
    },
    {
      name: "Amal Wickramasinghe",
      role: "Finance Manager",
      img: "https://i.pravatar.cc/150?img=15",
      description: "Keeps track of all financial activities accurately.",
    },
    {
      name: "Shanika Perera",
      role: "Customer Relations",
      img: "https://i.pravatar.cc/150?img=16",
      description: "Builds strong relationships with our valued clients.",
    },
  ];
  return (
    <div className="text-white px-6 md:px-20 py-10 space-y-20">
      <BannerHeader
        bgImg="./car1.jpg"
        t1="About"
        t2="Our Company"
        des="We provide reliable, affordable, and comfortable car rental solutions for all your travel needs. Our mission is to deliver seamless experiences with modern vehicles, flexible plans, and 24/7 support."
        page="ABOUT US"
      />

      <div>
        <h2 className="text-3xl font-semibold text-center mb-8 text-orange-400">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaCar className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Car Rentals</h3>
            <p className="text-gray-400">
              Wide range of vehicles for daily, weekly, or monthly rentals.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaKey className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Long-Term Leasing</h3>
            <p className="text-gray-400">
              Affordable leasing options for individuals and businesses.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaHeadset className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400">
              Our team is always ready to assist you anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-400 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-300">
            To be the most trusted car rental service by offering innovation,
            safety, and superior customer experiences.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-400 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-300">
            Deliver reliable and affordable transportation solutions with a
            customer-first approach while ensuring comfort and safety.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-center mb-8 text-orange-400">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaShieldAlt className="text-3xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Safe & Reliable</h3>
            <p className="text-gray-400 text-sm">
              Our vehicles undergo regular inspections to ensure your safety.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaThumbsUp className="text-3xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Trusted Service</h3>
            <p className="text-gray-400 text-sm">
              Over 1000+ satisfied customers with excellent reviews.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <FaClock className="text-3xl text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">24/7 Availability</h3>
            <p className="text-gray-400 text-sm">
              Our team and vehicles are ready whenever you need them.
            </p>
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
