import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Unlock } from 'lucide-react-native';

/**
 * Modal para Apertura de Caja universal para React Native
 */
export const OpenCajaModal = ({
  isOpen,
  onClose,
  onConfirmOpen,
  isLoading = false,
}) => {
  const [montoInicial, setMontoInicial] = useState('50000');
  const [responsable, setResponsable] = useState('Lucas Méndez (Recepción)');

  const handleSubmit = () => {
    if (onConfirmOpen) {
      onConfirmOpen({
        montoInicial: Number(montoInicial || 0),
        turno: 'Turno Mañana (07:00 - 15:00)',
        responsable,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apertura de Caja del Turno"
      subtitle="Fondo de cambio inicial"
    >
      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Fondo Inicial de Efectivo ($)</Text>
          <TextInput
            value={montoInicial}
            onChangeText={setMontoInicial}
            placeholder="50000"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Responsable</Text>
          <TextInput
            value={responsable}
            onChangeText={setResponsable}
            placeholder="Nombre del recepcionista"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            icon={Unlock}
            loading={isLoading}
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Abrir Caja
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: tokens.colors.text.primary,
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default OpenCajaModal;
