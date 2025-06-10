'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProfileHeader from '@/src/components/ProfileHeader';
import ProfileForm from '@/src/components/ProfileForm';
import ProfilePicture from '@/src/components/ProfilePicture';
import { ProfileData } from './types';

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  description: 'Passionate developer and tech enthusiast',
  email: 'john.doe@example.com',
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    username: mockUser.username,
    description: mockUser.description,
    email: mockUser.email,
    password: '',
    profilePicture: mockUser.image,
  });

  // if (!session) {
  //   return null;
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // call PUT user
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <ProfileHeader 
          isEditing={isEditing} 
          onEditToggle={() => setIsEditing(!isEditing)} 
        />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfilePicture 
            profilePicture={profileData.profilePicture}
            isEditing={isEditing}
            onPictureChange={(file) => {
              // Handle file upload logic here
            }}
          />

          <ProfileForm 
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
          />

          {isEditing && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
