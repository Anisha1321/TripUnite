import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TripSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

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
  ];

  // 🔍 Filter logic
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "low" && trip.price < 10000) ||
      (filter === "mid" && trip.price >= 10000 && trip.price <= 20000) ||
      (filter === "high" && trip.price > 20000);

    return matchesSearch && matchesFilter;
  });
  

  return (
    <div className="flex h-screen relative ">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&display=swap');
        .grad-text { background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #9FE1CB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: border-color 0.25s, transform 0.25s; }
        .card-hover:hover { border-color: rgba(29,158,117,0.35) !important; transform: translateY(-3px); }
        .btn-primary { background: linear-gradient(135deg, #1D9E75, #0F6E56); transition: opacity 0.2s, transform 0.15s; border: none; cursor: pointer; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .social-card { transition: background 0.2s, border-color 0.2s, transform 0.2s; }
        .social-card:hover { background: rgba(29,158,117,0.08) !important; border-color: rgba(29,158,117,0.25) !important; transform: translateY(-2px); }
        ::placeholder { color: #4B5563; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .tag-pill { background: rgba(29,158,117,0.1); border: 1px solid rgba(29,158,117,0.2); color: #5DCAA5; }
      `}</style>

      {/* 🔹 Sidebar */}
      <aside className="w-[300px] bg-[#0D1117] p-6 -r hidden lg:flex flex-col gap-6">
        
        
        {/* Filter Dropdown */}
        <div className=" bg-[#111827] rounded-2xl  pt-4 p-3 h-full">
          
          <div className="mb-3">
            <h2 className="block text-[13px] font-medium mb-1 transition-colors hover:text-green-400" style={{ color: "#5DCAA5" }}>
              Search Trips
            </h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by title or destination"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 text-sm py-2 text-[#F3F4F6] bg-[#0D1117] border border-[#ffffff14] rounded-lg outline-none focus:text-white focus:border  focus:border-[#1D9E75]"
            />

          </div>
          
          <label className="block text-[13px] font-medium mb-2 transition-colors hover:text-green-400" style={{ color: "#5DCAA5" }}>Filter by Price</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className=" w-full outline-none text-white font-medium btn-primary text-[14px] px-3 py-2 rounded-lg"
          >
            <option className="text-black" value="all">All</option>
            <option className="text-black" value="low">Below ₹10,000</option>
            <option className="text-black" value="mid">₹10,000 - ₹20,000</option>
            <option className="text-black" value="high">Above ₹20,000</option>
          </select>
        </div>

      </aside>

      {/* 🔹 Right Section */}
      <div className="flex-1 bg-[#0D1117]  flex flex-col ">

        {/* ✅ Sticky Header */}
        <div className="sticky justify-between items-center flex top-0 bg-[#0D1117] z-10 px-6 py-2.5">
          <h1 className="text-4xl text-white sm:text-5xl md:text-4xl font-light leading-tight tracking-tight mt-3" style={{ fontFamily: "'Fraunces', serif" }}>
            Upcoming <span className="grad-text italic">Trips.</span>
          </h1>
          <button onClick={() => navigate("/create")} className="btn-primary  text-white text-[13px] font-medium px-4 py-2 rounded-lg">
            + Create Trip
          </button>
        </div>

        {/* ✅ Scrollable Content */}
        <div className="overflow-y-auto m-6 rounded-2xl px-6 py-6 bg-gray-300">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-gray-900 flex flex-col rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
              >

                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-[180px] w-full object-cover"
                />

                <div className="flex flex-col gap-4 p-4 text-white">

                  <div>
                    <h3 className="font-semibold">
                      {trip.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {trip.destination}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-bold">₹{trip.price}</span>
                    <span className="text-sm text-gray-400">
                      {trip.duration}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn-primary w-full text-white text-[13px] font-medium px-4 py-2 rounded-lg">
                      View
                    </button>
                    <button className="btn-primary w-full text-white text-[13px] font-medium px-4 py-2 rounded-lg">
                      Join
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

    </div>
  );
}






// export default function TripSection() {

//   const trips = [
//     {
//       id: 1,
//       title: "Mystical Ladakh Expedition",
//       destination: "Ladakh, India",
//       price: 18500,
//       duration: "7 days",
//       image:
//         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
//     },
//     {
//       id: 2,
//       title: "Goa Beach Escape",
//       destination: "Goa, India",
//       price: 8200,
//       duration: "4 days",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//     },
//     {
//       id: 3,
//       title: "Bali Spiritual Journey",
//       destination: "Bali, Indonesia",
//       price: 22000,
//       duration: "6 days",
//       image:
//         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
//     },
//     {
//       id: 1,
//       title: "Mystical Ladakh Expedition",
//       destination: "Ladakh, India",
//       price: 18500,
//       duration: "7 days",
//       image:
//         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
//     },
//     {
//       id: 2,
//       title: "Goa Beach Escape",
//       destination: "Goa, India",
//       price: 8200,
//       duration: "4 days",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//     },
//     {
//       id: 3,
//       title: "Bali Spiritual Journey",
//       destination: "Bali, Indonesia",
//       price: 22000,
//       duration: "6 days",
//       image:
//         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
//     },
//     {
//       id: 1,
//       title: "Mystical Ladakh Expedition",
//       destination: "Ladakh, India",
//       price: 18500,
//       duration: "7 days",
//       image:
//         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
//     },
//     {
//       id: 2,
//       title: "Goa Beach Escape",
//       destination: "Goa, India",
//       price: 8200,
//       duration: "4 days",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//     },
//     {
//       id: 3,
//       title: "Bali Spiritual Journey",
//       destination: "Bali, Indonesia",
//       price: 22000,
//       duration: "6 days",
//       image:
//         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
//     },
//     {
//       id: 1,
//       title: "Mystical Ladakh Expedition",
//       destination: "Ladakh, India",
//       price: 18500,
//       duration: "7 days",
//       image:
//         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
//     },
//     {
//       id: 2,
//       title: "Goa Beach Escape",
//       destination: "Goa, India",
//       price: 8200,
//       duration: "4 days",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//     },
//     {
//       id: 3,
//       title: "Bali Spiritual Journey",
//       destination: "Bali, Indonesia",
//       price: 22000,
//       duration: "6 days",
//       image:
//         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
//     },
//   ];

//   return (
//     <div className="w-full mx-auto flex justify-between">

//       {/* Sidebar */}
//       {/* <aside className="w-[240px] bg-purple-200 border-r px-6 pr-6 mr-0 py-10 hidden lg:block">

//         <h3 className="text-sm font-semibold mb-4">Top Hosts</h3>

//         <div className="space-y-4">

//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
//               AM
//             </div>
//             <span className="text-sm">Arjun Mehta</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-xs">
//               AK
//             </div>
//             <span className="text-sm">Anisha Kr</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">
//               RS
//             </div>
//             <span className="text-sm">Rohan Sharma</span>
//           </div>

//         </div>

//       </aside> */}

//       {/* Trips Grid */}
//       {/* <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">

//         {trips.map((trip) => (
//           <div
//             key={trip.id}
//             className="border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
//           >

//             <img
//               src={trip.image}
//               alt={trip.title}
//               className="h-[180px] w-full object-cover"
//             />

//             <div className="p-4">

//               <h3 className="font-semibold text-gray-900">
//                 {trip.title}
//               </h3>

//               <p className="text-sm text-gray-500">
//                 {trip.destination}
//               </p>

//               <div className="flex justify-between mt-2">

//                 <span className="font-bold">
//                   ₹{trip.price}
//                 </span>

//                 <span className="text-sm text-gray-500">
//                   {trip.duration}
//                 </span>

//               </div>

//               <button className="mt-3 w-full border border-gray-900 rounded py-1 hover:bg-gray-900 hover:text-white transition">
//                 View Details
//               </button>

//             </div>

//           </div>
//         ))}

//       </div> */}
//       <div className="flex-1 h-[90vh] pt-5 px-6 bg-white text-white overflow-y-auto hide-scrollbar">
//         <h2 className="text-4xl font-semibold  text-center text-gray-500">Upcoming Group Trips you can join</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">

//           {trips.map((trip) => (
//             <div
//               key={trip.id}
//               className=" bg-gray-900 flex flex-col rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
//             >

//               <img
//                 src={trip.image}
//                 alt={trip.title}
//                 className="h-[180px] w-full object-cover"
//               />

//               <div className="flex flex-col gap-5 p-4">

//                 <div>
//                     <h3 className="font-semibold text-white">
//                         {trip.title}
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                         {trip.destination}
//                     </p>
//                 </div>

//                 <div className="flex justify-between mt-2">

//                   <span className="font-bold">
//                     ₹{trip.price}
//                   </span>

//                   <span className="text-sm text-gray-500">
//                     {trip.duration}
//                   </span>

//                 </div>

//                 <div className="flex gap-3 text-gray-900">
//                     <button className="mt-3 bg-gray-300 w-full border-gray-900 rounded py-1 hover:bg-gray-900 hover:text-white hover:border hover:border-white transition">
//                         View Details
//                     </button>
//                     <button className="mt-3 w-full bg-gray-300 border border-gray-900 rounded py-1 hover:bg-gray-900 hover:text-white hover:border hover:border-white transition">
//                         Join Trip
//                     </button>
//                 </div>

//               </div>

//             </div>
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }