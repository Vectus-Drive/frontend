import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1729] to-[#1a1f35] flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative text-center">
        <div className="w-80 h-1 bg-slate-700 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-road"></div>
        </div>

        <div className="relative mb-8 animate-car-bounce">
          <div className="car-container mx-auto w-32 h-20 relative">
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-orange-500 rounded-lg">
              <div className="absolute -top-6 left-6 right-6 h-8 bg-orange-600 rounded-t-lg"></div>
              
              <div className="absolute top-[-1.4rem] left-8 w-6 h-5 bg-slate-800 rounded-sm"></div>
              <div className="absolute top-[-1.4rem] right-8 w-6 h-5 bg-slate-800 rounded-sm"></div>
              
              <div className="absolute top-2 left-1 w-3 h-2 bg-yellow-300 rounded-sm"></div>
              <div className="absolute top-2 right-1 w-3 h-2 bg-yellow-300 rounded-sm"></div>
              
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-slate-800 rounded-sm"></div>
            </div>
            
            <div className="absolute -bottom-2 left-6 w-6 h-6 bg-slate-700 rounded-full border-4 border-slate-800 animate-spin-wheel"></div>
            <div className="absolute -bottom-2 right-6 w-6 h-6 bg-slate-700 rounded-full border-4 border-slate-800 animate-spin-wheel"></div>
            
            <div className="absolute -bottom-2 left-6 w-6 h-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 right-6 w-6 h-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in mt-12">
          Vectus Drive
        </h1>

        <p className="text-slate-400 text-lg mb-6 animate-fade-in-delay">
          Loading your journey...
        </p>

        <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-loading-bar"></div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes road {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes car-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes spin-wheel {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-road {
          animation: road 2s linear infinite;
        }

        .animate-car-bounce {
          animation: car-bounce 1.5s ease-in-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 3s ease-in-out infinite;
        }

        .animate-spin-wheel {
          animation: spin-wheel 1s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default Preloader;