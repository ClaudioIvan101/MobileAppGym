import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Users, DollarSign, ShieldAlert } from 'lucide-react-native';

/**
 * Grid de KPIs de Deudores universal para React Native
 */
export const DeudoresKpisGrid = ({
  totalDeudores = 0,
  deudaTotalSum = 0,
  deudoresCriticosCount = 0,
}) => {
  return (
    <View style={styles.grid}>
      <View style={styles.kpiCard}>
        <View style={styles.iconCircleRed}>
          <DollarSign size={14} color="#f87171" />
        </View>
        <View>
          <Text style={styles.kpiLabel}>Deuda Total</Text>
          <Text style={styles.kpiValueRed}>$ {deudaTotalSum.toLocaleString('es-AR')}</Text>
        </View>
      </View>

      <View style={styles.kpiCard}>
        <View style={styles.iconCircleYellow}>
          <Users size={14} color="#fbbf24" />
        </View>
        <View>
          <Text style={styles.kpiLabel}>En Mora</Text>
          <Text style={styles.kpiValue}>{totalDeudores} socios</Text>
        </View>
      </View>

      <View style={styles.kpiCard}>
        <View style={styles.iconCircleRed}>
          <ShieldAlert size={14} color="#f87171" />
        </View>
        <View>
          <Text style={styles.kpiLabel}>{'Mora > 30d'}</Text>
          <Text style={styles.kpiValue}>{deudoresCriticosCount} socios</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleRed: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleYellow: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: tokens.colors.text.muted,
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 13,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  kpiValueRed: {
    fontSize: 13,
    fontWeight: '900',
    color: '#f87171',
  },
});

export default DeudoresKpisGrid;
