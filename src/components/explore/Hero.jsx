export default function Hero() {
  return (
    <div className="relative  bg-white px-10 py-8"
    style={{
        minHeight: "40vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
    {/* <div className="absolute inset-0 bg-black/60"></div> */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative fixed flex flex-col items-center z-10 max-w-[1280px] mx-auto mt-30">

        <h1 className="text-3xl font-bold text-white">
          Explore and <span className="text-purple-400">JOIN</span> Group Trips <span className="text-purple-400">Around India</span> 
        </h1>

        <p className="text-gray-200  mt-2">
          Find your next adventure with real travelers and verified hosts
        </p>
        <p className="text-gray-200 mt-2">
          Join trips that suits you and your aesthetics 
        </p>
      </div>

    </div>
  );
}