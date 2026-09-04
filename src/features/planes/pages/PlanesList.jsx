import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { usePlanesList } from '../hooks/usePlanesList';
import { PlanesHeader } from '../components/PlanesHeader';
import { PlanesStatsGrid } from '../components/PlanesStatsGrid';
import { PlanesGrid } from '../components/PlanesGrid';
import { PlanFormModal } from '../components/PlanFormModal';
import { CheckCircle2 } from 'lucide-react-native';

/**
 * Pantalla Principal de CRUD de Planes universal para React Native
 */
export const PlanesList = () => {
  const [selectedPlanForEdit, setSelectedPlanForEdit] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    planes,
    search,
    setSearch,
    modalidad,
    setModalidad,
    estado,
    setEstado,
    totalPlanes,
    planesActivos,
    totalSociosSuscritos,
    isLoading,
    createPlan,
    isCreating,
    updatePlan,
    isUpdating,
    toggleEstado,
  } = usePlanesList();

  const handleSavePlan = (planData) => {
    if (selectedPlanForEdit) {
      updatePlan(
        { planId: selectedPlanForEdit.id, payload: planData },
        {
          onSuccess: () => {
            setSelectedPlanForEdit(null);
            setToastMessage(`Plan "${planData.nombre}" actualizado.`);
            setTimeout(() => setToastMessage(null), 3000);
          },
        }
      );
    } else {
      createPlan(planData, {
        onSuccess: () => {
          setIsCreateModalOpen(false);
          setToastMessage(`Plan "${planData.nombre}" creado exitosamente.`);
          setTimeout(() => setToastMessage(null), 3000);
        },
      });
    }
  };

  const handleToggleEstado = (plan) => {
    const nuevoEstado = plan.estado === 'ACTIVO' ? 'PAUSADO' : 'ACTIVO';
    toggleEstado({ planId: plan.id, nuevoEstado }, {
      onSuccess: () => {
        setToastMessage(`Plan "${plan.nombre}" ahora está ${nuevoEstado}.`);
        setTimeout(() => setToastMessage(null), 3000);
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
        {/* Header & Filtros */}
        <PlanesHeader
          search={search}
          onSearchChange={setSearch}
          modalidad={modalidad}
          onModalidadChange={setModalidad}
          estado={estado}
          onEstadoChange={setEstado}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        {/* KPIs */}
        <PlanesStatsGrid
          totalPlanes={totalPlanes}
          planesActivos={planesActivos}
          totalSociosSuscritos={totalSociosSuscritos}
        />

        {/* Grilla de Planes */}
        <PlanesGrid
          planes={planes}
          isLoading={isLoading}
          onEditPlan={(plan) => setSelectedPlanForEdit(plan)}
          onToggleEstado={handleToggleEstado}
        />
      </ScrollView>

      {/* Modal Crear / Editar */}
      <PlanFormModal
        isOpen={isCreateModalOpen || !!selectedPlanForEdit}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedPlanForEdit(null);
        }}
        plan={selectedPlanForEdit}
        onSave={handleSavePlan}
        isLoading={isCreating || isUpdating}
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
    gap: 14,
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

export default PlanesList;
