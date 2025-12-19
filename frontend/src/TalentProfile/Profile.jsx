import React from 'react'
import {IconMapPin, IconBriefcase} from "@tabler/icons-react";
 import {Divider,Avatar, useMantineTheme, Button} from "@mantine/core"
import ExperienceCard from "./ExperienceCard"
import CertificationCard from "./CertificationCard"

const Profile = (props) => {
    const theme = useMantineTheme();
  return (
    <div className='w-2/3'>
        <div className='relative'>
            <img className='rounded-t-2xl' src="/Profile/banner.jpg" alt="" />
            <img className= 'h-48 w-48 absolute -bottom-1/3 left-3  rounded-full border-mine-shaft-950 border-8 ' 
                src="/avatar.png" alt="" />
        </div>

        <div className='px-3 mt-16  '>
            <div className='text-3xl font-semibold flex justify-between '>   {props.name}   
                <Button color={theme.colors.brightSun[4]}  variant='light' >Messege </Button>
            </div>
            <div className='text-xl flex gap-1 items-center '> < IconBriefcase className='h-5 w-5' stroke={1.5} />
                     {props.role} &bull; {props.company}  
            </div>
            <div className='text-lg flex gap-1 items-center text-mine-shaft-300 '>
                <IconMapPin  className='h-5 w-5' stroke={1.5} /> {props.location}
            </div>
        </div>

        <Divider mx="xs"  my="xl" />

        <div className='px-3 '>
            <div className=' text-2xl font-semibold mb-3 '>
                about
            </div>
            <div className='text-sm text-mine-shaft-300 text-justify'>
                {props.about}
            </div>
        </div>

        <Divider  mx="xs" my="xl" />


        <div className=''>
            <div className=' text-2xl font-semibold mb-3 '>
                skills
            </div>
            <div className='flex flex-wrap gap-2'>
                {
                    props.skills.map((skill, index) =>
                        <div key={index} className=' font-medium bg-mine-shaft-900 text-sm  bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'>
                            {skill}
                        </div>
                    )
                }

            </div>


            {/* <div className='flex flex-wrap gap-2'>
                <div className=' font-medium bg-mine-shaft-900 text-sm  bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'>
                    React</div>

            </div> */}
        </div>

        <Divider  mx="xs" my="xl" />
        <div className='px-3 '>
            <div className=' text-2xl font-semibold mb-5'>
                Experience
            </div>
            <div className='flex flex-col gap-8'>
                {
                props.experience.map((exp , index) =>
                    <ExperienceCard key={index} {...exp } /> 
                )
            }
            </div>
            
            
        </div>

        <Divider  mx="xs" my="xl" />
        <div className='px-3'>
            <div className=' text-2xl font-semibold mb-5'>
                Certifications 
            </div>
            <div className='flex flex-col gap-8'>
                {
                props.certifications.map((certif , index) =>
                   <CertificationCard key={index} {...certif} />
                )
            }
            </div>
            
        </div>



    



    </div>
  )
}

export default Profile
