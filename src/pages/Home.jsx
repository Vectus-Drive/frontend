import CarRentStatus from "../components/hero/CarRentStatus"
import Feature from "../components/hero/Feature"
import FeedbackList from "../components/hero/FeedbackList"
import Hero from "../components/hero/Hero"
import NewCar from "../components/hero/NewCar"
import QualityShowcase from "../components/hero/QualityShowcase"

function Home() {
  return (
    <div>
      <Hero />
      <QualityShowcase />
      <NewCar />
      
      
      <Feature />
      <CarRentStatus />
      <FeedbackList />
      
    </div>
  )
}

export default Home