import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { UserPlus } from 'lucide-react-native';
import { tokens } from '../../../theme/tokens';

const INITIAL_FORM = {
  nombre: '',
  apellido: '',
  dni: '',
  telefono: '',
  email: '',
};

export const NewSocioModal = ({ isOpen, onClose, onConfirm, isLoading = false }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setError('');
    }
  }, [isOpen]);

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = () => {
    const dni = form.dni.replace(/\D/g, '');
    if (form.nombre.trim().length < 2 || form.apellido.trim().length < 2) {
      setError('Nombre y apellido deben tener al menos 2 caracteres.');
      return;
    }
    if (dni.length < 7) {
      setError('El DNI debe tener entre 7 y 12 dígitos.');
      return;
    }

    onConfirm({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      dni,
      telefono: form.telefono.trim() || null,
      email: form.email.trim() || null,
    });
  };

  const input = (field, label, placeholder, keyboardType = 'default') => (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={form[field]}
        onChangeText={(value) => updateField(field, value)}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.text.muted}
        keyboardType={keyboardType}
        autoCapitalize={field === 'email' ? 'none' : 'words'}
      />
    </View>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo socio" subtitle="Alta de una persona en el directorio">
      <View style={styles.form}>
        {input('nombre', 'Nombre *', 'Alejandro')}
        {input('apellido', 'Apellido *', 'Silva')}
        {input('dni', 'DNI *', '41892401', 'numeric')}
        {input('telefono', 'Teléfono', '+54 9 11 1234-5678', 'phone-pad')}
        {input('email', 'Email', 'socio@correo.com', 'email-address')}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} disabled={isLoading} style={{ flex: 1 }}>
            Cancelar
          </Button>
          <Button variant="primary" icon={UserPlus} loading={isLoading} onPress={handleSubmit} style={{ flex: 1 }}>
            Crear socio
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: { gap: 12 },
  fieldGroup: { gap: 4 },
  label: { fontSize: 11.5, fontWeight: '700', color: tokens.colors.text.secondary },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: tokens.colors.text.primary,
    fontSize: 12,
  },
  errorText: { color: '#f87171', fontSize: 11.5, fontWeight: '600' },
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
});

export default NewSocioModal;
