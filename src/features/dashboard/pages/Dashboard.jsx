import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../../theme/tokens';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { MemberQuickSearchBar } from '../components/MemberQuickSearchBar';
import { KpiStatsGrid } from '../components/KpiStatsGrid';
import { RevenueAttendanceChart } from '../components/RevenueAttendanceChart';
import { LiveActivityTabs } from '../components/LiveActivityTabs';
import { ExpiringMembersList } from '../components/ExpiringMembersList';
import { CheckCircle2 } from 'lucide-react-native';

/**
 * Pantalla Principal del Dashboard universal para React Native
 */
export const Dashboard = ({
  onOpenSocioFicha = (socio) => console.log('Abrir Ficha:', socio),
  onCobrarPase = () => console.log('Cobrar Pase'),
  onNuevoSocio = () => console.log('Nuevo Socio'),
  onExportar = () => console.log('Exportar'),
}) => {
  const [toastMessage, setToastMessage] = useState(null);

  const {
    rango,
    setRango,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    kpis,
    graficoMetricas,
    actividadEnVivo,
    proximosVencimientos,
    isLoading,
  } = useAdminDashboard();

  const handleExport = () => {
    setToastMessage('Reporte generado en formato XLSX.');
    setTimeout(() => setToastMessage(null), 3000);
    if (onExportar) onExportar();
  };

  const handleCobrarCuota = (member) => {
    setToastMessage(`Cobro iniciado para ${member.nombre}.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeContainer}>
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
        {/* 1. Header con Saludo y Acciones */}
        <DashboardHeader
          rango={rango}
          onSelectRango={setRango}
          onCobrarPase={onCobrarPase}
          onNuevoSocio={onNuevoSocio}
          onExportar={handleExport}
        />

        {/* 2. Barra de Búsqueda Rápida */}
        <MemberQuickSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          results={searchResults}
          isLoading={isSearching}
          onSelectMember={(member) => onOpenSocioFicha(member)}
        />

        {/* 3. 4 Stat Cards KPI */}
        <KpiStatsGrid
          kpis={kpis}
          isLoading={isLoading}
        />

        {/* 4. Gráfico Asistencias vs Ingresos */}
        <RevenueAttendanceChart
          data={graficoMetricas}
          isLoading={isLoading}
        />

        {/* 5. Pestañas de Actividad Operativa en Vivo */}
        <LiveActivityTabs
          actividad={actividadEnVivo}
        />

        {/* 6. Lista de Próximos Vencimientos */}
        <ExpiringMembersList
          vencimientos={proximosVencimientos}
          isLoading={isLoading}
          onCobrarCuota={handleCobrarCuota}
        />
      </ScrollView>
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

export default Dashboard;
