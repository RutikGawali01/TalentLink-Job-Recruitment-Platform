import Sort from "../FindJobs/Sort";
import TalentCards from "./TalentCards";
import { useState, useEffect } from "react";
import { getAllProfile } from "../Services/ProfileService";
import { useSelector, useDispatch } from "react-redux";
import { resetFilter } from "../Slice/FilterSlice"; //resetFilter → clears filter state when page loads

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]); // store all talents

  const filter = useSelector((state) => state.filter); //Stores selected filters (name, skills, etc.)

  const sort = useSelector((state) => state.sort); //Stores selected sort option  from dropdown
  const [filteredTalents, setFilteredTalents] = useState([]); //after filter

  // fetch data when page loads
  // runs only once
  useEffect(() => {
    dispatch(resetFilter()); // clear old filters
    getAllProfile()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // case insensitive for all filters
  //This effect runs whenever filters change OR talents change.
  useEffect(() => {
    // starts with all the talents  and then reduces after apply filter
    let filterTalent = talents; // all talents
    // check if name filter exists or not

    if (filter?.name)
      filterTalent = filterTalent?.filter(
        (talent) =>
          talent?.name?.toLowerCase().includes(filter?.name?.toLowerCase()), //filer.name - typed  name Ex .  ru
        //"rutik".includes("ru") →
      );

    // .some -- “Does at least ONE element in this array satisfy the condition?”
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterTalent = filterTalent?.filter((talent) =>
        //condi for partic talent
        filter["Job Title"]?.some((title) =>
          talent?.jobTitle?.toLowerCase().includes(title?.toLowerCase()),
        ),
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filterTalent = filterTalent?.filter((talent) =>
        filter.Location?.some((location) =>
          talent.location?.toLowerCase().includes(location?.toLowerCase()),
        ),
      );
    }

    // filter.Skills → selected skills
    //talent.skills → array of skills of talent
    // trt to debug on paper
    if (filter.Skills && filter.Skills.length > 0) {
      filterTalent = filterTalent.filter(
        (
          talent, //“Include this talent if---> any selected skill----> exists in any of the talent’s skills”
        ) =>
          filter.Skills?.some(
            (
              skill, // for selected skill
            ) =>
              talent.skills?.some((talentSkill) =>
                talentSkill?.toLowerCase().includes(skill?.toLowerCase()),
              ),
          ),
      );
    }

    if (filter.exp && filter.exp.length > 0) {
      filterTalent = filterTalent.filter(
        (talent) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1],
      );
    }
    setFilteredTalents(filterTalent);
  }, [filter, talents]);

  // sort - talents based on exp
  useEffect(() => {
    if (sort === "Experience: Low to High") {
      setTalents((prevTalents) =>
        [...prevTalents].sort((a, b) => a.totalExp - b.totalExp),
      );
    } else if (sort === "Experience: High to Low") {
      setTalents((prevTalents) =>
        [...prevTalents].sort((a, b) => b.totalExp - a.totalExp),
      );
    }
  }, [sort]);

  return (
    <div className="p-5 ">
      <div className="px-6 sm:px-10 lg:px-20 xl:px-32">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
          {/* Title */}
          <h1 className="text-2xl sm:text-2xl lg:text-4xl font-semibold">
            Talents
          </h1>

          {/* Sort Section */}
          <div className="flex justify-start sm:justify-end">
            <Sort />
          </div>
        </div>
      </div>

      {/*  all talents */}
      <div className="flex mt-10 flex-wrap gap-6 justify-center">
        {filteredTalents.length ? (
          filteredTalents.map((talent, index) => (
            <TalentCards key={index} {...talent} />
          ))
        ) : (
          <div className="text-3xl font-semibold"> No Talents found</div>
        )}
      </div>
    </div>
  );
};

export default Talents;
