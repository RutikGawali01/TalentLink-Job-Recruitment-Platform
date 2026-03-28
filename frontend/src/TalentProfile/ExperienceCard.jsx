import { formateDate } from "../Services/Utilities";

const ExperienceCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "1rem",
        borderRadius: "12px",
        background: "#f5f9ff",
        border: "1px solid #daeaff",
        transition: "border-color 0.2s, background 0.2s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#93c5fd";
        e.currentTarget.style.background = "#eaf3ff";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#daeaff";
        e.currentTarget.style.background = "#f5f9ff";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{
            padding: "7px",
            borderRadius: "10px",
            background: "#dbeafe",
            border: "1px solid #bdd7f8",
          }}>
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#0f2a50", fontSize: "0.9rem" }}>
              {props.title}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#4a7aaa", marginTop: "2px" }}>
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: "0.75rem",
          color: "#2563eb",
          background: "#dbeafe",
          border: "1px solid #bdd7f8",
          borderRadius: "8px",
          padding: "3px 10px",
          whiteSpace: "nowrap",
          fontWeight: 500,
        }}>
          {formateDate(props.startDate)} – {formateDate(props.endDate)}
        </div>
      </div>
      <p style={{ fontSize: "0.83rem", color: "#4a6b8a", lineHeight: 1.75, textAlign: "justify", margin: 0 }}>
        {props.description}
      </p>
    </div>
  );
};

export default ExperienceCard;