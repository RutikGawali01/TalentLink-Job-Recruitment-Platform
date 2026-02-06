import {Divider} from "@mantine/core"
import { Link , useParams } from "react-router-dom";
 import { Button, useMantineTheme} from "@mantine/core"
 import {IconArrowLeft} from "@tabler/icons-react";
 import JobDescr from "../JobDesc/JobDescr";
 import RecommendedJobs from "../JobDesc/RecommendedJobs";
import {useState, useEffect} from "react";
import {getJob} from "../Services/JobService"


// job-page
const JobDescriptionPage = () => {
    const {id} = useParams();
    const [job ,setJob] = useState();
    useEffect(() => {
      window.scrollTo(0, 0);
      getJob(id)
        .then((res)=> {
          setJob(res);
        })
        .catch((err)=> {
          console.log(err);
        })
    }, [id])
    
   const theme = useMantineTheme();
  return (
    <div className="min-h-[100vh] bg-[var(--blue-100)] font-['poppins'] p-4">
      
      <Link className="my-5 inline-block" to= "/find-jobs">
          <Button leftSection={<IconArrowLeft size={20}  />} color="brand"  variant='light' >Back </Button>
        </Link>
        <div className="flex gap-5 justify-around ">
            <JobDescr {...job} />
            <RecommendedJobs />
        </div>
        
    </div>
  )
}

export default JobDescriptionPage
