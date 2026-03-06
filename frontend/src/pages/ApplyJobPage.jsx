import { Button, useMantineTheme } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import {useState, useEffect} from "react";
import {getJob} from "../Services/JobService"

const ApplyJobPage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">

        <Button onClick={()=> navigate(-1)} my={"md"}
          leftSection={<IconArrowLeft size={20} />}
          color={"brand.4"}
          variant="light"
        >
          Back{" "}
        </Button>
      <ApplyJobComp {...job} />
    </div>
  );
};

export default ApplyJobPage;
