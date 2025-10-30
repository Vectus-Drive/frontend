import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import api from "../../api/api";

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getFeedback = async () => {
    try {
      const resFeed = await api.get("/reviews");
      const reviewsData = resFeed.data.data;

      const transformed = await Promise.all(
        reviewsData.map(async (item) => {
          try {
            const userRes = await api.get(`/customers/${item.customer_id}`);
            const username = userRes.data.data.name || "Anonymous";
            return { ...item, name: username };
          } catch {
            return { ...item, name: "Anonymous" };
          }
        })
      );

      setReviews(transformed);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to load reviews.");
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/reviews/${deleteId}`);
      setReviews((prev) => prev.filter((r) => r.review_id !== deleteId));
      toast.success("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review. Please try again.");
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <div className="flex border-b pb-4 border-gray-200 mb-10 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>
          <p className="text-gray-600">
            Track all customer reviews and manage them efficiently.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.review_id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition relative"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-gray-800">{review.topic}</h2>
                <button
                  onClick={() => confirmDelete(review.review_id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="mb-2">
                <span className="text-yellow-500 font-semibold">
                  {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                </span>
              </div>

              <p className="text-gray-600 mb-2">{review.description}</p>
              <p className="text-sm text-gray-400 font-mono">
                By: {review.name} <br />
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No reviews found.</p>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this review?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
