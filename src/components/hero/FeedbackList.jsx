import { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

function FeedbackList() {
  const feedbacks = [
    {
      name: "Ass Lee",
      role: "Senior Consultant",
      feedback:
        "Vectus Drive provided excellent service! The cars were well-maintained, and the booking process was seamless.",
      image: "./car.jpg",
      rating: 5,
    },
    {
      name: "Creas Wokes",
      role: "Managing Director",
      feedback:
        "Professional staff and flexible rental options. Highly recommend Vectus Drive for business travel.",
      image: "user2.jpg",
      rating: 5,
    },
    {
      name: "Alex Jordan",
      role: "Customer",
      feedback:
        "Great experience! Affordable pricing and smooth pickup and drop-off. Will definitely rent again.",
      image: "user3.jpg",
      rating: 5,
    },
    {
      name: "Sophia Brown",
      role: "Travel Blogger",
      feedback:
        "Loved the entire experience with Vectus Drive. Booking was fast, and the car was spotless!",
      image: "user4.jpg",
      rating: 5,
    },
    {
      name: "Daniel Green",
      role: "Entrepreneur",
      feedback:
        "Reliable service and great customer support! I’ll definitely recommend this company to my colleagues.",
      image: "user5.jpg",
      rating: 5,
    },
    {
      name: "Mila Stone",
      role: "Tour Guide",
      feedback:
        "The staff was friendly and the process was easy. I was impressed by their professionalism.",
      image: "user6.jpg",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? feedbacks.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleFeedbacks = [
    feedbacks[currentIndex],
    feedbacks[(currentIndex + 1) % feedbacks.length],
    feedbacks[(currentIndex + 2) % feedbacks.length],
  ];

  return (
    <section
      className="relative py-16 text-white overflow-hidden"
      style={{ backgroundColor: "#0f1a2b" }}
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-orange-400 uppercase tracking-widest mb-2">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold mb-12">
          What People Say About{" "}
          <span className="text-orange-400">Vectus Drive</span>
        </h2>

        <div className="relative flex items-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-orange-400 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition duration-300"
          >
            <FaArrowLeft />
          </button>

          <div className="flex justify-center ml-15 mr-15 items-stretch gap-6 w-full overflow-hidden ">
            {visibleFeedbacks.map((f, index) => (
              <div
                key={index}
                className="bg-[#1c2540] p-8 rounded-2xl shadow-lg w-full md:w-1/3 min-w-[300px] "
              >
                <div className="absolute mb-6">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-20 h-20 rounded-full border-4 border-orange-400 mx-auto -mt-12"
                  />
                </div>
                <FaQuoteLeft className="text-orange-400 text-3xl mb-4 mx-auto" />
                <p className="text-gray-300 mb-6">{f.feedback}</p>
                <h4 className="font-semibold text-lg">{f.name}</h4>
                <p className="text-gray-400 mb-2">{f.role}</p>
                <div className="flex justify-center">
                  {[...Array(f.rating)].map((_, i) => (
                    <FaStar key={i} className="text-orange-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-orange-400 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition duration-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeedbackList;
