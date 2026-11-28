import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/common/Card';
import StatOverviewCard from '../components/statistics/StatOverviewCard';
import WeeklyBarChart from '../components/statistics/WeeklyBarChart';
import CategoryBreakdown from '../components/statistics/CategoryBreakdown';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { useWorkouts } from '../context/WorkoutContext';
import { useActivity } from '../context/ActivityContext';

export default function StatisticsScreen() {
  const { workouts, totalWorkoutCount, totalWorkoutDuration, totalWorkoutCalories } = useWorkouts();
  const { activity, goals, getOverallProgress } = useActivity();

  // Compute weekly day breakdown (Mon through Sun) from recorded workouts
  const buildWeeklyData = () => {
    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0, Sunday = 6

    // Default structure
    const dayMap = {
      Mon: { duration: 0, calories: 0 },
      Tue: { duration: 0, calories: 0 },
      Wed: { duration: 0, calories: 0 },
      Thu: { duration: 0, calories: 0 },
      Fri: { duration: 0, calories: 0 },
      Sat: { duration: 0, calories: 0 },
      Sun: { duration: 0, calories: 0 },
    };

    // Populate from recorded workouts
    workouts.forEach((w) => {
      if (w.date) {
        const d = new Date(w.date);
        const dayIdx = (d.getDay() + 6) % 7;
        const dayName = daysOrder[dayIdx];
        if (dayMap[dayName]) {
          dayMap[dayName].duration += w.duration || 0;
          dayMap[dayName].calories += w.calories || 0;
        }
      }
    });

    return daysOrder.map((dayName, idx) => ({
      day: dayName,
      duration: dayMap[dayName].duration,
      calories: dayMap[dayName].calories,
      isToday: idx === todayIndex,
    }));
  };

  const weeklyData = buildWeeklyData();
  const overallProgress = getOverallProgress();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Performance & Analytics</Text>
          <Text style={styles.title}>Weekly Statistics</Text>
        </View>
        <View style={styles.headerBadge}>
          <Ionicons name="trending-up" size={18} color={COLORS.primary} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Performance Overview Banner */}
        <Card style={styles.bannerCard}>
          <View style={styles.bannerRow}>
            <View style={styles.bannerIconWrap}>
              <Ionicons name="trophy" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.bannerTextColumn}>
              <Text style={styles.bannerTitle}>
                {totalWorkoutCount >= 4 ? 'Super Active Week! 🚀' : 'Building Great Habits! 🏃'}
              </Text>
              <Text style={styles.bannerSubtitle}>
                {totalWorkoutCount} sessions recorded with {totalWorkoutDuration} minutes of active training.
              </Text>
            </View>
          </View>
        </Card>

        {/* 2x2 Metric Cards Grid */}
        <StatOverviewCard
          totalCalories={totalWorkoutCalories}
          totalDuration={totalWorkoutDuration}
          workoutCount={totalWorkoutCount}
        />

        {/* 7-Day Bar Chart */}
        <WeeklyBarChart weeklyData={weeklyData} />

        {/* Workout Category Distribution */}
        <CategoryBreakdown workouts={workouts} />

        {/* Daily Activity Completion Status */}
        <Card style={styles.dailyCard}>
          <View style={styles.dailyHeader}>
            <View>
              <Text style={styles.dailyTitle}>Today's Target Completion</Text>
              <Text style={styles.dailySubtitle}>Overall daily goals achievement rate</Text>
            </View>
            <View style={styles.dailyPercentWrap}>
              <Text style={styles.dailyPercentText}>{overallProgress}%</Text>
            </View>
          </View>

          <View style={styles.dailyMetricsGrid}>
            <View style={styles.dailyMetricCol}>
              <Text style={styles.dailyMetricVal}>{(activity.steps || 0).toLocaleString()}</Text>
              <Text style={styles.dailyMetricLbl}>/ {(goals.steps || 10000).toLocaleString()} steps</Text>
            </View>
            <View style={styles.dailyMetricCol}>
              <Text style={styles.dailyMetricVal}>{(activity.water || 0).toLocaleString()} ml</Text>
              <Text style={styles.dailyMetricLbl}>/ {(goals.water || 2500).toLocaleString()} ml</Text>
            </View>
            <View style={styles.dailyMetricCol}>
              <Text style={styles.dailyMetricVal}>{activity.calories || 0} kcal</Text>
              <Text style={styles.dailyMetricLbl}>/ {goals.calories || 600} kcal</Text>
            </View>
          </View>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  bannerCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  bannerTextColumn: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  dailyCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  dailyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  dailyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dailySubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  dailyPercentWrap: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.round,
  },
  dailyPercentText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  dailyMetricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  dailyMetricCol: {
    flex: 1,
    alignItems: 'center',
  },
  dailyMetricVal: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dailyMetricLbl: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  bottomSpacer: {
    height: SPACING.lg,
  },
});
