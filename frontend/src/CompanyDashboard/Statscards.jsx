// StatsCards.jsx
import { IconBriefcase, IconFileText, IconCalendarEvent } from "@tabler/icons-react";

const STATS = [
  {
    label: "Active Jobs",
    count: 24,
    icon: IconBriefcase,
    iconBg: "bg-blue-700",
    cardBg: "bg-gradient-to-br from-blue-50 to-sky-50",
    border: "border-blue-100",
    countColor: "text-blue-800",
    labelColor: "text-blue-500",
    shadow: "hover:shadow-blue-100",
  },
  {
    label: "Total Applications",
    count: 1842,
    icon: IconFileText,
    iconBg: "bg-sky-600",
    cardBg: "bg-gradient-to-br from-sky-50 to-blue-50",
    border: "border-sky-100",
    countColor: "text-sky-800",
    labelColor: "text-sky-500",
    shadow: "hover:shadow-sky-100",
  },
  {
    label: "Interviews Scheduled",
    count: 87,
    icon: IconCalendarEvent,
    iconBg: "bg-cyan-600",
    cardBg: "bg-gradient-to-br from-cyan-50 to-sky-50",
    border: "border-cyan-100",
    countColor: "text-cyan-800",
    labelColor: "text-cyan-500",
    shadow: "hover:shadow-cyan-100",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
      {STATS.map(({ label, count, icon: Icon, iconBg, cardBg, border, countColor, labelColor, shadow }) => (
        <div
          key={label}
          className={`
            ${cardBg} ${border} ${shadow}
            border rounded-2xl p-5
            shadow-sm hover:shadow-lg hover:-translate-y-1
            transition-all duration-200 ease-out
            flex items-center gap-4
          `}
        >
          <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <p className={`${countColor} text-3xl font-extrabold leading-none tracking-tight`}>
              {count.toLocaleString()}
            </p>
            <p className={`${labelColor} text-[11px] font-bold uppercase tracking-wider mt-1.5`}>
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}