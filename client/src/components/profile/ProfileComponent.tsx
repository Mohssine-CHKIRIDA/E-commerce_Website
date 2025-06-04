import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import { Profile } from "./types";

interface ProfileComponentProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  profile,
  setProfile,
}) => {
  const [editingProfile, setEditingProfile] = useState<boolean>(false);

  const handleProfileSave = (): void => {
    setEditingProfile(false);
    // Save logic would go here
  };

  const handleInputChange = (field: keyof Profile, value: string): void => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Profile Information
        </h2>
        <button
          onClick={() => setEditingProfile(!editingProfile)}
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
            value={profile.name}
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
            value={profile.email}
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
            value={profile.phone}
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
            value={profile.birthdate}
            onChange={(e) => handleInputChange("birthdate", e.target.value)}
            disabled={!editingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>
      </div>

      {editingProfile && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleProfileSave}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingProfile(false)}
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
