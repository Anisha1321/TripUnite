import { useState } from "react";

function TripCard({ trip }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden  cursor-pointer transition-all duration-200"
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.10)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <img
        src={trip.image}
        alt={trip.destination}
        className="w-full h-44 object-cover block bg-gray-200"
      />

      <div className="p-10">
        <p className="text-[15px] font-medium text-gray-900 mb-3">
          {trip.destination}
        </p>

        <div className="flex flex-col gap-1 mb-4">
          <span className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
            <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-[10px]">
              📅
            </span>
            {trip.dates}
          </span>
          <span className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
            <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-[10px]">
              ₹
            </span>
            Budget: {trip.budget}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-[26px] h-[26px] rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-500">
              {trip.initials}
            </div>
            <span className="text-xs text-gray-500">{trip.host}</span>
          </div>
          <span className="text-[11px] font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-2.5 py-1">
            {trip.spots} spots left
          </span>
        </div>
      </div>
    </div>
  );
}

export default TripCard;