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
import { useSocioProfile360 } from '../hooks/useSocioProfile360';
import { SocioProfileHeader } from '../components/SocioProfileHeader';
import { TabMemberships } from '../components/TabMemberships';
import { TabPaymentsAccount } from '../components/TabPaymentsAccount';
import { TabAttendanceHistory } from '../components/TabAttendanceHistory';
import { TabMedicalNotes } from '../components/TabMedicalNotes';
import { RegisterPaymentModal } from '../components/RegisterPaymentModal';
import { AssignPlanModal } from '../components/AssignPlanModal';
import { CheckCircle2 } from 'lucide-react-native';

const TABS = [
  { id: 'membresias', label: '1. Planes' },
  { id: 'pagos', label: '2. Cuenta y Pagos' },
  { id: 'asistencias', label: '3. Asistencias' },
  { id: 'medico', label: '4. Apto y Notas' },
];

/**
 * Ficha 360° del Socio universal para React Native
 */
export const SocioProfile = ({
  socioId = 'SF-8842',
  onBack = () => console.log('Volver'),
}) => {
  const [activeTab, setActiveTab] = useState('membresias');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    socio,
    agregarNota,
    isAddingNota,
    registrarPago,
    isRegisteringPago,
    asignarPlan,
    isAssigningPlan,
  } = useSocioProfile360(socioId);

  const handleConfirmPayment = (payload) => {
    registrarPago(payload, {
      onSuccess: () => {
        setToastMessage(`Cobro de ${payload.monto} completado con éxito.`);
        setIsPaymentModalOpen(false);
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  const handleConfirmPlan = (payload) => {
    asignarPlan(payload, {
      onSuccess: () => {
        setToastMessage(`Plan "${payload.planNombre}" asignado correctamente.`);
        setIsPlanModalOpen(false);
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  const handleAddNota = (payload, options) => {
    agregarNota(payload, {
      onSuccess: () => {
        setToastMessage('Nota interna agregada con éxito.');
        options?.onSuccess?.();
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
        {/* Cabecera */}
        <SocioProfileHeader
          socio={socio}
          onBack={onBack}
          onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          onOpenPlanModal={() => setIsPlanModalOpen(true)}
        />

        {/* Barra de Pestañas */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsNav}
        >
          {TABS.map((tab) => {
            const isSelected = tab.id === activeTab;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.75}
                style={[
                  styles.tabNavBtn,
                  isSelected ? styles.tabNavActive : styles.tabNavInactive,
                ]}
              >
                <Text
                  style={[
                    styles.tabNavText,
                    { color: isSelected ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Contenido Pestañas */}
        {activeTab === 'membresias' && (
          <TabMemberships
            socio={socio}
            onOpenAssignPlan={() => setIsPlanModalOpen(true)}
          />
        )}

        {activeTab === 'pagos' && (
          <TabPaymentsAccount
            socio={socio}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        )}

        {activeTab === 'asistencias' && (
          <TabAttendanceHistory
            socio={socio}
          />
        )}

        {activeTab === 'medico' && (
          <TabMedicalNotes
            socio={socio}
            onAddNota={handleAddNota}
            isAdding={isAddingNota}
          />
        )}
      </ScrollView>

      {/* Modales */}
      <RegisterPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        socio={socio}
        onConfirmPayment={handleConfirmPayment}
        isLoading={isRegisteringPago}
      />

      <AssignPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        socio={socio}
        onConfirmPlan={handleConfirmPlan}
        isLoading={isAssigningPlan}
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
  tabsNav: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 2,
  },
  tabNavBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  tabNavInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  tabNavActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: tokens.colors.primary[500],
  },
  tabNavText: {
    fontSize: 12,
    fontWeight: '700',
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

export default SocioProfile;
