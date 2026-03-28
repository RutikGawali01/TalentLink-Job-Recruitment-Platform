import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalentPage = () => {
  return (
    <div
      className="min-h-screen font-['poppins'] pt-16 pb-24 px-5 sm:px-8 lg:px-16"
      style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f8faff 60%, #eef2ff 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Search Bar Card ── */}
        <div className="bg-white border border-blue-100 rounded-2xl shadow-sm shadow-blue-100/60 p-4 sm:p-5">
          <SearchBar />
        </div>

        {/* ── Talents Section ── */}
        <Talents />

      </div>
    </div>
  );
};

export default FindTalentPage;