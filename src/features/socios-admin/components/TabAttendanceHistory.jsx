import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { MapPin } from 'lucide-react-native';

/**
 * Pestaña 3 - Historial de Asistencias universal para React Native
 */
export const TabAttendanceHistory = ({
  socio,
}) => {
  const { historialAsistencias = [] } = socio || {};

  return (
    <View style={styles.tabContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial de Asistencias</Text>
        <View style={styles.badgeCount}>
          <Text style={styles.badgeText}>{historialAsistencias.length} accesos</Text>
        </View>
      </View>

      <View style={styles.list}>
        {historialAsistencias.map((item) => {
          const isAsistido = item.estado === 'ASISTIDO';

          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemLeft}>
                <Text style={styles.typeTitle}>{item.tipo}</Text>
                <Text style={styles.timeText}>{item.fecha} • {item.hora}</Text>
                <View style={styles.pointRow}>
                  <MapPin size={11} color={tokens.colors.text.muted} />
                  <Text style={styles.pointText}>{item.punto}</Text>
                </View>
              </View>

              <View style={[styles.statusPill, { backgroundColor: isAsistido ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)' }]}>
                <Text style={[styles.statusText, { color: isAsistido ? tokens.colors.primary[400] : '#f87171' }]}>
                  {isAsistido ? 'Asistido' : 'No-show'}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  badgeCount: {
    backgroundColor: tokens.colors.surface.card,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  badgeText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
    fontWeight: '700',
  },
  list: {
    gap: 8,
  },
  itemCard: {
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
  typeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  timeText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointText: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  statusPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default TabAttendanceHistory;
