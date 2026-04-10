// import React from 'react'

import CreateTripSection from "../components/landing/CreateTripSection";
import HeroSection from "../components/landing/HeroSection";
import PopularDestinations from "../components/landing/PopularDestinations";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PopularDestinations />
      <CreateTripSection />
      
      <Footer />
    </>
  );
}

export default LandingPage;

// import { useState } from "react";

// const trips = [
//   {
//     id: 1,
//     destination: "Manali Adventure",
//     dates: "June 12 – 18",
//     budget: "₹7,000",
//     host: "Rahul",
//     initials: "RK",
//     spots: 3,
//     image:
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",
//   },
//   {
//     id: 2,
//     destination: "Goa Beach Escape",
//     dates: "July 4 – 9",
//     budget: "₹9,500",
//     host: "Priya",
//     initials: "PS",
//     spots: 2,
//     image:
//       "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=75",
//   },
//   {
//     id: 3,
//     destination: "Rajasthan Heritage",
//     dates: "Aug 1 – 7",
//     budget: "₹12,000",
//     host: "Aisha",
//     initials: "AM",
//     spots: 5,
//     image:
//       "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75",
//   },
//   {
//     id: 4,
//     destination: "Spiti Valley Trek",
//     dates: "Sept 5 – 14",
//     budget: "₹15,000",
//     host: "Vikram",
//     initials: "VN",
//     spots: 4,
//     image:
//       "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=600&q=75",
//   },
// ];

// /* ─── Navbar ─────────────────────────────────────────────────────────── */
// function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 md:px-10 h-[60px] flex items-center justify-between">
//       <span className="text-[18px] font-medium tracking-tight text-gray-900">
//         Trip<span className="text-gray-400">Unite</span>
//       </span>

//       <div className="flex items-center gap-6 md:gap-8">
//         <div className="hidden sm:flex items-center gap-6 md:gap-8">
//           {["Explore Trips", "Create Trip", "Dashboard"].map((link) => (
//             <a
//               key={link}
//               href="#"
//               className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
//             >
//               {link}
//             </a>
//           ))}
//         </div>
//         <button className="text-[13px] font-medium px-4 py-1.5 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors">
//           Login
//         </button>
//       </div>
//     </nav>
//   );
// }

// /* ─── Hero Section ───────────────────────────────────────────────────── */
// function HeroSection() {
//   return (
//     <section
//       className="relative flex items-center justify-center text-center"
//       style={{
//         minHeight: "92vh",
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" />

//       <div className="relative z-10 max-w-2xl px-6">
//         <span className="inline-block mb-5 text-[11px] font-medium tracking-widest uppercase text-gray-300 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
//           ✦ Your travel community
//         </span>

//         <h1 className="text-4xl md:text-[3.25rem] font-medium leading-[1.18] tracking-tight text-white mb-4">
//           Find Your Perfect Travel Companion
//         </h1>

//         <p className="text-[1.05rem] text-gray-300 leading-relaxed mb-8">
//           Discover trips, meet travelers, and explore the world together.
//         </p>

//         <div className="flex flex-wrap gap-3 justify-center">
//           <button className="text-sm font-medium px-6 py-[11px] rounded-[10px] bg-gradient-to-b from-gray-600 to-gray-800 border border-gray-500 text-white hover:opacity-85 transition-opacity">
//             Create Trip
//           </button>
//           <button className="text-sm font-medium px-6 py-[11px] rounded-[10px] border border-white/35 text-white hover:bg-white/10 transition-colors">
//             Explore Trips
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─── Trip Card ──────────────────────────────────────────────────────── */
// function TripCard({ trip }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-200"
//       style={{
//         transform: hovered ? "translateY(-4px)" : "translateY(0)",
//         boxShadow: hovered
//           ? "0 12px 32px rgba(0,0,0,0.10)"
//           : "0 1px 3px rgba(0,0,0,0.04)",
//       }}
//     >
//       <img
//         src={trip.image}
//         alt={trip.destination}
//         className="w-full h-44 object-cover block bg-gray-200"
//       />

//       <div className="p-4">
//         <p className="text-[15px] font-medium text-gray-900 mb-3">
//           {trip.destination}
//         </p>

//         <div className="flex flex-col gap-1 mb-4">
//           <span className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
//             <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-[10px]">
//               📅
//             </span>
//             {trip.dates}
//           </span>
//           <span className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
//             <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-[10px]">
//               ₹
//             </span>
//             Budget: {trip.budget}
//           </span>
//         </div>

//         <div className="flex items-center justify-between border-t border-gray-100 pt-3">
//           <div className="flex items-center gap-2">
//             <div className="w-[26px] h-[26px] rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-500">
//               {trip.initials}
//             </div>
//             <span className="text-xs text-gray-500">{trip.host}</span>
//           </div>
//           <span className="text-[11px] font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-2.5 py-1">
//             {trip.spots} spots left
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── Popular Destinations ───────────────────────────────────────────── */
// function PopularDestinations() {
//   return (
//     <section className="bg-[#F9FAFB] py-20 px-6 md:px-10">
//       <div className="text-center mb-12">
//         <h2 className="text-[1.75rem] font-medium text-gray-900 mb-2">
//           Popular Destinations
//         </h2>
//         <p className="text-[15px] text-gray-500">
//           Explore trips travelers love the most
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//         {trips.map((trip) => (
//           <TripCard key={trip.id} trip={trip} />
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ─── Footer ─────────────────────────────────────────────────────────── */
// function Footer() {
//   const links = ["Explore Trips", "Create Trip", "About", "Contact"];

//   return (
//     <footer className="bg-[#111827] px-6 md:px-10 pt-14 pb-8">
//       <div className="max-w-6xl mx-auto flex flex-col gap-8">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//           <span className="text-[17px] font-medium text-gray-100">
//             Trip<span className="text-gray-500">Unite</span>
//           </span>
//           <div className="flex flex-wrap gap-6">
//             {links.map((link) => (
//               <a
//                 key={link}
//                 href="#"
//                 className="text-[13.5px] text-gray-400 hover:text-gray-100 transition-colors"
//               >
//                 {link}
//               </a>
//             ))}
//           </div>
//         </div>
//         <hr className="border-gray-800" />
//         <p className="text-[12.5px] text-gray-600 text-center">
//           © 2026 TripUnite. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }


// const LandingPage = () => {
//   return (
//     <div className="min-h-screen font-sans antialiased">
//       <Navbar />
//       <HeroSection />
//       <PopularDestinations />
//       <Footer />
//     </div>
//   )
// }

// export default LandingPage

