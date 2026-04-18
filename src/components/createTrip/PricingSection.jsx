import { FormSection, Field } from "./FormPrimitives";

const PRICING_OPTIONS = [
  { label: "Early Bird", desc: "First 3 seats at reduced price" },
  { label: "Group Discount", desc: "4+ travelers get 10% off" },
];

const PricingSection = ({ form, set }) => (
  <FormSection icon="dollar" title="Pricing & Capacity" className="fade-in-2">
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      <Field label="Price per Person (₹)" half>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              fontSize: 14,
            }}
          >
            ₹
          </span>
          <input
            type="number"
            className="input-field"
            placeholder="0"
            value={form.price}
            onChange={set("price")}
            style={{ paddingLeft: 28 }}
          />
        </div>
      </Field>

      <Field label="Total Seats" half>
        <input
          type="number"
          className="input-field"
          placeholder="e.g. 12"
          value={form.seats}
          onChange={set("seats")}
        />
      </Field>
    </div>

    <div className="divider" />

    <div style={{ display: "flex", gap: 24 }}>
      {PRICING_OPTIONS.map((opt) => (
        <label
          key={opt.label}
          style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", flex: 1 }}
        >
          <input type="checkbox" style={{ marginTop: 2, accentColor: "var(--green)" }} />
          <div>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{opt.label}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{opt.desc}</div>
          </div>
        </label>
      ))}
    </div>
  </FormSection>
);

export default PricingSection;