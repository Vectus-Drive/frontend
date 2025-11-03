import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../../hooks/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Add this

function RentForm({ car }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate(); // ✅ Hook for redirection

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

  // ✅ On Submit -> Redirect to Transaction Page
  const onSubmit = (data) => {
    if (totalDays === 0) {
      setError("Please select valid pickup and return dates");
      return;
    }

    // ✅ Prepare booking data
    const bookingData = {
      customer_id: user.id,
      car_id: car.car_id,
      time_period: totalDays,
      total: totalPrice,
    };

    // ✅ Navigate to payment/transaction page and pass booking data
    navigate("/transaction", { state: { bookingData } });
  };

  const today = new Date().toISOString().split("T")[0];
  const minReturnDate = pickupDate
    ? new Date(new Date(pickupDate).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : today;

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 space-y-5 border border-gray-700/50 shadow-2xl"
      >
        <div className="text-center pb-4 border-b border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <FaCheckCircle className="text-orange-500" />
            Book This Car
          </h3>
          <p className="text-gray-400 text-sm">
            Complete the form to reserve your ride
          </p>
        </div>

        {/* Pickup Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
            <FaCalendarAlt className="text-orange-400" />
            Pickup Date *
          </label>
          <input
            type="date"
            min={today}
            {...register("pickup_date", {
              required: "Pickup date is required",
            })}
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500"
          />
          {errors.pickup_date && (
            <p className="text-red-400 text-xs mt-1 ml-1">
              {errors.pickup_date.message}
            </p>
          )}
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
            <FaCalendarAlt className="text-orange-400" />
            Return Date *
          </label>
          <input
            type="date"
            min={minReturnDate}
            {...register("return_date", {
              required: "Return date is required",
            })}
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500"
          />
          {errors.return_date && (
            <p className="text-red-400 text-xs mt-1 ml-1">
              {errors.return_date.message}
            </p>
          )}
        </div>

        {/* Rental Summary */}
        <div className="bg-gray-700/30 rounded-xl p-4 space-y-3 border border-gray-600/30">
          <h4 className="text-white font-semibold flex items-center gap-2 mb-3">
            <FaClock className="text-orange-400" />
            Rental Summary
          </h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Days</span>
            <span className="text-white">{totalDays || "-"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Price</span>
            <span className="text-orange-500 font-bold">${totalPrice}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || totalDays === 0 } // or any condition like loading || totalDays === 0
          className="w-full mt-6 
             bg-gradient-to-r from-orange-500 to-orange-600 
             text-white font-bold py-4 rounded-xl 
             transition-all hover:scale-[1.02]
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default RentForm;
