import PostedJobComp from "../PostedJob/PostedJobComp";
import PostedJobDesc from "../PostedJob/PostedJobDesc"
const PostedJobsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex gap-5">
            <PostedJobComp />
            <PostedJobDesc />
      </div>
    </div>
  )
}

export default PostedJobsPage
