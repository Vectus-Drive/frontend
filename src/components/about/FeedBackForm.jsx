import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaStar } from "react-icons/fa";
import { addReview } from "../../api/api";
import { useAuth } from "../../hooks/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const schema = yup.object().shape({
  topic: yup.string().required("Review topic is required"),
  description: yup.string().required("Description is required"),
  stars: yup.number().min(1, "Please select a star rating").required(),
});

export default function ReviewForm() {
  const [stars, setStars] = useState(0);
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { topic: "", description: "", stars: 0 },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      data = { ...data, customer_id: user.id };
      await addReview(data);
      toast.success("Review submitted successfully!");
      reset({ topic: "", description: "", stars: 0 });
      setStars(0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center mb-6 text-orange-400">
        Share Your Review
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg space-y-5"
      >
        <Controller
          control={control}
          name="stars"
          render={({ field }) => (
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => {
                      setStars(star);
                      field.onChange(star);
                    }}
                    className={`cursor-pointer text-3xl transition ${
                      stars >= star ? "text-yellow-400" : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
              {errors.stars && (
                <p className="text-red-400 text-sm text-center -mt-2">
                  {errors.stars.message}
                </p>
              )}
            </div>
          )}
        />

        <div>
          <input
            type="text"
            placeholder="Review Topic"
            {...register("topic")}
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none"
          />
          {errors.topic && (
            <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Your Description..."
            {...register("description")}
            className="p-3 rounded-lg w-full bg-gray-800 text-gray-200 outline-none h-32 resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition"
        >
          Submit Review
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
