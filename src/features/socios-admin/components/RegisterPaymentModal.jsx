import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { CreditCard } from 'lucide-react-native';

const MEDIOS_PAGO = [
  { id: 'Efectivo', label: 'Efectivo' },
  { id: 'Visa Débito', label: 'Débito' },
  { id: 'Visa Crédito', label: 'Crédito' },
  { id: 'Mercado Pago', label: 'Mercado Pago' },
  { id: 'Transferencia', label: 'Transferencia' },
];

/**
 * Modal para Registrar Cobro universal para React Native
 */
export const RegisterPaymentModal = ({
  isOpen,
  onClose,
  socio,
  onConfirmPayment,
  isLoading = false,
}) => {
  const [concepto, setConcepto] = useState('Cuota Mensual Black Pass');
  const [monto, setMonto] = useState('$ 38.500');
  const [medioPago, setMedioPago] = useState('Visa Débito');

  const handleSubmit = () => {
    if (onConfirmPayment && socio) {
      onConfirmPayment({
        socioId: socio.id,
        concepto,
        monto,
        medioPago,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar Cobro"
      subtitle={socio ? socio.nombreCompleto : ''}
    >
      <View style={styles.form}>
        {socio ? (
          <View style={styles.socioBanner}>
            <Image
              source={{
                uri:
                  socio.foto ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
              }}
              style={styles.avatarImg}
            />
            <View style={styles.bannerTextCol}>
              <Text style={styles.socioName}>{socio.nombreCompleto}</Text>
              <Text style={styles.socioDni}>DNI: {socio.dni} • Plan actual: {socio.planActual}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Concepto</Text>
          <TextInput
            value={concepto}
            onChangeText={setConcepto}
            style={styles.input}
            placeholder="Ej: Cuota Septiembre 2026"
            placeholderTextColor={tokens.colors.text.muted}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Monto ($)</Text>
          <TextInput
            value={monto}
            onChangeText={setMonto}
            style={styles.input}
            placeholder="$ 38.500"
            placeholderTextColor={tokens.colors.text.muted}
          />
        </View>

        <Text style={styles.label}>Medio de Pago</Text>
        <View style={styles.mediosGrid}>
          {MEDIOS_PAGO.map((m) => {
            const isSelected = m.id === medioPago;
            return (
              <TouchableOpacity
                key={m.id}
                onPress={() => setMedioPago(m.id)}
                activeOpacity={0.75}
                style={[
                  styles.medioBtn,
                  isSelected ? styles.medioBtnActive : styles.medioBtnInactive,
                ]}
              >
                <Text style={[styles.medioText, isSelected && { color: tokens.colors.primary[400] }]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            icon={CreditCard}
            loading={isLoading}
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Cobrar
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
  socioBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  avatarImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  bannerTextCol: {
    flex: 1,
  },
  socioName: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  socioDni: {
    fontSize: 11,
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
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: tokens.colors.text.primary,
    fontSize: 12,
  },
  mediosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  medioBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  medioBtnInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  medioBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: tokens.colors.primary[500],
  },
  medioText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default RegisterPaymentModal;
