import {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
 import { Button, useMantineTheme} from "@mantine/core"
 import {IconArrowLeft} from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import {profile} from "../assets/Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import {getAllProfile} from "../Services/ProfileService"

const TalentProfilePage = () => {

  const navigate = useNavigate();
   const theme = useMantineTheme();
   const [talents , setTalents] = useState([]);
   useEffect(() => {
    getAllProfile().then((res)=>{
      setTalents(res);
    }).catch((err)=>{
      console.log(err);
    })
   }, [])
   
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      
          <Button my={"sm"} onClick={()=> navigate(-1)} leftSection={<IconArrowLeft size={20}  />} color={theme.colors.brightSun[4]}  variant='light' >Back </Button>
    
        {/* <Divider  size="xs"   /> */}
        <div className="flex gap-5 ">
          <Profile {...profile} />
          <RecommendTalent talents ={talents}  />

        </div>

    </div>
  )
}

export default TalentProfilePage
