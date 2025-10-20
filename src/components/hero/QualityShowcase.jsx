import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const tabContent = {
    LUXURY: {
        description: "We offer a meticulously curated collection of the most sought-after luxury vehicles on the market. Whether you prefer the sporty allure of a high-performance sports car, the sophistication of a sleek and luxurious sedan, or the versatility of a premium SUV, we have the perfect car to match your discerning taste.",
    },
    COMFORT: {
        description: "We prioritize your comfort and convenience throughout your journey. We understand that a comfortable ride can make a world of difference, whether you're embarking on a business trip or enjoying a leisurely vacation. That's why we offer a wide range of well-maintained, comfortable cars that cater to your specific needs.",
    },
    PRESTIGE: {
        description: "We understand that prestige goes beyond luxury. It's about making a statement, embracing sophistication, and indulging in the finer things in life. That's why we offer an exclusive selection of prestigious cars that exude elegance, style, and status.",
    }
};

const QualityShowcase = () => {
    const [activeTag, setActiveTag] = React.useState('LUXURY');
    const tags = ['LUXURY', 'COMFORT', 'PRESTIGE'];
    const currentContent = tabContent[activeTag];

    return (
        <section className="bg-dark-secondary text-gray-50 max-w-7xl mx-auto rounded-lg shadow-2xl overflow-hidden my-12">
            <div className="flex flex-col md:flex-row items-stretch">
                
                <div className="md:w-1/2 min-h-[300px] md:min-h-[500px] bg-cover bg-center transition-all duration-500"
                     style={{ 
                        backgroundImage: `url('./car.jpg')`,
                        backgroundColor: '#333' 
                     }}>
                </div>

                <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-300 mb-6">
                        Only Quality For Clients
                    </h2>

                    <div className="flex space-x-3 mb-6">
                        {tags.map((tag) => (
                            <button 
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`
                                    py-2 px-4 rounded-md font-semibold text-sm transition duration-300 ease-in-out
                                    ${activeTag === tag
                                        ? 'bg-accent-orange text-dark-primary shadow-lg' 
                                        : 'bg-dark-primary text-gray-400 hover:bg-gray-800 border border-gray-700'                                     }
                                `}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div className="h-auto min-h-[150px] transition-opacity duration-500 ease-in-out">
                        <p className="text-gray-400 text-base mb-8 leading-relaxed">
                            {currentContent.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityShowcase;