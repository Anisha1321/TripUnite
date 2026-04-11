export default function TripSection() {

  const trips = [
    {
      id: 1,
      title: "Mystical Ladakh Expedition",
      destination: "Ladakh, India",
      price: 18500,
      duration: "7 days",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    {
      id: 2,
      title: "Goa Beach Escape",
      destination: "Goa, India",
      price: 8200,
      duration: "4 days",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      id: 3,
      title: "Bali Spiritual Journey",
      destination: "Bali, Indonesia",
      price: 22000,
      duration: "6 days",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    },
    {
      id: 1,
      title: "Mystical Ladakh Expedition",
      destination: "Ladakh, India",
      price: 18500,
      duration: "7 days",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    {
      id: 2,
      title: "Goa Beach Escape",
      destination: "Goa, India",
      price: 8200,
      duration: "4 days",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      id: 3,
      title: "Bali Spiritual Journey",
      destination: "Bali, Indonesia",
      price: 22000,
      duration: "6 days",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    },
    {
      id: 1,
      title: "Mystical Ladakh Expedition",
      destination: "Ladakh, India",
      price: 18500,
      duration: "7 days",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    {
      id: 2,
      title: "Goa Beach Escape",
      destination: "Goa, India",
      price: 8200,
      duration: "4 days",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      id: 3,
      title: "Bali Spiritual Journey",
      destination: "Bali, Indonesia",
      price: 22000,
      duration: "6 days",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    },
    {
      id: 1,
      title: "Mystical Ladakh Expedition",
      destination: "Ladakh, India",
      price: 18500,
      duration: "7 days",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    {
      id: 2,
      title: "Goa Beach Escape",
      destination: "Goa, India",
      price: 8200,
      duration: "4 days",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      id: 3,
      title: "Bali Spiritual Journey",
      destination: "Bali, Indonesia",
      price: 22000,
      duration: "6 days",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    },
  ];

  return (
    <div className="w-full mx-auto flex justify-between">

      {/* Sidebar */}
      {/* <aside className="w-[240px] bg-purple-200 border-r px-6 pr-6 mr-0 py-10 hidden lg:block">

        <h3 className="text-sm font-semibold mb-4">Top Hosts</h3>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
              AM
            </div>
            <span className="text-sm">Arjun Mehta</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-xs">
              AK
            </div>
            <span className="text-sm">Anisha Kr</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">
              RS
            </div>
            <span className="text-sm">Rohan Sharma</span>
          </div>

        </div>

      </aside> */}

      {/* Trips Grid */}
      {/* <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">

        {trips.map((trip) => (
          <div
            key={trip.id}
            className="border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
          >

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
        ))}

      </div> */}
      <div className="flex-1 h-[90vh] pt-5 px-6 bg-white text-white overflow-y-auto hide-scrollbar">
        <h2 className="text-4xl font-semibold  text-center text-gray-500">Upcoming Group Trips you can join</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">

          {trips.map((trip) => (
            <div
              key={trip.id}
              className=" bg-gray-900 flex flex-col rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >

              <img
                src={trip.image}
                alt={trip.title}
                className="h-[180px] w-full object-cover"
              />

              <div className="flex flex-col gap-5 p-4">

                <div>
                    <h3 className="font-semibold text-white">
                        {trip.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {trip.destination}
                    </p>
                </div>

                <div className="flex justify-between mt-2">

                  <span className="font-bold">
                    ₹{trip.price}
                  </span>

                  <span className="text-sm text-gray-500">
                    {trip.duration}
                  </span>

                </div>

                <div className="flex gap-3 text-gray-900">
                    <button className="mt-3 bg-gray-300 w-full border-gray-900 rounded py-1 hover:bg-gray-900 hover:text-white hover:border hover:border-white transition">
                        View Details
                    </button>
                    <button className="mt-3 w-full bg-gray-300 border border-gray-900 rounded py-1 hover:bg-gray-900 hover:text-white hover:border hover:border-white transition">
                        Join Trip
                    </button>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}