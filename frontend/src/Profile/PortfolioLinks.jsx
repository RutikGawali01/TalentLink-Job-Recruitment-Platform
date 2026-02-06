import { useState } from "react";
import {
  ActionIcon,
  TextInput,
} from "@mantine/core";
import {
  IconPencil,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { PortfolioLinksView } from "./PortfolioLinksView";

const PortfolioLinks = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    website: "",
    linkedin: "",
    github: "",
    other: "",
  });

  /* ---------------- EDIT ---------------- */
  const handleEdit = () => {
    setForm({
      website: profile.portfolio?.website || "",
      linkedin: profile.portfolio?.linkedin || "",
      github: profile.portfolio?.github || "",
      other: profile.portfolio?.other || "",
    });
    setEdit(true);
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    try {
      await dispatch(
        changeProfile({
          ...profile,
          portfolio: {
            website: form.website || null,
            linkedin: form.linkedin || null,
            github: form.github || null,
            other: form.other || null,
          },
        })
      );

      setEdit(false);
      successNotification("Success", "Portfolio links updated");
    } catch (err) {
        console.log(err);
      errorNotification("Error", "Failed to update portfolio links");
    }
  };

  /* ---------------- CANCEL ---------------- */
  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-default">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          Portfolio & Links
        </h2>

        {!edit ? (
          <ActionIcon variant="subtle" color="brand" onClick={handleEdit}>
            <IconPencil size={20} />
          </ActionIcon>
        ) : (
          <div className="flex gap-2">
            <ActionIcon variant="subtle" color="green.8" onClick={handleSave}>
              <IconCheck size={20} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red.8" onClick={handleCancel}>
              <IconX size={20} />
            </ActionIcon>
          </div>
        )}
      </div>

      {/* ===== Edit Mode ===== */}
      {edit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Website"
            placeholder="https://yourwebsite.com"
            value={form.website}
            onChange={(e) =>
              setForm({ ...form, website: e.target.value })
            }
          />
          <TextInput
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            value={form.linkedin}
            onChange={(e) =>
              setForm({ ...form, linkedin: e.target.value })
            }
          />
          <TextInput
            label="GitHub"
            placeholder="https://github.com/username"
            value={form.github}
            onChange={(e) =>
              setForm({ ...form, github: e.target.value })
            }
          />
          <TextInput
            label="Other"
            placeholder="Any other link"
            value={form.other}
            onChange={(e) =>
              setForm({ ...form, other: e.target.value })
            }
          />
        </div>
      ) : (
        <PortfolioLinksView portfolio={profile.portfolio} />
      )}
    </div>
  );
};

export default PortfolioLinks;
