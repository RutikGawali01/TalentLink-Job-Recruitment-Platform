 import { Button, useMantineTheme} from "@mantine/core"
 import PostJobs from "../PostJob/PostJobs"

const PostJobPage = () => {
   const theme = useMantineTheme();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
        <PostJobs />
    </div>
  )
}

export default PostJobPage
