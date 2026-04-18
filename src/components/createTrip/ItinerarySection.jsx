import Icon from "./Icon";
import { FormSection } from "./FormPrimitives";

const ItinerarySection = ({ itinerary, addDay, removeDay, updateDay }) => (
  <FormSection icon="list" title="Itinerary" className="fade-in-3">
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {itinerary.map((day, idx) => (
        <div key={day.id} className="day-card">
          {/* Day header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "rgba(29,158,117,0.15)",
                  border: "1px solid rgba(29,158,117,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--green-light)" }}>
                  {idx + 1}
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Day {idx + 1}
              </span>
            </div>

            {itinerary.length > 1 && (
              <button className="remove-btn" onClick={() => removeDay(day.id)}>
                <Icon name="x" size={11} />
              </button>
            )}
          </div>

          {/* Day fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label className="label">Day Title</label>
              <input
                className="input-field"
                placeholder="e.g. Arrival & Acclimatization"
                value={day.title}
                onChange={(e) => updateDay(day.id, "title", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Activities & Details</label>
              <textarea
                className="input-field"
                rows={2}
                placeholder="Describe the day's activities…"
                value={day.description}
                onChange={(e) => updateDay(day.id, "description", e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={addDay}>
        <Icon name="plus" size={14} />
        Add Day
      </button>
    </div>
  </FormSection>
);

export default ItinerarySection;