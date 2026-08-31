import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Lock, EyeOff } from 'lucide-react-native';

/**
 * Modal para Cierre de Caja con Arqueo Ciego universal para React Native
 */
export const CloseCajaBlindModal = ({
  isOpen,
  onClose,
  onConfirmClose,
  isLoading = false,
}) => {
  const [efectivoDeclarado, setEfectivoDeclarado] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = () => {
    if (onConfirmClose && efectivoDeclarado) {
      onConfirmClose({
        efectivoDeclarado: Number(efectivoDeclarado || 0),
        observaciones: observaciones.trim() || 'Arqueo ciego realizado.',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cierre de Caja y Arqueo Ciego"
      subtitle="Contraste de valores físicos"
    >
      <View style={styles.form}>
        <View style={styles.blindNotice}>
          <EyeOff size={16} color="#fbbf24" />
          <Text style={styles.blindSub}>
            Cuenta todo el dinero físico en cajón y digita el total.
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Efectivo Físico Contado ($)</Text>
          <TextInput
            value={efectivoDeclarado}
            onChangeText={setEfectivoDeclarado}
            placeholder="0"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.inputBig}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Observaciones (Opcional)</Text>
          <TextInput
            value={observaciones}
            onChangeText={setObservaciones}
            placeholder="Novedades de cierre..."
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
            icon={Lock}
            loading={isLoading}
            disabled={!efectivoDeclarado}
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Cerrar Caja
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
  blindNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: '#fbbf24',
    borderRadius: 8,
    padding: 10,
  },
  blindSub: {
    flex: 1,
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  inputBig: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1.5,
    borderColor: tokens.colors.primary[500],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: tokens.colors.text.primary,
    fontSize: 16,
    fontWeight: '900',
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

export default CloseCajaBlindModal;
