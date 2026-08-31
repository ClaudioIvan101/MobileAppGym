import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { MinusCircle } from 'lucide-react-native';

/**
 * Modal para Registrar Egreso universal para React Native
 */
export const RegisterExpenseModal = ({
  isOpen,
  onClose,
  onConfirmExpense,
  isLoading = false,
}) => {
  const [concepto, setConcepto] = useState('Compra de insumos');
  const [monto, setMonto] = useState('15000');
  const [comprobante, setComprobante] = useState('FAC-B-0001');

  const handleSubmit = () => {
    if (onConfirmExpense) {
      onConfirmExpense({
        concepto,
        categoria: 'INSUMOS',
        monto: Number(monto || 0),
        comprobante: comprobante.trim() || 'REC-INTERNO',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Egreso de Caja"
      subtitle="Salida de dinero físico"
    >
      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Concepto del Gasto</Text>
          <TextInput
            value={concepto}
            onChangeText={setConcepto}
            placeholder="Ej: Insumos de limpieza"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Monto ($)</Text>
          <TextInput
            value={monto}
            onChangeText={setMonto}
            placeholder="15000"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Comprobante / Factura</Text>
          <TextInput
            value={comprobante}
            onChangeText={setComprobante}
            placeholder="FAC-B-0001"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cancelar
          </Button>

          <Button
            variant="danger"
            icon={MinusCircle}
            loading={isLoading}
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Registrar
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
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: tokens.colors.text.primary,
    fontSize: 12.5,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default RegisterExpenseModal;
