import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { DollarSign } from 'lucide-react-native';

const MEDIOS = [
  { id: 'EFECTIVO', label: 'Efectivo', desc: 'Cobro en caja' },
  { id: 'DEBITO', label: 'Tarjeta Débito', desc: 'Terminal POS' },
  { id: 'CREDITO', label: 'Tarjeta Crédito', desc: '1 Pago' },
  { id: 'MERCADO_PAGO', label: 'Mercado Pago', desc: 'QR / Transferencia' },
];

/**
 * Selector de Método de Pago universal para React Native
 */
export const PaymentMethodSelector = ({
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <DollarSign size={14} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.title}>3. Método de Cobro</Text>
          <Text style={styles.subtitle}>Selecciona el medio de pago</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {MEDIOS.map((item) => {
          const isSelected = item.id === selectedMethod;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelectMethod(item.id)}
              activeOpacity={0.75}
              style={[
                styles.methodBtn,
                isSelected ? styles.methodBtnActive : styles.methodBtnInactive,
              ]}
            >
              <Text
                style={[
                  styles.btnLabel,
                  { color: isSelected ? tokens.colors.primary[400] : tokens.colors.text.primary },
                ]}
              >
                {item.label}
              </Text>
              <Text style={styles.btnDesc}>{item.desc}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  header: {
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  methodBtn: {
    flex: 1,
    minWidth: '47%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    gap: 2,
  },
  methodBtnInactive: {
    backgroundColor: tokens.colors.surface.elevated,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  methodBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: tokens.colors.primary[500],
  },
  btnLabel: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  btnDesc: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
});

export default PaymentMethodSelector;
