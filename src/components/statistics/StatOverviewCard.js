import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

/**
 * StatOverviewCard component
 * Displays a 2x2 summary metric cards grid covering weekly fitness totals.
 */
export default function StatOverviewCard({
  totalCalories = 0,
  totalDuration = 0,
  workoutCount = 0,
  activeDays = 0,
}) {
  const avgDuration = workoutCount > 0 ? Math.round(totalDuration / workoutCount) : 0;

  const stats = [
    {
      id: 'calories',
      title: 'Total Burned',
      value: totalCalories.toLocaleString(),
      unit: 'kcal',
      icon: 'flame',
      color: COLORS.calories,
    },
    {
      id: 'duration',
      title: 'Total Time',
      value: totalDuration,
      unit: 'min',
      icon: 'timer',
      color: COLORS.duration,
    },
    {
      id: 'frequency',
      title: 'Workouts',
      value: workoutCount,
      unit: 'sessions',
      icon: 'barbell',
      color: COLORS.primary,
    },
    {
      id: 'average',
      title: 'Avg Session',
      value: avgDuration,
      unit: 'min/session',
      icon: 'speedometer',
      color: COLORS.water,
    },
  ];

  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        {stats.slice(0, 2).map((s) => (
          <Card key={s.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrap, { backgroundColor: `${s.color}15` }]}>
                <Ionicons name={s.icon} size={18} color={s.color} />
              </View>
              <Text style={styles.cardTitle}>{s.title}</Text>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueText}>{s.value}</Text>
              <Text style={styles.unitText}> {s.unit}</Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.row}>
        {stats.slice(2, 4).map((s) => (
          <Card key={s.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrap, { backgroundColor: `${s.color}15` }]}>
                <Ionicons name={s.icon} size={18} color={s.color} />
              </View>
              <Text style={styles.cardTitle}>{s.title}</Text>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueText}>{s.value}</Text>
              <Text style={styles.unitText}> {s.unit}</Text>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginVertical: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    margin: SPACING.xs,
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  valueText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  unitText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
});
