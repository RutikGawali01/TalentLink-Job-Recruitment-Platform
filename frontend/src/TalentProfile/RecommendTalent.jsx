import TalentCard from "../FindTalent/TalentCards";
import {talents} from "../assets/Data/TalentData";
import {useParams} from "react-router-dom"

const RecommendTalent = (props) => {
  const {id} = useParams();

  return (
    <div>
      <div className='text-xl font-semibold mb-5'>
            Recommended Talents
      </div>
      <div className="flex flex-col flex-wrap gap-5 justify-between ">
        {
            props.talents?.map((talent, index) => index<4 && id != talent.id &&
                <TalentCard key={index} {...talent} />
            )
        }
      </div>
    </div>
  )
}

export default RecommendTalent
