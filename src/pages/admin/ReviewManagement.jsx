import React from "react";
import { FaTrash } from "react-icons/fa";

export default function ReviewManagement() {
  // Sample review data
  const reviews = [
    {
      review_id: "R001",
      customer_id: "C001",
      stars: 5,
      topic: "Excellent Service",
      description: "The car rental process was smooth and easy!",
    },
    {
      review_id: "R002",
      customer_id: "C002",
      stars: 3,
      topic: "Average Experience",
      description: "The car was clean but pickup took longer than expected.",
    },
    {
      review_id: "R003",
      customer_id: "C003",
      stars: 4,
      topic: "Good Service",
      description: "Friendly staff and well-maintained cars.",
    },
  ];

  const handleDelete = (id) => {
    alert(`Delete review with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex border-b pb-4 border-gray-200 mb-10 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>
          <p className="text-gray-600">
            Track all customer reviews and manage them efficiently.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition relative"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-gray-800">{review.topic}</h2>
              <button
                onClick={() => handleDelete(review.review_id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <FaTrash />
              </button>
            </div>
            <div className="mb-2">
              <span className="text-yellow-500 font-semibold">
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{review.description}</p>
            <p className="text-sm text-gray-400 font-mono">Customer ID: {review.customer_id}</p>
            <p className="text-sm text-gray-400 font-mono">Review ID: {review.review_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
