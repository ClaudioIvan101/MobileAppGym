import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Plus, FileText } from 'lucide-react-native';

/**
 * Pestaña 2 - Cuenta Corriente y Pagos universal para React Native
 */
export const TabPaymentsAccount = ({
  socio,
  onOpenPaymentModal,
}) => {
  const {
    deuda = 0,
    saldoAFavor = 0,
    cuentaCorriente = [],
  } = socio || {};

  const tieneDeuda = deuda > 0;

  return (
    <View style={styles.tabContainer}>
      {/* Resumen */}
      <View style={styles.kpiCardsRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Deuda Pendiente</Text>
          <Text style={[styles.kpiValue, { color: tieneDeuda ? '#f87171' : tokens.colors.primary[400] }]}>
            {tieneDeuda ? `$ ${deuda.toLocaleString('es-AR')}` : '$ 0 (Al día)'}
          </Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Saldo a Favor</Text>
          <Text style={styles.kpiValue}>$ {saldoAFavor.toLocaleString('es-AR')}</Text>
        </View>
      </View>

      <Button
        variant="primary"
        size="md"
        icon={Plus}
        onPress={onOpenPaymentModal}
        fullWidth
      >
        Registrar Cobro / Pago
      </Button>

      {/* Historial */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Historial de Pagos</Text>
        <View style={styles.historyList}>
          {cuentaCorriente.map((item) => {
            const isPago = item.tipo === 'PAGO';
            return (
              <View key={item.id} style={styles.paymentItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.conceptText}>{item.concepto}</Text>
                  <Text style={styles.dateText}>{item.fecha} • {item.medio}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={[styles.amountText, { color: isPago ? tokens.colors.primary[400] : '#f87171' }]}>
                    {item.monto}
                  </Text>
                  <View style={styles.receiptBox}>
                    <FileText size={11} color={tokens.colors.accent.cyan} />
                    <Text style={styles.receiptText}>{item.comprobante}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    gap: 16,
  },
  kpiCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 4,
  },
  kpiLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 15,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  historySection: {
    gap: 10,
  },
  historyTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  historyList: {
    gap: 8,
  },
  paymentItem: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    gap: 2,
    flex: 1,
  },
  conceptText: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  dateText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  itemRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '800',
  },
  receiptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  receiptText: {
    fontSize: 10.5,
    color: tokens.colors.accent.cyan,
    fontWeight: '600',
  },
});

export default TabPaymentsAccount;
