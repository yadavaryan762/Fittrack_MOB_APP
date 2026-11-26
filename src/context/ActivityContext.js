import React, { createContext, useContext, useState } from 'react';

// Create the context for managing daily activity and goals across the app
const ActivityContext = createContext();

export const DEFAULT_GOALS = {
  steps: 10000,       // target steps per day
  water: 2500,        // target water in ml (approx 10 glasses)
  calories: 600,      // target active calories in kcal
  duration: 60,       // target exercise duration in minutes
};

export const DEFAULT_ACTIVITY = {
  steps: 6450,
  water: 1750,
  calories: 420,
  duration: 45,
};

export function ActivityProvider({ children }) {
  // Goals state
  const [goals, setGoals] = useState(DEFAULT_GOALS);

  // Daily activity state (steps, water, calories, duration)
  const [activity, setActivity] = useState(DEFAULT_ACTIVITY);

  // Update a specific daily goal
  const updateGoal = (metric, value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      setGoals((prev) => ({
        ...prev,
        [metric]: numericValue,
      }));
      return true;
    }
    return false;
  };

  // Set multiple goals at once (e.g., from settings or goal dialog)
  const updateAllGoals = (newGoals) => {
    setGoals((prev) => ({
      ...prev,
      ...newGoals,
    }));
  };

  // Helper to calculate progress percentage for a metric (clamped 0-100)
  const getGoalProgress = (metric) => {
    const current = activity[metric] || 0;
    const target = goals[metric] || 1;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Helper to check if a specific goal is completed
  const isGoalReached = (metric) => {
    return (activity[metric] || 0) >= (goals[metric] || 0);
  };

  // Calculate total completed goals (e.g. 3 out of 4)
  const getCompletedGoalsCount = () => {
    let count = 0;
    if (activity.steps >= goals.steps) count++;
    if (activity.water >= goals.water) count++;
    if (activity.calories >= goals.calories) count++;
    if (activity.duration >= goals.duration) count++;
    return count;
  };

  // Calculate overall average goal progress
  const getOverallProgress = () => {
    const stepsRatio = Math.min((activity.steps || 0) / (goals.steps || 1), 1);
    const caloriesRatio = Math.min((activity.calories || 0) / (goals.calories || 1), 1);
    const waterRatio = Math.min((activity.water || 0) / (goals.water || 1), 1);
    const durationRatio = Math.min((activity.duration || 0) / (goals.duration || 1), 1);
    return Math.round(((stepsRatio + caloriesRatio + waterRatio + durationRatio) / 4) * 100);
  };

  // Direct activity updates (will be expanded in commit 2 for steps/water/calories)
  const updateActivityMetric = (metric, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    setActivity((prev) => ({
      ...prev,
      [metric]: num,
    }));
  };

  const addActivityMetric = (metric, amount) => {
    const delta = parseInt(amount, 10) || 0;
    setActivity((prev) => ({
      ...prev,
      [metric]: Math.max(0, (prev[metric] || 0) + delta),
    }));
  };

  return (
    <ActivityContext.Provider
      value={{
        goals,
        activity,
        updateGoal,
        updateAllGoals,
        getGoalProgress,
        isGoalReached,
        getCompletedGoalsCount,
        getOverallProgress,
        updateActivityMetric,
        addActivityMetric,
        setActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

// Custom hook for simple consumption in components
export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}
