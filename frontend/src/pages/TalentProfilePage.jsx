import {Divider} from "@mantine/core"
import { Link } from "react-router-dom";
 import { Button, useMantineTheme} from "@mantine/core"
 import {IconArrowLeft} from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import {profile} from "../assets/Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";


const TalentProfilePage = () => {
   const theme = useMantineTheme();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider  size="xs"   />
      <Link className="my-5 inline-block" to= "/find-talent">
          <Button leftSection={<IconArrowLeft size={20}  />} color={theme.colors.brightSun[4]}  variant='light' >Back </Button>
        </Link>
        {/* <Divider  size="xs"   /> */}
        <div className="flex gap-5 ">
          <Profile {...profile} />
          <RecommendTalent  />

        </div>

    </div>
  )
}

export default TalentProfilePage
