import { FormSection, Field } from "./FormPrimitives";

const TRIP_TYPES = ["Adventure", "Cultural", "Backpacking", "Luxury", "Wildlife", "Beach", "Trek", "Road Trip"];
const DIFFICULTY_LEVELS = ["Easy", "Moderate", "Challenging", "Expert"];

const BasicInfoSection = ({ form, set }) => (
  <FormSection icon="tag" title="Basic Info" className="fade-in">
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      <Field label="Trip Title">
        <input
          className="input-field"
          placeholder="e.g. Spiti Valley Hidden Gems"
          value={form.title}
          onChange={set("title")}
        />
      </Field>

      <Field label="Destination">
        <input
          className="input-field"
          placeholder="e.g. Spiti Valley, Himachal Pradesh"
          value={form.destination}
          onChange={set("destination")}
        />
      </Field>

      <Field label="Trip Type" half>
        <select className="input-field" value={form.tripType} onChange={set("tripType")}>
          <option value="">Select type…</option>
          {TRIP_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Difficulty Level" half>
        <select className="input-field" value={form.difficulty} onChange={set("difficulty")}>
          <option value="">Select level…</option>
          {DIFFICULTY_LEVELS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Description">
        <textarea
          className="input-field"
          rows={4}
          placeholder="Paint a picture of this trip — what makes it special?"
          value={form.description}
          onChange={set("description")}
          style={{ resize: "vertical" }}
        />
      </Field>
    </div>
  </FormSection>
);

export default BasicInfoSection;