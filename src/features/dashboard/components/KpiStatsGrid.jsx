import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import {
  Users,
  DollarSign,
  CalendarClock,
  Dumbbell,
  TrendingUp,
} from 'lucide-react-native';

/**
 * Grid de 4 Stat Cards KPI universal para React Native
 */
export const KpiStatsGrid = ({
  kpis,
  isLoading = false,
}) => {
  const {
    sociosActivos = 482,
    sociosCrecimiento = '+6.4% vs mes ant.',
    ingresosPeriodo = '$ 4.820.000',
    ingresosCrecimiento = '+12.8% vs período ant.',
    planesPorVencer = 34,
    asistenciasHoy = 128,
  } = kpis || {};

  return (
    <View style={styles.grid}>
      {/* 1. Socios Activos */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.cardLabel}>Socios Activos</Text>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: tokens.colors.primary[500] }]}>
            <Users size={14} color={tokens.colors.primary[400]} />
          </View>
        </View>
        <Text style={styles.mainValue}>{sociosActivos}</Text>
        <View style={styles.trendRow}>
          <TrendingUp size={11} color={tokens.colors.primary[400]} />
          <Text style={[styles.trendText, { color: tokens.colors.primary[400] }]}>
            {sociosCrecimiento}
          </Text>
        </View>
      </View>

      {/* 2. Ingresos del Periodo */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.cardLabel}>Ingresos</Text>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(6, 182, 212, 0.12)', borderColor: tokens.colors.accent.cyan }]}>
            <DollarSign size={14} color={tokens.colors.accent.cyan} />
          </View>
        </View>
        <Text style={styles.mainValue}>{ingresosPeriodo}</Text>
        <View style={styles.trendRow}>
          <TrendingUp size={11} color={tokens.colors.accent.cyan} />
          <Text style={[styles.trendText, { color: tokens.colors.accent.cyan }]}>
            {ingresosCrecimiento}
          </Text>
        </View>
      </View>

      {/* 3. Planes por Vencer */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.cardLabel}>Por Vencer (14d)</Text>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderColor: '#f59e0b' }]}>
            <CalendarClock size={14} color="#fbbf24" />
          </View>
        </View>
        <Text style={[styles.mainValue, { color: '#fbbf24' }]}>{planesPorVencer}</Text>
        <Text style={styles.subText}>Requieren renovación</Text>
      </View>

      {/* 4. Asistencias Hoy */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.cardLabel}>Asistencias Hoy</Text>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(168, 85, 247, 0.12)', borderColor: tokens.colors.accent.purple }]}>
            <Dumbbell size={14} color={tokens.colors.accent.purple} />
          </View>
        </View>
        <Text style={styles.mainValue}>{asistenciasHoy}</Text>
        <Text style={[styles.subText, { color: tokens.colors.accent.purple }]}>En sala hoy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainValue: {
    fontSize: 18,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  subText: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
});

export default KpiStatsGrid;
