import { useState } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { PortfolioLinksView } from "./PortfolioLinksView";


const PortfolioLinks = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ website: "", linkedin: "", github: "", other: "" });

  const handleEdit = () => {
    setForm({
      website: profile.portfolio?.website || "",
      linkedin: profile.portfolio?.linkedin || "",
      github: profile.portfolio?.github || "",
      other: profile.portfolio?.other || "",
    });
    setEdit(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(changeProfile({
        ...profile,
        portfolio: {
          website: form.website || null,
          linkedin: form.linkedin || null,
          github: form.github || null,
          other: form.other || null,
        },
      }));
      setEdit(false);
      successNotification("Success", "Portfolio links updated");
    } catch (err) {
      errorNotification("Error", "Failed to update portfolio links");
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  const inputStyles = {
    input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#fff", fontSize: "14px" },
    label: { fontWeight: 600, color: "#1e3a5f", fontSize: "13px", marginBottom: "4px" },
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-5 sm:p-7 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Portfolio & Links</h2>
        </div>
        {!edit ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all duration-200"
          >
            <IconPencil size={13} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-all duration-200"
            >
              <IconCheck size={13} /> Save
            </button>
            <button
              onClick={() => setEdit(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all duration-200"
            >
              <IconX size={13} /> Cancel
            </button>
          </div>
        )}
      </div>

      {edit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <TextInput
            label="Website"
            placeholder="https://yourwebsite.com"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            styles={inputStyles}
          />
          <TextInput
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            styles={inputStyles}
          />
          <TextInput
            label="GitHub"
            placeholder="https://github.com/username"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            styles={inputStyles}
          />
          <TextInput
            label="Other"
            placeholder="Any other link"
            value={form.other}
            onChange={(e) => setForm({ ...form, other: e.target.value })}
            styles={inputStyles}
          />
        </div>
      ) : (
        <PortfolioLinksView portfolio={profile.portfolio} />
      )}
    </div>
  );
};

export default PortfolioLinks;
