import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { useClasesAdmin } from '../hooks/useClasesAdmin';
import { ClasesAgendaHeader } from '../components/ClasesAgendaHeader';
import { WeeklyScheduleGrid } from '../components/WeeklyScheduleGrid';
import { ScheduleClassModal } from '../components/ScheduleClassModal';
import { ClassLiveDetailModal } from '../components/ClassLiveDetailModal';
import { CheckCircle2 } from 'lucide-react-native';

/**
 * Pantalla Principal de Gestión y Agenda de Clases
 */
export const ClasesList = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const {
    clases,
    selectedSalaId,
    setSelectedSalaId,
    selectedInstructorId,
    setSelectedInstructorId,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    selectedClassForDetail,
    setSelectedClassForDetail,
    isLoading,
    programarClase,
    isScheduling,
  } = useClasesAdmin();

  const handleConfirmSchedule = (payload) => {
    programarClase(payload, {
      onSuccess: () => {
        setToastMessage(`Clase "${payload.nombre}" agregada a la agenda.`);
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ClasesAgendaHeader
          salaId={selectedSalaId}
          onSelectSala={setSelectedSalaId}
          instructorId={selectedInstructorId}
          onSelectInstructor={setSelectedInstructorId}
          onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        />

        <WeeklyScheduleGrid
          clases={clases}
          isLoading={isLoading}
          onSelectClass={(clase) => setSelectedClassForDetail(clase)}
        />
      </ScrollView>

      <ScheduleClassModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onConfirmSchedule={handleConfirmSchedule}
        isLoading={isScheduling}
      />

      <ClassLiveDetailModal
        isOpen={!!selectedClassForDetail}
        onClose={() => setSelectedClassForDetail(null)}
        claseId={selectedClassForDetail?.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: tokens.colors.surface.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  toast: {
    position: 'absolute',
    top: 50,
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
});

export default ClasesList;
