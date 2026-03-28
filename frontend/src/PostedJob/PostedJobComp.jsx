import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useState, useEffect } from "react";

const PostedJobComp = (props) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);

  const tabs = [
    { value: "ACTIVE", label: "Active" },
    { value: "DRAFT",  label: "Drafts" },
    { value: "CLOSED", label: "Closed" },
  ];

  return (
    <div className="p-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-blue-50">
        <div className="h-5 w-1 rounded-full bg-[var(--blue-600)]" />
        <span className="text-lg font-bold text-slate-700">My Listings</span>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 flex-wrap mb-5">
        {tabs.map((t) => {
          const count = props.jobList?.filter((j) => j.jobStatus === t.value).length ?? 0;
          const isActive = activeTab === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                transition-all duration-200 border
                ${isActive
                  ? "bg-[var(--blue-600)] text-white border-[var(--blue-600)] shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[var(--blue-300)] hover:text-[var(--blue-600)]"
                }
              `}
            >
              {t.label}
              <span
                className={`
                  inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold
                  ${isActive ? "bg-white/25 text-white" : "bg-[var(--blue-100)] text-[var(--blue-600)]"}
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-3">
        {props.jobList
          ?.filter((job) => job.jobStatus === activeTab)
          .map((item) => (
            <PostedJobCard key={item.id} {...item} />
          ))}

        {props.jobList?.filter((j) => j.jobStatus === activeTab).length === 0 && (
          <div className="text-center py-10">
            <div className="text-3xl mb-2">📭</div>
            <div className="text-slate-400 text-sm font-medium">
              No {activeTab.toLowerCase()} jobs
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostedJobComp;