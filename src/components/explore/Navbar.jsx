
import { useState, useEffect } from "react";
export default function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50);
        };
    
        window.addEventListener("scroll", handleScroll);
    
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);


  return (
    <nav
      className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-600
      ${
        scrolled
          ? "bg-[#0D1117]/90 backdrop-blur-md shadow-md"
          : "bg-[#0D1117]/30"
      }`}
    >

      <span className="text-[34px] font-medium text-gray-400">
        Trip<span className="text-white">Unite</span>
      </span>

      {/* <div className="flex gap-6 ml-10 font-medium text-gray-200">        
        <span className="hover:text-gray-400 cursor-pointer ">Create Trip</span>
        <span className="hover:text-gray-400 cursor-pointer ">Dashboard</span>
      </div> */}

        <input
          placeholder="Search trips..."
          className="bg-white border w-xl ml-auto border-[#30363D] rounded-md px-4 py-2 text-sm text-black outline-none"
        />

      <div className="ml-auto flex items-center gap-5">

        <button className="bg-gray-300 px-4 py-2 rounded text-black text-sm font-semibold hover:text-white hover:border hover:bg-gray-700">
          + Create Trip
        </button>
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
              AM
        </div>

      </div>

    </nav>
  );
}