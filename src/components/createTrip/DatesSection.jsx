import Icon from "./Icon";
import { FormSection, Field } from "./FormPrimitives";

const DatesSection = ({ form, set }) => {
  const nights =
    form.startDate && form.endDate && new Date(form.endDate) > new Date(form.startDate)
      ? Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000)
      : null;

  return (
    <FormSection icon="calendar" title="Dates" className="fade-in-2">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        <Field label="Start Date" half>
          <input
            type="date"
            className="input-field"
            value={form.startDate}
            onChange={set("startDate")}
            style={{ colorScheme: "dark" }}
          />
        </Field>
        <Field label="End Date" half>
          <input
            type="date"
            className="input-field"
            value={form.endDate}
            onChange={set("endDate")}
            style={{ colorScheme: "dark" }}
          />
        </Field>
      </div>

      {nights && (
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
          <Icon name="clock" size={13} color="var(--green-light)" />
          <span style={{ fontSize: 13, color: "var(--green-light)" }}>
            {nights} nights · {nights + 1} days
          </span>
        </div>
      )}
    </FormSection>
  );
};

export default DatesSection;