import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import StepTrackerCard from '../components/activity/StepTrackerCard';
import WaterTrackerCard from '../components/activity/WaterTrackerCard';
import CalorieTrackerCard from '../components/activity/CalorieTrackerCard';
import GoalSettingModal from '../components/activity/GoalSettingModal';
import WorkoutHistoryView from '../components/workout/WorkoutHistoryView';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useActivity } from '../context/ActivityContext';

export default function ActivityScreen({ route }) {
  const {
    getOverallProgress,
    getCompletedGoalsCount,
    isGoalReached,
    setActivity,
  } = useActivity();

  // Active sub-tab: 'tracker' | 'workouts'
  const [activeTab, setActiveTab] = useState('tracker');
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  // Sync tab if passed via route params
  useEffect(() => {
    if (route?.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route?.params?.tab]);

  // Formatted date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const overallProgress = getOverallProgress();
  const completedGoals = getCompletedGoalsCount();

  // Reset daily activity function with confirmation
  const handleResetActivity = () => {
    Alert.alert(
      'Reset Daily Activity?',
      'This will reset your recorded steps, water, and active calories for today to zero.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setActivity({
              steps: 0,
              water: 0,
              calories: 0,
              duration: 0,
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.dateText}>{todayFormatted}</Text>
          <Text style={styles.title}>Activity & Workouts</Text>
        </View>
        <TouchableOpacity
          style={styles.setGoalsBtn}
          onPress={() => setGoalModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="flag" size={15} color={COLORS.primary} style={{ marginRight: 4 }} />
          <Text style={styles.setGoalsBtnText}>Goals</Text>
        </TouchableOpacity>
      </View>

      {/* Segmented Tab Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'tracker' && styles.tabButtonActive]}
          onPress={() => setActiveTab('tracker')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="speedometer-outline"
            size={16}
            color={activeTab === 'tracker' ? COLORS.primary : COLORS.textMuted}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[styles.tabButtonText, activeTab === 'tracker' && styles.tabButtonTextActive]}
          >
            Daily Tracker
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'workouts' && styles.tabButtonActive]}
          onPress={() => setActiveTab('workouts')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="barbell-outline"
            size={16}
            color={activeTab === 'workouts' ? COLORS.primary : COLORS.textMuted}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[styles.tabButtonText, activeTab === 'workouts' && styles.tabButtonTextActive]}
          >
            Workout History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'tracker' ? (
          <>
            {/* Daily Summary Overview Banner */}
            <Card style={styles.summaryCard}>
              <View style={styles.summaryTop}>
                <View style={styles.summaryTextColumn}>
                  <View style={styles.summaryTag}>
                    <Ionicons name="stats-chart" size={13} color={COLORS.primary} />
                    <Text style={styles.summaryTagText}>DAILY PROGRESS SUMMARY</Text>
                  </View>
                  <Text style={styles.summaryTitle}>
                    {overallProgress >= 100
                      ? 'All Goals Crushed! 🏆'
                      : overallProgress >= 50
                      ? 'Great Momentum! 🔥'
                      : 'Start Your Day Strong! 💪'}
                  </Text>
                  <Text style={styles.summarySubtitle}>
                    {completedGoals} of 4 targets completed. Keep up the good pace!
                  </Text>
                </View>

                <View style={styles.progressCircle}>
                  <Text style={styles.progressCircleText}>{overallProgress}%</Text>
                  <Text style={styles.progressCircleSub}>Daily</Text>
                </View>
              </View>

              <ProgressBar
                progress={overallProgress}
                color={COLORS.primary}
                height={8}
                style={styles.summaryProgress}
              />

              {/* Quick Target Badges Row */}
              <View style={styles.badgesRow}>
                <View style={[styles.targetBadge, isGoalReached('steps') && styles.targetBadgeDone]}>
                  <Ionicons
                    name={isGoalReached('steps') ? 'checkmark-circle' : 'footsteps'}
                    size={13}
                    color={isGoalReached('steps') ? COLORS.steps : COLORS.textMuted}
                  />
                  <Text style={[styles.targetBadgeText, isGoalReached('steps') && styles.targetBadgeTextDone]}>
                    Steps
                  </Text>
                </View>

                <View style={[styles.targetBadge, isGoalReached('water') && styles.targetBadgeDone]}>
                  <Ionicons
                    name={isGoalReached('water') ? 'checkmark-circle' : 'water'}
                    size={13}
                    color={isGoalReached('water') ? COLORS.water : COLORS.textMuted}
                  />
                  <Text style={[styles.targetBadgeText, isGoalReached('water') && styles.targetBadgeTextDone]}>
                    Water
                  </Text>
                </View>

                <View style={[styles.targetBadge, isGoalReached('calories') && styles.targetBadgeDone]}>
                  <Ionicons
                    name={isGoalReached('calories') ? 'checkmark-circle' : 'flame'}
                    size={13}
                    color={isGoalReached('calories') ? COLORS.calories : COLORS.textMuted}
                  />
                  <Text style={[styles.targetBadgeText, isGoalReached('calories') && styles.targetBadgeTextDone]}>
                    Calories
                  </Text>
                </View>

                <View style={[styles.targetBadge, isGoalReached('duration') && styles.targetBadgeDone]}>
                  <Ionicons
                    name={isGoalReached('duration') ? 'checkmark-circle' : 'timer'}
                    size={13}
                    color={isGoalReached('duration') ? COLORS.duration : COLORS.textMuted}
                  />
                  <Text style={[styles.targetBadgeText, isGoalReached('duration') && styles.targetBadgeTextDone]}>
                    Active
                  </Text>
                </View>
              </View>
            </Card>

            {/* Section Heading */}
            <Text style={styles.sectionHeading}>Daily Metrics</Text>

            {/* Step Tracker Card */}
            <StepTrackerCard onOpenGoalModal={() => setGoalModalVisible(true)} />

            {/* Water Tracker Card */}
            <WaterTrackerCard onOpenGoalModal={() => setGoalModalVisible(true)} />

            {/* Calorie Tracker Card */}
            <CalorieTrackerCard onOpenGoalModal={() => setGoalModalVisible(true)} />

            {/* Reset / Clear Today's Activity Option */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetActivity}
              activeOpacity={0.7}
            >
              <Ionicons name="refresh" size={16} color={COLORS.textMuted} />
              <Text style={styles.resetButtonText}>Reset Today's Numbers</Text>
            </TouchableOpacity>
          </>
        ) : (
          /* Workout History View */
          <WorkoutHistoryView />
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Goal Setting Modal */}
      <GoalSettingModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
      />
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
  dateText: {
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
  setGoalsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.round,
  },
  setGoalsBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    padding: 3,
    marginBottom: SPACING.sm,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  tabButtonActive: {
    backgroundColor: COLORS.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTextColumn: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  summaryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  summarySubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 3,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  progressCircleSub: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
  },
  summaryProgress: {
    marginVertical: SPACING.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  targetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  targetBadgeDone: {
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0',
  },
  targetBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  targetBadgeTextDone: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: SPACING.xs,
    borderRadius: RADIUS.md,
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: 6,
  },
  bottomSpacer: {
    height: SPACING.lg,
  },
});
