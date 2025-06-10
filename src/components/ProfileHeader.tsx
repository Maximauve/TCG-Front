import { ProfileHeaderProps } from "@/src/app/profile/types";

export default function ProfileHeader({ isEditing, onEditToggle }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <button
        onClick={onEditToggle}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
    </div>
  );
} 