function CreateTripSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl h-700px mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Plan Your Own Trip
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Want to explore a destination but don’t want to travel alone? 
            Create your own trip, set the destination, dates, and budget, 
            and let fellow travelers join you. Meet like-minded explorers 
            and make unforgettable memories together.
          </p>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li>✔ Choose your destination and travel dates</li>
            <li>✔ Set your budget and group size</li>
            <li>✔ Connect with verified travelers</li>
            <li>✔ Chat and plan your trip together</li>
          </ul>

          <button className="px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-700 transition">
            Create a Trip
          </button>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Travel planning"
            className="rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}

export default CreateTripSection;