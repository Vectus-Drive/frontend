import { createContext, useState } from "react";

export const CarContext = createContext();

export default function CarProvider({ children }) {
  const [cars, setCars] = useState([
    {
      id: 1,
      no : "add3455",
      name: "Toyota", //make
      type: "Sedan", //model //generate report
      image: "car1.jpg",
      seats: 4,
      fuel: "Petrol",
      transmission: "Automatic",
      doors : 2,
      description:
        "A reliable and fuel-efficient sedan, perfect for city driving and long trips.",
      features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
      price_per_day: 50,
      availability_status: "Available",
      //condition
      //services(last with date)
    },
    {
      id: 2,
      no : "add3425",
      name: "Honda",
      type: "SUV",
      image: "car.jpg",
      seats: 7,
      fuel: "Diesel",
      transmission: "Manual",
      doors : 2,
      description:
        "A spacious SUV with advanced safety features, ideal for family outings and off-road adventures.",
      features: ["4WD", "Heated Seats", "Keyless Entry"],
      price_per_day: 80,
      availability_status: "Available",
    },
  ]);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
}
