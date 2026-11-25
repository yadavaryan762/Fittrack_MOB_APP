import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/common/Header';
import GoalProgressCard from '../components/dashboard/GoalProgressCard';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivityItem from '../components/dashboard/RecentActivityItem';
import { COLORS, SPACING } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  // Initial dashboard state - clean and ready for AsyncStorage connection
  const [userName] = useState('Aryan');
  const [dailyStats] = useState({
    steps: {
      current: 7420,
      goal: 10000,
      unit: 'steps',
    },
    calories: {
      current: 480,
      goal: 650,
      unit: 'kcal',
    },
    water: {
      current: 1800,
      goal: 2500,
      unit: 'ml',
    },
    duration: {
      current: 45,
      goal: 60,
      unit: 'min',
    },
  });

  const [recentActivities] = useState([
    {
      id: '1',
      title: 'Morning Outdoor Run',
      category: 'Running',
      duration: '30 min',
      calories: '310 kcal',
      time: 'Today, 7:15 AM',
    },
    {
      id: '2',
      title: 'Core & Upper Body Gym',
      category: 'Gym',
      duration: '45 min',
      calories: '260 kcal',
      time: 'Yesterday, 6:00 PM',
    },
  ]);

  // Compute overall daily fitness goal progress percentage
  const calculateGoalPercentage = () => {
    const stepsRatio = Math.min(dailyStats.steps.current / dailyStats.steps.goal, 1);
    const caloriesRatio = Math.min(dailyStats.calories.current / dailyStats.calories.goal, 1);
    const waterRatio = Math.min(dailyStats.water.current / dailyStats.water.goal, 1);
    const durationRatio = Math.min(dailyStats.duration.current / dailyStats.duration.goal, 1);

    const averageRatio = (stepsRatio + caloriesRatio + waterRatio + durationRatio) / 4;
    return Math.round(averageRatio * 100);
  };

  const handleNavigateToActivity = () => {
    navigation.navigate('Activity');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <Header userName={userName} />

        {/* Hero Daily Goal Progress Card */}
        <GoalProgressCard
          completionPercentage={calculateGoalPercentage()}
          completedGoals={3}
          totalGoals={4}
        />

        {/* Quick Actions Bar */}
        <QuickActions
          onAddWorkout={handleNavigateToActivity}
          onAddWater={handleNavigateToActivity}
          onAddSteps={handleNavigateToActivity}
        />

        {/* Today's Metrics Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Metrics</Text>
          <TouchableOpacity onPress={handleNavigateToActivity}>
            <Text style={styles.seeAllText}>Manage</Text>
          </TouchableOpacity>
        </View>

        {/* 2x2 Grid of Stat Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              title="Steps"
              value={dailyStats.steps.current.toLocaleString()}
              unit={dailyStats.steps.unit}
              goal={dailyStats.steps.goal.toLocaleString()}
              icon="footsteps"
              color={COLORS.steps}
              progress={dailyStats.steps.current / dailyStats.steps.goal}
            />
            <StatCard
              title="Calories"
              value={dailyStats.calories.current}
              unit={dailyStats.calories.unit}
              goal={dailyStats.calories.goal}
              icon="flame"
              color={COLORS.calories}
              progress={dailyStats.calories.current / dailyStats.calories.goal}
            />
          </View>

          <View style={styles.statsRow}>
            <StatCard
              title="Water"
              value={dailyStats.water.current.toLocaleString()}
              unit={dailyStats.water.unit}
              goal={dailyStats.water.goal.toLocaleString()}
              icon="water"
              color={COLORS.water}
              progress={dailyStats.water.current / dailyStats.water.goal}
            />
            <StatCard
              title="Duration"
              value={dailyStats.duration.current}
              unit={dailyStats.duration.unit}
              goal={dailyStats.duration.goal}
              icon="timer"
              color={COLORS.duration}
              progress={dailyStats.duration.current / dailyStats.duration.goal}
            />
          </View>
        </View>

        {/* Recent Activity List Preview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            <View style={styles.viewMoreRow}>
              <Text style={styles.seeAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {recentActivities.map((activity) => (
          <RecentActivityItem
            key={activity.id}
            title={activity.title}
            category={activity.category}
            duration={activity.duration}
            calories={activity.calories}
            time={activity.time}
          />
        ))}

        {/* Bottom spacing to ensure clean scroll above tab bar */}
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
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  viewMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsGrid: {
    marginHorizontal: -SPACING.xs,
  },
  statsRow: {
    flexDirection: 'row',
  },
  bottomSpacer: {
    height: SPACING.lg,
  },
});
