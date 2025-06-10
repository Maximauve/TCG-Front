'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProfileHeader from '@/src/components/ProfileHeader';
import ProfileForm from '@/src/components/ProfileForm';
import ProfilePicture from '@/src/components/ProfilePicture';
import { ProfileData } from './types';
import { useTranslation } from 'react-i18next';
import { useDeleteUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from '@/src/services/user.service';
import { useParams } from 'next/navigation';
import { getInitialData } from '@/src/core/utils';
import { showToast } from '@/src/core/toast';

export default function ProfilePage() {
  const { data: session } = useSession();
  const params = useParams();
  const userId = params?.id as string | undefined;
  const isCurrentUser = !userId;
  
  const { data: otherUserData } = useGetUserByIdQuery(userId!, {
    skip: isCurrentUser,
  });

  const userData = isCurrentUser ? session?.user : otherUserData;
  const canEdit = isCurrentUser || session?.user?.role === 'ADMIN';

  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [profileData, setProfileData] = useState<ProfileData>(getInitialData(userData));
  const { t } = useTranslation();

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData(getInitialData(userData));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    const targetUserId = isCurrentUser ? session?.user?.id : userId;
    if (targetUserId) {
      try {
        await deleteUser(targetUserId).unwrap()
          .then(() => showToast.success(t("profile.deleteRequest.success")))
          .catch((_error) => showToast.error(t("profile.deleteRequest.error")));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetUserId = isCurrentUser ? session?.user?.id : userId;
    if (targetUserId) {
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        if (value && key !== 'profilePictureFile') {
          formData.append(key, value);
        }
      });
      if (profileData.profilePictureFile) {
        formData.append('profilePicture', profileData.profilePictureFile);
      }
      await updateUser({ userId: targetUserId, formData }).unwrap()
        .then(() => showToast.success('profile.updateRequest.success'))
        .catch((error) => showToast.error('profile.updateRequest.error'));
    }
    setIsEditing(false);
  };

  if (!userData && !isCurrentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <ProfileHeader 
          isEditing={isEditing} 
          onEditToggle={handleEditToggle}
          canEdit={canEdit}
        />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfilePicture 
            profilePicture={profileData.profilePicture}
            isEditing={isEditing}
            onPictureChange={(file) => {
              setProfileData({ ...profileData, profilePictureFile: file });
            }}
          />

          <ProfileForm 
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
          />

          {isEditing && canEdit && (
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t('profile.save')}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {t('profile.delete')}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
