import { useContext } from "react"
import { CarContext } from "../context/CarProvider";
import CarContent from "../components/CarContent";
import { useParams } from "react-router-dom";

function CarDetails() {
  const {cars} = useContext(CarContext);
  const {id} = useParams();

  const car = cars.find((cars) => cars.id === Number(id));
  
  return (
    <>
      <CarContent car={car}/>
    </>
  )
}

export default CarDetails