import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

/**
 * GoalProgressCard component
 * Prominent banner showing total daily fitness goal completion.
 */
export default function GoalProgressCard({
  completionPercentage = 75,
  completedGoals = 3,
  totalGoals = 4,
}) {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textColumn}>
          <View style={styles.badge}>
            <Ionicons name="trophy" size={14} color={COLORS.primary} />
            <Text style={styles.badgeText}>DAILY GOAL</Text>
          </View>
          <Text style={styles.title}>Daily Fitness Goal</Text>
          <Text style={styles.subtitle}>
            {completedGoals} of {totalGoals} targets completed today. Keep pushing!
          </Text>
        </View>

        <View style={styles.circleContainer}>
          <Text style={styles.percentageText}>{completionPercentage}%</Text>
          <Text style={styles.doneLabel}>Achieved</Text>
        </View>
      </View>

      <ProgressBar
        progress={completionPercentage}
        color={COLORS.primary}
        height={8}
        style={styles.progressBar}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderColor: COLORS.primaryLight,
    borderWidth: 1.5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  textColumn: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.xs,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  circleContainer: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  doneLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
  },
  progressBar: {
    marginTop: 2,
  },
});
