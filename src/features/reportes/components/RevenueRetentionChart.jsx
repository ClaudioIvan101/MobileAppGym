import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { BarChart3, UserCheck } from 'lucide-react-native';

/**
 * Facturación y Retención universal para React Native
 */
export const RevenueRetentionChart = ({
  facturacionMensual = [],
  retencionYChurn = [],
}) => {
  const maxFacturacion = Math.max(...facturacionMensual.map((f) => f.ingresos), 5000000);

  return (
    <View style={styles.container}>
      {/* 1. Facturación Mensual */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <BarChart3 size={14} color={tokens.colors.primary[400]} />
            <Text style={styles.cardTitle}>Facturación Mensual</Text>
          </View>
          <Text style={styles.growthBadge}>+14.2%</Text>
        </View>

        <View style={styles.barsContainer}>
          {facturacionMensual.map((item) => {
            const heightPercent = Math.max(10, (item.ingresos / maxFacturacion) * 100);

            return (
              <View key={item.mes} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${heightPercent}%` }]} />
                </View>
                <Text style={styles.barLabel}>{item.mes.slice(0, 3)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* 2. Retención */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <UserCheck size={14} color={tokens.colors.accent.purple} />
            <Text style={styles.cardTitle}>Retención vs. Deserción</Text>
          </View>
          <Text style={styles.retentionPill}>95.2%</Text>
        </View>

        <View style={styles.retentionList}>
          {retencionYChurn.map((item) => (
            <View key={item.mes} style={styles.retentionRow}>
              <Text style={styles.monthName}>{item.mes.slice(0, 3)}</Text>

              <View style={styles.progressTrack}>
                <View style={[styles.retentionFill, { width: `${item.retencion}%` }]} />
                <View style={[styles.churnFill, { width: `${item.churn}%` }]} />
              </View>

              <Text style={styles.retentionText}>{item.retencion}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  growthBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  retentionPill: {
    fontSize: 11,
    fontWeight: '800',
    color: tokens.colors.accent.purple,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    gap: 6,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 4,
  },
  barTrack: {
    width: '100%',
    maxWidth: 24,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: tokens.colors.primary[500],
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    color: tokens.colors.text.secondary,
    fontWeight: '700',
  },
  retentionList: {
    gap: 6,
  },
  retentionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monthName: {
    width: 28,
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 9999,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  retentionFill: {
    height: '100%',
    backgroundColor: tokens.colors.accent.purple,
  },
  churnFill: {
    height: '100%',
    backgroundColor: '#f87171',
  },
  retentionText: {
    fontSize: 11,
    fontWeight: '800',
    color: tokens.colors.accent.purple,
    width: 34,
    textAlign: 'right',
  },
});

export default RevenueRetentionChart;
