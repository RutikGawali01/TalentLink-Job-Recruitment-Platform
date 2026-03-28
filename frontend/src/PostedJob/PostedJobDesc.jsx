import { Badge, Tabs } from "@mantine/core";
import JobDescr from "../JobDesc/JobDescr";
import TalentCards from "../FindTalent/TalentCards";
import { useState, useEffect } from "react";

const PostedJobDesc = (props) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState([]);

  const handleTabChange = (value) => {
    setTab(value);

    if (!props.applicants) return;

    if (value === "overview") {
      setArr(props.applicants);
    } else if (value === "applicants") {
      setArr(props.applicants.filter((x) => x.applicationStatus === "APPLIED"));
    } else if (value === "invited") {
      setArr(props.applicants.filter((x) => x.applicationStatus === "INTERVIEWING"));
    } else if (value === "offered") {
      setArr(props.applicants.filter((x) => x.applicationStatus === "OFFERED"));
    } else if (value === "rejected") {
      setArr(props.applicants.filter((x) => x.applicationStatus === "REJECTED"));
    }
  };

  useEffect(() => {
    if (props.applicants) {
      handleTabChange("overview");
    }
  }, [props.applicants]);

  const statusStyles = {
    ACTIVE: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    CLOSED: "bg-red-50 text-red-500 border border-red-200",
    DRAFT:  "bg-amber-50 text-amber-600 border border-amber-200",
  };

  const tabList = [
    { value: "overview",   label: "Overview" },
    { value: "applicants", label: "Applicants" },
    { value: "invited",    label: "Invited" },
    { value: "offered",    label: "Offered" },
    { value: "rejected",   label: "Rejected" },
  ];

  return (
    <div className="p-5 sm:p-7 w-full">
      {props.jobTitle ? (
        <>
          {/* ── Header ── */}
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              {props.jobTitle}
            </h2>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[props.jobStatus] ?? statusStyles.DRAFT}`}>
              {props.jobStatus}
            </span>
          </div>

          <p className="text-sm text-slate-400 font-medium mb-6">{props.location}</p>

          {/* ── Tabs ── */}
          <div className="mt-2">
            {/* Custom tab bar */}
            <div className="flex gap-1 flex-wrap border-b border-blue-100 mb-6">
              {tabList.map((t) => (
                <button
                  key={t.value}
                  onClick={() => handleTabChange(t.value)}
                  className={`
                    px-4 py-2.5 text-sm font-semibold border-b-2 transition-all duration-200
                    ${tab === t.value
                      ? "border-[var(--blue-600)] text-[var(--blue-600)]"
                      : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
                    }
                  `}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Panels — rendered conditionally to keep Mantine logic-free */}
            {tab === "overview" && (
              <div className="w-full">
                <JobDescr edit={true} {...props} closed={props.jobStatus === "CLOSED"} />
              </div>
            )}

            {tab === "applicants" && (
              <TalentGrid arr={arr} extraProp={{ posted: true }} emptyMsg="No Applicants" />
            )}

            {tab === "invited" && (
              <TalentGrid arr={arr} extraProp={{ invited: true }} emptyMsg="No Invited Candidates" />
            )}

            {tab === "offered" && (
              <TalentGrid arr={arr} extraProp={{ offered: true }} emptyMsg="No Offered Candidates" />
            )}

            {tab === "rejected" && (
              <TalentGrid arr={arr} extraProp={{ rejected: true }} emptyMsg="No Rejected Candidates" />
            )}
          </div>
        </>
      ) : (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-3 px-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--blue-100)] flex items-center justify-center text-3xl">
            📋
          </div>
          <div className="text-lg font-semibold text-slate-600">No Job Selected</div>
          <div className="text-sm text-slate-400">Select a listing from the sidebar to view details.</div>
        </div>
      )}
    </div>
  );
};

/* ── Helper: reusable talent grid ── */
const TalentGrid = ({ arr, extraProp, emptyMsg }) => (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
    {arr?.length ? (
      arr.map(
        (talent, index) =>
          index < 6 && <TalentCards key={index} {...talent} {...extraProp} />,
      )
    ) : (
      <div className="col-span-full flex flex-col items-center justify-center py-14 gap-3">
        <div className="w-12 h-12 rounded-xl bg-[var(--blue-100)] flex items-center justify-center text-2xl">
          🔍
        </div>
        <div className="text-base font-semibold text-slate-400">{emptyMsg}</div>
      </div>
    )}
  </div>
);

export default PostedJobDesc;