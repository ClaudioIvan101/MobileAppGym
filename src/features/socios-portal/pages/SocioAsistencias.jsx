import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { useSocioAsistencias } from '../hooks/useSocioAsistencias';
import { AttendanceConsistencyHeatmap } from '../components/AttendanceConsistencyHeatmap';
import { AttendanceDateRangeFilter } from '../components/AttendanceDateRangeFilter';
import { AttendanceLogList } from '../components/AttendanceLogList';
import { Button } from '../../../components/Button';
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from 'lucide-react-native';

/**
 * Pantalla de Historial de Asistencias del Socio universal para React Native
 */
export const SocioAsistencias = ({
  onBack = () => console.log('Volver'),
}) => {
  const {
    resumen,
    heatmapDias,
    historial,
    isLoading,
    isError,
    refetch,
    rango,
    setRango,
    tipoFiltro,
    setTipoFiltro,
  } = useSocioAsistencias();

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
            <Text style={styles.headerSubtitle}>MÉTRICAS Y PROGRESO</Text>
            <Text style={styles.headerTitle}>Mis Asistencias</Text>
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

      {/* Error */}
      {isError && (
        <View style={styles.errorAlert}>
          <AlertCircle size={18} color="#f87171" />
          <View style={styles.errorTextCol}>
            <Text style={styles.errorTitle}>Error al sincronizar</Text>
            <Text style={styles.errorSub}>No pudimos cargar tu registro de entradas.</Text>
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
        {/* 1. Heatmap Mensual */}
        <AttendanceConsistencyHeatmap
          heatmapDias={heatmapDias}
          resumen={resumen}
          isLoading={isLoading}
        />

        {/* 2. Filtros de Período y Tipo */}
        <AttendanceDateRangeFilter
          rango={rango}
          onSelectRango={setRango}
          tipoFiltro={tipoFiltro}
          onSelectTipoFiltro={setTipoFiltro}
        />

        {/* 3. Lista Cronológica de Asistencias */}
        <AttendanceLogList
          historial={historial}
          isLoading={isLoading}
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
    gap: 16,
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
});

export default SocioAsistencias;
