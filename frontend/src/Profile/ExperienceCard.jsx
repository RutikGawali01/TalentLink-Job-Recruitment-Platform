import {useMantineTheme, Button } from "@mantine/core";
import {useState} from "react"
import ExpInput from "./ExpInput";
import {formateDate} from "../Services/Utilities";
import {useSelector, useDispatch} from "react-redux";
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";

const ExperienceCard = (props) => {
  const dispatch = useDispatch();
    const theme = useMantineTheme();
    const [edit, setEdit] = useState(false);
    const profile  = useSelector((state)=> state.profile);

    const handleDelete =()=>{
      let exp = [...profile.experiences];
      exp.splice(props.index, 1);
      let updatedProfile = {...profile, experiences: exp};
      dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Experience deleted successfully");
      
    }
  return (
     !edit ? <div className='flex flex-col gap-2'>
         <div className='flex justify-between '>
          <div className='flex gap-2 items-center '>
              <div className='p-2 rounded-md  bg-mine-shaft-800 '> 
                <img className='h-7 ' src={`/Icons/${props.company}.png`} alt="" /> 
              </div>

              <div className='flex flex-col  '>
                 <div className='font-semibold'>{props.title}
                  </div>
                  <div className='text-sm text-mine-shaft-300'>
                      {props.company} &#x2022; {props.location}
                  </div>
              </div>
          </div>

          <div className='text-sm text-mine-shaft-300 '>
            {formateDate(props.startDate)} - {props.working ? "present":formateDate(props.endDate)}
          </div>
       </div>


       <div className='text-sm text-mine-shaft-300 text-justify  '>
            {props.description}    
       </div>
       { props.edit && 
        <div className="flex gap-5 " >
            <Button onClick={() => setEdit(true)} color="brand" variant="outline">Edit </Button>
            <Button color="red.8" onClick={handleDelete} variant="outline">Delete </Button>
        </div>   
        }   

    </div>: <ExpInput   {...props} setEdit ={setEdit} />
  )
}

export default ExperienceCard
