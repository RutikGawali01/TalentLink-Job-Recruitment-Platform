import Sort from "../FindJobs/Sort";
import TalentCards from "./TalentCards";
import { useState, useEffect } from "react";
import { getAllProfile } from "../Services/ProfileService";
import { useSelector, useDispatch } from "react-redux";
import { resetFilter } from "../Slice/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState([]);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const [filteredTalents, setFilteredTalents] = useState([]);

  useEffect(() => {
    dispatch(resetFilter());
    getAllProfile()
      .then((res) => setTalents(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let filterTalent = talents;

    if (filter?.name)
      filterTalent = filterTalent?.filter((talent) =>
        talent?.name?.toLowerCase().includes(filter?.name?.toLowerCase()),
      );

    if (filter["Job Roles"] && filter["Job Roles"].length > 0)
      filterTalent = filterTalent?.filter((talent) =>
        filter["Job Roles"]?.some((title) =>
          talent?.headline?.toLowerCase().includes(title?.toLowerCase()),
        ),
      );

    if (filter.Location && filter.Location.length > 0)
      filterTalent = filterTalent?.filter((talent) =>
        filter.Location?.some((location) =>
          talent.location?.toLowerCase().includes(location?.toLowerCase()),
        ),
      );

    if (filter.Skills && filter.Skills.length > 0)
      filterTalent = filterTalent.filter((talent) =>
        filter.Skills?.some((skill) =>
          talent.skills?.some((talentSkill) =>
            talentSkill?.toLowerCase().includes(skill?.toLowerCase()),
          ),
        ),
      );

    if (filter.exp && filter.exp.length > 0)
      filterTalent = filterTalent.filter(
        (talent) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1],
      );

    setFilteredTalents(filterTalent);
  }, [filter, talents]);

  useEffect(() => {
    if (sort === "Experience: Low to High")
      setTalents((prev) => [...prev].sort((a, b) => a.totalExp - b.totalExp));
    else if (sort === "Experience: High to Low")
      setTalents((prev) => [...prev].sort((a, b) => b.totalExp - a.totalExp));
  }, [sort]);

  return (
    <div className="mt-8">

      {/* ── Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Talents
          </h1>
          <p className="text-sm text-blue-500 font-medium mt-1">
            {filteredTalents.length} profile{filteredTalents.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div>
          <Sort />
        </div>
      </div>

      {/* ── Cards Grid ── */}
      {filteredTalents.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTalents.map((talent, index) => (
            <TalentCards key={index} {...talent} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <div className="p-5 rounded-full bg-blue-50 border-2 border-blue-100 shadow-inner">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <div className="text-gray-700 font-semibold text-lg">No Talents Found</div>
          <div className="text-xs text-blue-400">Try adjusting your search filters</div>
        </div>
      )}

    </div>
  );
};

export default Talents;