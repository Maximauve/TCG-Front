'use client';

import Image from 'next/image';
import { ProfilePictureProps } from '@/src/app/profile/types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function ProfilePicture({ profilePicture, isEditing, onPictureChange }: ProfilePictureProps) {
  const { t } = useTranslation();

  const generateRandomAvatar = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const newAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomCode}`;
    onPictureChange(newAvatarUrl);
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 mb-8">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        <img
          src={profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'}
          alt={t('profile.fields.profilePicture')}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      {isEditing && (
        <div className="w-full sm:flex-grow flex justify-center sm:justify-start">
          <button
            type="button"
            onClick={generateRandomAvatar}
            className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            {t('profile.generateAvatar')}
          </button>
        </div>
      )}
    </div>
  );
} 