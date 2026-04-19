import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";

export default function TripSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "trips"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(data);
      setLoading(false);
    });
    return unsub;
  }, []);

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

            {/* {filteredTrips.map((trip) => (
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
                    <button onClick={() => navigate("/details")} className="btn-primary w-full text-white text-[13px] font-medium px-4 py-2 rounded-lg">
                      View
                    </button>
                    <button className="btn-primary w-full text-white text-[13px] font-medium px-4 py-2 rounded-lg">
                      Join
                    </button>
                  </div>

                </div>

              </div>
            ))} */}

            {loading ? (
              <div className="flex items-center justify-center py-20 col-span-3">
                <div className="w-6 h-6  rounded-full animate-spin" />
              </div>
            ) : filteredTrips.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 col-span-3 text-gray-500">
                <p className="text-lg">No trips found.</p>
                <button
                  onClick={() => navigate("/create")}
                  className="btn-primary mt-4 px-6 py-2 rounded-lg text-white text-sm"
                >
                  Create the first one →
                </button>
              </div>
            ) : (
              filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="card-hover"
                  style={{
                    background: "#111827",
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Cover Image */}
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    {trip.coverUrl ? (
                      <img
                        src={trip.coverUrl}
                        alt={trip.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{
                        height: "100%",
                        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>No cover image</span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(13,17,23,0.9) 0%, transparent 60%)",
                    }} />

                    {/* Trip type badge */}
                    {trip.tripType && (
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span className="tag-pill" style={{ fontSize: 10, padding: "3px 8px", borderRadius: 999 }}>
                          {trip.tripType}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px 20px" }}>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 300,
                      fontSize: 18,
                      lineHeight: 1.3,
                      marginBottom: 6,
                      color: "#fff",
                    }}>
                      {trip.title}
                    </h3>

                    {/* Destination */}
                    {trip.destination && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                        <svg width="12" height="12" fill="none" stroke="#5DCAA5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{trip.destination}</span>
                      </div>
                    )}

                    {/* Divider */}
                    <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />

                    {/* Price + Duration */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#4B5563", marginBottom: 2 }}>FROM</div>
                        <div className="grad-text" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 22 }}>
                          ₹{Number(trip.price).toLocaleString()}
                        </div>
                        <div style={{ fontSize: 11, color: "#4B5563" }}>per person</div>
                      </div>

                      {(trip.startDate && trip.endDate) && (
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 11, color: "#4B5563", marginBottom: 2 }}>DURATION</div>
                          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 22, color: "#fff" }}>
                            {Math.max(1, Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000))}
                          </div>
                          <div style={{ fontSize: 11, color: "#4B5563" }}>nights</div>
                        </div>
                      )}
                    </div>

                    {/* Seats */}
                    {trip.seats && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                        <svg width="12" height="12" fill="none" stroke="#4B5563" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span style={{ fontSize: 12, color: "#4B5563" }}>{trip.seats} seats available</span>
                      </div>
                    )}

                    {/* Stars */}
                    <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} width="12" height="12" fill={i <= 4 ? "#f59e0b" : "rgba(255,255,255,0.15)"} viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                      <span style={{ fontSize: 11, color: "#4B5563", marginLeft: 4 }}>New experience</span>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => navigate("/details")}
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: "center", fontSize: 13, padding: "10px 0", borderRadius: 10, color: "#fff", display: "flex", alignItems: "center" }}
                      >
                        View Trip
                      </button>
                      <button
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: "center", fontSize: 13, padding: "10px 0", borderRadius: 10, color: "#fff", display: "flex", alignItems: "center" }}
                      >
                        Join
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}

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