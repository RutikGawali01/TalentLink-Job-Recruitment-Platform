import SearchBar from "../FindJobs/SearchBar";
import {Divider} from "@mantine/core"
import Jobs  from "../FindJobs/Jobs";
const FindJobs = () => {
  return (
    <div className="min-h-[100vh] bg-blue-50 py-5 px-5 font-['poppins']">
      
      <div className="border-default p-3 bg-primary rounded-2xl">
          <SearchBar />
      </div>

      <Divider  size="xs" mx="md"  />
      <Jobs />
    </div>
  )
}

export default FindJobs
