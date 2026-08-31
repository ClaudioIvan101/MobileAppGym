import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Flame, Dumbbell, Clock } from 'lucide-react-native';

/**
 * 3 Mini-KPIs de Métricas Personales del Mes universal para React Native
 * Estricto cumplimiento del token: --radius-sm: 8px
 */
export const PersonalMetricsGrid = ({
  metricas,
  isLoading = false,
}) => {
  const diasEntrenados = metricas?.diasEntrenados ?? 0;
  const metaMensual = metricas?.metaMensualDias ?? 20;
  const racha = metricas?.rachaDiasConsecutivos ?? 0;
  const clasesDisponibles = metricas?.clasesDisponibles ?? 0;
  const totalPack = metricas?.clasesTotalPack ?? 0;
  const tienePack = metricas?.tienePackClases ?? false;
  const proximaHora = metricas?.proximaClaseHora || 'Sin clases hoy';
  const proximoInstructor = metricas?.proximaClaseInstructor || 'Disfruta tu descanso';

  return (
    <View style={styles.gridContainer}>
      {/* Mini-KPI 1: Días Entrenados + Racha 🔥 */}
      <View style={styles.kpiCard}>
        <View style={styles.kpiHeader}>
          <Text style={styles.kpiLabel}>Entrenamientos este mes</Text>
          <View style={styles.iconCircleFire}>
            <Flame size={15} color={tokens.colors.accent.fire} />
          </View>
        </View>

        <View style={styles.kpiValueRow}>
          <Text style={styles.kpiMainValue}>{diasEntrenados}</Text>
          <Text style={styles.kpiSubValue}>/ {metaMensual} días</Text>
        </View>

        <View style={styles.streakBadge}>
          <Flame size={12} color={tokens.colors.accent.fire} />
          <Text style={styles.streakText}>¡Racha de {racha} días! 🔥</Text>
        </View>
      </View>

      {/* Mini-KPI 2: Clases Disponibles (Pack de clases) */}
      <View style={styles.kpiCard}>
        <View style={styles.kpiHeader}>
          <Text style={styles.kpiLabel}>
            {tienePack ? 'Créditos de Clases' : 'Acceso a Clases'}
          </Text>
          <View style={styles.iconCircleEmerald}>
            <Dumbbell size={15} color={tokens.colors.primary[400]} />
          </View>
        </View>

        <View style={styles.kpiValueRow}>
          <Text style={styles.kpiMainValue}>
            {tienePack ? clasesDisponibles : 'Ilimitado'}
          </Text>
          {tienePack && <Text style={styles.kpiSubValue}>/ {totalPack} pack</Text>}
        </View>

        <Text style={styles.progressText}>
          {tienePack
            ? `${clasesDisponibles} clases para reservar este ciclo`
            : 'Acceso total a todas las actividades'}
        </Text>
      </View>

      {/* Mini-KPI 3: Próxima Clase Reservada */}
      <View style={styles.kpiCard}>
        <View style={styles.kpiHeader}>
          <Text style={styles.kpiLabel}>Próxima Clase</Text>
          <View style={styles.iconCircleCyan}>
            <Clock size={15} color={tokens.colors.accent.cyan} />
          </View>
        </View>

        <View style={styles.kpiValueRow}>
          <Text style={styles.kpiMainValueSmall}>{proximaHora}</Text>
        </View>

        <Text style={styles.instructorText}>
          Prof: {proximoInstructor}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    gap: 10,
  },
  kpiCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 8, // exacto --radius-sm: 8px
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    justifyContent: 'space-between',
    gap: 6,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  iconCircleFire: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: tokens.colors.accent.fireGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleEmerald: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: tokens.colors.primary.glow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCyan: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  kpiMainValue: {
    fontSize: 24,
    fontWeight: '900',
    color: tokens.colors.text.primary,
    letterSpacing: -0.5,
  },
  kpiMainValueSmall: {
    fontSize: 17,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  kpiSubValue: {
    fontSize: 12,
    fontWeight: '500',
    color: tokens.colors.text.muted,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 87, 34, 0.25)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ff7043',
  },
  progressText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  instructorText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
});

export default PersonalMetricsGrid;
