import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WORKOUT_CATEGORIES, getCategoryDetails } from '../../constants/workoutCategories';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../../constants/theme';

/**
 * WorkoutFormModal component
 * Form dialog to log a new workout or edit an existing one.
 */
export default function WorkoutFormModal({
  visible,
  onClose,
  onSubmit,
  workoutToEdit = null, // If provided, modal operates in Edit mode
}) {
  const isEditing = Boolean(workoutToEdit);

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Running');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill fields when modal opens
  useEffect(() => {
    if (visible) {
      if (workoutToEdit) {
        setName(workoutToEdit.name || '');
        setCategory(workoutToEdit.category || 'Running');
        setDuration(String(workoutToEdit.duration || ''));
        setCalories(String(workoutToEdit.calories || ''));
        setDate(workoutToEdit.date || new Date().toISOString().split('T')[0]);
        setNotes(workoutToEdit.notes || '');
      } else {
        // Defaults for new workout
        setName('');
        setCategory('Running');
        setDuration('');
        setCalories('');
        setDate(new Date().toISOString().split('T')[0]);
        setNotes('');
      }
      setErrorMessage('');
    }
  }, [visible, workoutToEdit]);

  // Auto-estimate calories burned based on selected category and duration
  const handleAutoEstimateCalories = () => {
    const mins = parseInt(duration, 10);
    if (!isNaN(mins) && mins > 0) {
      const catDetails = getCategoryDetails(category);
      const estimated = mins * catDetails.caloriesPerMinute;
      setCalories(String(estimated));
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter a workout title.');
      return;
    }

    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      setErrorMessage('Please enter a valid duration in minutes.');
      return;
    }

    const parsedCalories = parseInt(calories, 10);
    if (isNaN(parsedCalories) || parsedCalories <= 0) {
      setErrorMessage('Please enter valid estimated calories.');
      return;
    }

    if (!date.trim()) {
      setErrorMessage('Please provide a workout date (YYYY-MM-DD).');
      return;
    }

    onSubmit({
      name: name.trim(),
      category,
      duration: parsedDuration,
      calories: parsedCalories,
      date: date.trim(),
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoid}
          >
            <View style={styles.modalCard}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <View style={[styles.iconWrap, { backgroundColor: COLORS.primaryLight }]}>
                    <Ionicons
                      name={isEditing ? 'create' : 'barbell'}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text style={styles.title}>
                    {isEditing ? 'Edit Workout' : 'Log New Workout'}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="close-circle" size={26} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {errorMessage !== '' && (
                  <View style={styles.errorBanner}>
                    <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                )}

                {/* Workout Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Workout Title *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Morning 5k Run, Core Pilates"
                    placeholderTextColor={COLORS.textMuted}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                {/* Category Selection */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Category *</Text>
                  <View style={styles.categoriesGrid}>
                    {WORKOUT_CATEGORIES.map((cat) => {
                      const isSelected = category.toLowerCase() === cat.name.toLowerCase();
                      return (
                        <TouchableOpacity
                          key={cat.id}
                          style={[
                            styles.categoryChip,
                            isSelected && { backgroundColor: cat.color, borderColor: cat.color },
                          ]}
                          onPress={() => {
                            setCategory(cat.name);
                            // If duration is already set, adjust estimated calories
                            const mins = parseInt(duration, 10);
                            if (!isNaN(mins) && mins > 0) {
                              setCalories(String(mins * cat.caloriesPerMinute));
                            }
                          }}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name={cat.icon}
                            size={16}
                            color={isSelected ? COLORS.textInverse : cat.color}
                            style={{ marginRight: 4 }}
                          />
                          <Text
                            style={[
                              styles.categoryChipText,
                              isSelected && { color: COLORS.textInverse },
                            ]}
                          >
                            {cat.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Duration & Calories Row */}
                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.xs }]}>
                    <Text style={styles.label}>Duration (min) *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. 30"
                      placeholderTextColor={COLORS.textMuted}
                      value={duration}
                      onChangeText={(val) => {
                        setDuration(val);
                        const mins = parseInt(val, 10);
                        if (!isNaN(mins) && mins > 0) {
                          const cat = getCategoryDetails(category);
                          setCalories(String(mins * cat.caloriesPerMinute));
                        }
                      }}
                      keyboardType="number-pad"
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: SPACING.xs }]}>
                    <View style={styles.labelWithHelper}>
                      <Text style={styles.label}>Calories (kcal) *</Text>
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. 250"
                      placeholderTextColor={COLORS.textMuted}
                      value={calories}
                      onChangeText={setCalories}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                {/* Workout Date */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Workout Date (YYYY-MM-DD) *</Text>
                  <View style={styles.dateInputWrap}>
                    <Ionicons name="calendar-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.dateInput}
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor={COLORS.textMuted}
                      value={date}
                      onChangeText={setDate}
                    />
                  </View>
                </View>

                {/* Optional Notes */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Notes (Optional)</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Add thoughts, intensity, distance, or reps..."
                    placeholderTextColor={COLORS.textMuted}
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </ScrollView>

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
                  style={[styles.btn, styles.submitBtn]}
                  onPress={handleSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.submitBtnText}>
                    {isEditing ? 'Update Workout' : 'Save Workout'}
                  </Text>
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
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  keyboardAvoid: {
    width: '100%',
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.md,
    maxHeight: '90%',
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    paddingBottom: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingVertical: SPACING.xs,
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
  inputGroup: {
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  labelWithHelper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  dateInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  dateInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
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
  submitBtn: {
    backgroundColor: COLORS.primary,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textInverse,
  },
});
