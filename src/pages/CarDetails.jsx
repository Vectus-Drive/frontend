import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaChair, FaGasPump, FaCogs, FaCar } from "react-icons/fa";

import { CarContext } from "../context/CarProvider";
import RentForm from "../components/car/RentForm";
import CarFeatures from "../components/car/CarFeatures";

function CarDetails() {
  const { cars } = useContext(CarContext);
  const { id } = useParams();

  const car = cars.find((cars) => cars.id === Number(id));

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white px-6 md:px-20 py-10">
        <div className="top-6 left-6 mb-6">
          <Link
            to="/car"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition-all"
          >
            ← Back to Cars
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-700 bg-gray-800">
              <img
                src={`/${car.image}`}
                alt={car.name}
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mt-2">{car.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{car.type}</p>
              <p className="text-green-500 text-2xl font-semibold mt-2">
                ${car.price_per_day} / day
              </p>
            </div>

            <hr className="border-gray-700 my-4" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center border border-gray-700 hover:bg-gray-700 transition">
                <FaChair className="text-orange-500 text-2xl mb-2" />
                <p className="text-gray-300 text-sm">Seats</p>
                <p className="text-white font-semibold">{car.seats}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center border border-gray-700 hover:bg-gray-700 transition">
                <FaGasPump className="text-orange-500 text-2xl mb-2" />
                <p className="text-gray-300 text-sm">Fuel</p>
                <p className="text-white font-semibold">{car.fuel}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center border border-gray-700 hover:bg-gray-700 transition">
                <FaCogs className="text-orange-500 text-2xl mb-2" />
                <p className="text-gray-300 text-sm">Transmission</p>
                <p className="text-white font-semibold">{car.transmission}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center border border-gray-700 hover:bg-gray-700 transition">
                <FaCar className="text-orange-500 text-2xl mb-2" />
                <p className="text-gray-300 text-sm">Doors</p>
                <p className="text-white font-semibold">{car.doors}</p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gray-800 rounded-2xl border border-gray-700 space-y-4">
              <CarFeatures car={car} />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700 sticky top-10 flex flex-col gap-4">
            <RentForm car={car} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CarDetails;
