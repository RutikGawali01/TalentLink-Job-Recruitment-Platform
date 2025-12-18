  import React from 'react'
  import { IconAnchor , IconBell , IconSettings } from '@tabler/icons-react';
  import { Avatar , Indicator , useMantineTheme } from '@mantine/core';
  import profile from '/avatar.png';
  import NavLinks from './NavLinks';

const Header = () => {
  const theme = useMantineTheme();
   //const colorHex = theme.colors.brightSun[4];
  return (
    <div className='w-full bg-mine-shaft-950 h-20 text-white flex
    justify-between px-6 items-center '>

      {/* logo */}
      <div className='flex gap-1 items-center text-bright-sun-400'>
        <IconAnchor className='h-10 w-8 ' stroke={2.25} />
        <div className='text-3xl font-semibold'>
          Find Job
        </div>
      </div>
      
      
      {/* links */}
      {NavLinks()}

      {/* profile section */}
      <div className='flex gap-2 items-center'>
        
        <div className='flex items-center gap-2'>
          <div>Rutik</div>
          <Avatar src={profile} alt="it's me" />
        </div>

        <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <IconSettings stroke={1.5} />
        </div>

         <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator color={theme.colors.brightSun[4]} size={6} offset={6} processing>
              <IconBell stroke={1.5} />
          </Indicator>
          </div>

      </div>
    </div>
  )
}

export default Header
