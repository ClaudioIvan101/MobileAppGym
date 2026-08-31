import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { TrendingUp } from 'lucide-react-native';

/**
 * Resumen por Método de Pago universal para React Native
 */
export const PaymentMethodBreakdown = ({
  desglose = {},
  totalFacturado = 0,
}) => {
  const {
    efectivo = 0,
    mercadoPago = 0,
    debito = 0,
    credito = 0,
  } = desglose;

  const METODOS = [
    { id: 'efectivo', label: 'Efectivo', monto: efectivo, color: tokens.colors.primary[400] },
    { id: 'mp', label: 'Mercado Pago', monto: mercadoPago, color: tokens.colors.accent.cyan },
    { id: 'debito', label: 'Débito', monto: debito, color: tokens.colors.accent.purple },
    { id: 'credito', label: 'Crédito', monto: credito, color: '#F59E0B' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <TrendingUp size={14} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Recaudación por Método</Text>
        </View>

        <Text style={styles.totalValue}>Total: $ {totalFacturado.toLocaleString('es-AR')}</Text>
      </View>

      <View style={styles.cardsGrid}>
        {METODOS.map((item) => (
          <View key={item.id} style={styles.methodCard}>
            <Text style={styles.methodLabel}>{item.label}</Text>
            <Text style={[styles.methodAmount, { color: item.color }]}>
              $ {item.monto.toLocaleString('es-AR')}
            </Text>
          </View>
        ))}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  totalValue: {
    fontSize: 12,
    color: tokens.colors.primary[400],
    fontWeight: '800',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  methodCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 2,
  },
  methodLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.text.muted,
  },
  methodAmount: {
    fontSize: 13,
    fontWeight: '900',
  },
});

export default PaymentMethodBreakdown;
