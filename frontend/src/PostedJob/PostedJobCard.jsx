import { useParams, Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobCard = (props) => {
  const { id } = useParams();

  return (
    <Link
      to={`/posted-jobs/${props.id}`}
      className={`block rounded-xl p-3 border-l-4 transition
        ${
          props.id == id
            ? "bg-bright-sun-400 text-black border-l-bright-sun-600"
            : "bg-mine-shaft-900 text-mine-shaft-300 border-l-transparent hover:bg-mine-shaft-800"
        }`}
    >
      <div className="text-sm font-semibold">
        {props.jobTitle}
      </div>

      <div className="text-xs font-medium">
        {props.location}
      </div>

      <div className="text-xs mt-1">
        {props.jobStatus === "DRAFT"
          ? "Drafted "
          : props.jobStatus === "CLOSED"
          ? "Closed "
          : "Posted "}
        {timeAgo(props.postTime)}
      </div>
    </Link>
  );
};

export default PostedJobCard;