import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#1a2332] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 relative">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>
            <svg 
              className="w-32 h-32 text-orange-500 mx-auto relative animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4">
            4<span className="text-orange-500">0</span>4
          </h1>
          <div className="h-1 w-32 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Wrong Turn
        </h2>
        <p className="text-slate-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Looks like you've taken a detour. The page you're looking for doesn't exist or has been moved to a new destination.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Back to Home
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button 
            onClick={() => window.location.href = '/car'}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-600"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Book Cars
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <p className="text-slate-500 text-sm uppercase tracking-wider mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="text-slate-400 hover:text-orange-500 transition-colors">
              Home
            </a>
            <span className="text-slate-700">|</span>
            <a href="/car" className="text-slate-400 hover:text-orange-500 transition-colors">
              Book Now
            </a>
            <span className="text-slate-700">|</span>
            <a href="/about" className="text-slate-400 hover:text-orange-500 transition-colors">
              About Us
            </a>
            <span className="text-slate-700">|</span>
            <a href="/contact-us" className="text-slate-400 hover:text-orange-500 transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;