import { useState, useEffect } from "react";
import { IconMapPin, IconBriefcase, IconMail } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import ExperienceCard from "./ExperienceCard";
import CertificationCard from "./CertificationCard";
import { useParams } from "react-router-dom"
import { getProfile } from "../Services/ProfileService"

const card = {
  background: "#ffffff",
  border: "1px solid #cde4ff",
  borderRadius: "18px",
  boxShadow: "0 2px 16px rgba(30,111,204,0.07)",
  padding: "1.5rem",
  marginBottom: "0",
};

const SectionTitle = ({ children }) => (
  <div style={{
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#1e6fcc",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}>
    <span style={{
      display: "inline-block", width: "3px", height: "14px",
      background: "linear-gradient(180deg, #60a5fa, #1e6fcc)",
      borderRadius: "2px",
    }} />
    {children}
  </div>
);

const Profile = (props) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id).then((res) => {
      setProfile(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [id])

  return (
    <div className="w-2/3 flex flex-col gap-4">

      {/* Header Card */}
      <div style={{ ...card, padding: 0, overflow: "hidden" }}>
        <div style={{ position: "relative", height: "150px" }}>
          <img
            src="/Profile/banner.jpg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(219,238,255,0.1), rgba(219,238,255,0.5))",
          }} />
        </div>

        <div style={{ padding: "0 1.5rem 1.5rem", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <img
              src={profile?.picture ? `data:image/jpeg;base64,${profile.picture}` : "/avatar.png"}
              alt=""
              style={{
                height: "100px", width: "100px",
                borderRadius: "50%",
                border: "3px solid #ffffff",
                outline: "3px solid #93c5fd",
                marginTop: "-50px",
                objectFit: "cover",
                boxShadow: "0 4px 16px rgba(30,111,204,0.18)",
              }}
            />
            <Button
              leftSection={<IconMail size={15} />}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1d6fd6)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontFamily: "poppins",
                fontWeight: 600,
                fontSize: "0.85rem",
                boxShadow: "0 3px 12px rgba(59,130,246,0.3)",
                padding: "0.45rem 1.2rem",
              }}
            >
              Message
            </Button>
          </div>

          <div style={{ marginTop: "0.9rem" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f2a50", lineHeight: 1.2 }}>
              {profile?.name}
            </div>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#2563eb", marginTop: "5px", fontSize: "0.9rem", fontWeight: 500 }}>
              <IconBriefcase size={15} stroke={1.5} />
              {profile?.jobTitle} &bull; {profile?.company}
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "4px" }}>
              <div style={{ display: "flex", gap: "4px", alignItems: "center", color: "#6b9cc8", fontSize: "0.83rem" }}>
                <IconMapPin size={14} stroke={1.5} /> {profile?.location}
              </div>
              <div style={{ display: "flex", gap: "4px", alignItems: "center", color: "#6b9cc8", fontSize: "0.83rem" }}>
                <IconBriefcase size={14} stroke={1.5} /> {profile?.totalExp} yrs exp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={card}>
        <SectionTitle>About</SectionTitle>
        <p style={{ color: "#4a6b8a", fontSize: "0.88rem", lineHeight: 1.85, textAlign: "justify", margin: 0 }}>
          {profile?.about}
        </p>
      </div>

      {/* Skills */}
      <div style={card}>
        <SectionTitle>Skills</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {profile?.skills?.map((skill, index) => (
            <span
              key={index}
              style={{
                padding: "4px 14px",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#1e6fcc",
                background: "#e8f3ff",
                border: "1px solid #bdd7f8",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={card}>
        <SectionTitle>Experience</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {profile?.experiences?.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div style={card}>
        <SectionTitle>Certifications</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {profile?.certifications?.map((certif, index) => (
            <CertificationCard key={index} {...certif} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;