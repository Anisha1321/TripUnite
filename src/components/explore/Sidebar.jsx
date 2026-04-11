export default function Sidebar() {
  return (
    <aside className="w-240px border-r pr-5 px-20 py-10 hidden lg:block">

      {/* <h3 className="text-sm font-semibold mb-4">Trending Destinations</h3> */}

      {/* <div className="space-y-3">

        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
          🏔️ Ladakh
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
          🌴 Goa
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
          ⛩️ Tokyo
        </div>

      </div> */}

      <h3 className="text-sm font-semibold mb-4">Top Hosts</h3>

      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
            AM
          </div>
          Arjun Mehta
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-xs">
            AK
          </div>
          Anisha Kr
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">
            AM
          </div>
          Arjun Mehta
        </div>


      </div>

    </aside>
  );
}