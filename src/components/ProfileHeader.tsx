'use client';

import { ProfileHeaderProps } from "@/src/app/profile/types";
import { useTranslation } from 'react-i18next';

export default function ProfileHeader({ isEditing, onEditToggle, canEdit }: ProfileHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{t('profile.title')}</h1>
      {canEdit && (
        <button
          onClick={onEditToggle}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isEditing ? t('profile.cancel') : t('profile.edit')}
        </button>
      )}
    </div>
  );
} 