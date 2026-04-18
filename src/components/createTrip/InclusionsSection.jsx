import { FormSection } from "./FormPrimitives";

const InclusionsSection = ({ form, set }) => (
  <FormSection icon="check" title="Inclusions & Exclusions" className="fade-in-4">
    <div className="inclusions-row" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      <div style={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
        <label className="label" style={{ color: "rgba(93,202,165,0.7)" }}>
          ✓ What's Included
        </label>
        <textarea
          className="input-field"
          rows={4}
          placeholder={"Accommodation\nTransfers\nBreakfast"}
          value={form.inclusions}
          onChange={set("inclusions")}
          style={{ resize: "vertical" }}
        />
      </div>

      <div style={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
        <label className="label" style={{ color: "rgba(255,100,100,0.6)" }}>
          ✕ What's Excluded
        </label>
        <textarea
          className="input-field"
          rows={4}
          placeholder={"Flights\nPersonal expenses\nInsurance"}
          value={form.exclusions}
          onChange={set("exclusions")}
          style={{ resize: "vertical" }}
        />
      </div>
    </div>
  </FormSection>
);

export default InclusionsSection;