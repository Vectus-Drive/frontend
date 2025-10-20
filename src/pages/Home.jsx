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
      <Feature />
      <NewCar />
      <FeedbackList />
      <QualityShowcase />
      <CarRentStatus />
      
    </div>
  )
}

export default Home