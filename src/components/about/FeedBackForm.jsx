import { useState } from "react";
import { FaStar } from "react-icons/fa";

function FeedBackForm() {
    
  const [rating, setRating] = useState(0);

  return (
    <>
      <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">
        Share Your Feedback
      </h2>
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
    </>
  );
}

export default FeedBackForm;
