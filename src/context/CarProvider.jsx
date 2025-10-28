import { createContext, useEffect, useState } from "react";
export const CarContext = createContext();
import {getCars} from '../api/api';

export default function CarProvider({ children }) {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getCars(); 
        setCars(res.data); 
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
}
