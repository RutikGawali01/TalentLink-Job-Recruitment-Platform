import React from 'react'
import {IconHeart, IconMapPin} from "@tabler/icons-react";
import {Text} from "@mantine/core";
 import {Divider,Avatar, useMantineTheme, Button} from "@mantine/core"
import { Link } from "react-router-dom";

const TalentCards = (props) => {
  const theme = useMantineTheme();
  return (
    <div className='bg-mine-shaft-900 cursor-pointer  flex flex-col gap-3 rounded-xl p-4 w-96 hover:shadow-[0_0_5px_1px_yellow] !shadow-mine-shaft-600 '>
       <div className='flex justify-between '>
          <div className='flex gap-2 items-center '>
              <div className='p-2 rounded-full  bg-mine-shaft-800 '> 
                <Avatar  size="lg" src={`/${props.image}.png`} alt="" /> 
              </div>

              <div>
                 <div className='font-semibold text-lg'>{props.name}
                  </div>
                  <div className='text-sm text-mine-shaft-300'>
                      {props.role} &#x2022; {props.company} 
                  </div>
              </div>
          </div>

          <IconHeart className='text-mines-shaft-300 cursor-pointer' />
       </div>

       {/* <div className='flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-mine-shaft-600 
       = [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs '>
          <div>{props.topSkills[0]}</div>
          <div>{props.topSkills[1]}</div>
          <div>{props.topSkills[2]}</div>
       </div> */}

       <div className='flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-mine-shaft-600 
       = [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs '>
        {
          props.topSkills?.map((skill, index) => 
             <div key={index}>{skill}</div>
          
          )
        }
       </div>

      <Text className='!text-xs text-justify text-mine-shaft-300 '
      lineClamp={3} >
        {props.about}
      </Text>

      <Divider  size="xs" color={theme.colors.mineShaft[7]} />

      <div className='flex justify-between '>
          <div className='font-semibold text-mine-shaft-200 '>
                {props.expectedCtc}
          </div>
          <div className='flex gap-1 text-xs items-center text-mine-shaft-300'>
              <IconMapPin stroke={1.5} className='h-5 w-5' />  {props.location}
             </div>
      </div>

      <Divider  size="xs" color={theme.colors.mineShaft[7]} />
      <div className='flex [&>*]:w-1/2 [&>*]:p-2  '>
        <Link to= "/talent-profile">
          <Button color={theme.colors.brightSun[4]} fullWidth variant='outline' >Profile </Button>
        </Link>
        <div>
            <Button color={theme.colors.brightSun[4]} fullWidth variant='light' >Messege </Button>
        </div>
        
      </div>

    </div>
  )
}

export default TalentCards
