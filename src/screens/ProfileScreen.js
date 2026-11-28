import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/common/Card';
import EditProfileModal from '../components/profile/EditProfileModal';
import GoalSettingModal from '../components/activity/GoalSettingModal';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../constants/theme';
import { useProfile } from '../context/ProfileContext';
import { useActivity } from '../context/ActivityContext';
import { useWorkouts } from '../context/WorkoutContext';
import { clearAllData } from '../utils/storage';

export default function ProfileScreen() {
  const { profile, updateProfile, resetProfile } = useProfile();
  const { goals, setActivity } = useActivity();
  const { workouts, resetWorkouts } = useWorkouts();

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  // Toggle notification reminder
  const handleToggleReminder = (value) => {
    updateProfile({ dailyReminder: value });
  };

  // Reset today's logged numbers (steps, water, calories)
  const handleResetDailyData = () => {
    Alert.alert(
      "Reset Today's Activity?",
      'This will reset your logged steps, water intake, and active calories for today to zero.',
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
            Alert.alert('Reset Complete', "Today's activity has been reset.");
          },
        },
      ]
    );
  };

  // Complete data reset
  const handleResetAllData = () => {
    Alert.alert(
      'Reset All Application Data?',
      'This will clear your saved goals, profile settings, and all logged workouts from AsyncStorage. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All Data',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            resetProfile();
            resetWorkouts();
            setActivity({
              steps: 0,
              water: 0,
              calories: 0,
              duration: 0,
            });
            Alert.alert('Success', 'Application storage has been reset to defaults.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile & Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileEmail}>{profile.email}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>{profile.fitnessLevel}</Text>
                </View>
                <View style={[styles.levelBadge, styles.sportBadge]}>
                  <Text style={[styles.levelBadgeText, styles.sportBadgeText]}>
                    {profile.favoriteActivity}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditProfileVisible(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Daily Fitness Goals Section */}
        <Text style={styles.sectionTitle}>Daily Fitness Targets</Text>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <Ionicons name="flag-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
              <Text style={styles.cardHeading}>Current Targets</Text>
            </View>
            <TouchableOpacity onPress={() => setGoalModalVisible(true)}>
              <Text style={styles.editLink}>Change Goals</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.goalsGrid}>
            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Steps</Text>
              <Text style={styles.goalValue}>{(goals.steps || 10000).toLocaleString()}</Text>
              <Text style={styles.goalUnit}>steps/day</Text>
            </View>

            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Water</Text>
              <Text style={styles.goalValue}>{(goals.water || 2500).toLocaleString()}</Text>
              <Text style={styles.goalUnit}>ml/day</Text>
            </View>

            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Calories</Text>
              <Text style={styles.goalValue}>{goals.calories || 600}</Text>
              <Text style={styles.goalUnit}>kcal/day</Text>
            </View>

            <View style={styles.goalItem}>
              <Text style={styles.goalLabel}>Duration</Text>
              <Text style={styles.goalValue}>{goals.duration || 60}</Text>
              <Text style={styles.goalUnit}>min/day</Text>
            </View>
          </View>
        </Card>

        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Fitness Preferences</Text>
        <Card style={styles.card}>
          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <Ionicons name="notifications-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.prefTitle}>Daily Activity Reminders</Text>
                <Text style={styles.prefSub}>Receive encouragement to meet daily goals</Text>
              </View>
            </View>
            <Switch
              value={Boolean(profile.dailyReminder)}
              onValueChange={handleToggleReminder}
              trackColor={{ false: COLORS.divider, true: COLORS.primaryLight }}
              thumbColor={profile.dailyReminder ? COLORS.primary : '#FFFFFF'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <Ionicons name="speedometer-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.prefTitle}>Units of Measurement</Text>
                <Text style={styles.prefSub}>{profile.unitSystem}</Text>
              </View>
            </View>
            <View style={styles.readonlyBadge}>
              <Text style={styles.readonlyBadgeText}>Metric</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <Ionicons name="server-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.prefTitle}>Local Storage</Text>
                <Text style={styles.prefSub}>Offline persistence via AsyncStorage ({workouts.length} workouts)</Text>
              </View>
            </View>
            <Ionicons name="shield-checkmark" size={18} color={COLORS.primary} />
          </View>
        </Card>

        {/* Account & Data Management */}
        <Text style={styles.sectionTitle}>Data Management</Text>
        <Card style={styles.card}>
          <TouchableOpacity
            style={styles.dangerRow}
            onPress={handleResetDailyData}
            activeOpacity={0.7}
          >
            <View style={styles.dangerLeft}>
              <Ionicons name="refresh-circle-outline" size={20} color={COLORS.warning} style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.dangerTitle}>Reset Today's Activity</Text>
                <Text style={styles.dangerSub}>Zero out steps, water, and active calories for today</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.dangerRow}
            onPress={handleResetAllData}
            activeOpacity={0.7}
          >
            <View style={styles.dangerLeft}>
              <Ionicons name="trash-bin-outline" size={20} color={COLORS.danger} style={{ marginRight: 8 }} />
              <View>
                <Text style={[styles.dangerTitle, { color: COLORS.danger }]}>Clear All App Data</Text>
                <Text style={styles.dangerSub}>Wipes all local storage and restores app to default</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.danger} />
          </TouchableOpacity>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
      />

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
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileEmail: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  levelBadge: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  sportBadge: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  sportBadgeText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  card: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  editLink: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  goalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  goalItem: {
    alignItems: 'center',
    flex: 1,
  },
  goalLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  goalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  goalUnit: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: SPACING.sm,
  },
  prefTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  prefSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  readonlyBadge: {
    backgroundColor: COLORS.background,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  readonlyBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  dangerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: SPACING.sm,
  },
  dangerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  dangerSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.xs,
  },
  bottomSpacer: {
    height: SPACING.lg,
  },
});
