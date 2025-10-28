import { useContext, useState } from "react";
import CarCard from "../components/CarCard";
import { LuFilter } from "react-icons/lu";
import { CarContext } from "../context/CarProvider";
import BannerHeader from "../components/BannerHeader";

function CarList() {
  const { cars } = useContext(CarContext);
  
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all");

const carTypes = [
  ...new Set(
    cars
      .map((car) => car.model?.toLowerCase() || "unknown") 
  ),
];

const filteredCars = cars.filter((car) => {
  const carType = car.model?.toLowerCase() || "unknown"; 
  const carModel = car.model?.toLowerCase() || "";
  const carMake = car.make?.toLowerCase() || "";

  const matchesSearch =
    carModel.includes(searchText.toLowerCase()) ||
    carMake.includes(searchText.toLowerCase());
  const matchesType = selectedType === "all" || carType === selectedType;

  return matchesSearch && matchesType;
});


  return (
    <div className="text-white px-6 md:px-20 py-10 space-y-20">
      <BannerHeader
        t1="Browse"
        t2="Car"
        des="Discover your ideal ride from our wide range of vehicles — reliable, stylish, and ready for every journey."
        page="CAR"
      />

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
              id="search"
              placeholder="Search by name or brand..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-[#0f172a] text-gray-200 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="car_type" className="text-gray-300 font-semibold mb-2">
              Vehicle Type
            </label>
            <select
              id="car_type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#0f172a] text-gray-200 px-4 py-3.5 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            >
              <option value="all">All Types</option>
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredCars.map((car) => (
          <CarCard key={car.car_id} {...car} />
        ))}
      </div>
    </div>
  );
}

export default CarList;
