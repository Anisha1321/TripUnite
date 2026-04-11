import React from 'react'
import Navbar from '../components/explore/Navbar'
import Hero from '../components/explore/Hero'
import FilterBar from '../components/explore/FilterBar'
import Sidebar from '../components/explore/Sidebar'
import TripCard from '../components/explore/TripCard'
import ActiveFilters from '../components/explore/ActiveFilters'
import Footer from '../components/layout/Footer'
import TripSection from '../components/explore/TripSection'
export default function ExploreTripPage() {
  return (
    <div className="bg-white hide-scrollbar min-h-screen h-screen  flex flex-col">

      <Navbar />

      <Hero />
      <FilterBar/>
      <TripSection />
      <Footer />

    </div>
  );
}