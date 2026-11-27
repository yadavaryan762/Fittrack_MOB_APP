import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WorkoutCard from './WorkoutCard';
import WorkoutFormModal from './WorkoutFormModal';
import { WORKOUT_CATEGORIES } from '../../constants/workoutCategories';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useWorkouts } from '../../context/WorkoutContext';
import { useActivity } from '../../context/ActivityContext';

/**
 * WorkoutHistoryView component
 * Displays recorded workouts, summary metrics, category filters,
 * and controls for adding, editing, and deleting workouts.
 */
export default function WorkoutHistoryView() {
  const {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    totalWorkoutCount,
    totalWorkoutDuration,
    totalWorkoutCalories,
  } = useWorkouts();

  const { addActivityMetric } = useActivity();

  // Filter state ('all' or specific category name)
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  // Filter categories list: 'All' + individual categories
  const filterOptions = ['All', ...WORKOUT_CATEGORIES.map((c) => c.name)];

  // Filtered workout list
  const filteredWorkouts = selectedFilter === 'All'
    ? workouts
    : workouts.filter(
        (w) => (w.category || '').toLowerCase() === selectedFilter.toLowerCase()
      );

  const handleOpenAddModal = () => {
    setWorkoutToEdit(null);
    setModalVisible(true);
  };

  const handleOpenEditModal = (workout) => {
    setWorkoutToEdit(workout);
    setModalVisible(true);
  };

  const handleSaveWorkout = (workoutData) => {
    if (workoutToEdit) {
      // Update existing
      updateWorkout(workoutToEdit.id, workoutData);
    } else {
      // Add new
      addWorkout(workoutData);
      // Sync with today's activity metrics
      addActivityMetric('duration', workoutData.duration);
      addActivityMetric('calories', workoutData.calories);
    }
  };

  return (
    <View style={styles.container}>
      {/* Summary Header Banner */}
      <View style={styles.summaryBanner}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Workouts</Text>
          <Text style={styles.summaryValue}>{totalWorkoutCount}</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Time</Text>
          <Text style={styles.summaryValue}>{totalWorkoutDuration} <Text style={styles.summaryUnit}>min</Text></Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Burned</Text>
          <Text style={styles.summaryValue}>{totalWorkoutCalories.toLocaleString()} <Text style={styles.summaryUnit}>kcal</Text></Text>
        </View>
      </View>

      {/* Action Header & Log Workout Button */}
      <View style={styles.actionsHeader}>
        <Text style={styles.sectionTitle}>Recorded Activities</Text>
        <TouchableOpacity
          style={styles.logWorkoutBtn}
          onPress={handleOpenAddModal}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={18} color={COLORS.textInverse} style={{ marginRight: 4 }} />
          <Text style={styles.logWorkoutBtnText}>Log Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Category Filter Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filterOptions.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Workouts List or Empty State */}
      {filteredWorkouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="barbell-outline" size={36} color={COLORS.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No workouts found</Text>
          <Text style={styles.emptySubtitle}>
            {selectedFilter === 'All'
              ? 'You have not recorded any workouts yet.'
              : `No workouts recorded under ${selectedFilter}.`}
          </Text>
          <TouchableOpacity
            style={styles.emptyAddBtn}
            onPress={handleOpenAddModal}
            activeOpacity={0.8}
          >
            <Text style={styles.emptyAddBtnText}>Record a Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.list}>
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={handleOpenEditModal}
              onDelete={deleteWorkout}
            />
          ))}
        </View>
      )}

      {/* Workout Form Modal (Add / Edit) */}
      <WorkoutFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSaveWorkout}
        workoutToEdit={workoutToEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xs,
  },
  summaryBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: SPACING.md,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  summaryUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.divider,
  },
  actionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  logWorkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.round,
  },
  logWorkoutBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  filterRow: {
    paddingBottom: SPACING.sm,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
  list: {
    marginTop: SPACING.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginTop: SPACING.xs,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  emptyAddBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.round,
  },
  emptyAddBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
});
