import { useState, useEffect } from "react";
import { IconMapPin,IconBriefcase, IconPencil, IconPlus, IconX,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";
import ExperienceCard from "./ExperienceCard";
import fields from "../assets/Data/Profile";
import ExpInput from "./ExpInput"

import {useSelector, useDispatch} from "react-redux";
import {getProfile} from "../Services/ProfileService";
import {setProfile} from "../Slice/ProfileSlice";
const Experience = () => {
    const dispatch = useDispatch();
    const theme = useMantineTheme();
    const profile  = useSelector((state)=> state.profile);
    const select = fields;
    const [edit, setEdit] = useState(false); 
    const [addExp , setAddExp]  = useState(false);

     const handleClick = () => {
        if(!edit){
            setEdit(true);
            setAddExp(profile.experiences);
            
        }else{
            setEdit(false);
    
        }
    };

  return (
    <div className="px-3 ">
        <div className=" text-2xl font-semibold mb-5 flex justify-between">
          Experience{" "}
          <div className="flex gap-2 ">
            <ActionIcon  size="lg"  variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => setAddExp(true)}>
              <IconPlus className="h-4/5 w-4/5 " />
            </ActionIcon>
          <ActionIcon  size="lg"  variant="subtle" color={edit ? "red.8": `${theme.colors.brightSun[4]}`}  onClick={handleClick}>
            { !edit ? (
              <IconPencil className="h-4/5 w-4/5 " />
            ) : (
              <IconX className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp, index) => (
            <ExperienceCard key={index} index = {index} {...exp} edit = {edit} />
          ))}
          {addExp  &&<ExpInput add setEdit = {setAddExp}/>}
        </div>
      </div>
  )
}

export default Experience
