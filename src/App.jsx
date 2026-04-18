import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ExploreTripPage from './pages/ExploreTripPage';
import Aboutpage from './pages/Aboutpage';
import ContactPage from './pages/ContactPage';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/explore" element={<ExploreTripPage />} />
      <Route path="/about" element= {<Aboutpage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/create" element={<CreateTrip/>} />
      <Route path="/details" element={<TripDetails/>} />
      
    </Routes>
  );
}

export default App;
