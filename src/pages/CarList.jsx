import CarCard from "../components/CarCard";
import { LuFilter } from "react-icons/lu";

function CarList() {
  return (
    <div className="text-white md:px-25 py-16">
      
      <div className="text-center md:text-left mb-10">
        <h1 className="text-4xl md:text-4xl font-extrabold text-white">
          Browse <span className="text-orange-500">Car</span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Choose from our wide selection of premium vehicles
        </p>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-700 mb-12">
        <h2 className="flex items-center gap-2 text-xl font-bold mb-6">
          <LuFilter className="text-orange-500 text-2xl" />
          Filters
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="search" className="text-gray-300 font-semibold mb-2">
              Search
            </label>
            <input
              type="text"
              name="search_car"
              id="search"
              placeholder="Search by name or brand..."
              className="bg-[#0f172a] text-gray-200 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="car_type" className="text-gray-300 font-semibold mb-2">
              Vehicle Type
            </label>
            <select
              name="car_type"
              id="car_type"
              className="bg-[#0f172a] text-gray-200 px-4 py-3.5 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            >
              <option value="all">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="hatchback">Hatchback</option>
              <option value="convertible">Convertible</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4">
        <CarCard />
      </div>
    </div>
  );
}

export default CarList;
