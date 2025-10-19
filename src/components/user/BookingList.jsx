function BookingList({ cars, onSelectCar }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      <hr className="border-gray-700 mb-6" />
      <div className="grid md:grid-cols-2 gap-6">
        {cars.map((car) => (
          <div
            key={car.car_id}
            onClick={() => onSelectCar(car)}
            className="bg-gray-700 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <img src={car.image} alt={car.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-gray-400">{car.type} • {car.fuel}</p>
              <p className="text-orange-500 mt-2">LKR {car.price_per_day}/day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;
