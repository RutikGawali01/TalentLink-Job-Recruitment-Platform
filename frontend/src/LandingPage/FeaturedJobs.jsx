import React from "react";

const jobs = [
  { company: "Google", role: "Senior Product Designer", location: "San Francisco, CA", type: "Full-time", salary: "$120k–160k", logo: "🔵", daysAgo: 1, tags: ["Figma","UX Research"], featured: true },
  { company: "Apple", role: "iOS Engineer", location: "Cupertino, CA", type: "Full-time", salary: "$140k–180k", logo: "⚫", daysAgo: 2, tags: ["Swift","SwiftUI"], featured: false },
  { company: "Stripe", role: "Backend Engineer", location: "Remote", type: "Remote", salary: "$130k–160k", logo: "🟣", daysAgo: 1, tags: ["Go","APIs"], featured: false },
  { company: "Figma", role: "Growth Marketer", location: "New York, NY", type: "Hybrid", salary: "$90k–115k", logo: "🟤", daysAgo: 3, tags: ["SEO","Analytics"], featured: false },
  { company: "Notion", role: "Data Scientist", location: "Remote", type: "Remote", salary: "$125k–155k", logo: "⚪", daysAgo: 2, tags: ["Python","ML"], featured: false },
  { company: "Linear", role: "Frontend Engineer", location: "Remote", type: "Remote", salary: "$110k–140k", logo: "🔷", daysAgo: 1, tags: ["React","TypeScript"], featured: false },
];

const MapPinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const FeaturedJobs = () => {

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-10 bg-slate-50">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">

          <div>

            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-4 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
              Featured Listings
            </span>

            <h2 className="serif text-3xl sm:text-4xl text-slate-900"
                style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
              Curated <em className="text-blue-600">opportunities</em>
              <br/> just for you
            </h2>

          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all">
            View all jobs <ArrowRightIcon/>
          </button>

        </div>


        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {jobs.map((job, i) => (

            <div
              key={i}
              className={`rounded-2xl p-7 cursor-pointer transition-all duration-200 hover:-translate-y-1
              ${job.featured
                ? "bg-gradient-to-br from-blue-800 to-blue-600 text-white shadow-xl shadow-blue-200"
                : "bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg"
              }`}
            >

              {/* Company */}
              <div className="flex justify-between items-start mb-4">

                <div className="flex gap-3 items-center">

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl
                    ${job.featured
                      ? "bg-white/15 border border-white/20"
                      : "bg-slate-50 border border-slate-200"
                    }`}
                  >
                    {job.logo}
                  </div>

                  <div>

                    <div className={`font-bold text-sm ${job.featured ? "text-white" : "text-slate-900"}`}>
                      {job.company}
                    </div>

                    <div className={`text-xs flex items-center gap-1 ${job.featured ? "text-blue-200" : "text-slate-400"}`}>
                      <MapPinIcon size={12}/> {job.location}
                    </div>

                  </div>

                </div>

                <span
                  className={`text-xs font-semibold rounded-lg px-2.5 py-1
                  ${job.featured
                    ? "bg-white/15 border border-white/20 text-white"
                    : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  }`}
                >
                  {job.daysAgo === 1 ? "New" : `${job.daysAgo}d ago`}
                </span>

              </div>


              {/* Role */}
              <div className={`font-bold text-lg mb-3 ${job.featured ? "text-white" : "text-slate-900"}`}>
                {job.role}
              </div>


              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">

                {[job.type, ...job.tags].map((tag) => (

                  <span
                    key={tag}
                    className={`text-xs font-medium rounded-lg px-2.5 py-1
                    ${job.featured
                      ? "bg-white/10 border border-white/15 text-white/90"
                      : "bg-slate-50 border border-slate-200 text-slate-500"
                    }`}
                  >
                    {tag}
                  </span>

                ))}

              </div>


              {/* Footer */}
              <div className={`flex justify-between items-center pt-4 mt-1
              ${job.featured ? "border-t border-white/15" : "border-t border-slate-100"}`}>

                <span className={`font-extrabold text-base tracking-tight ${job.featured ? "text-white" : "text-slate-900"}`}>
                  {job.salary}
                </span>

                <button
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all
                  ${job.featured
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Apply
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedJobs;