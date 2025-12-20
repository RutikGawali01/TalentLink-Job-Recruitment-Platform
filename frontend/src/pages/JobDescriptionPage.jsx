import {Divider} from "@mantine/core"
import { Link } from "react-router-dom";
 import { Button, useMantineTheme} from "@mantine/core"
 import {IconArrowLeft} from "@tabler/icons-react";
 import JobDescr from "../JobDesc/JobDescr";
 import RecommendedJobs from "../JobDesc/RecommendedJobs";



const JobDescriptionPage = () => {
   const theme = useMantineTheme();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      
      <Link className="my-5 inline-block" to= "/find-jobs">
          <Button leftSection={<IconArrowLeft size={20}  />} color={theme.colors.brightSun[4]}  variant='light' >Back </Button>
        </Link>
        <div className="flex gap-5 justify-around ">
            <JobDescr />
            <RecommendedJobs />
        </div>
        
    </div>
  )
}

export default JobDescriptionPage
