function TripCard({ trip }) {
  return (
    <div className="flex-shrink-0 w-[350px] h-[400px] bg-white  rounded-2xl overflow-hidden cursor-pointer
      border border-white/10 shadow-md
      transition-all duration-300 ease-out
      hover:-translate-y-3 hover:scale-[1.06]  hover:shadow-[0_28px_56px_rgba(0,0,0,0.4)]">

      <div className="relative h-190px overflow-hidden">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {trip.tag && (
          <span className="absolute top-3 right-3 text-[10px] font-medium text-white
            bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 tracking-wide">
            {trip.tag}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-[15px] font-medium text-gray-900 mb-2.5">{trip.destination}</p>

        <div className="flex flex-col gap-1.5 mb-4">
          <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
            <span className="text-[13px]">📅</span>{trip.dates}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
            <span className="text-[13px]">₹</span>Budget: {trip.budget}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center
              text-[9px] font-medium text-gray-500">
              {trip.initials}
            </div>
            <span className="text-[11.5px] text-gray-500">{trip.host}</span>
          </div>
          <span className={`text-[11px] font-medium border rounded-md px-2.5 py-0.5
            ${trip.spots <= 2
              ? "text-red-600 border-red-200 bg-red-50"
              : "text-gray-600 border-gray-200"}`}>
            {trip.spots} spots left
          </span>
        </div>
      </div>
    </div>
  );
}

export default TripCard;