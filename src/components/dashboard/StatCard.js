import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

/**
 * StatCard component
 * Displays an individual fitness metric with icon, value, goal, and progress bar.
 */
export default function StatCard({
  title,
  value,
  unit,
  goal,
  icon,
  color = COLORS.primary,
  progress = 0,
}) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.valueText}>{value}</Text>
        {unit && <Text style={styles.unitText}> {unit}</Text>}
      </View>

      {goal && (
        <Text style={styles.goalText}>
          Goal: {goal} {unit || ''}
        </Text>
      )}

      <ProgressBar
        progress={progress}
        color={color}
        height={6}
        showPercentage={false}
        style={styles.progressBar}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: SPACING.xs,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  unitText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  goalText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  progressBar: {
    marginTop: 2,
  },
});
