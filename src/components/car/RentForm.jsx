import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCalendarAlt, FaClock, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { bookCar } from "../../api/api";
import { useAuth } from "../../hooks/AuthContext";
import { toast } from "react-toastify";

function RentForm({ car }) {
  const [loading, setLoading] = useState(false);
  // const [close, OnClose] = useState(true);
  // const [select, OnSelect] = useState()
  const [error, setError] = useState("");
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pickup_date: "",
      return_date: "",
    },
  });

  const pickupDate = watch("pickup_date");
  const returnDate = watch("return_date");

  const calculateTotalDays = () => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const totalDays = calculateTotalDays();
  const totalPrice = totalDays * (car?.price_per_day || 0);

  const onSubmit = async (data) => {
    if (totalDays === 0) {
      setError("Please select valid pickup and return dates");
      return;
    }

    setLoading(true);
    setError("");

    try {


      const bookingData = {
        customer_id: user.id,
        car_id: car.car_id,
        time_period: totalDays,
        total: totalPrice,
      };


      const res = await bookCar(bookingData);
      if(res.status == "success"){
        toast.success("Booking Successfully Added")
      }
      
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const minReturnDate = pickupDate
    ? new Date(new Date(pickupDate).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : today;

  return (
    <div className="relative">
      {/* Decorative gradient overlay */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-20"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 space-y-5 border border-gray-700/50 shadow-2xl"
      >
        {/* Header Section */}
        <div className="text-center pb-4 border-b border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <FaCheckCircle className="text-orange-500" />
            Book This Car
          </h3>
          <p className="text-gray-400 text-sm">
            Complete the form to reserve your ride
          </p>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl p-4 border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1">Daily Rate</p>
              <p className="text-3xl font-bold text-orange-500 flex items-center gap-1">
                <FaDollarSign className="text-2xl" />
                {car?.price_per_day}
                <span className="text-lg text-gray-400">/day</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm mb-1">Status</p>
              <p
                className={`font-bold text-lg px-3 py-1 rounded-lg ${
                  car?.availability_status
                    ? "text-green-400 bg-green-500/20"
                    : "text-red-400 bg-red-500/20"
                }`}
              >
                {car?.availability_status ? "available" : "booked"}
              </p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm backdrop-blur-sm animate-shake">
            <div className="flex items-start gap-2">
              <span className="text-red-400 text-lg">⚠</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Pickup Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
            <FaCalendarAlt className="text-orange-400" />
            Pickup Date *
          </label>
          <div className="relative">
            <input
              type="date"
              min={today}
              {...register("pickup_date", {
                required: "Pickup date is required",
                validate: (value) => {
                  const selected = new Date(value);
                  const todayDate = new Date(today);
                  return (
                    selected >= todayDate ||
                    "Pickup date cannot be in the past"
                  );
                },
              })}
              className="w-full bg-gray-700/50 text-white px-4 py-3 pl-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition border border-gray-600/50 hover:border-orange-500/50"
            />
          </div>
          {errors.pickup_date && (
            <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
              <span>•</span> {errors.pickup_date.message}
            </p>
          )}
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
            <FaCalendarAlt className="text-orange-400" />
            Return Date *
          </label>
          <div className="relative">
            <input
              type="date"
              min={minReturnDate}
              {...register("return_date", {
                required: "Return date is required",
                validate: (value) => {
                  if (!pickupDate) return "Select pickup date first";
                  const returnD = new Date(value);
                  const pickup = new Date(pickupDate);
                  return (
                    returnD > pickup || "Return date must be after pickup date"
                  );
                },
              })}
              className="w-full bg-gray-700/50 text-white px-4 py-3 pl-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition border border-gray-600/50 hover:border-orange-500/50"
            />
          </div>
          {errors.return_date && (
            <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
              <span>•</span> {errors.return_date.message}
            </p>
          )}
        </div>

        {/* Rental Summary */}
        <div className="bg-gray-700/30 rounded-xl p-4 space-y-3 border border-gray-600/30">
          <h4 className="text-white font-semibold flex items-center gap-2 mb-3">
            <FaClock className="text-orange-400" />
            Rental Summary
          </h4>

          <div className="flex justify-between text-sm items-center py-2 border-b border-gray-600/30">
            <span className="text-gray-400">Time Period</span>
            <span className="text-white font-semibold bg-gray-600/50 px-3 py-1 rounded-lg">
              {totalDays > 0
                ? `${totalDays} day${totalDays > 1 ? "s" : ""}`
                : "-"}
            </span>
          </div>

          <div className="flex justify-between text-sm items-center py-2 border-b border-gray-600/30">
            <span className="text-gray-400">Rate per Day</span>
            <span className="text-white font-semibold">
              ${car?.price_per_day}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-300 font-semibold text-base">
              Total Amount
            </span>
            <div className="flex items-center gap-1">
              <FaDollarSign className="text-orange-400" />
              <span className="text-orange-500 text-2xl font-bold">
                {totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            loading ||
            totalDays === 0 ||
            car?.availability_status !== true
          }
          className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing Your Booking...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaCheckCircle />
              Confirm Booking
            </span>
          )}
        </button>

        {totalDays === 0 && pickupDate && returnDate && (
          <p className="text-yellow-400 text-xs text-center mt-2 flex items-center justify-center gap-1">
            <span>⚠</span> Please select valid dates
          </p>
        )}

        <p className="text-gray-500 text-xs text-center mt-3">
          * Secure booking • All fields required
        </p>
      </form>
      {/* <PaymentModal /> */}
    </div>
  );
}

export default RentForm;
