import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {


  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  const navigate = useNavigate();

  return (
    // <nav className="sticky top-0 z-50 w-full px-16 py-4 md:px-10 
    //   flex items-center justify-between 
    //   bg-[#151d2c]/20  backdrop-blur-lg">
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

      <div className="flex items-center gap-6 ">
        <a href="/explore" className=" font-medium text-gray-200 hover:text-gray-400">Explore Trips</a>
        <a href="#" className="font-medium text-gray-200 hover:text-gray-400">Create Trip</a>
        <a href="#" className="font-medium text-gray-200 hover:text-gray-400">Dashboard</a>

        <button onClick={() => navigate("/auth")} className="text-sm font-bold px-6 py-1.5 rounded-lg bg-gray-100 border border-gray-300 hover:text-gray-900">
          Login / Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;