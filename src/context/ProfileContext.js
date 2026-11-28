import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { STORAGE_KEYS, getItem, saveItem } from '../utils/storage';

const ProfileContext = createContext();

export const DEFAULT_PROFILE = {
  name: 'Aryan',
  email: 'aryan@fittrack.app',
  fitnessLevel: 'Intermediate',
  favoriteActivity: 'Running',
  dailyReminder: true,
  unitSystem: 'Metric (km, ml)',
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const isLoadedRef = useRef(false);

  // Load profile from AsyncStorage on mount
  useEffect(() => {
    async function loadProfile() {
      const stored = await getItem(STORAGE_KEYS.PROFILE, null);
      if (stored) {
        setProfile(stored);
      }
      isLoadedRef.current = true;
    }

    loadProfile();
  }, []);

  // Save profile to AsyncStorage when updated
  useEffect(() => {
    if (isLoadedRef.current) {
      saveItem(STORAGE_KEYS.PROFILE, profile);
    }
  }, [profile]);

  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
