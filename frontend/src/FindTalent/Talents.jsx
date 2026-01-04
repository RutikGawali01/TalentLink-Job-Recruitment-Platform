import Sort from "../FindJobs/Sort";
import TalentCards from "./TalentCards";
import { useState, useEffect } from "react";
import { getAllProfile } from "../Services/ProfileService";
import { useSelector, useDispatch } from "react-redux";
import {resetFilter} from "../Slice/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state)=>state.sort);
  const [filteredTalents, setFilteredTalents] = useState([]);

  useEffect(() => {
      dispatch(resetFilter());
    getAllProfile()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let filterTalent = talents;
    //setFilteredTalents(talents);
    //console.log(filter);
    if (filter?.name)
      filterTalent = filterTalent?.filter((talent) =>
        talent?.name?.toLowerCase().includes(filter?.name?.toLowerCase())
      );

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterTalent = filterTalent?.filter((talent) =>
        filter["Job Title"]?.some((title) =>
          talent?.jobTitle?.toLowerCase().includes(title?.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filterTalent = filterTalent?.filter((talent) =>
        filter.Location?.some((location) =>
          talent.location?.toLowerCase().includes(location?.toLowerCase())
        )
      );
    }

    if (filter.Skills && filter.Skills.length > 0) {
      filterTalent = filterTalent.filter((talent) =>
        filter.Skills?.some((skill) =>
          talent.skills?.some((talentSkill) =>
            talentSkill?.toLowerCase().includes(skill?.toLowerCase())
          )
        )
      );
    }

    if(filter.exp && filter.exp.length> 0){
      filterTalent = filterTalent.filter((talent)=>filter.exp[0]<=talent.totalExp && talent.totalExp <= filter.exp[1]);
    }
    setFilteredTalents(filterTalent);
  }, [filter, talents]);




  useEffect(() => {
    if(sort == "Experience: Low to High"){
      setTalents([...talents].sort((a, b)=>a.totalExp-b.totalExp));
    }else if(sort == "Experience: High to Low"){
      setTalents([...talents].sort((a, b)=>b.totalExp-a.totalExp));
    }
  }, [sort])

  return (
    <div className="p-5 ">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold ">Talents</div>
        <div>
          <Sort />
        </div>
      </div>

      <div className="flex mt-10 flex-wrap gap-6 justify-center">
        {filteredTalents.length?filteredTalents.map((talent, index) => (
          <TalentCards key={index} {...talent} />
        )) : <div className="text-3xl font-semibold"> No Talents found</div>}
      </div>
    </div>
  );
};

export default Talents;
