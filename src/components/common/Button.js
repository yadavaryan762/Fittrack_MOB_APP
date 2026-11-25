import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

/**
 * Reusable Button component supporting primary, secondary, and outline styles.
 */
export default function Button({
  title,
  onPress,
  icon,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  style,
  textStyle,
}) {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary && styles.buttonPrimary,
        variant === 'secondary' && styles.buttonSecondary,
        isOutline && styles.buttonOutline,
        style,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={isOutline ? COLORS.primary : COLORS.textInverse}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          isOutline ? styles.textOutline : styles.textInverse,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.textSecondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  textInverse: {
    color: COLORS.textInverse,
  },
  textOutline: {
    color: COLORS.primary,
  },
});
