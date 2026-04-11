export default function ActiveFilters() {
  const activeFilters = ["Solo", "Adventure", "Budget < ₹10,000"];

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-wrap gap-2">

      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
        >
          {filter}

          <button className="text-gray-500 hover:text-red-500">
            ✕
          </button>
        </div>
      ))}

    </div>
  );
}