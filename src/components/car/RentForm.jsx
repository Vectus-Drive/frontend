import { useState } from "react";

function RentForm({ car }) {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const totalDays =
    pickupDate && returnDate
      ? Math.ceil(
          (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
        )
      : 0;
  const totalPrice = totalDays * (car.price_per_day || 0);

  return (
    <>
      <p className="text-2xl font-bold text-orange-500">
        ${car.price_per_day}/day
      </p>
      <p
        className={`font-semibold ${
          car.availability_status === "Available"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {car.availability_status}
      </p>

      <label className="text-gray-300 text-sm font-semibold">Pickup Date</label>
      <input
        type="date"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />

      <label className="text-gray-300 text-sm font-semibold">Return Date</label>
      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />

      <div className="flex justify-between text-gray-300 text-sm font-semibold mt-1">
        <p>Time Period:</p>
        <p>{totalDays > 0 ? `${totalDays} day(s)` : "-"}</p>
      </div>

      <label className="text-gray-300 text-sm font-semibold mt-2">
        Full Name
      </label>
      <input
        type="text"
        placeholder="Your Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />

      <label className="text-gray-300 text-sm font-semibold">Email</label>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />

      <label className="text-gray-300 text-sm font-semibold">Phone</label>
      <input
        type="text"
        placeholder="Your Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
      />

      <div className="flex justify-between mt-3 text-gray-300 font-semibold">
        <p>Rate/day:</p>
        <p>${car.price_per_day}</p>
      </div>
      <div className="flex justify-between mt-1 text-orange-500 text-lg font-bold">
        <p>Total:</p>
        <p>${totalPrice}</p>
      </div>

      <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all">
        Confirm Booking
      </button>
    </>
  );
}

export default RentForm;
