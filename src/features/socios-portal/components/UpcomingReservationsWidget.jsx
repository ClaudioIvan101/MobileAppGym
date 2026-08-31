import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Calendar, Clock, MapPin, User, AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';

/**
 * Widget de Próximas Reservas universal para React Native
 */
export const UpcomingReservationsWidget = ({
  reservas = [],
  isLoading = false,
  onCancelReserva,
  isCanceling = false,
  onNavigateToClasses,
}) => {
  const [selectedReservaToCancel, setSelectedReservaToCancel] = useState(null);

  const proximaClase = reservas && reservas.length > 0 ? reservas[0] : null;

  const handleConfirmCancel = () => {
    if (selectedReservaToCancel && onCancelReserva) {
      onCancelReserva(selectedReservaToCancel.id);
      setSelectedReservaToCancel(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header del Widget */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Calendar size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Próxima Clase Reservada</Text>
        </View>
        {reservas.length > 1 && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>+{reservas.length - 1} más</Text>
          </View>
        )}
      </View>

      {proximaClase ? (
        <View style={styles.card}>
          <View style={styles.classInfoRow}>
            <View style={styles.disciplineTag}>
              <Text style={styles.disciplineText}>
                {proximaClase.disciplina || 'Clase'}
              </Text>
            </View>

            <View style={styles.detailsCol}>
              <Text style={styles.className}>{proximaClase.claseNombre}</Text>

              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Clock size={13} color={tokens.colors.primary[400]} />
                  <Text style={styles.metaText}>{proximaClase.horario}</Text>
                </View>

                <View style={styles.metaItem}>
                  <User size={13} color={tokens.colors.text.secondary} />
                  <Text style={styles.metaText}>Instructor: {proximaClase.instructor}</Text>
                </View>

                <View style={styles.metaItem}>
                  <MapPin size={13} color={tokens.colors.text.secondary} />
                  <Text style={styles.metaText}>
                    {proximaClase.sala} {proximaClase.lugarAsignado ? `(${proximaClase.lugarAsignado})` : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Confirmación inline o botón directo de cancelación */}
          {selectedReservaToCancel?.id === proximaClase.id ? (
            <View style={styles.cancelConfirmBox}>
              <View style={styles.confirmHeader}>
                <AlertTriangle size={15} color="#fbbf24" />
                <Text style={styles.confirmTitle}>¿Confirmas la cancelación?</Text>
              </View>
              <Text style={styles.confirmSub}>
                El cupo será liberado y se te reembolsará el crédito.
              </Text>
              <View style={styles.confirmActions}>
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => setSelectedReservaToCancel(null)}
                >
                  Mantener
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  loading={isCanceling}
                  onPress={handleConfirmCancel}
                >
                  Sí, cancelar
                </Button>
              </View>
            </View>
          ) : (
            <View style={styles.cardFooter}>
              <View style={styles.statusConfirmed}>
                <CheckCircle size={13} color={tokens.colors.primary[400]} />
                <Text style={styles.statusConfirmedText}>Reserva confirmada</Text>
              </View>

              <TouchableOpacity
                style={styles.cancelBtnDirect}
                onPress={() => setSelectedReservaToCancel(proximaClase)}
                activeOpacity={0.7}
              >
                <XCircle size={13} color="#f87171" />
                <Text style={styles.cancelBtnText}>Cancelar reserva</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        /* Estado vacío cuando no hay reservas */
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Calendar size={22} color={tokens.colors.text.muted} />
          </View>
          <Text style={styles.emptyTitle}>No tienes clases programadas hoy</Text>
          <Text style={styles.emptyText}>
            Reserva tu lugar en Crossfit, Spinning o Funcional.
          </Text>
          <Button
            variant="outline"
            size="sm"
            onPress={onNavigateToClasses}
            style={{ marginTop: 6 }}
          >
            Explorar clases
          </Button>
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
  countBadge: {
    backgroundColor: tokens.colors.surface.cardHover,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: tokens.colors.primary[400],
  },
  card: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  classInfoRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  disciplineTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  disciplineText: {
    fontSize: 11,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    textTransform: 'uppercase',
  },
  detailsCol: {
    flex: 1,
  },
  className: {
    fontSize: 15,
    fontWeight: '800',
    color: tokens.colors.text.primary,
    marginBottom: 6,
  },
  metaGrid: {
    gap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    flexWrap: 'wrap',
    gap: 8,
  },
  statusConfirmed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusConfirmedText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  cancelBtnDirect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  cancelBtnText: {
    color: '#f87171',
    fontSize: 11.5,
    fontWeight: '600',
  },
  cancelConfirmBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    borderRadius: 10,
    padding: 10,
  },
  confirmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  confirmTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f87171',
  },
  confirmSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
    marginVertical: 4,
  },
  confirmActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
  },
  emptyCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: tokens.colors.surface.cardHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: tokens.colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default UpcomingReservationsWidget;
