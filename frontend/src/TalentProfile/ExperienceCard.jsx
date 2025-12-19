import React from 'react'

const ExperienceCard = (props) => {
  return (
    <div className='flex flex-col gap-2'>
         <div className='flex justify-between '>
          <div className='flex gap-2 items-center '>
              <div className='p-2 rounded-md  bg-mine-shaft-800 '> 
                <img className='h-7 ' src={`/Icons/${props.company}.png`} alt="" /> 
              </div>

              <div className='flex flex-col  '>
                 <div className='font-semibold'>{props.title}
                  </div>
                  <div className='text-sm text-mine-shaft-300'>
                      {props.company} &#x2022; {props.location}
                  </div>
              </div>
          </div>

          <div className='text-sm text-mine-shaft-300 '>
            {props.startDate} - {props.endDate}
          </div>
       </div>


       <div className='text-sm text-mine-shaft-300 text-justify  '>
            {props.description}    
       </div>

    </div>
  )
}

export default ExperienceCard
