function CarFeatures({car}) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-white mb-2">About this car</h3>
      <p className="text-gray-400 text-base leading-relaxed">
        {car.description}
      </p>

      {car.features && car.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {car.features.map((feature, index) => (
            <span
              key={index}
              className="bg-green-600/20 text-green-400 text-sm px-3 py-1 rounded-full hover:bg-green-500/30 transition"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
       <p className=" text-green-400 text-sm px-3 py-1 rounded-full hover:bg-green-500/30 transition">
              {car.condition}
          </p>
            <p className="text-green-400 text-sm px-3 py-1 rounded-full hover:bg-green-500/30 transition">
              {car.services}
        </p>
    </>
  );
}

export default CarFeatures;
