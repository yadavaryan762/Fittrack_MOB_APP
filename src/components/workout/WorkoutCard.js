import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import { getCategoryDetails } from '../../constants/workoutCategories';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

/**
 * WorkoutCard component
 * Displays a single workout item with category badge, duration, calories, date, notes,
 * and quick action buttons for editing and deleting.
 */
export default function WorkoutCard({
  workout,
  onEdit,
  onDelete,
}) {
  const categoryDetails = getCategoryDetails(workout.category);

  // Confirmation before deletion
  const handleConfirmDelete = () => {
    Alert.alert(
      'Delete Workout?',
      `Are you sure you want to remove "${workout.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(workout.id),
        },
      ]
    );
  };

  return (
    <Card style={styles.card}>
      {/* Top Header: Category Badge & Actions */}
      <View style={styles.headerRow}>
        <View style={[styles.categoryBadge, { backgroundColor: categoryDetails.bgLight }]}>
          <Ionicons name={categoryDetails.icon} size={14} color={categoryDetails.color} />
          <Text style={[styles.categoryText, { color: categoryDetails.color }]}>
            {workout.category}
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onEdit(workout)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={16} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteActionBtn]}
            onPress={handleConfirmDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Workout Name & Date */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>{workout.name}</Text>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.dateText}>{workout.date}</Text>
        </View>
      </View>

      {/* Metrics Row: Duration and Calories */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <View style={[styles.metricIconWrap, { backgroundColor: `${COLORS.duration}15` }]}>
            <Ionicons name="timer-outline" size={16} color={COLORS.duration} />
          </View>
          <View>
            <Text style={styles.metricLabel}>Duration</Text>
            <Text style={styles.metricValue}>{workout.duration} min</Text>
          </View>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricItem}>
          <View style={[styles.metricIconWrap, { backgroundColor: `${COLORS.calories}15` }]}>
            <Ionicons name="flame-outline" size={16} color={COLORS.calories} />
          </View>
          <View>
            <Text style={styles.metricLabel}>Burned</Text>
            <Text style={styles.metricValue}>{workout.calories} kcal</Text>
          </View>
        </View>
      </View>

      {/* Notes Section (if any) */}
      {Boolean(workout.notes) && (
        <View style={styles.notesContainer}>
          <Ionicons name="document-text-outline" size={13} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
          <Text style={styles.notesText} numberOfLines={2}>
            {workout.notes}
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  deleteActionBtn: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  contentSection: {
    marginVertical: SPACING.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginVertical: SPACING.xs,
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconWrap: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.divider,
    marginHorizontal: SPACING.xs,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xs,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.xs,
  },
  notesText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});
