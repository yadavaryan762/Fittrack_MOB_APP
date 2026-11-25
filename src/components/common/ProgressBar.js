import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

/**
 * Reusable ProgressBar component
 * Shows progress towards a target value with customizable color and height.
 */
export default function ProgressBar({
  progress = 0, // Value between 0 and 1 (or 0 and 100)
  color = COLORS.primary,
  height = 8,
  showPercentage = false,
  backgroundColor = COLORS.divider,
  style,
}) {
  // Normalize progress to a clamped value between 0 and 100
  const normalizedProgress = Math.min(
    Math.max(progress > 1 ? progress : progress * 100, 0),
    100
  );

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.track, { height, backgroundColor }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${normalizedProgress}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>
          {Math.round(normalizedProgress)}%
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  track: {
    flex: 1,
    borderRadius: RADIUS.round,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: RADIUS.round,
  },
  percentageText: {
    marginLeft: SPACING.sm,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    minWidth: 32,
    textAlign: 'right',
  },
});
