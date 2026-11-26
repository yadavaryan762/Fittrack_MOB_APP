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
import { useActivity } from '../../context/ActivityContext';

/**
 * GoalSettingModal component
 * Allows users to review and customize their daily fitness targets.
 */
export default function GoalSettingModal({ visible, onClose }) {
  const { goals, updateAllGoals } = useActivity();

  // Local state for editing fields
  const [stepGoal, setStepGoal] = useState('');
  const [waterGoal, setWaterGoal] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [durationGoal, setDurationGoal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sync inputs with current context goals when modal opens
  useEffect(() => {
    if (visible && goals) {
      setStepGoal(String(goals.steps || ''));
      setWaterGoal(String(goals.water || ''));
      setCalorieGoal(String(goals.calories || ''));
      setDurationGoal(String(goals.duration || ''));
      setErrorMessage('');
    }
  }, [visible, goals]);

  const handleSave = () => {
    const parsedSteps = parseInt(stepGoal, 10);
    const parsedWater = parseInt(waterGoal, 10);
    const parsedCalories = parseInt(calorieGoal, 10);
    const parsedDuration = parseInt(durationGoal, 10);

    // Validation
    if (
      isNaN(parsedSteps) || parsedSteps <= 0 ||
      isNaN(parsedWater) || parsedWater <= 0 ||
      isNaN(parsedCalories) || parsedCalories <= 0 ||
      isNaN(parsedDuration) || parsedDuration <= 0
    ) {
      setErrorMessage('Please enter valid positive numbers for all goals.');
      return;
    }

    updateAllGoals({
      steps: parsedSteps,
      water: parsedWater,
      calories: parsedCalories,
      duration: parsedDuration,
    });

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
              {/* Modal Header */}
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <Ionicons name="flag" size={22} color={COLORS.primary} style={styles.headerIcon} />
                  <Text style={styles.title}>Set Daily Goals</Text>
                </View>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name="close-circle" size={26} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>
                Customize your daily health targets. Progress indicators across the app will update immediately.
              </Text>

              {errorMessage !== '' && (
                <View style={styles.errorBanner}>
                  <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              )}

              {/* Step Goal Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Ionicons name="footsteps" size={16} color={COLORS.steps} />
                  <Text style={styles.label}>Daily Steps Goal</Text>
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={stepGoal}
                    onChangeText={setStepGoal}
                    keyboardType="number-pad"
                    placeholder="e.g. 10000"
                    placeholderTextColor={COLORS.textMuted}
                  />
                  <Text style={styles.unitText}>steps</Text>
                </View>
              </View>

              {/* Water Goal Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Ionicons name="water" size={16} color={COLORS.water} />
                  <Text style={styles.label}>Daily Water Goal</Text>
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={waterGoal}
                    onChangeText={setWaterGoal}
                    keyboardType="number-pad"
                    placeholder="e.g. 2500"
                    placeholderTextColor={COLORS.textMuted}
                  />
                  <Text style={styles.unitText}>ml</Text>
                </View>
              </View>

              {/* Calories Goal Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Ionicons name="flame" size={16} color={COLORS.calories} />
                  <Text style={styles.label}>Daily Calories Goal</Text>
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={calorieGoal}
                    onChangeText={setCalorieGoal}
                    keyboardType="number-pad"
                    placeholder="e.g. 600"
                    placeholderTextColor={COLORS.textMuted}
                  />
                  <Text style={styles.unitText}>kcal</Text>
                </View>
              </View>

              {/* Duration Goal Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Ionicons name="timer" size={16} color={COLORS.duration} />
                  <Text style={styles.label}>Daily Exercise Duration</Text>
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    value={durationGoal}
                    onChangeText={setDurationGoal}
                    keyboardType="number-pad"
                    placeholder="e.g. 60"
                    placeholderTextColor={COLORS.textMuted}
                  />
                  <Text style={styles.unitText}>min</Text>
                </View>
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
                  style={[styles.btn, styles.saveBtn]}
                  onPress={handleSave}
                  activeOpacity={0.7}
                >
                  <Text style={styles.saveBtnText}>Save Goals</Text>
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
    maxWidth: 420,
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: SPACING.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: SPACING.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  unitText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginLeft: SPACING.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  btn: {
    paddingVertical: 12,
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
  saveBtn: {
    backgroundColor: COLORS.primary,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textInverse,
  },
});
