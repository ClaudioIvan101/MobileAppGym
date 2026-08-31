import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  ShieldCheck,
  Dumbbell,
} from 'lucide-react-native';

/**
 * Modal de Confirmación de Reserva de Clase universal para React Native
 */
export const BookingConfirmModal = ({
  isOpen,
  onClose,
  clase,
  onConfirm,
  isLoading = false,
}) => {
  if (!clase) return null;

  const {
    nombre,
    disciplina,
    instructor,
    sala,
    fecha,
    horario,
  } = clase;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Reserva"
      subtitle="Verifica los detalles antes de asegurar tu cupo"
    >
      <View style={styles.modalBody}>
        {/* Tarjeta Resumen */}
        <View style={styles.summaryCard}>
          <View style={styles.disciplineTag}>
            <Dumbbell size={13} color={tokens.colors.primary[400]} />
            <Text style={styles.disciplineText}>{disciplina}</Text>
          </View>

          <Text style={styles.className}>{nombre}</Text>

          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Calendar size={14} color={tokens.colors.primary[400]} />
              <Text style={styles.detailText}>Fecha: {fecha}</Text>
            </View>

            <View style={styles.detailItem}>
              <Clock size={14} color={tokens.colors.primary[400]} />
              <Text style={styles.detailText}>Horario: {horario}</Text>
            </View>

            <View style={styles.detailItem}>
              <User size={14} color={tokens.colors.text.secondary} />
              <Text style={styles.detailText}>Instructor: {instructor}</Text>
            </View>

            <View style={styles.detailItem}>
              <MapPin size={14} color={tokens.colors.text.secondary} />
              <Text style={styles.detailText}>Lugar: {sala}</Text>
            </View>
          </View>
        </View>

        {/* Aviso de Regla de Negocio */}
        <View style={styles.policyNotice}>
          <ShieldCheck size={16} color={tokens.colors.accent.cyan} />
          <Text style={styles.policyText}>
            Política: Puedes cancelar sin penalización hasta 2 horas antes.
          </Text>
        </View>

        {/* Acciones */}
        <View style={styles.actionsRow}>
          <Button
            variant="secondary"
            onPress={onClose}
            disabled={isLoading}
            style={{ flex: 1 }}
          >
            Volver
          </Button>

          <Button
            variant="primary"
            loading={isLoading}
            onPress={() => onConfirm(clase.id)}
            style={{ flex: 1 }}
          >
            Confirmar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    gap: 14,
  },
  summaryCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 8,
  },
  disciplineTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  disciplineText: {
    fontSize: 11,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    textTransform: 'uppercase',
  },
  className: {
    fontSize: 16,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  detailGrid: {
    gap: 6,
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
  policyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    borderRadius: 10,
    padding: 10,
  },
  policyText: {
    fontSize: 11.5,
    color: tokens.colors.text.primary,
    flex: 1,
    lineHeight: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default BookingConfirmModal;
