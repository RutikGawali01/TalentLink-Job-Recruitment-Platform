import { formateDate } from "../Services/Utilities";
import { IconAward } from "@tabler/icons-react";

const CertificationCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.85rem 1rem",
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
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{
          padding: "7px",
          borderRadius: "10px",
          background: "#dbeafe",
          border: "1px solid #bdd7f8",
        }}>
          <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div>
          <div style={{ fontWeight: 600, color: "#0f2a50", fontSize: "0.88rem" }}>
            {props.name}
          </div>
          <div style={{
            fontSize: "0.76rem", color: "#2563eb", marginTop: "2px",
            display: "flex", alignItems: "center", gap: "4px", fontWeight: 500,
          }}>
            <IconAward size={12} /> {props.issuer}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
        <div style={{
          fontSize: "0.75rem",
          color: "#2563eb",
          background: "#dbeafe",
          border: "1px solid #bdd7f8",
          borderRadius: "8px",
          padding: "3px 10px",
          fontWeight: 500,
        }}>
          Issued: {formateDate(props.issueDate)}
        </div>
        <div style={{ fontSize: "0.7rem", color: "#8ab4d6", fontFamily: "monospace" }}>
          ID: {props.certificateId}
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;