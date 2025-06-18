import React, { useEffect, useState } from "react";
import { Edit2 } from "lucide-react";
import { Profile } from "../types";

interface ProfileComponentProps {
  profile: Profile;
  setProfile: (profile: Partial<Profile>) => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  profile,
  setProfile,
}) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Profile | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleProfileSave = async () => {
    if (!formData) return;

    setIsSaving(true);
    try {
      setProfile(formData);
      setEditingProfile(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditingProfile(false);
  };
  console.log("formData in render:", formData);

  if (!formData) return <p>Loading profile...</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Profile Information
        </h2>
        <button
          onClick={() =>
            editingProfile ? handleCancel() : setEditingProfile(true)
          }
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit2 size={16} />
          {editingProfile ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name ?? ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={!editingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email ?? ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={!editingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone ?? ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={!editingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Date
          </label>
          <input
            type="date"
            name="birthdate"
            value={
              typeof formData.birthdate === "string"
                ? formData.birthdate.slice(0, 10)
                : ""
            }
            onChange={(e) => handleInputChange("birthdate", e.target.value)}
            disabled={!editingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender ?? ""}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            disabled={!editingProfile}
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      {editingProfile && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleProfileSave}
            disabled={isSaving}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
