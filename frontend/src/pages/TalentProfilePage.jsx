import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import { profile } from "../assets/Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import { getAllProfile } from "../Services/ProfileService"

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    getAllProfile().then((res) => {
      setTalents(res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div
      className="min-h-[100vh] font-['poppins'] p-4"
      style={{
        background: "linear-gradient(160deg, #f0f7ff 0%, #e8f3ff 40%, #ddeeff 100%)",
      }}
    >
      <Button
        my="sm"
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={18} />}
        variant="subtle"
        style={{
          color: "#1e6fcc",
          background: "rgba(30,111,204,0.07)",
          border: "1px solid rgba(30,111,204,0.18)",
          borderRadius: "10px",
          fontFamily: "poppins",
          fontWeight: 500,
        }}
      >
        Back
      </Button>

      <div className="flex gap-6 px-6 py-5">
        <Profile {...profile} />
        <RecommendTalent talents={talents} />
      </div>
    </div>
  )
}

export default TalentProfilePage