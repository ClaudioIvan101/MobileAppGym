import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { User, Search, UserCheck } from 'lucide-react-native';

/**
 * Tarjeta de Identificación y Búsqueda por DNI universal para React Native
 */
export const VisitorDniLookupCard = ({
  dni,
  onDniChange,
  nombre,
  onNombreChange,
  apellido,
  onApellidoChange,
  email,
  onEmailChange,
  telefono,
  onTelefonoChange,
  isExistingPerson,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <User size={14} color={tokens.colors.primary[400]} />
          </View>
          <View>
            <Text style={styles.title}>1. Identificación del Cliente</Text>
            <Text style={styles.subtitle}>Digita el DNI para autocompletar</Text>
          </View>
        </View>

        {isExistingPerson && (
          <View style={styles.existingBadge}>
            <UserCheck size={11} color={tokens.colors.primary[400]} />
            <Text style={styles.existingText}>Socio Registrado</Text>
          </View>
        )}
      </View>

      <View style={styles.fieldsGrid}>
        {/* DNI */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>DNI / Documento</Text>
          <View style={styles.dniInputWrapper}>
            <Search size={14} color={tokens.colors.text.secondary} />
            <TextInput
              value={dni}
              onChangeText={onDniChange}
              placeholder="Ej: 41892401"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.dniInput}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Nombre & Apellido */}
        <View style={styles.rowTwoCols}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              value={nombre}
              onChangeText={onNombreChange}
              placeholder="Nombre"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>

          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              value={apellido}
              onChangeText={onApellidoChange}
              placeholder="Apellido"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>
        </View>

        {/* Teléfono */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Teléfono / WhatsApp</Text>
          <TextInput
            value={telefono}
            onChangeText={onTelefonoChange}
            placeholder="+54 9 11 ..."
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
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
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
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
  existingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
  },
  existingText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  fieldsGrid: {
    gap: 10,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: tokens.colors.text.secondary,
  },
  dniInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: tokens.colors.primary[500],
    gap: 8,
  },
  dniInput: {
    flex: 1,
    color: tokens.colors.text.primary,
    fontSize: 13.5,
    fontWeight: '700',
    padding: 4,
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: tokens.colors.text.primary,
    fontSize: 12.5,
  },
});

export default VisitorDniLookupCard;
