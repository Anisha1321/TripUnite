import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav
      className="fixed top-0 bg-[#0D1117] left-0 right-0 z-50 transition-all duration-300"
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
          {/* <button onClick={() => navigate("/auth")} className="text-[13px] text-white border border-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-black hover:font-medium transition">
            Login / Sign Up
          </button> */}
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
               AM
         </div>

        </div>

        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;









// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function Navbar() {

//     const [scrolled, setScrolled] = useState(false);
    
//       useEffect(() => {
//         const handleScroll = () => {
//           setScrolled(window.scrollY > 50);
//         };
    
//         window.addEventListener("scroll", handleScroll);
    
//           return () => window.removeEventListener("scroll", handleScroll);
//         }, []);


//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-600
//       ${
//         scrolled
//           ? "bg-[#0D1117]/90 backdrop-blur-md shadow-md"
//           : "bg-[#0D1117]/30"
//       }`}
//     >

//       <Link to="/" className="text-[34px] font-medium text-gray-400">
//         Trip<span className="text-white">Unite</span>
//       </Link>

//       {/* <div className="flex gap-6 ml-10 font-medium text-gray-200">        
//         <span className="hover:text-gray-400 cursor-pointer ">Create Trip</span>
//         <span className="hover:text-gray-400 cursor-pointer ">Dashboard</span>
//       </div> */}

//         <input
//           placeholder="Search trips..."
//           className="bg-white border w-xl ml-auto border-[#30363D] rounded-md px-4 py-2 text-sm text-black outline-none"
//         />

//       <div className="ml-auto flex items-center gap-5">

//         <button className="bg-gray-300 px-4 py-2 rounded text-black text-sm font-semibold hover:text-white hover:border hover:bg-gray-700">
//           + Create Trip
//         </button>
//         <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
//               AM
//         </div>

//       </div>

//     </nav>
//   );
// }