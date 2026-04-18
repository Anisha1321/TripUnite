import { FormSection } from "./FormPrimitives";

const RequirementsSection = ({ form, set }) => (
  <FormSection icon="info" title="Requirements & Notes" className="fade-in-4">
    <label className="label">
      Fitness level, rules, gear, anything travelers should know
    </label>
    <textarea
      className="input-field"
      rows={4}
      placeholder={"Moderate fitness required\nCamping gear provided\nAge: 18–55\nNo prior experience needed"}
      value={form.requirements}
      onChange={set("requirements")}
      style={{ resize: "vertical" }}
    />
  </FormSection>
);

export default RequirementsSection;