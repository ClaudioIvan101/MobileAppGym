import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { KeyRound, Eye, EyeOff, AlertCircle } from 'lucide-react-native';

/**
 * Formulario de Seguridad y Cambio de Contraseña universal para React Native
 */
export const SecurityPasswordForm = ({
  onChangePassword,
  isLoading = false,
}) => {
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNuevo, setPasswordNuevo] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = () => {
    setValidationError('');

    if (passwordNuevo.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (passwordNuevo !== passwordConfirm) {
      setValidationError('La confirmación de la contraseña no coincide.');
      return;
    }

    if (onChangePassword) {
      onChangePassword(
        { passwordActual, passwordNuevo },
        {
          onSuccess: () => {
            setPasswordActual('');
            setPasswordNuevo('');
            setPasswordConfirm('');
          },
        }
      );
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <KeyRound size={15} color={tokens.colors.primary[400]} />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.title}>Seguridad de la Cuenta</Text>
            <Text style={styles.subtitle}>Cambia tu contraseña</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.eyeToggle}
          onPress={() => setShowPasswords((prev) => !prev)}
          activeOpacity={0.7}
        >
          {showPasswords ? (
            <EyeOff size={14} color={tokens.colors.text.secondary} />
          ) : (
            <Eye size={14} color={tokens.colors.text.secondary} />
          )}
        </TouchableOpacity>
      </View>

      {validationError ? (
        <View style={styles.errorBanner}>
          <AlertCircle size={13} color="#f87171" />
          <Text style={styles.errorText}>{validationError}</Text>
        </View>
      ) : null}

      <View style={styles.fieldsGrid}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Contraseña Actual</Text>
          <TextInput
            secureTextEntry={!showPasswords}
            value={passwordActual}
            onChangeText={setPasswordActual}
            placeholder="••••••••"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nueva Contraseña</Text>
          <TextInput
            secureTextEntry={!showPasswords}
            value={passwordNuevo}
            onChangeText={setPasswordNuevo}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            secureTextEntry={!showPasswords}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            placeholder="Repite tu nueva clave"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>
      </View>

      <Button
        variant="secondary"
        loading={isLoading}
        onPress={handleSubmit}
        fullWidth
      >
        Actualizar Contraseña
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  subtitle: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  eyeToggle: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    borderRadius: 6,
    padding: 6,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    borderRadius: 6,
    padding: 8,
  },
  errorText: {
    fontSize: 11.5,
    color: '#f87171',
    flex: 1,
  },
  fieldsGrid: {
    gap: 10,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '600',
    color: tokens.colors.text.secondary,
  },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: tokens.colors.text.primary,
    fontSize: 13,
  },
});

export default SecurityPasswordForm;
