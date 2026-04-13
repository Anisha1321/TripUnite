import { Link } from "react-router-dom";
function Footer() {

  const links = [
    { name: "Explore Trips", path: "/explore" },
    { name: "Create Trip", path: "/create" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#111827] px-6 md:px-10 pt-14 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          <span className="text-[17px] font-medium text-gray-100">
            Trip<span className="text-gray-500">Unite</span>
          </span>

          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[13.5px] text-gray-400 hover:text-gray-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

        </div>

        <hr className="border-gray-800" />

        <p className="text-[12.5px] text-gray-600 text-center">
          © 2026 TripUnite. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;