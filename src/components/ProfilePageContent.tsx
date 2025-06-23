"use client";

import { useState, useEffect } from 'react';
import { useGetCurrentUserQuery, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/src/services/user.service';
import ProfileHeader from '@/src/components/ProfileHeader';
import ProfileForm from '@/src/components/ProfileForm';
import ProfilePicture from '@/src/components/ProfilePicture';
import ThirdPartyConnections from '@/src/components/ThirdPartyConnections';
import { ProfileData } from '../app/profile/types';
import { useTranslation } from 'react-i18next';
import { getInitialData } from '@/src/core/utils';
import { showToast } from '@/src/core/toast';
import Loader from '@/src/components/Loader';
import { User } from '@/src/types/model/User';
import { useParams } from 'next/navigation';

interface ProfilePageContentProps {
  userId?: string;
}

export default function ProfilePageContent({ userId }: ProfilePageContentProps) {
  const params = useParams();
  const paramId = userId || params?.id as string | undefined;
  const { data: currentUser, isLoading: isCurrentUserLoading } = useGetCurrentUserQuery();
  const isCurrentUser = !paramId;
  const { data: otherUserData } = useGetUserByIdQuery(paramId!, {
    skip: isCurrentUser,
  });
  const userData = isCurrentUser ? currentUser : otherUserData;
  const canEdit = (isCurrentUser || currentUser?.role === 'ADMIN') ?? false;
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [profileData, setProfileData] = useState<ProfileData>(getInitialData(userData as User));
  const { t } = useTranslation();

  useEffect(() => {
    if (userData) {
      setProfileData(getInitialData(userData as User));
    }
  }, [userData]);

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData(getInitialData(userData as User));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    const targetUserId = isCurrentUser ? currentUser?.id : paramId;
    if (targetUserId) {
      try {
        await deleteUser(targetUserId).unwrap()
          .then(() => showToast.success(t("profile.deleteRequest.success")))
          .catch((error) => showToast.error(error.message || t("profile.deleteRequest.error")));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetUserId = isCurrentUser ? currentUser?.id : paramId;
    if (targetUserId) {
      const filteredData = Object.fromEntries(
        Object.entries(profileData).filter(([_, value]) => value !== "")
      );
      await updateUser({ userId: targetUserId, data: filteredData }).unwrap()
        .then(() => {
          showToast.success(t('profile.updateRequest.success'));
          setIsEditing(false);
        })
        .catch((error) => {
          showToast.error(error.message || t('profile.updateRequest.error'));
          setProfileData(getInitialData(userData as User));
        });
    }
  };

  if (isCurrentUserLoading || (!userData && !isCurrentUser)) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <ProfileHeader 
          isEditing={isEditing} 
          onEditToggle={handleEditToggle}
          canEdit={canEdit}
        />
        <form onSubmit={handleSubmit} className="space-y-6" role="form">
          <ProfilePicture 
            profilePicture={profileData.profilePicture}
            isEditing={isEditing}
            onPictureChange={(newAvatarUrl: string) => {
              setProfileData({ ...profileData, profilePicture: newAvatarUrl });
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
              {currentUser?.role === 'ADMIN' && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  data-testid="profile-delete-btn"
                >
                  {t('profile.delete')}
                </button>
              )}
            </div>
          )}
        </form>
        {isCurrentUser && <ThirdPartyConnections />}
      </div>
    </div>
  );
} 