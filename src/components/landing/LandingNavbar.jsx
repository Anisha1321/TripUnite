import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <nav
      className="fixed top-0 bg-[#111827] left-0 right-0 z-50 transition-all duration-300"
      // style={{
      //   backgroundColor: scrolled ? "rgba(13,17,23,0.92)" : "transparent",
      //   backdropFilter: scrolled ? "blur(12px)" : "none",
      //   borderBottom: scrolled ? "1px solid rgba(29,158,117,0.12)" : "none",
      // }}
    >
      <div className=" mx-auto px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#1D9E75,#0F6E56)" }}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </div>

          {/* <span className="font-semibold text-gray-100 tracking-tight text-[15px]">
            TripUnite
          </span> */}
          <Link to="/" className="text-[15px] font-medium text-gray-400">
            Trip<span className="text-white">Unite</span>
          </Link>
          
        </div>

        <div className="hidden md:flex items-center gap-7">
          {/* {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-[13px] text-gray-400 hover:text-gray-100">
              {l}
            </a>
          ))} */}
          <Link to="/about" className="text-[13px] text-gray-400 hover:text-gray-100">
            About
          </Link>

          <Link to="/contact" className="text-[13px] text-gray-400 hover:text-gray-100">
            Contact
          </Link>

          <Link to="/dashboard" className="text-[13px] text-gray-400 hover:text-gray-100 ">
            Dashboard
          </Link>
          <button onClick={() => navigate("/auth")} className="text-[13px] text-white border border-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-black hover:font-medium transition">
            Login / Sign Up
          </button>
        </div>

        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

        {menuOpen && (
          <div className="md:hidden items-center absolute right-6 mt-2 px-6 py-4 flex flex-col gap-4 bg-[#111827] rounded-lg shadow-lg w-max">
            
            <Link 
              to="/about" 
              className="text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link 
              to="/dashboard" 
              className="text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <button 
              onClick={() => {
                navigate("/auth");
                setMenuOpen(false);
              }}
              className="text-white border border-white px-6 py-2 rounded-lg"
            >
              Login
            </button>

          </div>
        )}

    </nav>
  );
}

export default LandingNavbar;