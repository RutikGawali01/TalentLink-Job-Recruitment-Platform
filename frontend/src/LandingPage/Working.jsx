import React from 'react'
import {work} from "../assets/Data/Data";
import {Avatar} from "@mantine/core";
import avatar1 from "/avatar1.png";

const Working = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl mb-3 text-center font-semibold text-primary">
        How it <span className="text-[var(--blue-600)]">works </span> 
      </div>
      <div className="text-lg mb-10 mx-auto text-secondary text-center w-1/2 ">
        Effortlessly navigate through the process and 
        land your dream job.
      </div>

      <div className='flex px-16 justify-between items-center'>
        <div className='relative'>
            <img className='w-[30rem] ' src="/Working/Girl.png" alt="girl" />

            <div className='w-36 flex flex-col top-[10%] right-0 absolute items-center gap border border-accent
            rounded-xl py-3 px-1 backdrop-blur-md   '>
              <Avatar className='!h-16 !w-16 '
              src={avatar1} alt="it's me" />
              <div className='text-sm font-semibold text-seconadary text-center '>
                Complete Your Profile 
              </div>
              <div className='text-xs text-[var(--blue-600)]  '>
                70% Completed
              </div>

            </div>
        </div>
        <div className='flex flex-col gap-10 '>
            {
                work.map((item, index)=> 
                    <div key={index} className='flex items-center gap-4 border-default p-4 rounded-lg bg-blue-100'>
                        <div className='p-2.5 bg-[var(--blue-400)] hover:opacity-85 text-[--bg-primary] rounded-full'>
                            <img className='h-12 w-12' src={`/Working/${item.name}.png`} alt={item.name} />
                        </div>

                        <div className=''>
                            <div className='text-xl text-primary font-semibold '>{item.name}</div>
                            <div className='text-secondary '>{item.desc}</div>
                        </div>
                  </div>
                )
            }
        </div>
      </div>
      
    </div>
  )
}

export default Working
 