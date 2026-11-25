import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

/**
 * RecentActivityItem component
 * Displays a single workout record card on the dashboard summary.
 */
export default function RecentActivityItem({
  title = 'Morning Run',
  category = 'Running',
  duration = '30 min',
  calories = '240 kcal',
  time = 'Today, 7:30 AM',
}) {
  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'running':
        return 'walk';
      case 'walking':
        return 'footsteps';
      case 'cycling':
        return 'bicycle';
      case 'gym':
        return 'barbell';
      case 'yoga':
        return 'body';
      default:
        return 'fitness';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={getCategoryIcon(category)} size={20} color={COLORS.primary} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time} • {category}</Text>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.duration}>{duration}</Text>
        <Text style={styles.calories}>{calories}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  time: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  metrics: {
    alignItems: 'flex-end',
  },
  duration: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  calories: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.calories,
    marginTop: 2,
  },
});
