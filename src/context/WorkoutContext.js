import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { STORAGE_KEYS, getItem, saveItem } from '../utils/storage';

const WorkoutContext = createContext();

// Initial sample workouts for realistic first-run experience
export const INITIAL_WORKOUTS = [
  {
    id: 'w-1',
    name: 'Morning Park Run',
    category: 'Running',
    duration: 35,
    calories: 380,
    date: '2026-11-27',
    notes: 'Ran 4.2 km at a steady pace. Felt energized!',
  },
  {
    id: 'w-2',
    name: 'Upper Body Strength',
    category: 'Gym',
    duration: 45,
    calories: 290,
    date: '2026-11-26',
    notes: 'Chest and triceps routine. 4 sets of bench press.',
  },
  {
    id: 'w-3',
    name: 'Evening Cycling',
    category: 'Cycling',
    duration: 30,
    calories: 240,
    date: '2026-11-25',
    notes: 'Moderate pace around the neighborhood.',
  },
  {
    id: 'w-4',
    name: 'Morning Vinyasa Flow',
    category: 'Yoga',
    duration: 25,
    calories: 110,
    date: '2026-11-24',
    notes: 'Focused on flexibility and breathing.',
  },
];

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);
  const isLoadedRef = useRef(false);

  // Load workouts from AsyncStorage on mount
  useEffect(() => {
    async function loadWorkouts() {
      const stored = await getItem(STORAGE_KEYS.WORKOUTS, null);
      if (stored && Array.isArray(stored)) {
        setWorkouts(stored);
      }
      isLoadedRef.current = true;
    }

    loadWorkouts();
  }, []);

  // Save workouts to AsyncStorage when workouts state changes (after initial load)
  useEffect(() => {
    if (isLoadedRef.current) {
      saveItem(STORAGE_KEYS.WORKOUTS, workouts);
    }
  }, [workouts]);

  // Add a new workout
  const addWorkout = (workoutData) => {
    const newWorkout = {
      id: `w-${Date.now()}`,
      name: workoutData.name.trim(),
      category: workoutData.category || 'Other',
      duration: parseInt(workoutData.duration, 10) || 0,
      calories: parseInt(workoutData.calories, 10) || 0,
      date: workoutData.date || new Date().toISOString().split('T')[0],
      notes: (workoutData.notes || '').trim(),
    };

    setWorkouts((prev) => [newWorkout, ...prev]);
    return newWorkout;
  };

  // Update an existing workout
  const updateWorkout = (id, updatedData) => {
    setWorkouts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: updatedData.name ? updatedData.name.trim() : item.name,
            category: updatedData.category || item.category,
            duration: parseInt(updatedData.duration, 10) || item.duration,
            calories: parseInt(updatedData.calories, 10) || item.calories,
            date: updatedData.date || item.date,
            notes: updatedData.notes !== undefined ? updatedData.notes.trim() : item.notes,
          };
        }
        return item;
      })
    );
  };

  // Delete a workout
  const deleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to initial workouts
  const resetWorkouts = () => {
    setWorkouts(INITIAL_WORKOUTS);
  };

  // Summary statistics
  const totalWorkoutCount = workouts.length;
  const totalWorkoutDuration = workouts.reduce((sum, item) => sum + (item.duration || 0), 0);
  const totalWorkoutCalories = workouts.reduce((sum, item) => sum + (item.calories || 0), 0);

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        resetWorkouts,
        totalWorkoutCount,
        totalWorkoutDuration,
        totalWorkoutCalories,
        setWorkouts,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
}
