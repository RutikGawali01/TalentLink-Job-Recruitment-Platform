import Sort from "../FindJobs/Sort";
import TalentCards from "./TalentCards";
import {talents} from "../assets/Data/TalentData";

const Talents = () => {
  return (
    <div className='p-5 '>
      <div className='flex justify-between'>
        <div className='text-2xl font-semibold '>Talents</div>
        <div>
            <Sort />
        </div>
      </div>

      <div className='flex mt-10 flex-wrap gap-6 justify-center'>
         {
            talents.map((talent, index) => 
                    <TalentCards key={index} {...talent} />
             )
         }
         
         
         
      </div>
      

      
    </div>
  )
}

export default Talents
