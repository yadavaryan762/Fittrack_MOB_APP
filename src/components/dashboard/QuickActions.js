import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';

/**
 * QuickActions component
 * Provides 1-tap shortcuts for logging workouts, water, and steps.
 */
export default function QuickActions({
  onAddWorkout,
  onAddWater,
  onAddSteps,
}) {
  const actions = [
    {
      id: 'workout',
      title: 'Log Workout',
      icon: 'barbell',
      color: COLORS.duration,
      onPress: onAddWorkout,
    },
    {
      id: 'water',
      title: 'Add Water',
      icon: 'water',
      color: COLORS.water,
      onPress: onAddWater,
    },
    {
      id: 'steps',
      title: 'Log Steps',
      icon: 'footsteps',
      color: COLORS.steps,
      onPress: onAddSteps,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.row}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            activeOpacity={0.7}
            style={styles.actionButton}
            onPress={action.onPress}
          >
            <View style={[styles.iconWrap, { backgroundColor: `${action.color}15` }]}>
              <Ionicons name={action.icon} size={22} color={action.color} />
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.small,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
