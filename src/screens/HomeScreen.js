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
import WorkoutFormModal from '../components/workout/WorkoutFormModal';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useActivity } from '../context/ActivityContext';
import { useWorkouts } from '../context/WorkoutContext';
import { useProfile } from '../context/ProfileContext';

export default function HomeScreen({ navigation }) {
  const { profile } = useProfile();
  const [workoutModalVisible, setWorkoutModalVisible] = useState(false);

  const {
    activity,
    goals,
    getOverallProgress,
    getCompletedGoalsCount,
    addActivityMetric,
  } = useActivity();

  const { workouts, addWorkout } = useWorkouts();

  const handleNavigateToActivity = () => {
    navigation.navigate('Activity', { tab: 'tracker' });
  };

  const handleNavigateToWorkouts = () => {
    navigation.navigate('Activity', { tab: 'workouts' });
  };

  const handleQuickAddWater = () => {
    addActivityMetric('water', 250);
  };

  const handleQuickAddSteps = () => {
    addActivityMetric('steps', 1000);
  };

  const handleSaveWorkoutFromHome = (workoutData) => {
    addWorkout(workoutData);
    addActivityMetric('duration', workoutData.duration);
    addActivityMetric('calories', workoutData.calories);
  };

  // Recent 3 workouts
  const recentWorkouts = workouts.slice(0, 3);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <Header userName={profile?.name || 'Athlete'} />

        {/* Hero Daily Goal Progress Card */}
        <GoalProgressCard
          completionPercentage={getOverallProgress()}
          completedGoals={getCompletedGoalsCount()}
          totalGoals={4}
        />

        {/* Quick Actions Bar */}
        <QuickActions
          onAddWorkout={() => setWorkoutModalVisible(true)}
          onAddWater={handleQuickAddWater}
          onAddSteps={handleQuickAddSteps}
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
              value={(activity.steps || 0).toLocaleString()}
              unit="steps"
              goal={(goals.steps || 10000).toLocaleString()}
              icon="footsteps"
              color={COLORS.steps}
              progress={(activity.steps || 0) / (goals.steps || 1)}
            />
            <StatCard
              title="Calories"
              value={activity.calories || 0}
              unit="kcal"
              goal={goals.calories || 600}
              icon="flame"
              color={COLORS.calories}
              progress={(activity.calories || 0) / (goals.calories || 1)}
            />
          </View>

          <View style={styles.statsRow}>
            <StatCard
              title="Water"
              value={(activity.water || 0).toLocaleString()}
              unit="ml"
              goal={(goals.water || 2500).toLocaleString()}
              icon="water"
              color={COLORS.water}
              progress={(activity.water || 0) / (goals.water || 1)}
            />
            <StatCard
              title="Duration"
              value={activity.duration || 0}
              unit="min"
              goal={goals.duration || 60}
              icon="timer"
              color={COLORS.duration}
              progress={(activity.duration || 0) / (goals.duration || 1)}
            />
          </View>
        </View>

        {/* Recent Activity List Preview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <TouchableOpacity onPress={handleNavigateToWorkouts}>
            <View style={styles.viewMoreRow}>
              <Text style={styles.seeAllText}>View All ({workouts.length})</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {recentWorkouts.length === 0 ? (
          <View style={styles.emptyRecentBox}>
            <Text style={styles.emptyRecentText}>No workouts recorded yet.</Text>
            <TouchableOpacity onPress={() => setWorkoutModalVisible(true)}>
              <Text style={styles.emptyRecentAction}>+ Log your first workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          recentWorkouts.map((item) => (
            <RecentActivityItem
              key={item.id}
              title={item.name}
              category={item.category}
              duration={`${item.duration} min`}
              calories={`${item.calories} kcal`}
              time={item.date}
            />
          ))
        )}

        {/* Bottom spacing to ensure clean scroll above tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Workout Form Modal */}
      <WorkoutFormModal
        visible={workoutModalVisible}
        onClose={() => setWorkoutModalVisible(false)}
        onSubmit={handleSaveWorkoutFromHome}
      />
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
  emptyRecentBox: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginVertical: SPACING.xs,
  },
  emptyRecentText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  emptyRecentAction: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bottomSpacer: {
    height: SPACING.lg,
  },
});
