import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

/**
 * Reusable Header component displaying user greeting,
 * current date, and an avatar badge.
 */
export default function Header({
  userName = 'Athlete',
  greeting = 'Welcome back',
  dateString,
}) {
  // Format current date nicely if not passed as prop
  const displayDate =
    dateString ||
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{displayDate}</Text>
        <Text style={styles.greetingText}>
          {greeting}, <Text style={styles.userNameText}>{userName}</Text> 👋
        </Text>
      </View>

      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={20} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  userNameText: {
    color: COLORS.primary,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
});
