import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { getCategoryDetails, WORKOUT_CATEGORIES } from '../../constants/workoutCategories';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

/**
 * CategoryBreakdown component
 * Displays a visual distribution of workouts by category,
 * showing session counts, minutes logged, and proportional progress bars.
 */
export default function CategoryBreakdown({ workouts = [] }) {
  // Aggregate stats per category
  const categoryTotals = WORKOUT_CATEGORIES.map((cat) => {
    const matching = workouts.filter(
      (w) => (w.category || '').toLowerCase() === cat.name.toLowerCase()
    );
    const count = matching.length;
    const duration = matching.reduce((sum, w) => sum + (w.duration || 0), 0);
    const calories = matching.reduce((sum, w) => sum + (w.calories || 0), 0);

    return {
      ...cat,
      count,
      duration,
      calories,
    };
  }).filter((cat) => cat.count > 0);

  // Total workout minutes across all categories
  const totalMinutes = categoryTotals.reduce((sum, c) => sum + c.duration, 0);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Category Distribution</Text>
          <Text style={styles.subtitle}>Time spent across workout types</Text>
        </View>
        <Ionicons name="pie-chart-outline" size={20} color={COLORS.textSecondary} />
      </View>

      {categoryTotals.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>No workout categories recorded yet.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {categoryTotals.map((cat) => {
            const percentage = totalMinutes > 0 ? Math.round((cat.duration / totalMinutes) * 100) : 0;

            return (
              <View key={cat.id} style={styles.categoryItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.nameRow}>
                    <View style={[styles.iconWrap, { backgroundColor: cat.bgLight }]}>
                      <Ionicons name={cat.icon} size={15} color={cat.color} />
                    </View>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.sessionCount}>• {cat.count} {cat.count === 1 ? 'session' : 'sessions'}</Text>
                  </View>

                  <View style={styles.metricsRow}>
                    <Text style={styles.durationText}>{cat.duration} min</Text>
                    <Text style={styles.percentageText}>({percentage}%)</Text>
                  </View>
                </View>

                <ProgressBar
                  progress={percentage}
                  color={cat.color}
                  height={6}
                  style={styles.progressBar}
                />
              </View>
            );
          })}
        </View>
      )}
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  emptyWrap: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  list: {
    marginTop: SPACING.xs,
  },
  categoryItem: {
    marginBottom: SPACING.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: RADIUS.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sessionCount: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  durationText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  percentageText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  progressBar: {
    marginTop: 2,
  },
});
