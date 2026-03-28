import { useState, useRef, useEffect } from "react";
import { IconHeart, IconMapPin, IconCalendarMonth } from "@tabler/icons-react";
import { IconCalendar } from "@tabler/icons-react";
import { Text, Modal, Divider, Avatar, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../Services/ProfileService";
import { changeAppliStatus } from "../Services/JobService";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCards = (props) => {
  const profileId = props.profileId ?? props.id;

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [opened, { open, close }] = useDisclosure(false);
  const ref = useRef(null);
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);

  useEffect(() => {
    if (props.applicantId) {
      getProfile(profileId)
        .then((res) => setProfile(res))
        .catch((err) => console.log(err));
    } else {
      setProfile(props);
    }
  }, [props]);

  const openBase64PDF = (base64) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const handleOffer = (status) => {
    let interview = {
      jobId: Number(id),
      applicantId: props.applicantId,
      applicationStatus: status,
    };

    if (status === "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      const interviewDate = new Date(date);
      interviewDate.setHours(hours, minutes, 0, 0);
      interview = { ...interview, interviewTime: interviewDate };
    }

    changeAppliStatus(interview)
      .then(() => {
        if (status === "INTERVIEWING") {
          if (!date || !time) { errorNotification("Error", "Please select date and time"); return; }
          successNotification("Interview Scheduled", "Interview Scheduled Successfully");
        } else if (status === "OFFERED") {
          successNotification("Offered", "Offer had been Sent Successfully");
        } else {
          successNotification("Rejected", "Applicant had been Rejected");
        }
        window.location.reload();
      })
      .catch((err) => errorNotification("Error", err.response.data.errorMessage));
  };

  return (
    <div
      className="
        bg-white flex flex-col gap-3 rounded-2xl p-4
        w-96 max-[900px]:w-[48%] max-[767px]:w-full
        transition-all duration-200 cursor-pointer
      "
      style={{
        border: "1.5px solid #bfdbfe",
        boxShadow:
          "0 0 0 4px rgba(191, 219, 254, 0.25), 0 4px 16px rgba(147, 197, 253, 0.18), 0 1.5px 6px rgba(96, 165, 250, 0.10)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#93c5fd";
        e.currentTarget.style.boxShadow =
          "0 0 0 5px rgba(147, 197, 253, 0.30), 0 6px 24px rgba(96, 165, 250, 0.22), 0 2px 8px rgba(59, 130, 246, 0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#bfdbfe";
        e.currentTarget.style.boxShadow =
          "0 0 0 4px rgba(191, 219, 254, 0.25), 0 4px 16px rgba(147, 197, 253, 0.18), 0 1.5px 6px rgba(96, 165, 250, 0.10)";
      }}
    >
      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="p-0.5 rounded-full bg-[var(--blue-100)]">
            <Avatar
              size="lg"
              src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/avatar.png"}
              alt=""
            />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm">{props.name}</div>
            <div className="text-xs font-medium text-[var(--blue-600)] mt-0.5">{profile?.headline}</div>
          </div>
        </div>

        <IconHeart
          className="text-[var(--blue-300)] cursor-pointer hover:text-[var(--blue-500)] transition-colors"
          size={18}
        />
      </div>

      {/* ── Skills ── */}
      <div className="flex flex-wrap gap-1.5">
        {profile?.skills?.map(
          (skill, index) =>
            index < 4 && (
              <span
                key={index}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--blue-100)] text-[var(--blue-600)] border border-blue-200"
              >
                {skill}
              </span>
            ),
        )}
      </div>

      {/* ── About ── */}
      <Text className="!text-xs text-justify !text-slate-400 !leading-relaxed" lineClamp={3}>
        {profile?.about}
      </Text>

      <Divider size="xs" color="blue.1" />

      {/* ── Interview info / Experience ── */}
      {props.invited ? (
        <div className="flex gap-1.5 text-slate-500 text-xs items-center">
          <IconCalendarMonth size={14} className="text-[var(--blue-600)]" stroke={1.5} />
          <span>Interview: <span className="font-semibold text-[var(--blue-600)]">{formatInterviewTime(props.interviewTime)}</span></span>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="text-xs font-semibold text-slate-500">
            Exp: <span className="text-[var(--blue-600)]">{props.totalExp ?? 0} yrs</span>
          </div>
          <div className="flex gap-1 text-xs items-center text-slate-400">
            <IconMapPin stroke={1.5} size={13} className="text-[var(--blue-500)]" />
            {profile.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="blue.1" />

      {/* ── Actions ── */}
      <div className="flex gap-2 [&>*]:flex-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profileId}`}>
              <Button color="brand" fullWidth size="xs" variant="outline">
                Profile
              </Button>
            </Link>

            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth size={13} />}
                  color="brand"
                  fullWidth
                  size="xs"
                  variant="light"
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brand" fullWidth size="xs" variant="light">
                  Message
                </Button>
              )}
            </div>
          </>
        )}

        {props.invited && (
          <>
            <Button onClick={() => handleOffer("OFFERED")} color="green.7" fullWidth size="xs" variant="light">
              Accept
            </Button>
            <Button onClick={() => handleOffer("REJECTED")} color="red.6" fullWidth size="xs" variant="light">
              Reject
            </Button>
          </>
        )}
      </div>

      {(props.invited || props.posted) && (
        <Button onClick={openApp} color="brand" fullWidth size="xs" autoContrast variant="filled">
          View Application
        </Button>
      )}

      {/* ── Schedule Interview Modal ── */}
      <Modal
  opened={opened}
  onClose={close}
  title="Schedule Interview"
  centered
  radius="lg"
  styles={{
    header: {
      background: "linear-gradient(135deg, #ebf5ff, #dbeafe)",
      borderBottom: "1px solid #bdd7f8",
      padding: "1.1rem 1.4rem 1rem",
    },
    title: {
      fontFamily: "poppins",
      fontWeight: 700,
      fontSize: "1rem",
      color: "#0f2a50",
      letterSpacing: "0.01em",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    close: {
      color: "#2563eb",
      borderRadius: "8px",
      "&:hover": { background: "#dbeafe" },
    },
    content: {
      background: "#f5f9ff",
      border: "1px solid #cde4ff",
      boxShadow: "0 8px 32px rgba(30,111,204,0.12)",
    },
    body: {
      padding: "1.3rem 1.4rem 1.4rem",
    },
  }}
>
  <div className="flex flex-col gap-4">

    {/* Calendar icon in title area */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0.75rem 1rem",
      background: "#ffffff",
      border: "1px solid #daeaff",
      borderRadius: "12px",
      marginBottom: "0.2rem",
    }}>
      <div style={{
        background: "#dbeafe",
        borderRadius: "8px",
        padding: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <IconCalendar size={16} color="#2563eb" />
      </div>
      <span style={{ fontSize: "0.78rem", color: "#4a6b8a", fontWeight: 500 }}>
        Pick a date and time to schedule the interview
      </span>
    </div>

    <DateInput
      minDate={new Date()}
      value={date}
      onChange={setDate}
      label="Date"
      placeholder="Pick a date"
      styles={{
        label: {
          fontFamily: "poppins",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#1e6fcc",
          marginBottom: "5px",
        },
        input: {
          fontFamily: "poppins",
          background: "#ffffff",
          border: "1.5px solid #bdd7f8",
          borderRadius: "10px",
          color: "#0f2a50",
          fontSize: "0.88rem",
          "&:focus": {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59,130,246,0.12)",
          },
          "&::placeholder": { color: "#93c5fd" },
        },
      }}
    />

    <TimeInput
      value={time}
      onChange={(event) => setTime(event.currentTarget.value)}
      label="Time"
      ref={ref}
      onClick={() => ref.current?.showPicker()}
      styles={{
        label: {
          fontFamily: "poppins",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#1e6fcc",
          marginBottom: "5px",
        },
        input: {
          fontFamily: "poppins",
          background: "#ffffff",
          border: "1.5px solid #bdd7f8",
          borderRadius: "10px",
          color: "#0f2a50",
          fontSize: "0.88rem",
          "&:focus": {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59,130,246,0.12)",
          },
        },
      }}
    />

    <Button
      onClick={() => handleOffer("INTERVIEWING")}
      fullWidth
      style={{
        background: "linear-gradient(135deg, #3b82f6, #1d6fd6)",
        border: "none",
        borderRadius: "10px",
        fontFamily: "poppins",
        fontWeight: 600,
        fontSize: "0.88rem",
        color: "#ffffff",
        height: "42px",
        boxShadow: "0 3px 12px rgba(59,130,246,0.28)",
        transition: "box-shadow 0.2s, transform 0.15s",
        marginTop: "0.2rem",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 5px 18px rgba(59,130,246,0.38)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 3px 12px rgba(59,130,246,0.28)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      Confirm Schedule
    </Button>

  </div>
</Modal>

      {/* ── Application Modal ── */}
      <Modal opened={app} onClose={closeApp} title="Application Details" centered radius="lg">
        <div className="flex flex-col gap-3 text-sm">
          {/* Email */}
          <div className="flex flex-col gap-0.5 p-3 rounded-xl bg-[var(--blue-50,#f0f6ff)] border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</span>
            <a href={`mailto:${props.email}`} className="text-[var(--blue-600)] hover:underline font-medium text-sm">
              {props.email}
            </a>
          </div>

          {/* Website */}
          <div className="flex flex-col gap-0.5 p-3 rounded-xl bg-[var(--blue-50,#f0f6ff)] border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Website</span>
            <a target="_blank" href={props.website} className="text-[var(--blue-600)] hover:underline font-medium text-sm">
              {props.website}
            </a>
          </div>

          {/* Resume */}
          <div className="flex flex-col gap-0.5 p-3 rounded-xl bg-[var(--blue-50,#f0f6ff)] border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Resume</span>
            {props.resume ? (
              <span
                onClick={() => openBase64PDF(props.resume)}
                className="text-[var(--blue-600)] hover:underline cursor-pointer font-medium text-sm"
              >
                {props.resumeName || "View Resume"}
              </span>
            ) : (
              <span className="text-slate-400 text-sm">No Resume Uploaded</span>
            )}
          </div>

          {/* Cover Letter */}
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--blue-50,#f0f6ff)] border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cover Letter</span>
            <div className="text-slate-600 text-sm leading-relaxed">{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCards;