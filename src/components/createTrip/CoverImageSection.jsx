import { useRef, useState } from "react";
import Icon from "./Icon";
import { FormSection } from "./FormPrimitives";

const CLOUD_NAME = "doqzpseyq";
const UPLOAD_PRESET = "TripUnite";

const CoverImageSection = ({ coverUrl, setCoverUrl }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

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
        setCoverUrl(data.secure_url);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      setError("Upload failed. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormSection icon="image" title="Cover Image" className="fade-in-3">
      {coverUrl ? (
        <div style={{ position: "relative" }}>
          <img
            src={coverUrl}
            alt="cover"
            style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12 }}
          />
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <button className="remove-btn" onClick={() => setCoverUrl(null)}>
              <Icon name="x" size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className="upload-zone"
          onClick={() => !uploading && fileRef.current?.click()}
          style={{ opacity: uploading ? 0.6 : 1, cursor: uploading ? "not-allowed" : "pointer" }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImage}
          />

          {uploading ? (
            <>
              <div style={{
                width: 28, height: 28,
                border: "2px solid #1D9E75",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              <div style={{ marginTop: 12, fontSize: 14, color: "var(--text-dim)" }}>
                Uploading to Cloudinary...
              </div>
            </>
          ) : (
            <>
              <Icon name="upload" size={28} color="rgba(255,255,255,0.2)" />
              <div style={{ marginTop: 12, fontSize: 14, color: "var(--text-dim)" }}>
                Drop your cover image or{" "}
                <span style={{ color: "var(--green-light)" }}>browse</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                PNG, JPG up to 10MB · 16:9 recommended
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p style={{ fontSize: 12, color: "#ef4444", marginTop: 8 }}>{error}</p>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </FormSection>
  );
};

export default CoverImageSection;