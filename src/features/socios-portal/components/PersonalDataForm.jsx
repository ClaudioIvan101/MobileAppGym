import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import {
  User,
  HeartPulse,
  Save,
  Lock,
} from 'lucide-react-native';

/**
 * Formulario de Datos Personales universal para React Native
 */
export const PersonalDataForm = ({
  perfil,
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    telefono: '',
    email: '',
    direccion: '',
    contactoEmergenciaNombre: '',
    contactoEmergenciaTelefono: '',
  });

  useEffect(() => {
    if (perfil) {
      const syncTimeout = setTimeout(() => {
        setFormData({
          telefono: perfil.telefono || '',
          email: perfil.email || '',
          direccion: perfil.direccion || '',
          contactoEmergenciaNombre: perfil.contactoEmergenciaNombre || '',
          contactoEmergenciaTelefono: perfil.contactoEmergenciaTelefono || '',
        });
      }, 0);

      return () => clearTimeout(syncTimeout);
    }

    return undefined;
  }, [perfil]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* 1. Datos Fijos de Identidad */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerIcon}>
            <Lock size={14} color={tokens.colors.text.secondary} />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.sectionTitle}>Datos de Identidad (Solo Lectura)</Text>
            <Text style={styles.sectionSubtitle}>Para modificarlos acude a recepción</Text>
          </View>
        </View>

        <View style={styles.readonlyGrid}>
          <View style={styles.readonlyItem}>
            <Text style={styles.readonlyLabel}>Nombre Completo</Text>
            <Text style={styles.readonlyValue}>{perfil?.nombreCompleto || 'Alejandro Silva'}</Text>
          </View>

          <View style={styles.readonlyItem}>
            <Text style={styles.readonlyLabel}>DNI / Documento</Text>
            <Text style={styles.readonlyValue}>{perfil?.dni || '41.892.401'}</Text>
          </View>

          <View style={styles.readonlyItem}>
            <Text style={styles.readonlyLabel}>Fecha de Nacimiento</Text>
            <Text style={styles.readonlyValue}>{perfil?.fechaNacimiento || '15/04/1998'}</Text>
          </View>
        </View>
      </View>

      {/* 2. Datos de Contacto Editables */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerIconEmerald}>
            <User size={14} color={tokens.colors.primary[400]} />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.sectionTitle}>Información de Contacto</Text>
            <Text style={styles.sectionSubtitle}>Mantén tus datos actualizados</Text>
          </View>
        </View>

        <View style={styles.fieldsGrid}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Teléfono / WhatsApp</Text>
            <TextInput
              value={formData.telefono}
              onChangeText={(text) => handleChange('telefono', text)}
              placeholder="+54 9 11 ..."
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="tu.email@ejemplo.com"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Domicilio</Text>
            <TextInput
              value={formData.direccion}
              onChangeText={(text) => handleChange('direccion', text)}
              placeholder="Calle, Número, Piso, Ciudad"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>
        </View>
      </View>

      {/* 3. Contacto de Emergencia */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerIconRed}>
            <HeartPulse size={14} color="#f87171" />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.sectionTitle}>Contacto de Emergencia</Text>
            <Text style={styles.sectionSubtitle}>Notificación ante eventualidades</Text>
          </View>
        </View>

        <View style={styles.fieldsGrid}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nombre del Contacto</Text>
            <TextInput
              value={formData.contactoEmergenciaNombre}
              onChangeText={(text) => handleChange('contactoEmergenciaNombre', text)}
              placeholder="Ej: Mariana Silva (Hermana)"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Teléfono de Emergencia</Text>
            <TextInput
              value={formData.contactoEmergenciaTelefono}
              onChangeText={(text) => handleChange('contactoEmergenciaTelefono', text)}
              placeholder="+54 9 11 ..."
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      {/* Guardar Cambios */}
      <Button
        variant="primary"
        icon={Save}
        loading={isLoading}
        onPress={handleSubmit}
        fullWidth
      >
        Guardar Cambios
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 14,
  },
  sectionCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconEmerald: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconRed: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  readonlyGrid: {
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
  },
  readonlyItem: {
    gap: 1,
  },
  readonlyLabel: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  readonlyValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
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

export default PersonalDataForm;
