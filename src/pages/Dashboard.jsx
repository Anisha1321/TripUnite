
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


//import { useState } from "react";

// ⚠️ IMPORTANT: Import the CSS file instead of runtime style injection
// This fixes the "styling hampered on back navigation" bug
import "../components/dashboard/dashboard.css";
import Navbar from "../components/explore/Navbar";

import FadeIn from "../components/dashboard/FadeIn";
import { Icon, Icons } from "../components/dashboard/Icons";
import ProfileProgress from "../components/dashboard/ProfileProgress";
import QuickStats from "../components/dashboard/QuickStats";
import FilterBar from "../components/dashboard/FilterBar";
import TabBar from "../components/dashboard/TabBar";
import SectionHeader from "../components/dashboard/SectionHeader";
import TripGrid from "../components/dashboard/TripGrid";
import ActivityPanel from "../components/dashboard/ActivityPanel";
import { useDashboardData } from "../data/useDashboardData";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/dashboard/ProfileModal";
//import { ALL_TRIPS } from "../data/dashboardData";

// ─── Quick Actions sidebar card ───────────────────────────────────────────
function QuickActionsCard() {
  const actions = [
    { label: "Create a new trip",      icon: Icons.plus,  primary: true  },
    { label: "Find travel mates",      icon: Icons.users, primary: false },
    { label: "Complete verification",  icon: Icons.check, primary: false },
  ];
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontSize: 17,
          letterSpacing: "-.3px",
          marginBottom: 14,
          color: "white"
        }}
      >
        Quick Actions
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {actions.map((a) => (
          <button
            key={a.label}
            className={a.primary ? "btn-primary" : "btn-outline"}
            style={{ justifyContent: "flex-start", width: "100%", fontSize: 13 }}
          >
            <Icon d={a.icon} size={14} /> {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Verification nudge ───────────────────────────────────────────────────
function VerificationNudge() {
  return (
    <div
      style={{
        border: "1px solid rgba(29,158,117,.2)",
        borderRadius: 16,
        padding: 18,
        background: "rgba(29,158,117,.04)",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ color: "var(--accent)", marginTop: 1 }}>
          <Icon d={Icons.check} size={16} />
        </div>
        <div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 400, marginBottom: 4 }}>
            Verify your identity
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 }}>
            Verified members get 3× more trip invites and appear higher in search results.
          </p>
          <button className="btn-primary" style={{ fontSize: 12, padding: "6px 16px" }}>
            Verify now <Icon d={Icons.arrow} size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [uid, setUid] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  const { displayName, trips: ALL_TRIPS, profilePct, userData, loading } = useDashboardData(uid, refreshKey);


  const handleProfileUpdated = () => {
    setRefreshKey((k) => k + 1); // triggers re-fetch
  };

  const applyFilters = (trips) =>
    trips.filter((t) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q);
      const matchR =
        roleFilter === "all" || t.role.toLowerCase() === roleFilter;
      return matchQ && matchR;
    });

  const upcoming  = applyFilters(ALL_TRIPS.filter((t) => t.status === "Upcoming"));
  const saved     = applyFilters(ALL_TRIPS.filter((t) => t.status === "Saved"));
  const drafts    = applyFilters(ALL_TRIPS.filter((t) => t.status === "Draft"));
  const past      = applyFilters(ALL_TRIPS.filter((t) => t.status === "Completed"));
  const hosted    = applyFilters(ALL_TRIPS.filter((t) => t.status === "Completed" && t.role === "Host"));

  const tabs = [
    { id: "upcoming", label: "Upcoming",   icon: Icons.compass,  count: upcoming.length },
    { id: "saved",    label: "Saved",      icon: Icons.bookmark, count: saved.length    },
    { id: "drafts",   label: "Drafts",     icon: Icons.edit,     count: drafts.length   },
    { id: "past",     label: "Past Trips", icon: Icons.clock,    count: past.length     },
    { id: "hosted",   label: "Hosted",     icon: Icons.star,     count: hosted.length   },
  ];

  const renderSection = () => {
    switch (activeTab) {
      case "upcoming":
        return (
          <>
            <SectionHeader title="Upcoming Trips" count={upcoming.length} />
            <TripGrid
              trips={upcoming}
              emptyIcon={Icons.compass}
              emptyMsg="No upcoming trips. Start exploring and find your travel crew."
              emptyCta="Explore Trips"
            />
          </>
        );
      case "saved":
        return (
          <>
            <SectionHeader title="Saved Trips" count={saved.length} />
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
              Dimmed cards indicate trips whose dates have passed.
            </p>
            <TripGrid
              trips={saved}
              dimmed
              emptyIcon={Icons.bookmark}
              emptyMsg="No saved trips yet. Bookmark trips you're interested in."
              emptyCta="Browse Trips"
            />
          </>
        );
      case "drafts":
        return (
          <>
            <SectionHeader title="Draft Trips" count={drafts.length} />
            <TripGrid
              trips={drafts}
              emptyIcon={Icons.edit}
              emptyMsg="No drafts yet. Start creating your perfect trip."
              emptyCta="Create a Trip"
            />
          </>
        );
      case "past":
        return (
          <>
            <SectionHeader title="Past Trips" count={past.length} />
            <TripGrid
              trips={past}
              emptyIcon={Icons.clock}
              emptyMsg="No past trips yet. Your completed adventures will appear here."
            />
          </>
        );
      case "hosted":
        return (
          <>
            <SectionHeader title="Trips You've Hosted" count={hosted.length} />
            <TripGrid
              trips={hosted}
              emptyIcon={Icons.star}
              emptyMsg="You haven't hosted any completed trips yet. Create your first trip."
              emptyCta="Create a Trip"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="noise dashboard-root" style={{ minHeight: "100vh", background: "var(--bg-primary)" , overflowX: "hidden", width: "100%"}}>
      
      {/* Radial glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,158,117,.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
          zIndex: 1,
          width: "100%",
          overflowX: "hidden"
        }}
      >
        {/* ── Hero ─────────────────────────────────────── */}
        <div style={{ paddingTop: 56, paddingBottom: 40 }}>
          <FadeIn delay={0}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--accent-light)",
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                }}
              >
                Your Dashboard
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: "clamp(32px, 5vw, 52px)",
                letterSpacing: "-1px",
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Welcome back, <span className="grad-text">{displayName}</span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                maxWidth: 560,
                lineHeight: 1.75,
                marginBottom: 28,
              }}
            >
              The best journeys are shared. Whether you're planning your next escape or looking
              for the right people to join you — your adventure starts here.
            </p>

            <div
              className="hero-actions"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <button className="btn-primary" onClick={() => navigate("/explore")}>
                <Icon d={Icons.compass} size={15} /> Explore Trips
              </button>
              <button className="btn-outline" onClick={() => navigate("/create")}>
                <Icon d={Icons.plus} size={15} /> Create a Trip
              </button>
            </div>
          </FadeIn>
        </div>

        {/* ── Profile Progress ──────────────────────────── */}
        <FadeIn delay={0.1}>
          <div style={{ marginBottom: 32 , cursor: "pointer"}} onClick={() => setShowProfileModal(true)} >
            <ProfileProgress pct={profilePct} />
          </div>
        </FadeIn>

        {/* ── Quick Stats ───────────────────────────────── */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 40 }}>
            <QuickStats upcoming={upcoming.length} hosted={hosted.length} saved={saved.length} completed={past.length} />
          </div>
        </FadeIn>

        {/* ── Main + Sidebar ────────────────────────────── */}
        <div className="main-layout">
          {/* Main column */}
          <div>
            <FadeIn delay={0.18}>
              <div style={{ marginBottom: 24 }}>
                <FilterBar
                  query={query}
                  onQuery={setQuery}
                  filter={roleFilter}
                  onFilter={setRoleFilter}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
            </FadeIn>

            <div>{renderSection()}</div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <FadeIn delay={0.22}>
              <ActivityPanel />
            </FadeIn>
            <FadeIn delay={0.28}>
              <QuickActionsCard />
            </FadeIn>
            <FadeIn delay={0.32}>
              <VerificationNudge />
            </FadeIn>
          </div>
        </div>
      </div>
      </div>
      
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        uid={uid}
        initialData={userData}
        onUpdated={handleProfileUpdated}
      />


    </>

    
  );
}