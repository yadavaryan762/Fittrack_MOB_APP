import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../../constants/theme';

/**
 * ManualEntryModal component
 * A clean reusable dialog to log an exact numeric value for steps, water, or calories.
 */
export default function ManualEntryModal({
  visible,
  onClose,
  onSave,
  title = 'Update Value',
  subtitle = 'Enter the updated amount',
  currentValue = 0,
  unit = '',
  icon = 'create-outline',
  color = COLORS.primary,
  isAbsoluteSet = true, // true = set exact total, false = add to current
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setValue(isAbsoluteSet ? String(currentValue || '') : '');
      setError('');
    }
  }, [visible, currentValue, isAbsoluteSet]);

  const handleConfirm = () => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      setError('Please enter a valid positive number');
      return;
    }
    onSave(num);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <View style={styles.modalCard}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <View style={[styles.iconWrap, { backgroundColor: `${color}15` }]}>
                    <Ionicons name={icon} size={20} color={color} />
                  </View>
                  <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="close-circle" size={24} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>{subtitle}</Text>

              {error !== '' && (
                <View style={styles.errorBanner}>
                  <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Input */}
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => {
                    setValue(text);
                    if (error) setError('');
                  }}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={COLORS.textMuted}
                  autoFocus
                />
                <Text style={styles.unitText}>{unit}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.btn, styles.cancelBtn]}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: color }]}
                  onPress={handleConfirm}
                  activeOpacity={0.7}
                >
                  <Text style={styles.saveBtnText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  keyboardAvoid: {
    width: '100%',
    maxWidth: 400,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: SPACING.xs,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  unitText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: SPACING.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textInverse,
  },
});
