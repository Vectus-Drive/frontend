// ReviewsGrid.jsx
import { useState } from "react";
import { FaTrash, FaSave, FaPen, FaTimes } from "react-icons/fa";
import { updateReview, deleteReview } from "../../api/api";
import ConfirmDialog from "../ConfirmDialog";


export default function ReviewsGrid({ reviews, setReviews }) {
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedStars, setEditedStars] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // Start editing
  const startEdit = (review) => {
    setEditingId(review.review_id);
    setEditedComment(review.description);
    setEditedStars(review.stars);
    setError("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditedComment("");
    setEditedStars(5);
    setError("");
  };

  // Save changes
  const saveEdit = async (id) => {
    if (!editedComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (editedStars < 1 || editedStars > 5) {
      setError("Rating must be between 1 and 5 stars.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateReview({ description: editedComment, stars: editedStars }, id);
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r.review_id === id
            ? { ...r, description: editedComment, stars: editedStars }
            : r
        )
      );
      setEditingId(null);
      setEditedComment("");
      setEditedStars(5);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update review. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Show delete confirmation
  const confirmDelete = (review) => {
    setReviewToDelete(review);
    setShowDeleteConfirm(true);
  };

  // Delete review
  const deleteReviewHandler = async () => {
    if (!reviewToDelete) return;

    setLoading(true);
    setError("");

    try {
      await deleteReview(reviewToDelete.review_id);
      setReviews((prevReviews) =>
        prevReviews.filter((r) => r.review_id !== reviewToDelete.review_id)
      );
      setShowDeleteConfirm(false);
      setReviewToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete review. Please try again.");
      console.error(err);
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setReviewToDelete(null);
  };

  return (
    <>
      <div className="p-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.review_id}
                className="bg-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1.5"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-white truncate flex-1 mr-2">
                    {review.topic}
                  </h2>
                  <div className="flex gap-2 flex-shrink-0">
                    {editingId === review.review_id ? (
                      <>
                        <button
                          onClick={() => saveEdit(review.review_id)}
                          className="text-green-400 hover:text-green-500 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Save"
                          disabled={loading}
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-400 hover:text-gray-500 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Cancel"
                          disabled={loading}
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(review)}
                          className="text-blue-400 hover:text-blue-500 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Edit"
                          disabled={loading}
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => confirmDelete(review)}
                          className="text-red-400 hover:text-red-500 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                          disabled={loading}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  {editingId === review.review_id ? (
                    <div className="flex items-center gap-2">
                      <label className="text-gray-300 text-sm">Rating:</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={editedStars}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 1 && value <= 5) {
                            setEditedStars(value);
                          }
                        }}
                        className="w-16 bg-slate-700 text-white px-2 py-1 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        disabled={loading}
                      />
                      <span className="text-yellow-400">
                        {"★".repeat(editedStars)}
                        {"☆".repeat(5 - editedStars)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-semibold text-lg">
                        {"★".repeat(review.stars)}
                        {"☆".repeat(5 - review.stars)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({review.stars}/5)
                      </span>
                    </div>
                  )}
                </div>

                {editingId === review.review_id ? (
                  <div className="space-y-2">
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full bg-slate-700 text-white p-3 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition"
                      rows={4}
                      placeholder="Edit your review..."
                      disabled={loading}
                    />
                    {!editedComment.trim() && (
                      <p className="text-red-400 text-xs">Comment is required</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 mb-2 line-clamp-4">
                    {review.description}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-slate-700">
                  <p className="text-sm text-gray-400">
                    By: <span className="font-semibold">{review.customer_name}</span>
                  </p>
                  {review.created_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-400 text-center text-lg mb-2">
              No reviews yet.
            </p>
            <p className="text-slate-500 text-sm">
              Be the first to leave a review!
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={cancelDelete}
        onConfirm={deleteReviewHandler}
        title="Delete Review"
        message={`Are you sure you want to delete the review "${reviewToDelete?.topic}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
        type="danger"
      />
    </>
  );
}
