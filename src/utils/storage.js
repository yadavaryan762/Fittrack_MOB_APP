import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Keys used across FitTrack
 */
export const STORAGE_KEYS = {
  GOALS: '@fittrack_goals',
  ACTIVITY: '@fittrack_activity',
  WORKOUTS: '@fittrack_workouts',
  PROFILE: '@fittrack_profile',
};

/**
 * Save data to AsyncStorage
 * Converts JavaScript objects/arrays into JSON strings safely.
 */
export const saveItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to AsyncStorage:`, error);
    return false;
  }
};

/**
 * Load data from AsyncStorage
 * Parses JSON strings back into JavaScript objects/arrays.
 */
export const getItem = async (key, defaultValue = null) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from AsyncStorage:`, error);
    return defaultValue;
  }
};

/**
 * Remove a specific key from AsyncStorage
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from AsyncStorage:`, error);
    return false;
  }
};

/**
 * Clear all FitTrack application data
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.GOALS,
      STORAGE_KEYS.ACTIVITY,
      STORAGE_KEYS.WORKOUTS,
      STORAGE_KEYS.PROFILE,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing FitTrack AsyncStorage data:', error);
    return false;
  }
};
