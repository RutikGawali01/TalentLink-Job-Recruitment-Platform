import { IconBookmark,IconBookmarkFilled, IconMapPin } from "@tabler/icons-react";
import { Button, useMantineTheme, ActionIcon } from "@mantine/core";
import { Link , useParams} from "react-router-dom";
import { Divider } from "@mantine/core";
import { card } from "../assets/Data/JobDescData";
import {useSelector, useDispatch} from "react-redux"
import {changeProfile} from "../Slice/ProfileSlice";
import DOMPurify from "dompurify";
import {timeAgo} from "../Services/Utilities";
import {useState, useEffect} from 'react';
import {postJob} from "../Services/JobService"
import {errorNotification, successNotification} from "../Services/NotificationService"


// we have used this component in PostedJobs page thats why we have used props 
// this props will help to change button text 
const JobDescr = (props) => {
  const [applied, setApplied] = useState(false);;
  const dispatch = useDispatch();
   const theme = useMantineTheme();
   const profile = useSelector((state)=>state.profile);
   const user = useSelector((state)=> state.user);
   const handleSaveJob = () => {
     let savedJobs = profile?.savedJobs || [];   // <-- Default empty array
   
     if (savedJobs.includes(props.id)) {
       savedJobs = savedJobs.filter(id => id !== props.id);
     } else {
       savedJobs = [...savedJobs, props.id];
     }
   
     let updatedProfile = { ...profile, savedJobs };
     dispatch(changeProfile(updatedProfile));
   };

   useEffect(() => {
     if(props.applicants?.filter((applicant)=> applicant.applicantId == user.id).length>0){
      setApplied(true);
     }else {
      setApplied(false);}
   }, [props]);

   const handleClose = ()=>{
    postJob({...props,  jobStatus: "CLOSED"}).then((res)=>{
      console.log(res);
        successNotification("Success", "Job CLosed Successfully");
    }).catch((err)=>{
      console.log(err);
        errorNotification("Error", err.response?.data?.errorMessage);
    })


   }
   
   
   
  const cleanHTML = DOMPurify.sanitize(props.description); // protect script attack
  return (
    <div className="w-2/3 ">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <div className="p-3 rounded-lg  bg-[var(--blue-100)] ">
            <img className="h-14  " src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div className="flex flex-col gap-1 ">
            <div className="font-semibold text-2xl ">{props.jobTitle}</div>
            <div className="text-lg text-secondary">
              {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022; {props.applicants?props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 items-center ">
          { (props.edit || !applied) &&
            <Link to={ props.edit? `/post-job/${props.id}`:`/apply-job/${props.id}`}>

            <Button color="brand" size="sm" variant="light">
              {props.closed? "Re-open" : props.edit? "Edit" : "Apply"}
            </Button>
          </Link>}
          {!props.edit || applied &&
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          }
          {
              props.edit &&  !props.closed ? <Button onClick={handleClose} color="red.8" size="sm" variant="outline" >
                Close</Button>
              :  profile.savedJobs?.includes(props.id)? 
            <IconBookmarkFilled onClick={handleSaveJob} className='text-[var(--blue-600)]  cursor-pointer ' /> :
            <IconBookmark onClick={handleSaveJob} className='text-secondary cursor-pointer hover:text-[var(--blue-600)] ' />
          }
        </div>
      </div>
      <Divider size="xs" my="xl" />
      <div className="flex justify-between ">
        
        {
          card.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 items-center">
            <ActionIcon
              color="brand"
              className=" !h-12 !w-12 "
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon
                className="h-4/5 w-4/5"
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <div className="text-sm texxt-secondary">{item.name}</div>
            <div className="font-semibold">{props?props[item.id]:"NA"} {item.id == "packageOffered" && <>LPA</>}</div>
          </div>
        ))}
      </div>
      <Divider size="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5">Required Skills:</div>
        <div className="flex gap-2 flex-wrap">
          { props?.skillsRequired?.map((skill, index) => (
            <ActionIcon
              key={index}
              p="xs"
              color="brand"
              className=" !h-fit !w-fit !font-medium !text-sm "
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider size="xs" my="xl" />
      <div
        className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold  [&_h4]:text-secondary
       [&_p]:text-justify  [&_*]:text-secondary
          [&_li]:marker:text-[var(--blue-600)]  [&_li]:mb-1 "
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      ></div>
      <Divider size="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5"> About Commpany:</div>

        <div className="flex justify-between mb-3 ">
          <div className="flex gap-2 items-center ">
            <div className="p-3 rounded-lg  bg-[var(--blue-100)] ">
              <img className="h-8 " src={`/Icons/{props.company}.png`} alt="" />
            </div>

            <div className="flex flex-col">
              <div className="font-medium text-lg ">{props.company}</div>
              <div className=" text-secondary">
                10k+ employees
              </div>
            </div>
          </div>
            <Link to={`/company/${props.company}`} >
              <Button
                color="brand"
                variant="light"
              >
                Company Page
              </Button>
            </Link>
        </div>

        <div className="text-secondary text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime illo iure in, corporis soluta ad, saepe a dolore modi itaque natus nesciunt eaque? Consequatur asperiores dicta provident ratione consectetur tempora culpa assumenda quas? Ipsam?
        </div>
            


      </div>


    </div>
  );
};

export default JobDescr;
