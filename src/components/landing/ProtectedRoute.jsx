import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  if (user === undefined) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/auth" replace />;

  return children;
}