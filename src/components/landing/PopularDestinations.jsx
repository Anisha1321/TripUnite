import TripCard from "./TripCard";
import trips from "../../data/trips";
import bgImage from "../../assets/foreground.png";

function PopularDestinations() {
  return (
    <section
      className="relative z-20 py-10 min-h-[92vh] overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      
      <div className="absolute inset-0 bg-black/60" />

      {/* Edge fade vignettes
      <div className="absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(10,10,20,0.85), transparent)" }}
      />
      <div className="absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(10,10,20,0.85), transparent)" }}
      /> */}

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-widest text-white/50 uppercase mb-2">
            Explore India
          </p>
          <h2 className="text-4xl font-semibold text-white">Popular Destinations</h2>
        </div>

        <p className="text-center text-[11px] text-white/40 border border-white/15 rounded-full 
           w-fit mx-auto px-4 py-1 mb-10">
          Hover to pause &nbsp;·&nbsp; {trips.length} curated trips
        </p>

        {/* Marquee */}
        <div className="w-full" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <div className="overflow-hidden">
            <div className="flex gap-10 w-max py-10 animate-marquee pause-on-hover">
              {[...trips, ...trips].map((trip, i) => (
                <TripCard key={i} trip={trip} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;