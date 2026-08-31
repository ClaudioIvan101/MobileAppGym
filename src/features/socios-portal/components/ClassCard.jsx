import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import {
  Clock,
  User,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';

/**
 * Tarjeta Interactiva de Clase universal para React Native
 */
export const ClassCard = ({
  clase,
  onInitiateBooking,
  onInitiateCancel,
  checkCancellationEligibility,
  isLoading = false,
}) => {
  const {
    id,
    nombre,
    disciplina,
    instructor,
    sala,
    fecha,
    horario,
    horarioInicio,
    cupoTotal,
    cupoOcupado,
    isReservada,
  } = clase;

  const cuposLibres = Math.max(0, cupoTotal - cupoOcupado);
  const isAgotado = cuposLibres === 0;

  const getCuposBadge = () => {
    if (isAgotado) {
      return {
        bg: 'rgba(239, 68, 68, 0.15)',
        border: '#ef4444',
        text: '#f87171',
        label: 'Agotado (0 cupos)',
      };
    }
    if (cuposLibres < 3) {
      return {
        bg: 'rgba(245, 158, 11, 0.15)',
        border: '#f59e0b',
        text: '#fbbf24',
        label: `¡Últimos ${cuposLibres}! (${cupoOcupado}/${cupoTotal})`,
      };
    }
    return {
      bg: 'rgba(16, 185, 129, 0.12)',
      border: '#10b981',
      text: '#34d399',
      label: `Cupos: ${cupoOcupado}/${cupoTotal}`,
    };
  };

  const badgeConfig = getCuposBadge();

  const cancellationStatus = isReservada && checkCancellationEligibility
    ? checkCancellationEligibility(fecha, horarioInicio)
    : { canCancel: true };

  return (
    <View
      style={[
        styles.card,
        isReservada && styles.cardReserved,
      ]}
    >
      {/* Header de la Tarjeta */}
      <View style={styles.cardHeader}>
        <View style={styles.timeTag}>
          <Clock size={13} color={tokens.colors.primary[400]} />
          <Text style={styles.timeText}>{horario}</Text>
        </View>

        <View
          style={[
            styles.cupoBadge,
            {
              backgroundColor: badgeConfig.bg,
              borderColor: badgeConfig.border,
            },
          ]}
        >
          <Users size={11} color={badgeConfig.text} />
          <Text style={[styles.cupoText, { color: badgeConfig.text }]}>
            {badgeConfig.label}
          </Text>
        </View>
      </View>

      {/* Cuerpo */}
      <View style={styles.cardBody}>
        <Text style={styles.className}>{nombre}</Text>

        <View style={styles.metaGrid}>
          <View style={styles.metaRow}>
            <User size={13} color={tokens.colors.text.secondary} />
            <Text style={styles.metaText}>Instructor: {instructor}</Text>
          </View>

          <View style={styles.metaRow}>
            <MapPin size={13} color={tokens.colors.text.secondary} />
            <Text style={styles.metaText}>{sala}</Text>
          </View>
        </View>
      </View>

      {/* Regla de negocio: Aviso de cancelación <2h */}
      {isReservada && !cancellationStatus.canCancel && (
        <View style={styles.cancellationWarning}>
          <AlertCircle size={13} color="#f87171" />
          <Text style={styles.warningText}>
            No cancelable: faltan menos de 2 horas.
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.cardFooter}>
        {isReservada ? (
          <View style={styles.reservedActionsRow}>
            <View style={styles.reservedStatusPill}>
              <CheckCircle2 size={15} color={tokens.colors.primary[400]} />
              <Text style={styles.reservedStatusText}>Inscripto</Text>
            </View>

            <Button
              variant="danger"
              size="sm"
              disabled={!cancellationStatus.canCancel}
              onPress={() => onInitiateCancel(clase)}
            >
              Cancelar
            </Button>
          </View>
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={isAgotado}
            onPress={() => onInitiateBooking(clase)}
          >
            {isAgotado ? 'Sin cupos disponibles' : 'Reservar Cupo'}
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  cardReserved: {
    borderColor: tokens.colors.primary[600],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: tokens.colors.surface.elevated,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  cupoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  cupoText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    gap: 6,
  },
  className: {
    fontSize: 15,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  metaGrid: {
    gap: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
  cancellationWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    borderRadius: 6,
    padding: 8,
  },
  warningText: {
    fontSize: 11,
    color: '#f87171',
    flex: 1,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 10,
  },
  reservedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reservedStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  reservedStatusText: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
});

export default ClassCard;
