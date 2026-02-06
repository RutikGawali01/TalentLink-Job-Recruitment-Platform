import { Divider } from "@mantine/core";
import ProfileComp from "../Profile/ProfileComp";
import {profile} from "../assets/Data/TalentData";
const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-blue-50 font-['poppins']">
      <Divider mx="md" mb="xl"/>
      <ProfileComp {...profile} />
    </div>
  )
}

export default ProfilePage
