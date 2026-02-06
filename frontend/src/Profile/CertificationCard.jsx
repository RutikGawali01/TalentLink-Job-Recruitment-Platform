import { useState, useEffect } from "react";
import { IconMapPin,IconBriefcase, IconTrash, IconPlus, IconDeviceFloppy,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";
import {formateDate} from "../Services/Utilities"
import {useSelector, useDispatch} from "react-redux";
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";

const CertificationCard = (props) => {
    const theme = useMantineTheme();
    const [addCerti, setAddCerti] = useState(false);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile  = useSelector((state)=> state.profile);

    const handleDelete =()=>{
      let certi = [...profile.certifications];
      certi.splice(props.index, 1);
      let updatedProfile = {...profile, certifications: certi};
      dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Certificate deleted successfully");
      
    }

  return (
        <div className='flex justify-between '>
          <div className='flex gap-2 items-center '>
              <div className='p-2 rounded-md  bg-mine-shaft-800 '> 
                <img className='h-7 ' src={`/Icons/${props.issuer}.png`} alt="" /> 
              </div>

              <div className='flex flex-col  '>
                 <div className='font-semibold'>{props.name} 
                  </div>
                  <div className='text-sm text-mine-shaft-300'>
                      {props.issuer} 
                  </div>
              </div>
          </div>
            <div className="flex items-center gap-2 ">
                <div className='flex flex-col items-end '>
                    <div className='text-sm text-mine-shaft-300 '>
                        {formateDate(props.issueDate)}
                    </div>
                    <div className='text-sm text-mine-shaft-300 '>
                        ID: {props.certificateId}
                    </div>
                </div>
                { props.edit &&
                <ActionIcon size="lg"   variant="subtle" color="brand"
                 onClick={handleDelete}>
                    <IconTrash className="h-4/5 w-4/5 "  stroke={1.5} />
                </ActionIcon>
                }


            </div>
          
        </div>
    
  )
}

export default CertificationCard
