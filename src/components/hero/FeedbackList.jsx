import { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import api from "../../api/api";

function FeedbackList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedback = async () => {
    try {
      const resFeed = await api.get("/reviews");

      const transformed = await Promise.all(
        resFeed.data.data.map(async (item) => {
          try {
            const userRes = await api.get(`/customers/${item.customer_id}`);
            const username = userRes.data.data.name || "Anonymous";
            console.log(username);

            return {
              topic: item.topic || "Anonymous",
              name: username,
              feedback: item.description,
              rating: item.stars,
            };
          } catch (err) {
            console.log("Error fetching username:", err);
            return {
              topic: item.topic || "Anonymous",
              name: "Anonymous",
              feedback: item.description,
              rating: item.stars,
            };
          }
        })
      );

      setFeedbacks(transformed);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [feedbacks]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const visibleFeedbacks =
    feedbacks.length >= 3
      ? [
          feedbacks[currentIndex],
          feedbacks[(currentIndex + 1) % feedbacks.length],
          feedbacks[(currentIndex + 2) % feedbacks.length],
        ]
      : feedbacks;

  return (
    <section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20 text-white overflow-hidden section-animation">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-400 font-bold text-xs md:text-sm uppercase tracking-wider mb-2">
            Testimonials
          </p>
          <h2 className="text-4xl font-extrabold mb-4">
            What People Say About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Vectus Drive
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 z-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 md:p-4 rounded-full shadow-lg shadow-orange-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft className="text-lg" />
          </button>

          <div className="flex justify-center items-stretch gap-6 w-full overflow-hidden px-12 md:px-16">
            {visibleFeedbacks.map((f, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-700/50 w-full md:w-1/3 min-w-[280px] transition-all duration-500 hover:border-orange-500/50 hover:shadow-orange-500/20 hover:scale-105 ${
                  index === 1
                    ? "md:scale-105 border-orange-500/30"
                    : "hidden md:block"
                }`}
              >
                <FaQuoteLeft className="text-orange-400 text-3xl mb-4 mx-auto opacity-70" />
                <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed min-h-[100px]">
                  {f.feedback}
                </p>
                <h4 className="font-bold text-lg text-white mb-1">{f.topic}</h4>
                <p className="text-gray-400 text-sm mb-4">{f.name}</p>
                <div className="flex justify-center gap-1">
                  {[...Array(f.rating)].map((_, i) => (
                    <FaStar key={i} className="text-orange-400 text-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 z-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 md:p-4 rounded-full shadow-lg shadow-orange-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Next testimonial"
          >
            <FaArrowRight className="text-lg" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-gradient-to-r from-orange-500 to-orange-600"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeedbackList;
