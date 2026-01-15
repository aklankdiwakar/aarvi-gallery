// Hero section component

export const HeroSection = () => {
  return (
    <div className="gradient-hero text-white py-32 sm:py-48 lg:py-56">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-12 sm:space-y-16">
            {/* Icon - Centered */}
            <div className="flex justify-center w-full">
              <div className="text-7xl sm:text-8xl">📸</div>
            </div>
            
            {/* Title - Centered */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Aarvi's Moments
            </h1>
            
            {/* Description - Centered */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-3xl px-4">
              A beautiful collection of precious memories and special moments. Every photo tells a story worth sharing.
            </p>
            
            {/* CTA Buttons - Centered */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 px-4">
              <button className="px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-xl hover:bg-slate-50 hover:shadow-2xl transition-all duration-300 shadow-lg transform hover:scale-105">
                Explore Gallery
              </button>
              <button className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg transform hover:scale-105">
                Share & Connect
              </button>
            </div>

            {/* Stats - Perfectly Centered */}
            <div className="pt-16 sm:pt-24 w-full flex justify-center">
              <div className="grid grid-cols-3 gap-12 sm:gap-24 lg:gap-32">
                <div className="text-center space-y-3">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-black">100+</div>
                  <p className="text-slate-300 text-sm sm:text-base font-medium tracking-wide">PHOTOS</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-black">5K+</div>
                  <p className="text-slate-300 text-sm sm:text-base font-medium tracking-wide">MEMORIES</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-5xl sm:text-6xl lg:text-7xl">❤️</div>
                  <p className="text-slate-300 text-sm sm:text-base font-medium tracking-wide">SMILES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
