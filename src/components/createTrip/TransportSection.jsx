import Icon from "./Icon";
import { FormSection, Field } from "./FormPrimitives";

const TRANSPORT_MODES = [
  "Bus", "Train", "Flight", "Car", "Bike", "Cruise", "Mixed", "Own Arrangement"
];

const TransportSection = ({ form, set }) => {
  return (
    <FormSection icon="map" title="Transport Details" className="fade-in-3">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>

        <Field label="Pickup Point" half>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. New Delhi Railway Station"
            value={form.pickupPoint}
            onChange={set("pickupPoint")}
          />
        </Field>

        <Field label="Drop Point" half>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Leh Airport"
            value={form.dropPoint}
            onChange={set("dropPoint")}
          />
        </Field>

        <Field label="Mode of Transport">
          <select
            className="input-field"
            value={form.transport}
            onChange={set("transport")}
            style={{ colorScheme: "dark", cursor: "pointer" }}
          >
            <option value="">Select mode of transport</option>
            {TRANSPORT_MODES.map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </Field>

      </div>

      {/* Summary pill — shows when both pickup and drop are filled */}
      {(form.pickupPoint && form.dropPoint) && (
        <div
          style={{
            marginTop: 14,
            padding: "10px 14px",
            background: "rgba(29,158,117,0.07)",
            border: "1px solid rgba(29,158,117,0.2)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon name="map" size={13} color="var(--green-light)" />
          <span style={{ fontSize: 13, color: "var(--green-light)" }}>
            {form.pickupPoint} → {form.dropPoint}
            {form.transport ? ` · ${form.transport}` : ""}
          </span>
        </div>
      )}
    </FormSection>
  );
};

export default TransportSection;