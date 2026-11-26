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
import { useActivity } from '../context/ActivityContext';

export default function HomeScreen({ navigation }) {
  const [userName] = useState('Aryan');
  const {
    activity,
    goals,
    getOverallProgress,
    getCompletedGoalsCount,
    addActivityMetric,
  } = useActivity();

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

  const handleNavigateToActivity = () => {
    navigation.navigate('Activity');
  };

  const handleQuickAddWater = () => {
    addActivityMetric('water', 250);
  };

  const handleQuickAddSteps = () => {
    addActivityMetric('steps', 1000);
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
          completionPercentage={getOverallProgress()}
          completedGoals={getCompletedGoalsCount()}
          totalGoals={4}
        />

        {/* Quick Actions Bar */}
        <QuickActions
          onAddWorkout={handleNavigateToActivity}
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
          <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
            <View style={styles.viewMoreRow}>
              <Text style={styles.seeAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {recentActivities.map((item) => (
          <RecentActivityItem
            key={item.id}
            title={item.title}
            category={item.category}
            duration={item.duration}
            calories={item.calories}
            time={item.time}
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
