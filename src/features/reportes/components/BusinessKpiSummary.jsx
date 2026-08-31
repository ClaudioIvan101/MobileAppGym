import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { TrendingUp, UserCheck, UserX, DollarSign } from 'lucide-react-native';

/**
 * Resumen de KPIs Estratégicos universal para React Native
 */
export const BusinessKpiSummary = ({
  kpis = {},
}) => {
  return (
    <View style={styles.grid}>
      <View style={styles.card}>
        <View style={styles.iconCircleEmerald}>
          <TrendingUp size={14} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.label}>Fact. Anual</Text>
          <Text style={styles.valueHighlight}>
            {kpis.facturacionAnualProyectada || '$ 58.2M'}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircleCyan}>
          <DollarSign size={14} color={tokens.colors.accent.cyan} />
        </View>
        <View>
          <Text style={styles.label}>Ticket Promedio</Text>
          <Text style={styles.value}>
            {kpis.ingresoPromedioSocio || '$ 37.400'}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.iconCirclePurple}>
          <UserCheck size={14} color={tokens.colors.accent.purple} />
        </View>
        <View>
          <Text style={styles.label}>Retención</Text>
          <Text style={styles.value}>
            {kpis.retencionPromedio || '95.2%'}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircleYellow}>
          <UserX size={14} color="#fbbf24" />
        </View>
        <View>
          <Text style={styles.label}>Churn</Text>
          <Text style={styles.value}>
            {kpis.churnRateMensual || '4.8%'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleEmerald: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCyan: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCirclePurple: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
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
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: tokens.colors.text.muted,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 13,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  valueHighlight: {
    fontSize: 13,
    fontWeight: '900',
    color: tokens.colors.primary[400],
  },
});

export default BusinessKpiSummary;
