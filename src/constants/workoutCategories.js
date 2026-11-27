// Workout categories supported in FitTrack
// Each category includes a display name, icon (Ionicons), accent color, and an approximate calorie burn rate per minute

export const WORKOUT_CATEGORIES = [
  {
    id: 'running',
    name: 'Running',
    icon: 'walk',
    color: '#10B981', // Emerald
    bgLight: '#D1FAE5',
    caloriesPerMinute: 11,
  },
  {
    id: 'walking',
    name: 'Walking',
    icon: 'footsteps',
    color: '#0EA5E9', // Sky Blue
    bgLight: '#E0F2FE',
    caloriesPerMinute: 5,
  },
  {
    id: 'cycling',
    name: 'Cycling',
    icon: 'bicycle',
    color: '#F59E0B', // Amber
    bgLight: '#FEF3C7',
    caloriesPerMinute: 8,
  },
  {
    id: 'gym',
    name: 'Gym',
    icon: 'barbell',
    color: '#8B5CF6', // Purple
    bgLight: '#EDE9FE',
    caloriesPerMinute: 7,
  },
  {
    id: 'yoga',
    name: 'Yoga',
    icon: 'body',
    color: '#EC4899', // Pink
    bgLight: '#FCE7F3',
    caloriesPerMinute: 4,
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'fitness',
    color: '#64748B', // Slate
    bgLight: '#F1F5F9',
    caloriesPerMinute: 6,
  },
];

export const getCategoryDetails = (categoryName) => {
  if (!categoryName) return WORKOUT_CATEGORIES[5]; // fallback to Other
  const found = WORKOUT_CATEGORIES.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase() || c.id === categoryName.toLowerCase()
  );
  return found || WORKOUT_CATEGORIES[5];
};
