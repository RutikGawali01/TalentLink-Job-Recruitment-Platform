import { IconMapPin,IconBriefcase, IconPencil, IconX, IconCheck } from "@tabler/icons-react";
import { ActionIcon,useMantineTheme , NumberInput} from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";
import {useForm} from "@mantine/form";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux"
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";

const Info = (props) => {
  const dispatch = useDispatch();
    const user = useSelector((state)=> state.user);
  const theme = useMantineTheme();
  const profile  = useSelector((state)=> state.profile);
  const select = fields;
  const [edit, setEdit] = useState(false); // ← initially false

  const handleClick = () => {
    if(!edit){
        setEdit(true);
        form.setValues({'jobTitle': profile.jobTitle, 'company': profile.company, 'location': profile.location, 'totalExp':profile.totalExp});
        console.log(form.getValues());
    }else{
        setEdit(false);

    }
    //setEdit((prev) => !prev); // toggle edit
  };

  const handleSave = ()=>{
        setEdit(false);
        let updatedProfile = {...profile, ...form.getValues()};
        dispatch(changeProfile(updatedProfile));
        //console.log(updatedProfile);
        successNotification("Success", "Profile updated successfully");

  }

  const form = useForm({
    mode:'controlled',
    initialValues:{jobTitle:'', company:'', location: '', totalExp:0},
  });

  return (
    <>  
      <div className="text-3xl font-semibold flex justify-between ">
        {user.name}
        <div>
          { edit && 
            <ActionIcon
            size="lg"
            variant="subtle"
            color="green.8"
            onClick={handleSave}
          >
              <IconCheck className="h-4/5 w-4/5" />  
          </ActionIcon>
          }
          <ActionIcon
            size="lg"
            variant="subtle"
            color={edit ? "red.8": `${theme.colors.brightSun[4]}`}
            onClick={handleClick}          // FIXED
          >
            { edit ? (
              <IconX className="h-4/5 w-4/5" />  // Save when editing
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>        
        </div>
      </div>

      {!edit ? (
        <>
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5}/>
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="text-lg flex gap-1 items-center text-mine-shaft-300 ">
            <IconMapPin className="h-5 w-5" stroke={1.5}/>
            {profile.location}
          </div>
          <div className="text-lg flex gap-1 items-center text-mine-shaft-300 ">
            <IconBriefcase className="h-5 w-5" stroke={1.5}/>
            Experience: {profile.totalExp} Years
          </div>

        </>
      ) : (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form ={form} name="jobTitle"  {...select[0]}/>
            <SelectInput form = {form } name="company" {...select[1]}/>
          </div>
          <div  className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form = {form} name="location" {...select[2]}/>
            <NumberInput withAsterisk  label="Experience " hideControls min={0} max={40}  clampBehavior="strict" {...form.getInputProps('totalExp')} />
          </div>
          
        </>
      )}
    </>
  )
}

export default Info;
