function CarFeatures({ car }) {
  return (
    <div className="space-y-6">
      {/* About Section */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-2">About This Car</h3>
        <p className="text-gray-400 text-base leading-relaxed">
          {car.description || "No description available for this vehicle."}
        </p>
      </div>

      {/* Features Section */}
      {car.features && car.features.length > 0 && (
        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Features</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <span
                key={index}
                className="bg-green-600/20 text-green-400 text-sm px-3 py-1 rounded-full hover:bg-green-500/30 transition"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Condition Section */}
      {car.condition && (
        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Condition</h4>
          <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-3 py-1 rounded-full">
            {car.condition}
          </span>
        </div>
      )}

      {/* Service History Section */}
      {car.services && car.services.length > 0 && (
        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Service History</h4>
          <div className="space-y-3">
            {car.services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-700/40 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/60 transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-green-400 font-medium">
                    {service.details || "General Service"}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(service.service_date).toLocaleDateString()}
                  </span>
                </div>
                {service.transaction_amount && (
                  <p className="text-gray-300 text-sm">
                    Cost:{" "}
                    <span className="text-green-400 font-semibold">
                      ${service.transaction_amount.toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CarFeatures;
