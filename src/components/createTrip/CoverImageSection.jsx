import { useRef } from "react";
import Icon from "./Icon";
import { FormSection } from "./FormPrimitives";

const CoverImageSection = ({ coverUrl, setCoverUrl }) => {
  const fileRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setCoverUrl(URL.createObjectURL(file));
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
        <div className="upload-zone" onClick={() => fileRef.current?.click()}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <Icon name="upload" size={28} color="rgba(255,255,255,0.2)" />
          <div style={{ marginTop: 12, fontSize: 14, color: "var(--text-dim)" }}>
            Drop your cover image or{" "}
            <span style={{ color: "var(--green-light)" }}>browse</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            PNG, JPG up to 10MB · 16:9 recommended
          </div>
        </div>
      )}
    </FormSection>
  );
};

export default CoverImageSection;