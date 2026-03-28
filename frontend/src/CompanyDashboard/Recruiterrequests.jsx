import { useState, useEffect } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";

import {
  getJoinRequests,
  approveRequest,
  rejectRequest,
} from "../Services/CompanyService";

import { getEmployerProfile } from "../Services/EmployerProfileService";

export default function RecruiterRequests() {

  const employerProfile = useSelector((state) => state.employerProfile);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (!employerProfile?.companyId) return;

    const fetchRequests = async () => {
      try {

        const joinRequests = await getJoinRequests(employerProfile.companyId);
// console.log("Join Requests:", joinRequests);

        const recruiterData = await Promise.all(
          joinRequests.map(async (req) => {

            try {

              const profile = await getEmployerProfile(req.employer_id);

              return {
                id: req.id,
                employerId: req.employer_id,
                name: profile.fullName,
                role: profile.role,
                profilePicture: profile.profilePicture,
                initials: profile.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase(),
              };

            } catch {
              return {
                id: req.id,
                employerId: req.employer_id,
                name: "Recruiter",
                role: "Recruiter",
                initials: "RC",
                profilePicture: null,
              };
            }

          })
        );

        setRequests(recruiterData);

      } catch (err) {
        console.error("Error fetching join requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

  }, [employerProfile]);

  // ================= APPROVE =================
  const handleApprove = async (id) => {

    try {

      setActionLoading(id);

      await approveRequest(id);

      setRequests((prev) => prev.filter((x) => x.id !== id));

    } catch (err) {
      console.error("Approve error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // ================= REJECT =================
  const handleReject = async (id) => {

    try {

      setActionLoading(id);

      await rejectRequest(id);

      setRequests((prev) => prev.filter((x) => x.id !== id));

    } catch (err) {
      console.error("Reject error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm shadow-blue-50 p-5 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-blue-900 text-[17px] font-extrabold">
            Recruiter Requests
          </h2>
          <p className="text-slate-400 text-xs">
            Pending join requests from recruiters
          </p>
        </div>

        {requests.length > 0 && (
          <span className="bg-red-50 text-red-500 border border-red-200 text-[11px] font-bold px-3 py-1 rounded-full">
            {requests.length} Pending
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8 text-slate-400 text-sm">
          Loading requests...
        </div>
      )}

      {/* Empty */}
      {!loading && requests.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">✅</div>
          <p className="text-slate-400 text-sm font-semibold">
            No pending requests
          </p>
        </div>
      )}

      {/* Requests */}
      {!loading && requests.length > 0 && (
        <div className="flex flex-col gap-3">

          {requests.map((req) => (
            <div
              key={req.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
              bg-gradient-to-br from-slate-50 to-blue-50/60
              border border-blue-100 rounded-2xl p-4
              hover:shadow-md hover:shadow-blue-100 transition"
            >

              {/* Recruiter Info */}
              <div className="flex items-center gap-3">

                {req.profilePicture ? (
                  <img
                    src={`data:image/png;base64,${req.profilePicture}`}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {req.initials}
                  </div>
                )}

                <div>
                  <p className="text-blue-900 font-bold text-[13.5px]">
                    {req.name}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {req.role}
                  </p>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex gap-2">

                <button
                  onClick={() => handleApprove(req.id)}
                  disabled={actionLoading === req.id}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl
                  bg-emerald-50 text-emerald-700 border border-emerald-200
                  hover:bg-emerald-600 hover:text-white
                  text-xs font-bold transition"
                >
                  <IconCheck size={13} />
                  Approve
                </button>

                <button
                  onClick={() => handleReject(req.id)}
                  disabled={actionLoading === req.id}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl
                  bg-red-50 text-red-500 border border-red-200
                  hover:bg-red-500 hover:text-white
                  text-xs font-bold transition"
                >
                  <IconX size={13} />
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}