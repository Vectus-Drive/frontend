import featureImg from "../../assets/pngwing.png";

const FeatureItem = ({ icon, title, description, alignment }) => {
  const isRight = alignment === 'right';
  return (
    <div className={`flex items-start gap-4 ${isRight ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
      <div className="bg-orange-400 text-white p-2.5 rounded-lg flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl font-bold">
        {icon}
      </div>
      <div>
        <div className="font-bold text-lg mb-1">{title}</div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

function Feature() {
  return (
    <div className="text-white py-16 px-4 font-sans">
      <div className="text-center mb-10">
        <p className="text-orange-400 text-sm font-bold uppercase mb-1">Why Choose Us</p>
        <h2 className="text-4xl font-extrabold mb-3">Our Features</h2>
        <p className="text-gray-300 text-base max-w-xl mx-auto leading-relaxed">
          Experience reliable daily car rentals with flexible options, affordable prices, and trusted service designed for your comfort and convenience.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-10 lg:gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-15 lg:w-72 mx-auto lg:mx-0">
          <FeatureItem
            icon="🚗"
            title="Daily Car Rentals"
            description="Choose from a range of vehicles for your daily travel needs — easy booking, quick pickup, and smooth rides every day."
            alignment="left"
          />
          <FeatureItem
            icon="🕒"
            title="Quick & Easy Process"
            description="Book your car in just a few minutes with simple steps — no hidden fees or long procedures."
            alignment="left"
          />
        </div>

        <div className="lg:w-150 w-full flex-shrink-0 mx-auto">
          <img src={featureImg} alt="Car Feature" className="w-full h-auto object-contain" />
        </div>

        <div className="flex flex-col gap-8 lg:w-72 mx-auto lg:mx-0">
          <FeatureItem
            icon="💰"
            title="Affordable Daily Rates"
            description="Enjoy competitive prices for daily rentals, giving you the best value without compromising quality."
            alignment="right"
          />
          <FeatureItem
            icon="📍"
            title="Free Pick-Up & Drop-Off"
            description="Get your rental car delivered and collected at your convenience — no extra charge within city limits."
            alignment="right"
          />
        </div>
      </div>
    </div>
  );
}

export default Feature;
