import bgImage from "../../assets/foreground.png";

function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: "92vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-white">
        <h1 className="text-5xl font-semibold mb-4">
          Find Your Perfect Travel Companion
        </h1>

        <p className="text-gray-300 mb-6">
          Discover trips and explore the world together
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 rounded-lg border border-gray-300 text-gray-200 font-semibold hover:bg-gray-400 hover:text-black hover:scale-105 transition-colors duration-200">
            Create Trip
          </button>

          <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-200 font-semibold hover:bg-gray-400 hover:text-black hover:scale-105 transition-colors duration-200">
            Explore Trips
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;