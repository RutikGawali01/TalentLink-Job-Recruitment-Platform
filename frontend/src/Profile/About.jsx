import { useState, useEffect } from "react";
import { IconMapPin,IconCheck, IconPencil, IconPlus, IconX,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";
import fields from "../assets/Data/Profile";
import {useSelector, useDispatch} from "react-redux";
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";

const About = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user);
    const theme = useMantineTheme();
    const profile  = useSelector((state)=> state.profile);
    const [about, setAbout] = useState("");
    const select = fields;
    const [edit, setEdit] = useState(false); // ← initially false
    
    const handleClick = () => {
        if(!edit){
            setEdit(true);
            setAbout(profile.about);
            
        }else{
            setEdit(false);
    
        }
        //setEdit((prev) => !prev); // toggle edit
    };

    const handleSave = ()=>{
        setEdit(false);
        let updatedProfile = {...profile, about: about};
        dispatch(changeProfile(updatedProfile));
        //console.log(updatedProfile);
        successNotification("Success", "Profile updated successfully");

    }

  return (
    <div className="px-3 ">
        <div className=" text-2xl font-semibold mb-3 flex justify-between ">
          about{" "}
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
          edit ? <Textarea
          value={about} autosize minRows={3} placeholder="Enter about yourself "
          onChange={(event) => setAbout(event.currentTarget.value)}
        /> : <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
        }
      </div>
  )
}

export default About
