export default function TripCard({ trip }) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">

      <img
        src={trip.image}
        alt={trip.title}
        className="h-[180px] w-full object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold text-gray-900">
          {trip.title}
        </h3>

        <p className="text-sm text-gray-500">
          {trip.destination}
        </p>

        <div className="flex justify-between mt-2">

          <span className="font-bold">
            ₹{trip.price}
          </span>

          <span className="text-sm text-gray-500">
            {trip.duration}
          </span>

        </div>

        <button className="mt-3 w-full border border-gray-900 rounded py-1 hover:bg-gray-900 hover:text-white transition">
          View Details
        </button>

      </div>

    </div>
  );
}