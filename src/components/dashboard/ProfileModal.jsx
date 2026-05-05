// import { useState, useEffect } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";
// import { Icon, Icons } from "./Icons";

// export default function ProfileModal({ isOpen, onClose, uid, initialData, onUpdated }) {
//   const [form, setForm] = useState({
//     displayName: "",
//     email: "",
//     photoURL: "",
//     bio: "",
//     phone: "",
//   });
//   const [saving, setSaving] = useState(false);

//   // Pre-fill form ONLY when modal opens
//   useEffect(() => {
//     if (isOpen && initialData) {
//       setForm({
//         displayName: initialData.displayName || "",
//         email: initialData.email || "",
//         photoURL: initialData.photoURL || "",
//         bio: initialData.bio || "",
//         phone: initialData.phone || "",
//       });
//     }
//   }, [isOpen, initialData]);

//   const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!uid) return;
//     setSaving(true);

//     try {
//       await updateDoc(doc(db, "users", uid), form);
//       onUpdated?.(); // Tell dashboard to refresh data
//       onClose();
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//       alert("Could not save profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!isOpen) return null;

//   const inputStyle = {
//     width: "100%",
//     padding: "10px 14px",
//     borderRadius: 10,
//     border: "1px solid rgba(255,255,255,0.1)",
//     background: "rgba(255,255,255,0.04)",
//     color: "var(--text-primary)",
//     fontSize: 14,
//     outline: "none",
//     transition: "border-color 0.2s",
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.6)",
//         backdropFilter: "blur(4px)",
//         zIndex: 1000,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//       }}
//       onClick={onClose}
//     >
//       <div
//         className="card"
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%",
//           maxWidth: 480,
//           padding: 28,
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         {/* Header */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//           <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 22, color: "white", margin: 0 }}>
//             Edit Profile
//           </h2>
//           <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}>
//             <Icon d={Icons.close || "M6 18L18 6M6 6l12 12"} size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          
//           {/* Display Name */}
//           <div>
//             <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Display Name *</label>
//             <input style={inputStyle} value={form.displayName} onChange={set("displayName")} placeholder="e.g., Alex Johnson" required />
//           </div>

//           {/* Email (Usually read-only from Auth, but editable here if needed) */}
//           <div>
//             <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Email</label>
//             <input type="email" style={inputStyle} value={form.email} onChange={set("email")} placeholder="you@example.com" />
//           </div>

//           {/* Phone */}
//           <div>
//             <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Phone Number</label>
//             <input type="tel" style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
//           </div>

//           {/* Photo URL */}
//           <div>
//             <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Profile Picture URL</label>
//             <input style={inputStyle} value={form.photoURL} onChange={set("photoURL")} placeholder="https://example.com/photo.jpg" />
//           </div>

//           {/* Bio */}
//           <div>
//             <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Bio</label>
//             <textarea
//               rows={3}
//               style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
//               value={form.bio}
//               onChange={set("bio")}
//               placeholder="Tell us about yourself and your travel style..."
//             />
//           </div>

//           {/* Actions */}
//           <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
//             <button type="button" onClick={onClose} className="btn-outline" style={{ flex: 1, justifyContent: "center" }}>
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary" disabled={saving} style={{ flex: 1, justifyContent: "center" }}>
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Icon, Icons } from "./Icons";

const CLOUD_NAME = "doqzpseyq";
const UPLOAD_PRESET = "TripUnite";

export default function ProfileModal({ isOpen, onClose, uid, initialData, onUpdated }) {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    bio: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        displayName: initialData.displayName || "",
        email:       initialData.email       || "",
        photoURL:    initialData.photoURL    || "",
        bio:         initialData.bio         || "",
        phone:       initialData.phone       || "",
      });
      setPreviewURL(initialData.photoURL || null);
      setUploadError("");
    }
  }, [isOpen, initialData]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // ── Cloudinary upload (same pattern as CoverImageSection) ──────────────
  const handleImagePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreviewURL(URL.createObjectURL(file));
    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (data.secure_url) {
        setForm((f) => ({ ...f, photoURL: data.secure_url }));
        setPreviewURL(data.secure_url);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (err) {
      setUploadError("Upload failed. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!uid) return;
    if (uploading) {
      alert("Please wait for the image to finish uploading.");
      return;
    }
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", uid), form);
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-primary)",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 480, padding: 28, maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 22, color: "white", margin: 0 }}>
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}
          >
            <Icon d={Icons.close || "M6 18L18 6M6 6l12 12"} size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* ── Avatar Picker ───────────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

            {/* Avatar circle */}
            <div
              style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "2px solid rgba(255,255,255,0.1)",
                overflow: "hidden", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {uploading ? (
                // Spinner while uploading
                <div style={{
                  width: 24, height: 24,
                  border: "2px solid #1D9E75",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
              ) : previewURL ? (
                <img
                  src={previewURL}
                  alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Icon
                  d={Icons.users || "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"}
                  size={28}
                />
              )}
            </div>

            {/* Upload controls */}
            <div style={{ flex: 1 }}>
              <button
                type="button"
                className="btn-outline"
                style={{ fontSize: 12, padding: "6px 14px", marginBottom: 6 }}
                onClick={() => !uploading && fileRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading to Cloudinary..." : previewURL ? "Change Photo" : "Upload Photo"}
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImagePick}
              />

              {uploadError && (
                <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{uploadError}</p>
              )}

              {!uploadError && (
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                  PNG, JPG up to 10MB
                </p>
              )}

              {/* Remove photo */}
              {previewURL && !uploading && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewURL(null);
                    setForm((f) => ({ ...f, photoURL: "" }));
                  }}
                  style={{
                    background: "none", border: "none",
                    color: "#ef4444", fontSize: 11,
                    cursor: "pointer", padding: 0, marginTop: 4, display: "block"
                  }}
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
              Display Name *
            </label>
            <input
              style={inputStyle}
              value={form.displayName}
              onChange={set("displayName")}
              placeholder="e.g., Alex Johnson"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
              Email
            </label>
            <input
              type="email"
              style={inputStyle}
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
              Phone Number
            </label>
            <input
              type="tel"
              style={inputStyle}
              value={form.phone}
              onChange={set("phone")}
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Bio */}
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>
              Bio
            </label>
            <textarea
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              value={form.bio}
              onChange={set("bio")}
              placeholder="Tell us about yourself and your travel style..."
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving || uploading}
              style={{ flex: 1, justifyContent: "center" }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}