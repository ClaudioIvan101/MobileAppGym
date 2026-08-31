import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Unlock } from 'lucide-react-native';

/**
 * Modal para Apertura de Caja universal para React Native
 */
export const OpenCashRegisterModal = ({
  isOpen,
  onClose,
  onConfirmOpen,
  isLoading = false,
}) => {
  const [montoInicial, setMontoInicial] = useState('50000');

  const handleSubmit = () => {
    if (onConfirmOpen) {
      onConfirmOpen(Number(montoInicial || 0));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apertura de Caja del Turno"
      subtitle="Habilitar ventas de mostrador"
    >
      <View style={styles.form}>
        <Text style={styles.helpText}>
          Ingresa el fondo inicial para habilitar cobros en el mostrador.
        </Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Fondo Inicial ($)</Text>
          <TextInput
            value={montoInicial}
            onChangeText={setMontoInicial}
            placeholder="50000"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
            keyboardType="numeric"
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
  helpText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    lineHeight: 16,
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
    fontSize: 14,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default OpenCashRegisterModal;
