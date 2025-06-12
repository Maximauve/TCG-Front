'use client';

import { ProfileFormProps } from '@/src/app/profile/types';
import { useTranslation } from 'react-i18next';

export default function ProfileForm({ profileData, setProfileData, isEditing }: ProfileFormProps) {
  const { t } = useTranslation();
  const inputClasses = "mt-1 block w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200";
  const enabledInputClasses = `${inputClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900`;
  const disabledInputClasses = `${inputClasses} border-gray-200 bg-gray-50 text-gray-600`;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">{t('profile.fields.firstName')}</label>
          <input
            id="firstName"
            data-testid="firstName-input"
            type="text"
            value={profileData.firstName}
            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
            disabled={!isEditing}
            className={isEditing ? enabledInputClasses : disabledInputClasses}
            style={{ WebkitTextFillColor: isEditing ? '#111827' : '#4B5563' }}
            aria-label="First Name"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">{t('profile.fields.lastName')}</label>
          <input
            id="lastName"
            data-testid="lastName-input"
            type="text"
            value={profileData.lastName}
            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
            disabled={!isEditing}
            className={isEditing ? enabledInputClasses : disabledInputClasses}
            style={{ WebkitTextFillColor: isEditing ? '#111827' : '#4B5563' }}
            aria-label="Last Name"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">{t('profile.fields.username')}</label>
          <input
            id="username"
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
            disabled={!isEditing}
            className={isEditing ? enabledInputClasses : disabledInputClasses}
            style={{ WebkitTextFillColor: isEditing ? '#111827' : '#4B5563' }}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">{t('profile.fields.email')}</label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            disabled={!isEditing}
            className={isEditing ? enabledInputClasses : disabledInputClasses}
            style={{ WebkitTextFillColor: isEditing ? '#111827' : '#4B5563' }}
            aria-label="Email"
          />
        </div>

        {isEditing && (
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">{t('profile.fields.password')}</label>
            <input
              id="password"
              type="password"
              value={profileData.password}
              onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
              className={enabledInputClasses}
              style={{ WebkitTextFillColor: '#111827' }}
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">{t('profile.fields.description')}</label>
        <textarea
          id="description"
          data-testid="description-input"
          value={profileData.description}
          onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
          disabled={!isEditing}
          rows={6}
          className={isEditing ? enabledInputClasses : disabledInputClasses}
          style={{ WebkitTextFillColor: isEditing ? '#111827' : '#4B5563', resize: "none" }}
          aria-label="Description"
        />
      </div>
    </>
  );
} 