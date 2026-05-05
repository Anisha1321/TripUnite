import { useState, useEffect } from "react";
import Navbar from "../components/explore/Navbar";
import { useNavigate, useParams  } from "react-router-dom";

// ── CreateTrip sub-components ──────────────────────────────────────────────
import GlobalStyles    from "../components/createTrip/GlobalStyles";
import Icon            from "../components/createTrip/Icon";
import PageHero        from "../components/createTrip/PageHero";
import BasicInfoSection   from "../components/createTrip/BasicInfoSection";
import DatesSection       from "../components/createTrip/DatesSection";
import PricingSection     from "../components/createTrip/PricingSection";
import CoverImageSection  from "../components/createTrip/CoverImageSection";
import ItinerarySection   from "../components/createTrip/ItinerarySection";
import InclusionsSection  from "../components/createTrip/InclusionsSection";
import RequirementsSection from "../components/createTrip/RequirementsSection";
import PreviewCard     from "../components/createTrip/PreviewCard";
import SidebarExtras   from "../components/createTrip/SidebarExtras";
import TransportSection from "../components/createTrip/TransportSection";
// ──────────────────────────────────────────────────────────────────────────
import { collection, addDoc, updateDoc, doc, getDoc, serverTimestamp,} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const EMPTY_FORM = {
  title: "", destination: "", tripType: "", difficulty: "",
  description: "", startDate: "", endDate: "", price: "",
  seats: "", inclusions: "", exclusions: "", requirements: "",
  pickupPoint: "", dropPoint: "", transport: "",    
};


export default function CreateTrip() {
  const { tripId } = useParams(); 
  const isEditMode = Boolean(tripId);
  const [coverUrl, setCoverUrl]   = useState(null);
  const [itinerary, setItinerary] = useState([{ id: 1, title: "", description: "" }]);
  const [loadingDraft, setLoadingDraft] = useState(isEditMode);
  const navigate = useNavigate();
  
  //Use EMPTY_FORM for cleaner state
  const [form, setForm] = useState(EMPTY_FORM);

  //Fetch data if we are in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    async function loadDraft() {
      try {
        const snap = await getDoc(doc(db, "trips", tripId));
        if (!snap.exists()) {
          alert("Trip not found.");
          navigate("/dashboard");
          return;
        }

        const data = snap.data();

        setForm({
          title:        data.title        || "",
          destination:  data.destination  || "",
          tripType:     data.tripType     || "",
          difficulty:   data.difficulty   || "",
          description:  data.description  || "",
          startDate:    data.startDate    || "",
          endDate:      data.endDate      || "",
          price:        data.price        || "",
          seats:        data.seats        || "",
          inclusions:   data.inclusions   || "",
          exclusions:   data.exclusions   || "",
          requirements: data.requirements || "",
          pickupPoint:  data.pickupPoint  || "",
          dropPoint:    data.dropPoint    || "",
          transport:    data.transport    || "",
        });

        setCoverUrl(data.coverUrl || null);
        setItinerary(
          data.itinerary?.length
            ? data.itinerary
            : [{ id: 1, title: "", description: "" }]
        );
      } catch (err) {
        console.error("Failed to load draft:", err);
        alert("Could not load the trip.");
        navigate("/dashboard");
      } finally {
        setLoadingDraft(false);
      }
    }

    loadDraft();
  }, [tripId]);


  const handlePublish = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to publish a trip.");
        return;
      }

      if (!form.title || !form.destination || !form.price) {
        alert("Please fill in title, destination, and price at minimum.");
        return;
      }

      //Add update logic for edit mode
      if (isEditMode) {
        await updateDoc(doc(db, "trips", tripId), {
          ...form,
          coverUrl: coverUrl || null,
          itinerary,
          status: "published",
          updatedAt: serverTimestamp(),
        });
      } else {
        // YOUR EXACT ORIGINAL CREATE LOGIC
        await addDoc(collection(db, "trips"), {
          ...form,
          coverUrl: coverUrl || null,
          itinerary,
          createdBy: user.uid,
          createdByEmail: user.email,
          createdAt: serverTimestamp(),
          status: "published",
        });
      }

      alert("Trip published successfully!");
      navigate("/explore");

    } catch (err) {
      console.error(err);
      alert("Failed to publish trip.");
    }
  };

  const handleSaveDraft = async () => {
    try {
      const user = auth.currentUser;
      if (!user) { alert("You must be logged in."); return; }

      if (isEditMode) {
        await updateDoc(doc(db, "trips", tripId), {
          ...form,
          coverUrl: coverUrl || null,
          itinerary,
          status: "draft",
          updatedAt: serverTimestamp(),
        });
      } else {
        // YOUR EXACT ORIGINAL DRAFT LOGIC
        await addDoc(collection(db, "trips"), {
          ...form,
          coverUrl: coverUrl || null,
          itinerary,
          createdBy: user.uid,
          createdByEmail: user.email,
          createdAt: serverTimestamp(),
          status: "draft",
        });
      }

      alert("Draft saved!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save draft.");
    }
  };

  // Generic setter: set("fieldName") returns an onChange handler
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Itinerary helpers
  const addDay    = () => setItinerary((d) => [...d, { id: Date.now(), title: "", description: "" }]);
  const removeDay = (id) => setItinerary((d) => d.filter((x) => x.id !== id));
  const updateDay = (id, key, val) =>
    setItinerary((d) => d.map((x) => (x.id === id ? { ...x, [key]: val } : x)));

  //Show spinner while fetching draft data
  if (loadingDraft) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", background: "#0D1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Navbar />
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 36, height: 36, margin: "0 auto 16px",
              border: "2px solid #1D9E75",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ color: "#8b949e", fontSize: 14 }}>Loading draft...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </>
    );
  }




  return (
    <>
      <GlobalStyles />

      <div style={{ minHeight: "100vh", background: "#0D1117", paddingBottom: 80 }}>
        <Navbar />
        <div className="page-wrapper" style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0px 40px" }}>
          

          {/* ── Hero ── */}
          <PageHero />

          {/* ── 2-column layout ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start", position: "relative" }}
            className="create-trip-grid">

            {/* ══ LEFT: form sections ══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <BasicInfoSection    form={form} set={set} />
              <DatesSection        form={form} set={set} />
              <TransportSection    form={form} set={set} /> 
              <PricingSection      form={form} set={set} />
              <CoverImageSection   coverUrl={coverUrl} setCoverUrl={setCoverUrl} />
              <ItinerarySection    itinerary={itinerary} addDay={addDay} removeDay={removeDay} updateDay={updateDay} />
              <InclusionsSection   form={form} set={set} />
              <RequirementsSection form={form} set={set} />

              {/* CTA buttons */}
              <div className="fade-in-4 cta-row" style={{ display: "flex", gap: 14, paddingTop: 8, paddingBottom: 40 }}>
                <button onClick={handlePublish} className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "15px 28px", fontSize: 15 }}>
                  <Icon name="send" size={15} />
                  Publish Trip
                </button>
                <button onClick={handleSaveDraft} className="btn-outline" style={{ flex: "0 0 auto" }}>
                  <Icon name="save" size={14} />
                  {isEditMode ? "Update Draft" : "Save Draft"}
                </button>
              </div>
            </div>

            {/* ══ RIGHT: sidebar ══ */}
            <div className="fade-in-2" style={{ position: "sticky", top: "100px", height: "fit-content" }}>
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  Live Preview
                </span>
              </div>
              <PreviewCard   form={form} coverUrl={coverUrl} />
              <SidebarExtras form={form} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}