// Theme constants for FitTrack
// Provides consistent colors, spacing, and styling throughout the app

export const COLORS = {
  // Brand Colors
  primary: '#059669', // Emerald green
  primaryLight: '#D1FAE5',
  primaryDark: '#047857',
  accent: '#10B981',

  // Metric-specific colors for clear visual distinction
  steps: '#10B981',    // Emerald
  calories: '#F97316', // Vibrant orange
  water: '#0EA5E9',    // Sky blue
  duration: '#8B5CF6', // Soft purple

  // Neutral Colors
  background: '#F8FAFC', // Crisp light background
  card: '#FFFFFF',       // Clean white cards
  cardBorder: '#E2E8F0', // Light border for subtle separation

  // Typography Colors
  textPrimary: '#0F172A',   // Deep slate for main headings and values
  textSecondary: '#475569', // Slate for descriptions and subtitles
  textMuted: '#94A3B8',     // Muted gray for timestamps and placeholders
  textInverse: '#FFFFFF',   // White text on dark/colored backgrounds

  // Status & Utility Colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  divider: '#F1F5F9',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};
