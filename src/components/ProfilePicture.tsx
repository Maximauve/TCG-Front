import Image from 'next/image';
import { ProfilePictureProps } from '@/src/app/profile/types';

export default function ProfilePicture({ profilePicture, isEditing, onPictureChange }: ProfilePictureProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        <img
          src={profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'}
          alt="Profile"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      {isEditing && (
        <div className="w-full sm:flex-grow">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onPictureChange(file);
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}
    </div>
  );
} 