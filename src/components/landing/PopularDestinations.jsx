import TripCard from "./TripCard";
import trips from "../../data/trips";

function PopularDestinations() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;