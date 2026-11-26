import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import ManualEntryModal from './ManualEntryModal';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useActivity } from '../../context/ActivityContext';

/**
 * WaterTrackerCard component
 * Allows users to record water intake in milliliters and glasses (250ml = 1 glass),
 * with 1-tap quick buttons (+250ml, +500ml, -250ml) and custom manual logging.
 */
export default function WaterTrackerCard({ onOpenGoalModal }) {
  const { activity, goals, addActivityMetric, updateActivityMetric, getGoalProgress, isGoalReached } = useActivity();
  const [modalVisible, setModalVisible] = useState(false);

  const water = activity.water || 0;
  const goal = goals.water || 2500;
  const progressPercent = getGoalProgress('water');
  const reached = isGoalReached('water');

  // Convert ml to standard 250ml glasses for user-friendly display
  const currentGlasses = (water / 250).toFixed(1).replace('.0', '');
  const targetGlasses = Math.round(goal / 250);

  return (
    <Card style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, { backgroundColor: `${COLORS.water}15` }]}>
            <Ionicons name="water" size={22} color={COLORS.water} />
          </View>
          <View>
            <Text style={styles.title}>Water Intake</Text>
            <Text style={styles.subtitle}>Hydration tracking (250ml/glass)</Text>
          </View>
        </View>

        {reached ? (
          <View style={styles.goalAchievedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.water} />
            <Text style={styles.goalAchievedText}>Hydrated</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={onOpenGoalModal} style={styles.goalPill}>
            <Text style={styles.goalPillText}>Goal: {goal.toLocaleString()} ml</Text>
            <Ionicons name="pencil" size={12} color={COLORS.water} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Main Counter Display */}
      <View style={styles.counterRow}>
        <View style={styles.values}>
          <Text style={styles.currentValue}>{water.toLocaleString()}</Text>
          <Text style={styles.goalTotal}> / {goal.toLocaleString()} ml</Text>
        </View>
        <Text style={[styles.percentage, { color: COLORS.water }]}>{progressPercent}%</Text>
      </View>

      {/* Glass count equivalent */}
      <View style={styles.glassInfoRow}>
        <Ionicons name="pint-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.glassInfoText}>
          {currentGlasses} of {targetGlasses} glasses consumed
        </Text>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={progressPercent}
        color={COLORS.water}
        height={8}
        style={styles.progressBar}
      />

      {/* Quick Add Increment Buttons */}
      <View style={styles.actionRow}>
        <Text style={styles.quickAddLabel}>Log:</Text>
        <View style={styles.chipsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.chip}
            onPress={() => addActivityMetric('water', 250)}
          >
            <Ionicons name="cafe-outline" size={12} color={COLORS.water} style={{ marginRight: 2 }} />
            <Text style={styles.chipText}>+250ml</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.chip}
            onPress={() => addActivityMetric('water', 500)}
          >
            <Ionicons name="water-outline" size={12} color={COLORS.water} style={{ marginRight: 2 }} />
            <Text style={styles.chipText}>+500ml</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.chip, styles.undoChip]}
            onPress={() => addActivityMetric('water', -250)}
          >
            <Text style={styles.undoChipText}>-250</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.chip, styles.customChip]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="create-outline" size={13} color={COLORS.water} style={{ marginRight: 2 }} />
            <Text style={styles.customChipText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Entry Modal */}
      <ManualEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(newWater) => updateActivityMetric('water', newWater)}
        title="Update Water Intake"
        subtitle="Enter today's total consumed water in milliliters"
        currentValue={water}
        unit="ml"
        icon="water"
        color={COLORS.water}
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
    backgroundColor: '#E0F2FE',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  goalPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0369A1',
  },
  goalAchievedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  goalAchievedText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.water,
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
  glassInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  glassInfoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  undoChip: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  undoChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger,
  },
  customChip: {
    backgroundColor: '#E0F2FE',
    borderColor: '#BAE6FD',
  },
  customChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0369A1',
  },
});
