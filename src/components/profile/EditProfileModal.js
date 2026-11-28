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
import { WORKOUT_CATEGORIES } from '../../constants/workoutCategories';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../../constants/theme';
import { useProfile } from '../../context/ProfileContext';

/**
 * EditProfileModal component
 * Allows editing user name, email, fitness level, and favorite activity.
 */
export default function EditProfileModal({ visible, onClose }) {
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('Intermediate');
  const [favoriteActivity, setFavoriteActivity] = useState('Running');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible && profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setFitnessLevel(profile.fitnessLevel || 'Intermediate');
      setFavoriteActivity(profile.favoriteActivity || 'Running');
      setError('');
    }
  }, [visible, profile]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      fitnessLevel,
      favoriteActivity,
    });

    onClose();
  };

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

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
                  <Ionicons name="person-circle" size={24} color={COLORS.primary} style={{ marginRight: 6 }} />
                  <Text style={styles.title}>Edit Profile</Text>
                </View>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="close-circle" size={24} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>Update your personal profile and fitness preferences.</Text>

              {error !== '' && (
                <View style={styles.errorBanner}>
                  <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Fitness Level */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fitness Experience Level</Text>
                <View style={styles.chipsRow}>
                  {levels.map((lvl) => {
                    const isSelected = fitnessLevel === lvl;
                    return (
                      <TouchableOpacity
                        key={lvl}
                        style={[styles.chip, isSelected && styles.chipActive]}
                        onPress={() => setFitnessLevel(lvl)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                          {lvl}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Favorite Activity */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Primary Fitness Focus</Text>
                <View style={styles.chipsWrap}>
                  {WORKOUT_CATEGORIES.map((cat) => {
                    const isSelected = favoriteActivity.toLowerCase() === cat.name.toLowerCase();
                    return (
                      <TouchableOpacity
                        key={cat.id}
                        style={[styles.chip, isSelected && styles.chipActive]}
                        onPress={() => setFavoriteActivity(cat.name)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={cat.icon}
                          size={14}
                          color={isSelected ? COLORS.textInverse : COLORS.textSecondary}
                          style={{ marginRight: 4 }}
                        />
                        <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                          {cat.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
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
                  <Text style={styles.saveBtnText}>Save Profile</Text>
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
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
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
  inputGroup: {
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.round,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.md,
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
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
});
