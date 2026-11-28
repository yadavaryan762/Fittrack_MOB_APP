import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../common/Card';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

/**
 * WeeklyBarChart component
 * Visual 7-day bar chart comparing workout duration or calories burned across days of the week.
 * Built using pure React Native Views for high reliability and zero external chart dependencies.
 */
export default function WeeklyBarChart({ weeklyData, activeMetric = 'duration' }) {
  // activeMetric can be 'duration' (minutes) or 'calories' (kcal)
  const [metric, setMetric] = useState(activeMetric);

  // Default day labels
  const days = weeklyData || [
    { day: 'Mon', duration: 35, calories: 380, isToday: false },
    { day: 'Tue', duration: 45, calories: 290, isToday: false },
    { day: 'Wed', duration: 30, calories: 240, isToday: false },
    { day: 'Thu', duration: 25, calories: 110, isToday: false },
    { day: 'Fri', duration: 50, calories: 420, isToday: true },
    { day: 'Sat', duration: 0, calories: 0, isToday: false },
    { day: 'Sun', duration: 20, calories: 160, isToday: false },
  ];

  // Find max value for proportional bar scaling
  const maxValue = Math.max(
    ...days.map((d) => (metric === 'duration' ? d.duration : d.calories)),
    metric === 'duration' ? 60 : 500
  );

  const barColor = metric === 'duration' ? COLORS.duration : COLORS.calories;

  return (
    <Card style={styles.card}>
      {/* Chart Header & Metric Toggle */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Weekly Activity Trend</Text>
          <Text style={styles.subtitle}>Daily output over the past 7 days</Text>
        </View>

        {/* Toggle between Duration and Calories */}
        <View style={styles.toggleWrap}>
          <TouchableOpacity
            style={[styles.toggleBtn, metric === 'duration' && styles.toggleBtnActive]}
            onPress={() => setMetric('duration')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toggleText,
                metric === 'duration' && styles.toggleTextActive,
              ]}
            >
              Time
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, metric === 'calories' && styles.toggleBtnActive]}
            onPress={() => setMetric('calories')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.toggleText,
                metric === 'calories' && styles.toggleTextActive,
              ]}
            >
              Calories
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bar Chart Container */}
      <View style={styles.chartContainer}>
        {days.map((item, index) => {
          const val = metric === 'duration' ? item.duration : item.calories;
          const heightPercent = Math.min(Math.round((val / maxValue) * 100), 100);

          return (
            <View key={index} style={styles.barColumn}>
              {/* Value on top of bar */}
              <Text style={styles.barValueText}>
                {val > 0 ? (metric === 'duration' ? `${val}m` : val) : '-'}
              </Text>

              {/* Bar track and fill */}
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${Math.max(heightPercent, val > 0 ? 8 : 2)}%`,
                      backgroundColor: item.isToday ? COLORS.primary : barColor,
                      opacity: val > 0 ? (item.isToday ? 1 : 0.85) : 0.2,
                    },
                  ]}
                />
              </View>

              {/* Day label */}
              <View style={[styles.dayLabelWrap, item.isToday && styles.todayLabelWrap]}>
                <Text style={[styles.dayLabel, item.isToday && styles.todayLabel]}>
                  {item.day}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Legend / Insight */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.legendText}>Today</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: barColor }]} />
          <Text style={styles.legendText}>
            {metric === 'duration' ? 'Workout Minutes' : 'Calories Burned'}
          </Text>
        </View>
      </View>
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
    marginBottom: SPACING.md,
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
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.round,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  toggleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.round,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.card,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  toggleTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barValueText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  barTrack: {
    width: 14,
    height: 110,
    backgroundColor: COLORS.divider,
    borderRadius: RADIUS.round,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: RADIUS.round,
  },
  dayLabelWrap: {
    marginTop: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  todayLabelWrap: {
    backgroundColor: COLORS.primaryLight,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  todayLabel: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: SPACING.sm,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.round,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
