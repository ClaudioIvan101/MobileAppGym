import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Flame, Target, Clock, Calendar } from 'lucide-react-native';

/**
 * Gráfico de Constancia / Heatmap Mensual universal para React Native
 */
export const AttendanceConsistencyHeatmap = ({
  heatmapDias = [],
  resumen,
  isLoading = false,
}) => {
  const {
    totalAsistencias = 14,
    metaMensual = 20,
    porcentajeMeta = 70,
    rachaActual = 5,
    horasTotales = '18h 45m',
  } = resumen || {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Calendar size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Constancia Mensual</Text>
        </View>
        <View style={styles.streakBadge}>
          <Flame size={13} color={tokens.colors.accent.fire} />
          <Text style={styles.streakText}>Racha: {rachaActual} días 🔥</Text>
        </View>
      </View>

      {/* Grid Heatmap */}
      <View style={styles.heatmapCard}>
        <View style={styles.heatmapHeader}>
          <Text style={styles.heatmapMonthLabel}>Agosto 2026</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: tokens.colors.primary[500] }]} />
              <Text style={styles.legendText}>Asistido</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>No-show</Text>
            </View>
          </View>
        </View>

        {/* Cuadrícula */}
        <View style={styles.gridDays}>
          {heatmapDias.map((d) => {
            const isAttended = d.tipo === 'attended';
            const isMissed = d.tipo === 'missed';
            return (
              <View
                key={d.dia}
                style={[
                  styles.dayBox,
                  isAttended ? styles.dayAttended : isMissed ? styles.dayMissed : styles.dayEmpty,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    {
                      color: isAttended
                        ? tokens.colors.surface.background
                        : isMissed
                        ? '#FFFFFF'
                        : tokens.colors.text.muted,
                    },
                  ]}
                >
                  {d.dia}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Mini KPIs */}
      <View style={styles.kpiRow}>
        <View style={styles.miniKpi}>
          <Target size={15} color={tokens.colors.primary[400]} />
          <View style={styles.miniKpiTextCol}>
            <Text style={styles.kpiLabel}>Meta</Text>
            <Text style={styles.kpiValue}>{totalAsistencias}/{metaMensual} ({porcentajeMeta}%)</Text>
          </View>
        </View>

        <View style={styles.miniKpi}>
          <Clock size={15} color={tokens.colors.accent.cyan} />
          <View style={styles.miniKpiTextCol}>
            <Text style={styles.kpiLabel}>Tiempo</Text>
            <Text style={styles.kpiValue}>{horasTotales}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 87, 34, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ff7043',
  },
  heatmapCard: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 10,
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heatmapMonthLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 10.5,
    color: tokens.colors.text.secondary,
  },
  gridDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  dayBox: {
    width: 26,
    height: 26,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayAttended: {
    backgroundColor: tokens.colors.primary[500],
  },
  dayMissed: {
    backgroundColor: '#ef4444',
  },
  dayEmpty: {
    backgroundColor: tokens.colors.surface.card,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  dayText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniKpi: {
    flex: 1,
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniKpiTextCol: {
    flex: 1,
  },
  kpiLabel: {
    fontSize: 10,
    color: tokens.colors.text.secondary,
  },
  kpiValue: {
    fontSize: 12,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
});

export default AttendanceConsistencyHeatmap;
