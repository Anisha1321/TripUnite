import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// ── Map Firestore trip → shape your components expect ──────────────────────

// ── Safe Date Parser (handles Firestore Timestamps, strings, or null) ──
// ── Safe Date Parser (Fixes the UTC vs Local Timezone bug) ──
const toDateSafe = (val) => {
  if (!val) return null;
  if (val?.toDate) return val.toDate(); // Firestore Timestamp
  
  // HTML date inputs return "YYYY-MM-DD". Standard new Date() parses this as UTC,
  // which causes off-by-one day bugs. We manually parse it as LOCAL time to fix this.
  if (typeof val === 'string' && val.length >= 10) {
    const parts = val.split('T')[0].split('-');
    if (parts.length === 3) return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }
  
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

// ── Map Firestore trip → shape your components expect ──────────────────────
function mapTrip(uid, docId, data) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate day math

  const start = toDateSafe(data.startDate);
  const end   = toDateSafe(data.endDate);

  // ── 1. TRANSFORM STATUS ──
  let dashboardStatus = "Upcoming"; 

  if (data.status === "draft" || data.status === "Draft") {
    dashboardStatus = "Draft";
  } 
  else if (data.status === "published" || data.status === "Published") {
    
    // If end date exists and is strictly before today -> Completed
    if (end && end < today) {
      dashboardStatus = "Completed";
    } 
    // FIX: If NO end date, but start date is in the past -> Completed
    else if (!end && start && start < today) {
      dashboardStatus = "Completed";
    } 
    // Otherwise (starts today, starts in future, or no dates at all) -> Upcoming
    else {
      dashboardStatus = "Upcoming";
    }
  }
  else if (data.status === "saved" || data.status === "Saved") {
    dashboardStatus = "Saved";
  }

  // ── 2. COUNTDOWN ──
  let countdown = null;
  if (dashboardStatus === "Upcoming" && start && start > today) {
    const days = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
    countdown = `Starts in ${days} day${days === 1 ? "" : "s"}`;
  }

  // ── 3. FORMAT DATES ──
  const fmt = (d) =>
    d?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) ?? "TBD";
  
  const dates = (start || end) ? `${fmt(start)} – ${fmt(end)}` : "Dates TBD";

  // ── 4. ROLE & TRAVELLERS ──
  const isHost = data.createdBy === uid;
  const travellers = parseInt(data.travellers ?? data.seats ?? 0, 10) || 0;

  // ── 5. RETURN OBJECT ──
  return {
    id:          docId,
    name:        data.title || data.name || data.destination || "Untitled Trip",
    destination: data.destination || "",
    dates:       dates,
    endDate:     end ? end.toISOString().split("T")[0] : "2099-01-01",
    travellers:  travellers,
    role:        isHost ? "Host" : "Member",
    
    status:      dashboardStatus, 
    countdown:   countdown,
    coverURL:    data.coverUrl || data.coverURL || null,
    
    showChat:    dashboardStatus === "Upcoming",
    showEdit:    dashboardStatus === "Draft",
  };
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useDashboardData(uid, refreshKey = 0) {
  const [state, setState] = useState({
    displayName: "Traveler",
    trips: [],
    profilePct: 0,
    userData: {},
    loading: true,
  });

  useEffect(() => {
    if (!uid) return;

    async function fetchData() {
      try {
        // 1. User doc
        const userSnap = await getDoc(doc(db, "users", uid));
        const userData = userSnap.exists() ? userSnap.data() : {};

        // 2. Trips where createdBy == uid
        const tripsSnap = await getDocs(
          query(collection(db, "trips"), where("createdBy", "==", uid))
        );
        const trips = tripsSnap.docs.map((d) => mapTrip(uid, d.id, d.data()));

        // 3. Profile completeness
        const fields = ["displayName", "email", "photoURL", "bio", "phone"];
        const filled = fields.filter((f) => !!userData[f]).length;
        const profilePct = Math.round((filled / fields.length) * 100);

        setState({
          displayName: userData.displayName || "Traveler",
          trips,
          profilePct,
          userData: userData,
          loading: false,
        });
      } catch (err) {
        console.error("useDashboardData error:", err);
        setState((s) => ({ ...s, loading: false }));
      }
    }

    fetchData();
  }, [uid, refreshKey]);

  return state;
}