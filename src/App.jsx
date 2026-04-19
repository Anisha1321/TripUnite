// import { useState } from 'react'
// import './App.css'
// import { Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import AuthPage from "./pages/AuthPage";
// import ExploreTripPage from './pages/ExploreTripPage';
// import Aboutpage from './pages/Aboutpage';
// import ContactPage from './pages/ContactPage';
// import CreateTrip from './pages/CreateTrip';
// import TripDetails from './pages/TripDetails';



// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/auth" element={<AuthPage />} />
//       <Route path="/explore" element={<ExploreTripPage />} />
//       <Route path="/about" element= {<Aboutpage />} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route path="/create" element={<CreateTrip/>} />
//       <Route path="/details" element={<TripDetails/>} />
      
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ExploreTripPage from "./pages/ExploreTripPage";
import Aboutpage from "./pages/Aboutpage";
import ContactPage from "./pages/ContactPage";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import ProtectedRoute from "./components/landing/ProtectedRoute";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  // Show spinner while Firebase checks auth state on first load
  if (user === undefined) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/explore" element={<ExploreTripPage />} />

      {/* Redirect to home if already logged in */}
      <Route
        path="/auth"
        element={user ? <Navigate to="/" replace /> : <AuthPage />}
      />

      {/* Protected routes */}
      <Route path="/create" element={
        <ProtectedRoute>
          <CreateTrip />
          
        </ProtectedRoute>
      } />
      <Route path="/details" element={
        <ProtectedRoute>
          <TripDetails />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
