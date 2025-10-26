import { createContext, useState } from "react";

export const CarContext = createContext();

export default function CarProvider({ children }) {
  const [cars, setCars] = useState([
    {
    id: 1,
    no: "ADD3455",
    make: "Toyota",
    model: "Corolla",
    image: "Toyota - Corolla.jpg",
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    doors: 4,
    description: "A reliable and fuel-efficient sedan, perfect for city driving and long trips.",
    features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
    price_per_day: 50,
    availability_status: "Not Available",
    condition: "Excellent",
    services: "Oil Change - 2025-10-01",
  },
  {
    id: 2,
    no: "CAD2189",
    make: "Honda",
    model: "Corolla",
    image: "Honda - Civic.jpg",
    seats: 4,
    fuel: "Petrol",
    transmission: "Manual",
    doors: 4,
    description: "Sporty design with efficient fuel economy and comfortable interior.",
    features: ["Cruise Control", "Touchscreen Display", "ABS Brakes"],
    price_per_day: 55,
    availability_status: "Available",
    condition: "Excellent",
    services: "Full Service - 2025-09-18",
  },
  {
    id: 3,
    no: "KFD4592",
    make: "Nissan",
    model: "Sunny",
    image: "Nissan - Sunny.jpg",
    seats: 4,
    fuel: "Diesel",
    transmission: "Automatic",
    doors: 4,
    description: "Spacious and comfortable sedan ideal for family travel.",
    features: ["Rear Parking Sensors", "Power Steering", "USB Charger"],
    price_per_day: 48,
    availability_status: "Available",
    condition: "Good",
    services: "Tire Rotation - 2025-09-05",
  },
  {
    id: 4,
    no: "BGA9983",
    make: "Suzuki",
    model: "Swift",
    image: "car4.jpg",
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    doors: 4,
    description: "Compact and stylish hatchback, easy to maneuver in traffic.",
    features: ["Smart Key Entry", "Touchscreen Audio", "Reverse Camera"],
    price_per_day: 45,
    availability_status: "Available",
    condition: "Excellent",
    services: "Battery Check - 2025-10-10",
  },
  {
    id: 5,
    no: "DHA5560",
    make: "Hyundai",
    model: "Elantra",
    image: "car5.jpg",
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    doors: 4,
    description: "A stylish sedan offering smooth handling and great comfort.",
    features: ["Sunroof", "Auto Climate Control", "Apple CarPlay"],
    price_per_day: 60,
    availability_status: "Available",
    condition: "Excellent",
    services: "Brake Service - 2025-08-30",
  },
  ]);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
}
