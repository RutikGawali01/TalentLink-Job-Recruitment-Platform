import TalentCards from "../FindTalent/TalentCards";
import {talents} from "../assets/Data/TalentData";

const CompanyEmployee = () => {
  return (
     <div className='flex mt-10 flex-wrap gap-10'>
         {
            talents.map((talent, index) =>  index < 6 && 
                    <TalentCards key={index} {...talent} />
             )
         }
    </div>
  )
}

export default CompanyEmployee
