import ContactNavbar from "../components/contact/ContactNavbar";
import CreateTripSection from "../components/landing/CreateTripSection";
import HeroSection from "../components/landing/HeroSection";
import LandingNavbar from "../components/landing/LandingNavbar";
import PopularDestinations from "../components/landing/PopularDestinations";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

function LandingPage() {
  return (
    <>
      {/* <Navbar /> */}
      <LandingNavbar />
      <HeroSection />
      
      <PopularDestinations />
      <CreateTripSection /> 
      <Footer />
    </>
  );
}

export default LandingPage;
