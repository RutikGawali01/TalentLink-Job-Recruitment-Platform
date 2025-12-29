import { useState, useEffect } from "react";
import { IconMapPin,IconX, IconPencil, IconPlus, IconDeviceFloppy,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";
import fields from "../assets/Data/Profile";
import CertificationCard from "./CertificationCard";
import CertiInput from "./CertiInput";
import {useSelector, useDispatch} from "react-redux";
import {getProfile} from "../Services/ProfileService";
const Certification = () => {
    const dispatch = useDispatch();
    const theme = useMantineTheme();
    const profile  = useSelector((state)=> state.profile);
    const select = fields; 
    const [edit, setEdit] = useState(false); 
    const [addCerti, setAddCerti] = useState(false);

     const handleClick = () => {
        if(!edit){
            setEdit(true);
            
            
        }else{
            setEdit(false);
    
        }
    };
  return (
     <div className="px-3">
        <div className=" text-2xl font-semibold mb-4 flex justify-between">
          Certifications{" "}
          <div className="flex gap-2">
          <ActionIcon  size="lg"  variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => setAddCerti(true)}>
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
          {profile?.certifications?.map((certif, index) => (
            <CertificationCard key={index} index = {index} {...certif} edit ={edit[4]} />
          ))}
          {
            addCerti && <CertiInput  add  setEdit = {setAddCerti}/>
          }
        </div>
      </div>
  )
}

export default Certification
