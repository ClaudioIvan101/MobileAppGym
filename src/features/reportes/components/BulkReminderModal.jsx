import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Send, Users } from 'lucide-react-native';

/**
 * Modal para Envío Masivo de Recordatorios universal para React Native
 */
export const BulkReminderModal = ({
  isOpen,
  onClose,
  totalDeudores = 0,
  onConfirmSend,
  isLoading = false,
}) => {
  const [plantilla, setPlantilla] = useState(
    `¡Hola {nombre}! Te recordamos desde StrongFit que tu cuota de {plan} por {monto} venció hace {diasMora} días. Puedes regularizarla por transferencia o recepción.`
  );

  const handleSubmit = () => {
    if (onConfirmSend) {
      onConfirmSend({ plantilla });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Recordatorio Masivo"
      subtitle={`Se notificará a ${totalDeudores} socios`}
    >
      <View style={styles.form}>
        <View style={styles.targetBanner}>
          <Users size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.targetTitle}>
            {totalDeudores} socios en mora seleccionados
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mensaje Personalizado</Text>
          <TextInput
            value={plantilla}
            onChangeText={setPlantilla}
            multiline
            numberOfLines={4}
            style={styles.textarea}
          />
          <Text style={styles.tagsHelp}>
            Variables: {'{nombre}'}, {'{plan}'}, {'{monto}'}, {'{diasMora}'}
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            icon={Send}
            loading={isLoading}
            onPress={handleSubmit}
            style={{ flex: 1, backgroundColor: '#22c55e' }}
          >
            Enviar a {totalDeudores}
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
  targetBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    borderRadius: 8,
    padding: 10,
  },
  targetTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  textarea: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    padding: 10,
    color: tokens.colors.text.primary,
    fontSize: 12,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  tagsHelp: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default BulkReminderModal;
