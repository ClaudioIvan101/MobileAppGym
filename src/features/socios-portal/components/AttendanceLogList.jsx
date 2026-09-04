import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import {
  Dumbbell,
  CheckCircle2,
  XCircle,
  Calendar,
} from 'lucide-react-native';

/**
 * Lista Cronológica Detallada de Asistencias universal para React Native
 */
export const AttendanceLogList = ({
  historial = [],
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registro de Accesos</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{historial.length} registros</Text>
        </View>
      </View>

      {historial.length > 0 ? (
        <View style={styles.list}>
          {historial.map((item) => {
            const isAsistido = item.estado === 'ASISTIDO';

            return (
              <View
                key={item.id}
                style={[
                  styles.logCard,
                  isAsistido ? styles.logCardAttended : styles.logCardMissed,
                ]}
              >
                <View style={styles.leftCol}>
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: isAsistido
                          ? 'rgba(16, 185, 129, 0.12)'
                          : 'rgba(239, 68, 68, 0.12)',
                        borderColor: isAsistido ? tokens.colors.primary[500] : '#ef4444',
                      },
                    ]}
                  >
                    {isAsistido ? (
                      <Dumbbell size={16} color={tokens.colors.primary[400]} />
                    ) : (
                      <XCircle size={16} color="#f87171" />
                    )}
                  </View>

                  <View style={styles.infoCol}>
                    <Text style={styles.typeLabel}>{item.tipoLabel}</Text>

                    <View style={styles.metaRow}>
                      <Text style={styles.dateText}>{item.fecha}</Text>
                      <Text style={styles.separator}>•</Text>
                      <Text style={styles.timeText}>{item.horaCheckin}</Text>
                    </View>

                    <View style={styles.detailsRow}>
                      <Text style={styles.accessPointText}>{item.puntoAcceso}</Text>
                      {item.instructor && (
                        <>
                          <Text style={styles.separator}>•</Text>
                          <Text style={styles.instructorText}>Prof. {item.instructor}</Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>

                {/* Badge */}
                <View style={isAsistido ? styles.badgeSuccess : styles.badgeDanger}>
                  {isAsistido ? (
                    <CheckCircle2 size={11} color={tokens.colors.primary[400]} />
                  ) : (
                    <XCircle size={11} color="#f87171" />
                  )}
                  <Text style={[styles.badgeText, { color: isAsistido ? tokens.colors.primary[400] : '#f87171' }]}>
                    {isAsistido ? 'Asistido' : 'No-show'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Calendar size={26} color={tokens.colors.text.muted} />
          <Text style={styles.emptyText}>No hay registros de asistencia para este período.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  countBadge: {
    backgroundColor: tokens.colors.surface.card,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  countBadgeText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
    fontWeight: '600',
  },
  list: {
    gap: 8,
  },
  logCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  logCardAttended: {
    borderLeftWidth: 4,
    borderLeftColor: tokens.colors.primary[500],
  },
  logCardMissed: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  typeLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  timeText: {
    fontSize: 11.5,
    color: tokens.colors.primary[400],
    fontWeight: '700',
  },
  separator: {
    color: tokens.colors.text.muted,
    fontSize: 11,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accessPointText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  instructorText: {
    fontSize: 11,
    color: tokens.colors.accent.cyan,
    fontWeight: '600',
  },
  badgeSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 9999,
  },
  badgeDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: 6,
  },
  emptyText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
  },
});

export default AttendanceLogList;
