import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { useSocioClases } from '../hooks/useSocioClases';
import { DaySelectorStrip } from '../components/DaySelectorStrip';
import { ClassFiltersBar } from '../components/ClassFiltersBar';
import { ClassCard } from '../components/ClassCard';
import { BookingConfirmModal } from '../components/BookingConfirmModal';
import { Button } from '../../../components/Button';
import {
  ArrowLeft,
  RefreshCw,
  CalendarX,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';

/**
 * Pantalla de Reserva de Clases del Socio universal para React Native
 */
export const SocioClases = ({
  onBack = () => console.log('Volver'),
}) => {
  const [selectedClassForBooking, setSelectedClassForBooking] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    clases,
    isError,
    refetch,
    selectedDate,
    setSelectedDate,
    selectedActivity,
    setSelectedActivity,
    selectedInstructor,
    setSelectedInstructor,
    reservarClase,
    isReservando,
    cancelarReserva,
    isCancelando,
    checkCancellationEligibility,
  } = useSocioClases();

  const handleConfirmBooking = (claseId) => {
    reservarClase(claseId, {
      onSuccess: () => {
        setSelectedClassForBooking(null);
        setToastMessage('¡Reserva confirmada con éxito!');
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('No se pudo completar la reserva.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  const handleCancelBooking = (clase) => {
    cancelarReserva(clase.id, {
      onSuccess: () => {
        setToastMessage(`Reserva de ${clase.nombre} cancelada.`);
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('No se pudo cancelar la reserva.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={18} color={tokens.colors.text.primary} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>AGENDA DE CLASES</Text>
            <Text style={styles.headerTitle}>Reserva de Cupos</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => refetch()}
          activeOpacity={0.7}
        >
          <RefreshCw size={16} color={tokens.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Toast Feedback */}
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Alerta de Error */}
      {isError && (
        <View style={styles.errorAlert}>
          <AlertCircle size={18} color="#f87171" />
          <View style={styles.errorTextCol}>
            <Text style={styles.errorTitle}>Error al cargar clases</Text>
            <Text style={styles.errorSub}>No pudimos sincronizar los horarios.</Text>
          </View>
          <Button variant="outline" size="sm" onPress={() => refetch()}>
            Reintentar
          </Button>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Selector Horizontal de Días */}
        <DaySelectorStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* 2. Barra de Filtros */}
        <ClassFiltersBar
          selectedActivity={selectedActivity}
          onSelectActivity={setSelectedActivity}
          selectedInstructor={selectedInstructor}
          onSelectInstructor={setSelectedInstructor}
        />

        {/* 3. Listado de Clases Disponibles */}
        <View style={styles.listHeader}>
          <Text style={styles.listCount}>
            {clases.length} {clases.length === 1 ? 'clase disponible' : 'clases disponibles'}
          </Text>
        </View>

        {clases.length > 0 ? (
          <View style={styles.classesGrid}>
            {clases.map((clase) => (
              <ClassCard
                key={clase.id}
                clase={clase}
                onInitiateBooking={(c) => setSelectedClassForBooking(c)}
                onInitiateCancel={handleCancelBooking}
                checkCancellationEligibility={checkCancellationEligibility}
                isLoading={isReservando || isCancelando}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <CalendarX size={26} color={tokens.colors.text.muted} />
            </View>
            <Text style={styles.emptyTitle}>No hay clases programadas</Text>
            <Text style={styles.emptyText}>
              No se encontraron horarios para los filtros seleccionados.
            </Text>
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                setSelectedActivity('all');
                setSelectedInstructor('all');
              }}
            >
              Limpiar filtros
            </Button>
          </View>
        )}
      </ScrollView>

      {/* Modal de Confirmación de Reserva */}
      <BookingConfirmModal
        isOpen={Boolean(selectedClassForBooking)}
        onClose={() => setSelectedClassForBooking(null)}
        clase={selectedClassForBooking}
        onConfirm={handleConfirmBooking}
        isLoading={isReservando}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: tokens.colors.surface.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#090D14',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: tokens.colors.surface.card,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: tokens.colors.surface.card,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  toast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 100,
  },
  toastText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  errorAlert: {
    margin: 16,
    padding: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  errorTextCol: {
    flex: 1,
  },
  errorTitle: {
    color: '#f87171',
    fontSize: 13,
    fontWeight: '700',
  },
  errorSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  listHeader: {
    paddingHorizontal: 4,
  },
  listCount: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
  },
  classesGrid: {
    gap: 12,
  },
  emptyState: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: 6,
  },
  emptyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: tokens.colors.surface.cardHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  emptyText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default SocioClases;
