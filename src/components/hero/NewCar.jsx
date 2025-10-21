import { useContext } from "react";
import CarCard from "../CarCard";
import { CarContext } from "../../context/CarProvider";

function NewCar() {
  const { cars } = useContext(CarContext);

  const topCars = cars.slice(0, 3);

  return (
    <section className="py-8 px-6 md:px-20 text-white text-center">
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-3">Top New Arrivals</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our latest arrivals — stylish, comfortable, and ready to hit the road.
        </p>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 rounded"></div>
      </div>

      <div className="flex gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center">
        {topCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </section>
  );
}

export default NewCar;
