import {
  ActionIcon,
  Avatar,
  NumberInput,
  Overlay,
  FileInput,
} from "@mantine/core";
import {
  IconPencil,
  IconCheck,
  IconX,
  IconEdit,
  IconBriefcase,
  IconMapPin,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { useState } from "react";
import SelectInput from "./SelectInput";
import { getBase64 } from "../Services/Utilities";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import fields from "../assets/Data/Profile";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);
  const select = fields;

  const [edit, setEdit] = useState(false);
  const [hovered, setHovered] = useState(false);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      headline: "",
      location: "",
      totalExp: 0,
    },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        headline: profile.headline,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { ...profile, ...form.getValues() };
      await dispatch(changeProfile(updatedProfile)).unwrap();
      setEdit(false);
      successNotification("Success", "Profile updated successfully");
    } catch (err) {
      errorNotification("Error", "Profile update failed");
    }
  };

  const handleFileChange = async (image) => {
    if (!image) return;
    let picture = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    await dispatch(changeProfile(updatedProfile)).unwrap();
    successNotification("Success", "Profile Picture updated successfully");
  };

  const handleBannerChange = async (image) => {
    if (!image) return;
    let banner = await getBase64(image);
    let updatedProfile = { ...profile, banner: banner.split(",")[1] };
    await dispatch(changeProfile(updatedProfile)).unwrap();
    successNotification("Success", "Banner updated successfully");
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
          <p className="text-sm text-slate-400 tracking-wide">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg border border-blue-100 bg-white">

      {/* ── Banner ── */}
      <div className="relative">
        <img
          src={profile.banner ? `data:image/jpeg;base64,${profile.banner}` : "/Profile/banner.jpg"}
          alt="Banner"
          className="w-full h-[140px] sm:h-[190px] md:h-[230px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-blue-900/10 to-transparent pointer-events-none" />

        {/* Edit Banner */}
        <div className="absolute top-3 right-3 z-20">
          <div className="relative">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 text-slate-700 text-xs font-semibold shadow-sm hover:bg-white transition-all duration-200">
              <IconEdit size={13} />
              <span className="hidden sm:inline">Edit Banner</span>
            </button>
            <FileInput
              onChange={handleBannerChange}
              accept="image/png, image/jpeg"
              variant="transparent"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* ── Avatar ── */}
        <div className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 sm:left-7 sm:translate-x-0 z-10">
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 blur-md opacity-30 scale-110" />
            <Avatar
              className="relative border-4 border-white rounded-full ring-2 ring-blue-200 !w-24 !h-24 sm:!w-32 sm:!h-32 md:!w-40 md:!h-40"
              src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/avatar.png"}
            />
            {hovered && (
              <>
                <Overlay className="!rounded-full pointer-events-none" color="#0f172a" backgroundOpacity={0.65} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                  <IconEdit className="text-white !w-7 !h-7 sm:!w-9 sm:!h-9" />
                  <span className="text-white text-[10px] sm:text-xs font-semibold">Change</span>
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer z-30"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-5 sm:px-8 pt-16 sm:pt-20 md:pt-24 pb-7 relative">

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {edit && (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-all duration-200 shadow-sm"
            >
              <IconCheck size={14} /> Save
            </button>
          )}
          <button
            onClick={handleClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-sm ${
              edit
                ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                : "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {edit ? <><IconX size={14} /> Cancel</> : <><IconPencil size={14} /> Edit</>}
          </button>
        </div>

        {/* Name */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight text-center sm:text-left">
          {user?.name}
        </h1>

        {/* View Mode */}
        {!edit && (
          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium w-fit">
              <IconBriefcase size={14} className="shrink-0" />
              <span>{profile.headline || "—"}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm w-fit">
              <IconMapPin size={14} className="shrink-0 text-blue-400" />
              <span>{profile.location || "—"}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm w-fit">
              <span className="font-bold text-[11px] text-blue-400 uppercase tracking-wider">Exp</span>
              <span>{profile.totalExp || 0} yrs</span>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {edit && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
            <SelectInput form={form} name="headline" {...select[0]} />
            <SelectInput form={form} name="location" {...select[1]} />
            <NumberInput
              withAsterisk
              label="Experience (years)"
              placeholder="e.g. 3"
              hideControls
              min={0}
              max={40}
              styles={{
                input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#fff", fontSize: "14px" },
                label: { fontWeight: 600, color: "#1e40af", fontSize: "13px", marginBottom: "4px" },
              }}
              {...form.getInputProps("totalExp")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;