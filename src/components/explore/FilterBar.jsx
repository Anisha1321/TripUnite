export default function FilterBar() {
  return (
    <div className="sticky flex justify-between top-60px z-40 bg-gray-900 text-white px-8">

      <div className="flex items-center gap-3 py-3 overflow-x-auto">

        <span className="font-medium text-gray-200">Filter:</span>

        <button className="px-4 py-1 border rounded-full text-sm hover:border-purple-500">
          Solo
        </button>

        <button className="px-4 py-1 border rounded-full text-sm hover:border-purple-500">
          Group
        </button>

        <button className="px-4 py-1 border rounded-full text-sm hover:border-purple-500">
          Adventure
        </button>

        <button className="px-4 py-1 border rounded-full text-sm hover:border-purple-500">
          Luxury
        </button>

        <div className="h-4 w-px bg-gray-300" />

        <select className="border rounded  px-2 py-1 text-sm">
          <option className="text-black">Newest</option>
          <option className="text-black">Cheapest</option>
          <option className="text-black">Highest Rated</option>
        </select>

      </div>
      
    </div>
  );
}