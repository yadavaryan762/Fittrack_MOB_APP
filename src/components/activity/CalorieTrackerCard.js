import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import ManualEntryModal from './ManualEntryModal';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useActivity } from '../../context/ActivityContext';

/**
 * CalorieTrackerCard component
 * Allows users to record burned calories, track progress against their daily target,
 * apply quick increments (+100, +250 kcal), and input custom totals.
 */
export default function CalorieTrackerCard({ onOpenGoalModal }) {
  const { activity, goals, addActivityMetric, updateActivityMetric, getGoalProgress, isGoalReached } = useActivity();
  const [modalVisible, setModalVisible] = useState(false);

  const calories = activity.calories || 0;
  const goal = goals.calories || 600;
  const progressPercent = getGoalProgress('calories');
  const reached = isGoalReached('calories');

  return (
    <Card style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, { backgroundColor: `${COLORS.calories}15` }]}>
            <Ionicons name="flame" size={22} color={COLORS.calories} />
          </View>
          <View>
            <Text style={styles.title}>Calories Burned</Text>
            <Text style={styles.subtitle}>Active energy expenditure</Text>
          </View>
        </View>

        {reached ? (
          <View style={styles.goalAchievedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.calories} />
            <Text style={styles.goalAchievedText}>Goal Met</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={onOpenGoalModal} style={styles.goalPill}>
            <Text style={styles.goalPillText}>Goal: {goal.toLocaleString()} kcal</Text>
            <Ionicons name="pencil" size={12} color={COLORS.calories} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Main Counter Display */}
      <View style={styles.counterRow}>
        <View style={styles.values}>
          <Text style={styles.currentValue}>{calories.toLocaleString()}</Text>
          <Text style={styles.goalTotal}> / {goal.toLocaleString()} kcal</Text>
        </View>
        <Text style={[styles.percentage, { color: COLORS.calories }]}>{progressPercent}%</Text>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={progressPercent}
        color={COLORS.calories}
        height={8}
        style={styles.progressBar}
      />

      {/* Quick Add Increment Buttons */}
      <View style={styles.actionRow}>
        <Text style={styles.quickAddLabel}>Quick Add:</Text>
        <View style={styles.chipsRow}>
          {[100, 250].map((increment) => (
            <TouchableOpacity
              key={increment}
              activeOpacity={0.7}
              style={styles.chip}
              onPress={() => addActivityMetric('calories', increment)}
            >
              <Text style={styles.chipText}>+{increment} kcal</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.chip, styles.customChip]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="create-outline" size={13} color="#C2410C" style={{ marginRight: 2 }} />
            <Text style={styles.customChipText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Entry Modal */}
      <ManualEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(newCalories) => updateActivityMetric('calories', newCalories)}
        title="Update Calories Burned"
        subtitle="Enter today's active calorie burn total in kcal"
        currentValue={calories}
        unit="kcal"
        icon="flame"
        color={COLORS.calories}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  goalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  goalPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C2410C',
  },
  goalAchievedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  goalAchievedText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.calories,
    marginLeft: 4,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: SPACING.xs,
  },
  values: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentValue: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  goalTotal: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  percentage: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBar: {
    marginVertical: SPACING.sm,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  quickAddLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: RADIUS.round,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  customChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    borderColor: '#FED7AA',
  },
  customChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
  },
});
