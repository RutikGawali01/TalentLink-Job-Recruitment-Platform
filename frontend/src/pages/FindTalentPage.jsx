import {Divider} from "@mantine/core"
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents"

const FindTalentPage = () => {
  return (
    <div className="min-h-[100vh] bg-blue-50 font-['poppins'] py-5 px-5">
      
      <div className="border-default p-3 bg-primary rounded-2xl">
          <SearchBar />
      </div>
      
      {/* <Divider  size="xs" mx="md"  /> */}
      <Talents />

    </div>
  )
}

export default FindTalentPage
