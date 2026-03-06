import {
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import { Button, useMantineTheme, ActionIcon } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Divider } from "@mantine/core";
import { card } from "../assets/Data/JobDescData";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useState, useEffect } from "react";
import { postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";

// we have used this component in PostedJobs page thats why we have used props
// this props will help to change button text
const JobDescr = (props) => {
  const [applied, setApplied] = useState(false);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const profile = useSelector((state) => state.profile.data);
  const user = useSelector((state) => state.user);

  const handleSaveJob = async () => {
    /* ---------- Ensure profile is loaded ---------- */
    if (!profile || !profile.id) {
      console.log("Profile not ready ❌");
      return;
    }

    /* ---------- Convert job id to Number ---------- */
    const jobId = Number(props.id); // 🔥 FIX TYPE MISMATCH

    let savedJobs = profile.savedJobs || [];

    /* ---------- Toggle Save ---------- */
    if (savedJobs.includes(jobId)) {
      savedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      savedJobs = [...savedJobs, jobId];
    }

    /* ---------- Prepare updated profile ---------- */
    const updatedProfile = {
      ...profile, // must contain id
      savedJobs,
    };

    //console.log("Sending profile 👉", updatedProfile);

    try {
      await dispatch(changeProfile(updatedProfile)).unwrap();
    } catch (error) {
      console.log("Update failed 👉", error);
    }
  };

  useEffect(() => {
    if (!props.applicants || !user?.id) {
      setApplied(false);
      return;
    }

    const isApplied = props.applicants.some(
      (applicant) => Number(applicant.applicantId) === Number(user.id),
    );

    setApplied(isApplied);
  }, [props.applicants, user?.id]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then((res) => {
        console.log(res);
        successNotification("Success", "Job CLosed Successfully");
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response?.data?.errorMessage);
      });
  };

  const cleanHTML = DOMPurify.sanitize(props.description); // protect script attack
  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        {/* LEFT SIDE */}
        <div className="flex gap-4 items-start">
          <div className="p-3 rounded-lg bg-[var(--blue-100)] shrink-0">
            <img
              className="h-12 sm:h-14"
              src={`/Icons/${props.company}.png`}
              alt=""
            />
          </div>

          <div className="min-w-0">
            <div className="font-semibold text-lg sm:text-xl lg:text-2xl break-words">
              {props.jobTitle}
            </div>

            <div className="text-sm text-secondary mt-1 flex flex-wrap gap-1">
              <span>{props.company}</span>
              <span>•</span>
              <span>{timeAgo(props.postTime)}</span>
              <span>•</span>
              <span>
                {props.applicants ? props.applicants.length : 0} Applicants
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex flex-wrap gap-3 items-center md:items-end">
          {!props.edit && !applied && (
            <Link to={`/apply-job/${props.id}`}>
              <Button color="brand" size="sm" variant="light">
                Apply
              </Button>
            </Link>
          )}

          {!props.edit && applied && (
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          )}

          {props.edit && (
            <>
              <Link to={`/post-job/${props.id}`}>
                <Button color="brand" size="sm" variant="light">
                  {props.closed ? "Re-open" : "Edit"}
                </Button>
              </Link>

              {!props.closed && (
                <Button
                  onClick={handleClose}
                  color="red.8"
                  size="sm"
                  variant="outline"
                >
                  Close
                </Button>
              )}
            </>
          )}

          {!props.edit &&
            (profile?.savedJobs?.includes(Number(props.id)) ? (
              <IconBookmarkFilled
                onClick={handleSaveJob}
                className="text-[var(--blue-600)] cursor-pointer"
              />
            ) : (
              <IconBookmark
                onClick={handleSaveJob}
                className="text-secondary cursor-pointer hover:text-[var(--blue-600)]"
              />
            ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* ================= JOB STATS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        {card.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 items-center">
            <ActionIcon
              color="brand"
              className="!h-11 !w-11 sm:!h-12 sm:!w-12"
              variant="light"
              radius="xl"
            >
              <item.icon style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>

            <div className="text-xs sm:text-sm text-secondary">{item.name}</div>

            <div className="font-semibold text-sm sm:text-base">
              {props ? props[item.id] : "NA"}{" "}
              {item.id === "packageOffered" && <>LPA</>}
            </div>
          </div>
        ))}
      </div>

      <Divider size="xs" my="xl" />

      {/* ================= SKILLS ================= */}
      <div>
        <div className="text-base sm:text-lg font-semibold mb-4">
          Required Skills:
        </div>

        <div className="flex gap-2 flex-wrap">
          {props?.skillsRequired?.map((skill, index) => (
            <ActionIcon
              key={index}
              p="xs"
              color="brand"
              className="!h-fit !w-fit !font-medium !text-xs sm:!text-sm"
              variant="light"
              radius="xl"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* ================= DESCRIPTION ================= */}
      <div
        className="
        [&_h4]:text-base sm:[&_h4]:text-lg
        [&_h4]:my-4
        [&_h4]:font-semibold
        [&_h4]:text-secondary
        [&_p]:text-sm sm:[&_p]:text-base
        [&_p]:text-justify
        [&_*]:text-secondary
        [&_li]:marker:text-[var(--blue-600)]
        [&_li]:mb-1
      "
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />

      <Divider size="xs" my="xl" />

      {/* ================= COMPANY SECTION ================= */}
      <div>
        <div className="text-base sm:text-lg font-semibold mb-4">
          About Company:
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
          <div className="flex gap-3 items-center">
            <div className="p-3 rounded-lg bg-[var(--blue-100)]">
              <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
            </div>

            <div>
              <div className="font-medium text-base sm:text-lg">
                {props.company}
              </div>
              <div className="text-secondary text-xs sm:text-sm">
                10k+ employees
              </div>
            </div>
          </div>

          <Link to={`/company/${props.company}`}>
            <Button color="brand" variant="light" size="sm">
              Company Page
            </Button>
          </Link>
        </div>

        <div className="text-secondary text-justify text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </div>
      </div>
    </div>
  );
};

export default JobDescr;
