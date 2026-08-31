import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { useDeudoresList } from '../hooks/useDeudoresList';
import { useReportesMetricas } from '../hooks/useReportesMetricas';
import { ReportesHeader } from '../components/ReportesHeader';
import { DeudoresKpisGrid } from '../components/DeudoresKpisGrid';
import { DeudoresFilterBar } from '../components/DeudoresFilterBar';
import { DeudoresTable } from '../components/DeudoresTable';
import { BulkReminderModal } from '../components/BulkReminderModal';
import { BusinessKpiSummary } from '../components/BusinessKpiSummary';
import { RevenueRetentionChart } from '../components/RevenueRetentionChart';
import { PeakHoursActivitiesCard } from '../components/PeakHoursActivitiesCard';
import { CheckCircle2 } from 'lucide-react-native';

/**
 * Pantalla Principal de Reportes y Deudores universal para React Native
 */
export const Reportes = () => {
  const [activeTab, setActiveTab] = useState('deudores'); // 'deudores' | 'metricas'
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    deudores,
    search,
    setSearch,
    moraMinima,
    setMoraMinima,
    stats,
    registrarCobroExpress,
    enviarRecordatorioMasivo,
    isSendingBulk,
    exportarCsv,
    exportarExcel,
  } = useDeudoresList();

  const {
    metricas,
  } = useReportesMetricas();

  const handleConfirmBulkSend = (payload) => {
    enviarRecordatorioMasivo(payload, {
      onSuccess: () => {
        setIsBulkModalOpen(false);
        setToastMessage(`Recordatorios enviados a ${deudores.length} socios.`);
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  const handlePaySocio = (socio) => {
    registrarCobroExpress(socio.id, {
      onSuccess: () => {
        setToastMessage(`Cobro de ${socio.montoFormateado} registrado para ${socio.nombreCompleto}.`);
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
        {/* Header con tabs */}
        <ReportesHeader
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onExportCsv={exportarCsv}
          onExportExcel={exportarExcel}
        />

        {/* PESTAÑA 1: GESTIÓN DE DEUDORES */}
        {activeTab === 'deudores' && (
          <View style={styles.tabContent}>
            {/* KPIs */}
            <DeudoresKpisGrid
              totalDeudores={stats.totalDeudores}
              deudaTotalSum={stats.deudaTotalSum}
              deudoresCriticosCount={stats.deudoresCriticosCount}
            />

            {/* Filtros */}
            <DeudoresFilterBar
              search={search}
              onSearchChange={setSearch}
              moraMinima={moraMinima}
              onMoraMinimaChange={setMoraMinima}
              totalResultados={deudores.length}
              onOpenBulkModal={() => setIsBulkModalOpen(true)}
            />

            {/* Listado de Deudores */}
            <DeudoresTable
              deudores={deudores}
              onPaySocio={handlePaySocio}
            />
          </View>
        )}

        {/* PESTAÑA 2: REPORTES ANALÍTICOS */}
        {activeTab === 'metricas' && (
          <View style={styles.tabContent}>
            {/* KPIs Estratégicos */}
            <BusinessKpiSummary
              kpis={metricas.kpis}
            />

            {/* Facturación y Retención */}
            <RevenueRetentionChart
              facturacionMensual={metricas.facturacionMensual}
              retencionYChurn={metricas.retencionYChurn}
            />

            {/* Disciplinas y Horarios Pico */}
            <PeakHoursActivitiesCard
              actividadesTop={metricas.actividadesTop}
              horariosPico={metricas.horariosPico}
            />
          </View>
        )}
      </ScrollView>

      {/* Modal Envío Masivo */}
      <BulkReminderModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        totalDeudores={deudores.length}
        onConfirmSend={handleConfirmBulkSend}
        isLoading={isSendingBulk}
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
  tabContent: {
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

export default Reportes;
