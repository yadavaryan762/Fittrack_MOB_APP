import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import ManualEntryModal from './ManualEntryModal';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useActivity } from '../../context/ActivityContext';

/**
 * StepTrackerCard component
 * Allows users to track daily steps, view progress towards their daily goal,
 * use quick-add increments (+500, +1000, +2500), and enter custom step counts.
 */
export default function StepTrackerCard({ onOpenGoalModal }) {
  const { activity, goals, addActivityMetric, updateActivityMetric, getGoalProgress, isGoalReached } = useActivity();
  const [modalVisible, setModalVisible] = useState(false);

  const steps = activity.steps || 0;
  const goal = goals.steps || 10000;
  const progressPercent = getGoalProgress('steps');
  const reached = isGoalReached('steps');

  return (
    <Card style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, { backgroundColor: `${COLORS.steps}15` }]}>
            <Ionicons name="footsteps" size={22} color={COLORS.steps} />
          </View>
          <View>
            <Text style={styles.title}>Steps Tracking</Text>
            <Text style={styles.subtitle}>Daily physical movement</Text>
          </View>
        </View>

        {reached ? (
          <View style={styles.goalAchievedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.steps} />
            <Text style={styles.goalAchievedText}>Goal Met</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={onOpenGoalModal} style={styles.goalPill}>
            <Text style={styles.goalPillText}>Goal: {goal.toLocaleString()}</Text>
            <Ionicons name="pencil" size={12} color={COLORS.primary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Main Counter Display */}
      <View style={styles.counterRow}>
        <View style={styles.values}>
          <Text style={styles.currentValue}>{steps.toLocaleString()}</Text>
          <Text style={styles.goalTotal}> / {goal.toLocaleString()} steps</Text>
        </View>
        <Text style={[styles.percentage, { color: COLORS.steps }]}>{progressPercent}%</Text>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={progressPercent}
        color={COLORS.steps}
        height={8}
        style={styles.progressBar}
      />

      {/* Quick Add Increment Buttons */}
      <View style={styles.actionRow}>
        <Text style={styles.quickAddLabel}>Quick Add:</Text>
        <View style={styles.chipsRow}>
          {[500, 1000, 2500].map((increment) => (
            <TouchableOpacity
              key={increment}
              activeOpacity={0.7}
              style={styles.chip}
              onPress={() => addActivityMetric('steps', increment)}
            >
              <Text style={styles.chipText}>+{increment.toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.chip, styles.customChip]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="create-outline" size={13} color={COLORS.textPrimary} style={{ marginRight: 2 }} />
            <Text style={styles.customChipText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Entry Modal */}
      <ManualEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(newSteps) => updateActivityMetric('steps', newSteps)}
        title="Update Step Count"
        subtitle="Enter today's total recorded steps"
        currentValue={steps}
        unit="steps"
        icon="footsteps"
        color={COLORS.steps}
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
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  goalPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  goalAchievedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  goalAchievedText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.steps,
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
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  customChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
});
