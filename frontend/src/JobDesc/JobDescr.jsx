import {
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import { Button, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
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

const JobDescr = (props) => {
  const [applied, setApplied] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const user = useSelector((state) => state.user);

  const handleSaveJob = async () => {
    if (!profile || !profile.id) return;

    const jobId = Number(props.id);
    let savedJobs = profile.savedJobs || [];

    if (savedJobs.includes(jobId)) {
      savedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      savedJobs = [...savedJobs, jobId];
    }

    const updatedProfile = { ...profile, savedJobs };

    try {
      await dispatch(changeProfile(updatedProfile)).unwrap();
    } catch (error) {
      console.log("Update failed 👉", error);
    }
  };

  useEffect(() => {
    if (!props.applicants || !user?.id) { setApplied(false); return; }
    const isApplied = props.applicants.some(
      (applicant) => Number(applicant.applicantId) === Number(user.id),
    );
    setApplied(isApplied);
  }, [props.applicants, user?.id]);

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then(() => successNotification("Success", "Job Closed Successfully"))
      .catch((err) => errorNotification("Error", err.response?.data?.errorMessage));
  };

  const cleanHTML = DOMPurify.sanitize(props.description);

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

        {/* Left */}
        <div className="flex gap-4 items-start">
          <div className="p-3 rounded-xl bg-[var(--blue-100)] shrink-0">
            <img className="h-12 sm:h-14 object-contain" src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div className="min-w-0">
            <div className="font-bold text-lg sm:text-xl text-slate-800 break-words">
              {props.jobTitle}
            </div>
            <div className="text-sm text-slate-400 mt-1 flex flex-wrap gap-1">
              <span className="text-[var(--blue-600)] font-semibold">{props.company}</span>
              <span className="text-slate-300">•</span>
              <span>{timeAgo(props.postTime)}</span>
              <span className="text-slate-300">•</span>
              <span>{props.applicants ? props.applicants.length : 0} Applicants</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap gap-2 items-center">
          {!props.edit && !applied && (
            <Link to={`/apply-job/${props.id}`}>
              <Button color="brand" size="sm" variant="light">
                Apply
              </Button>
            </Link>
          )}

          {!props.edit && applied && (
            <Button color="green.8" size="sm" variant="light">
              ✓ Applied
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
                <Button onClick={handleClose} color="red.8" size="sm" variant="outline">
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
                className="text-slate-400 cursor-pointer hover:text-[var(--blue-600)] transition-colors"
              />
            ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* ── Job Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        {card.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--blue-50,#f0f6ff)] border border-blue-100 hover:border-[var(--blue-300)] hover:shadow-sm transition-all"
          >
            <ActionIcon
              color="brand"
              className="!h-11 !w-11"
              variant="light"
              radius="xl"
            >
              <item.icon style={{ width: "60%", height: "60%" }} stroke={1.5} />
            </ActionIcon>
            <div className="text-xs text-slate-400">{item.name}</div>
            <div className="font-bold text-sm text-slate-700">
              {props ? props[item.id] : "NA"}{item.id === "packageOffered" && " LPA"}
            </div>
          </div>
        ))}
      </div>

      <Divider size="xs" my="xl" />

      {/* ── Skills ── */}
      <div>
        <div className="text-xs font-bold text-[var(--blue-600)] uppercase tracking-widest mb-4">
          Required Skills
        </div>
        <div className="flex gap-2 flex-wrap">
          {props?.skillsRequired?.map((skill, index) => (
            <span
              key={index}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--blue-100)] text-[var(--blue-600)] border border-blue-200 hover:bg-[var(--blue-200)] transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Divider size="xs" my="xl" />

      {/* ── Description ── */}
      <div
        className="
          [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-[var(--blue-600)]
          [&_h4]:uppercase [&_h4]:tracking-wide [&_h4]:my-4
          [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:text-justify
          [&_li]:text-sm [&_li]:text-slate-600 [&_li]:mb-1.5
          [&_li]:marker:text-[var(--blue-600)]
        "
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />

      <Divider size="xs" my="xl" />

      {/* ── About Company ── */}
      <div>
        <div className="text-xs font-bold text-[var(--blue-600)] uppercase tracking-widest mb-5">
          About Company
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
          <div className="flex gap-3 items-center">
            <div className="p-3 rounded-xl bg-[var(--blue-100)]">
              <img className="h-8 object-contain" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div>
              <div className="font-bold text-slate-700">{props.company}</div>
              <div className="text-slate-400 text-xs">10k+ employees</div>
            </div>
          </div>

          <Link to={`/company/${props.company}`}>
            <Button color="brand" variant="light" size="sm">
              Company Page
            </Button>
          </Link>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
      </div>
    </div>
  );
};

export default JobDescr;