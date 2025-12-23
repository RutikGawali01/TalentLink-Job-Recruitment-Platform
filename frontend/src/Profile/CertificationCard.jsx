import { IconMapPin,IconBriefcase, IconTrash, IconPlus, IconDeviceFloppy,} from "@tabler/icons-react";
import {Divider,Avatar, useMantineTheme, ActionIcon,Textarea, TagsInput} from "@mantine/core";

const CertificationCard = (props) => {
    const theme = useMantineTheme();
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
                        {props.issueDate}
                    </div>
                    <div className='text-sm text-mine-shaft-300 '>
                        ID: {props.certificateId}
                    </div>
                </div>
                { !props.edit &&
                <ActionIcon size="lg"   variant="subtle" color={theme.colors.brightSun[4]}  onClick={() => setAddExp(true)}>
                    <IconTrash className="h-4/5 w-4/5 "  stroke={1.5} />
                </ActionIcon>
                }


            </div>
          
        </div>
    
  )
}

export default CertificationCard
