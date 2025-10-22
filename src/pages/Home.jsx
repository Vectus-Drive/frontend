import CarRentStatus from "../components/hero/CarRentStatus"
import Feature from "../components/hero/Feature"
import FeedbackList from "../components/hero/FeedbackList"
import Hero from "../components/hero/Hero"
import NewCar from "../components/hero/NewCar"
import QualityShowcase from "../components/hero/QualityShowcase"
import VehicleShowcaseSection from "../components/hero/VehicleShowcaseSection "

function Home() {
  return (
    <div>
      <Hero />
      <QualityShowcase />
      <NewCar />
      <Feature />
      <CarRentStatus />
      <VehicleShowcaseSection />
      <FeedbackList />
      
    </div>
  )
}

export default Home