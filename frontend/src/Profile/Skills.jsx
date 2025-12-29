import { useState, useEffect } from "react";
import { IconX,IconBriefcase, IconPencil, IconCheck, IconDeviceFloppy,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";
import fields from "../assets/Data/Profile";
import {useSelector, useDispatch} from "react-redux";
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";

const Skills = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user);
    const theme = useMantineTheme();
    const profile  = useSelector((state)=> state.profile);
    const[skills, setSkills] = useState([]);
    const select = fields;
    const [edit, setEdit] = useState(false); // ← initially false
    
    const handleClick = () => {
        if(!edit){
            setEdit(true);
            setSkills(profile.skills);
            
        }else{
            setEdit(false);
    
        }
        //setEdit((prev) => !prev); // toggle edit
    };

    const handleSave = ()=>{
        setEdit(false);
        let updatedProfile = {...profile, skills: skills};
        dispatch(changeProfile(updatedProfile));
        //console.log(updatedProfile);
        successNotification("Success", "Profile updated successfully");

    }
  return (
    <div className="">
        <div className=" text-2xl font-semibold mb-3 flex justify-between ">
          skills{" "}
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
        {
          edit ? <TagsInput value={skills} onChange={setSkills}  placeholder="add skills" splitChars={[',', ' ','|']} /> 
          : <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill, index) => (
            <div
              key={index}
              className=" font-medium bg-mine-shaft-900 text-sm  bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
        }
      </div>
  )
}

export default Skills
