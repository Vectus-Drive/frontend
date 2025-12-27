import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CarContext } from "../context/CarProvider";
import RentForm from "../components/car/RentForm";
import CarFeatures from "../components/car/CarFeatures";

function CarDetails() {
  const { cars } = useContext(CarContext);
  const { id } = useParams();

  const car = cars.find((cars) => cars.car_id === id);

    if (!car) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading car details...</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 md:px-20 py-10 mt-20 relative">

      <div className="top-6 left-6 mb-6">
        <Link
          to="/cars"
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          ← Back to Cars
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: Car Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-lg object-cover border border-gray-700 bg-gray-800">
            <img
              src={car.image || "./car.jpg"}
              alt={car.make}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mt-2">{car.make}</h2>
            <p className="text-gray-400 text-sm mt-1">{car.model}</p>
            <p className="text-green-500 text-2xl font-semibold mt-2">
              ${car.price_per_day} / day
            </p>
          </div>

          <hr className="border-gray-700 my-4" />

          {/* Features */}
          <div className="mt-6 p-6 bg-gray-800 rounded-2xl border border-gray-700 space-y-4">
            <CarFeatures car={car} />
          </div>
        </div>

        {/* RIGHT: Booking Form */}
        <div className="bg-gray-800/50 h-fit rounded-2xl p-6 shadow-lg border border-gray-700 sticky top-25 flex flex-col gap-4">
          <RentForm
            car={car}
          />
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
