import React from 'react'
import Marquee from "react-fast-marquee"
import {companies} from "../assets/Data/Data";

const CompaniesPage = () => {
  return (
    <div className='mt-20 pb-5 bg-primary'>
        <div className='text-4xl mb-10 text-center font-semibold text-primary'>
            Trusted by <span className='text-[var(--blue-600)]'>1000+</span> companies
        </div>
        <Marquee pauseOnHover={true} >
            {
              companies.map((company, index) => 
              <div key={index} className='mx-8 px-2 py-1 hover:bg-mine-shaft-900 rounded-xl cursor-pointer  '>
                <img className='h-14 ' src={`/Companies/${company}.png`} alt={company} />
              </div>)
            }

        </Marquee>
      
    </div>
  )
}

export default CompaniesPage
