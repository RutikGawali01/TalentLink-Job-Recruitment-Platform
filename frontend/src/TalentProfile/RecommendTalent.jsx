import TalentCard from "../FindTalent/TalentCards";
import { useParams } from "react-router-dom"
import { IconUsers } from "@tabler/icons-react";

const RecommendTalent = (props) => {
  const { id } = useParams();

  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #cde4ff",
      borderRadius: "18px",
      boxShadow: "0 2px 16px rgba(30,111,204,0.07)",
      padding: "1.4rem",
      minWidth: "290px",
      flex: 1,
      height: "fit-content",
      position: "sticky",
      top: "1rem",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "7px",
        marginBottom: "1.1rem",
        paddingBottom: "0.8rem",
        borderBottom: "1px solid #daeaff",
      }}>
        <div style={{
          background: "#dbeafe",
          borderRadius: "8px",
          padding: "5px",
          display: "flex",
          alignItems: "center",
        }}>
          <IconUsers size={15} color="#2563eb" />
        </div>
        <span style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "#1e6fcc",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          Recommended Talents
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {
          props.talents?.map((talent, index) => index < 4 && id != talent.id &&
            <div
              key={index}
              style={{
                borderRadius: "12px",
                border: "1px solid #daeaff",
                overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#93c5fd";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(30,111,204,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#daeaff";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <TalentCard {...talent} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RecommendTalent;