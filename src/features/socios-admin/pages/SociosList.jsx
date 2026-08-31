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
import { useSociosList } from '../hooks/useSociosList';
import { SociosFiltersBar } from '../components/SociosFiltersBar';
import { SociosTable } from '../components/SociosTable';
import { RegisterPaymentModal } from '../components/RegisterPaymentModal';
import { AssignPlanModal } from '../components/AssignPlanModal';
import {
  Users,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react-native';

/**
 * Pantalla Principal de Gestión de Socios universal para React Native
 */
export const SociosList = ({
  onViewSocioProfile = (socio) => console.log('Ver Ficha 360 de:', socio),
  onNuevoSocio = () => console.log('Crear Nuevo Socio'),
}) => {
  const [selectedSocioForPayment, setSelectedSocioForPayment] = useState(null);
  const [selectedSocioForPlan, setSelectedSocioForPlan] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    socios,
    total,
    page,
    setPage,
    totalPages,
    estado,
    setEstado,
    search,
    setSearch,
    isLoading,
    refetch,
    cambiarEstado,
  } = useSociosList();

  const handleToggleStatus = (socio) => {
    const nuevoEstado = socio.planEstado === 'active' ? 'inactive' : 'active';
    cambiarEstado(
      { socioId: socio.id, nuevoEstado },
      {
        onSuccess: () => {
          setToastMessage(`Estado de ${socio.nombreCompleto} modificado a "${nuevoEstado}".`);
          setTimeout(() => setToastMessage(null), 3000);
        },
      }
    );
  };

  const handleConfirmPayment = (payload) => {
    setToastMessage(`Pago de ${payload.monto} registrado exitosamente.`);
    setSelectedSocioForPayment(null);
    setTimeout(() => setToastMessage(null), 3000);
    refetch();
  };

  const handleConfirmPlan = (payload) => {
    setToastMessage(`Plan "${payload.planNombre}" asignado correctamente.`);
    setSelectedSocioForPlan(null);
    setTimeout(() => setToastMessage(null), 3000);
    refetch();
  };

  const handleExport = () => {
    setToastMessage('Exportando base de socios a XLSX...');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Toast Feedback */}
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <Users size={18} color={tokens.colors.primary[400]} />
          </View>
          <View>
            <Text style={styles.headerSubtitle}>ADMINISTRACIÓN</Text>
            <Text style={styles.headerTitle}>Directorio de Socios</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => refetch()}
          activeOpacity={0.7}
        >
          <RefreshCw size={16} color={tokens.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra de Filtros */}
        <SociosFiltersBar
          search={search}
          onSearchChange={setSearch}
          estado={estado}
          onEstadoChange={setEstado}
          totalResults={total}
          onNuevoSocio={onNuevoSocio}
          onExportar={handleExport}
        />

        {/* Tabla de Socios */}
        <SociosTable
          socios={socios}
          total={total}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
          onViewProfile={onViewSocioProfile}
          onRegisterPayment={(socio) => setSelectedSocioForPayment(socio)}
          onAssignPlan={(socio) => setSelectedSocioForPlan(socio)}
          onToggleStatus={handleToggleStatus}
        />
      </ScrollView>

      {/* Modal Registrar Pago */}
      <RegisterPaymentModal
        isOpen={!!selectedSocioForPayment}
        onClose={() => setSelectedSocioForPayment(null)}
        socio={selectedSocioForPayment}
        onConfirmPayment={handleConfirmPayment}
      />

      {/* Modal Asignar Plan */}
      <AssignPlanModal
        isOpen={!!selectedSocioForPlan}
        onClose={() => setSelectedSocioForPlan(null)}
        socio={selectedSocioForPlan}
        onConfirmPlan={handleConfirmPlan}
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
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  refreshBtn: {
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

export default SociosList;
