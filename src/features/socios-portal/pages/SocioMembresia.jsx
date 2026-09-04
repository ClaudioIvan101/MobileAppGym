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
import { useSocioMembresia } from '../hooks/useSocioMembresia';
import { ExpiringAlertBanner } from '../components/ExpiringAlertBanner';
import { MembershipDetailsCard } from '../components/MembershipDetailsCard';
import { ClassPackProgress } from '../components/ClassPackProgress';
import { PaymentHistoryList } from '../components/PaymentHistoryList';
import { ReceiptModal } from '../components/ReceiptModal';
import { Button } from '../../../components/Button';
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Headphones,
} from 'lucide-react-native';

/**
 * Pantalla de Membresía y Pagos del Socio universal para React Native
 */
export const SocioMembresia = ({
  onBack = () => console.log('Volver'),
  onContactSupport = () => console.log('Contactar Recepción'),
}) => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    membresia,
    historialPagos,
    isLoading,
    isError,
    refetch,
    isExpiringSoon,
    isPackClases,
    clasesTotales,
    clasesRestantes,
    solicitarRenovacion,
    isSolicitandoRenovacion,
  } = useSocioMembresia();

  const handleRenovacion = () => {
    solicitarRenovacion(
      { planId: membresia?.planNombre },
      {
        onSuccess: () => {
          setToastMessage('¡Solicitud enviada! En recepción te contactarán.');
          setTimeout(() => setToastMessage(null), 4000);
        },
        onError: () => {
          setToastMessage('No se pudo enviar la solicitud.');
          setTimeout(() => setToastMessage(null), 4000);
        },
      }
    );
  };

  const handleDownloadPDF = (pago) => {
    setToastMessage(`Descargando comprobante ${pago.numeroFactura || pago.id}...`);
    setTimeout(() => setToastMessage(null), 3000);
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
            <Text style={styles.headerSubtitle}>PORTAL DEL SOCIO</Text>
            <Text style={styles.headerTitle}>Mi Membresía</Text>
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

      {/* Toast */}
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Error */}
      {isError && (
        <View style={styles.errorAlert}>
          <AlertCircle size={18} color="#f87171" />
          <View style={styles.errorTextCol}>
            <Text style={styles.errorTitle}>Error al sincronizar</Text>
            <Text style={styles.errorSub}>Verifica tu conexión y reintenta.</Text>
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
        {/* 1. Alerta si vence pronto */}
        {isExpiringSoon && (
          <ExpiringAlertBanner
            diasRestantes={membresia?.diasRestantes}
            fechaFin={membresia?.fechaFin}
            onRenovar={handleRenovacion}
            isLoading={isSolicitandoRenovacion}
          />
        )}

        {/* 2. Ficha de la Membresía Actual */}
        <MembershipDetailsCard
          membresia={membresia}
          isLoading={isLoading}
        />

        {/* 3. Consumo de Pack (si aplica) */}
        {isPackClases && (
          <ClassPackProgress
            clasesTotales={clasesTotales}
            clasesRestantes={clasesRestantes}
            isLoading={isLoading}
          />
        )}

        {/* 4. Tarjeta de Asistencia */}
        <View style={styles.supportCard}>
          <View style={styles.supportIconCircle}>
            <Headphones size={18} color={tokens.colors.primary[400]} />
          </View>
          <View style={styles.supportTextCol}>
            <Text style={styles.supportTitle}>¿Deseas cambiar de plan?</Text>
            <Text style={styles.supportDescription}>
              Puedes consultar por upgrades o solicitar pausa temporal en recepción.
            </Text>
          </View>
          <Button
            variant="outline"
            size="sm"
            onPress={onContactSupport}
          >
            Consultar en Recepción
          </Button>
        </View>

        {/* 5. Historial de Pagos y Comprobantes */}
        <PaymentHistoryList
          pagos={historialPagos}
          isLoading={isLoading}
          onViewReceipt={(pago) => setSelectedReceipt(pago)}
          onDownloadReceipt={handleDownloadPDF}
        />
      </ScrollView>

      {/* Modal de Comprobante */}
      <ReceiptModal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        pago={selectedReceipt}
        socio={membresia}
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
    gap: 16,
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
  supportCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
  },
  supportIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportTextCol: {
    gap: 3,
  },
  supportTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  supportDescription: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    lineHeight: 16,
  },
});

export default SocioMembresia;
