import { useState } from "react";
import { useFormik } from "formik";
import { FaStar } from "react-icons/fa";

function FeedBackForm() {
  const [rating, setRating] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      topic: "",
      feedback: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.topic) errors.topic = "Feedback topic is required";
      if (!values.feedback) errors.feedback = "Feedback message is required";
      if (rating === 0) errors.rating = "Please select a rating";
      return errors;
    },
    onSubmit: (values, {resetForm}) => {
      console.log("⭐ Feedback Data:", { ...values, rating });
      alert("Feedback submitted successfully!");

      resetForm();
      setRating(0);
    },
  });

  return (
    <>
      <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">
        Share Your Feedback
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg space-y-5"
      >
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
        {formik.errors.rating && (
          <p className="text-red-400 text-sm text-center -mt-2">{formik.errors.rating}</p>
        )}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="topic"
            placeholder="Feedback Topic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.topic}
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none"
          />
          {formik.touched.topic && formik.errors.topic && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.topic}</p>
          )}
        </div>

        <div>
          <textarea
            name="feedback"
            placeholder="Your Feedback..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.feedback}
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none h-32 resize-none"
          ></textarea>
          {formik.touched.feedback && formik.errors.feedback && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.feedback}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition"
        >
          Submit Feedback
        </button>
      </form>
    </>
  );
}

export default FeedBackForm;
