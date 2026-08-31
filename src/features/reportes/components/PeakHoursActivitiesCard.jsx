import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Dumbbell, Clock } from 'lucide-react-native';

/**
 * Reporte de Actividades y Horarios Pico universal para React Native
 */
export const PeakHoursActivitiesCard = ({
  actividadesTop = [],
  horariosPico = [],
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Actividades Más Concurridas */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <Dumbbell size={14} color={tokens.colors.primary[400]} />
            <Text style={styles.cardTitle}>Disciplinas Más Concurridas</Text>
          </View>
        </View>

        <View style={styles.activitiesList}>
          {actividadesTop.map((act) => (
            <View key={act.nombre} style={styles.actItem}>
              <View style={styles.actTopRow}>
                <Text style={styles.actName}>{act.nombre}</Text>
                <Text style={styles.actStats}>{act.alumnos} alumnos ({act.porcentaje}%)</Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${act.porcentaje}%`,
                      backgroundColor: act.color || tokens.colors.primary[500],
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 2. Horarios Pico */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <Clock size={14} color={tokens.colors.accent.cyan} />
            <Text style={styles.cardTitle}>Horarios Pico</Text>
          </View>
          <Text style={styles.peakBadge}>18:00 - 21:00 hs</Text>
        </View>

        <View style={styles.hoursGrid}>
          {horariosPico.map((h) => (
            <View key={h.franja} style={styles.hourCard}>
              <Text style={styles.franjaText}>{h.franja}</Text>
              <Text
                style={[
                  styles.concurrenciaTag,
                  { color: h.concurrencia.includes('Pico') ? '#f87171' : tokens.colors.text.secondary },
                ]}
              >
                {h.concurrencia}
              </Text>
              <Text style={styles.avgStudents}>~{h.promedio} socios</Text>
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
  peakBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fbbf24',
  },
  activitiesList: {
    gap: 8,
  },
  actItem: {
    gap: 4,
  },
  actTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actName: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  actStats: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 9999,
  },
  hoursGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hourCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 2,
  },
  franjaText: {
    fontSize: 12,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  concurrenciaTag: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  avgStudents: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
});

export default PeakHoursActivitiesCard;
