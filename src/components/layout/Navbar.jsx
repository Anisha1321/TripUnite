import { useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#151d2c]  px-16 py-6 md:px-10 h-60px flex items-center justify-between">
      <span className="text-[34px] font-medium text-gray-600">
        Trip<span className="text-gray-400">Unite</span>
      </span>

      <div className="flex items-center gap-6 ">
        <a href="#" className=" font-medium text-gray-200 hover:text-gray-400">Explore Trips</a>
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