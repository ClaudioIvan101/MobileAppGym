import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../../theme/tokens';
import { useSocioDashboard } from '../hooks/useSocioDashboard';
import { HeroIdentityCard } from '../components/HeroIdentityCard';
import { DigitalPassModal } from '../components/DigitalPassModal';
import { PersonalMetricsGrid } from '../components/PersonalMetricsGrid';
import { UpcomingReservationsWidget } from '../components/UpcomingReservationsWidget';
import { QuickActionButtons } from '../components/QuickActionButtons';
import { Button } from '../../../components/Button';
import {
  QrCode,
  Bell,
  RefreshCw,
  AlertCircle,
  Dumbbell,
  CheckCircle2,
} from 'lucide-react-native';

/**
 * Pantalla Principal del Socio (SocioHome) universal para React Native (Mobile & Web)
 */
export const SocioHome = ({
  onNavigateToClasses = () => console.log('Navegar a Reservas'),
  onNavigateToRoutines = () => console.log('Navegar a Rutinas'),
  onNavigateToMembership = () => console.log('Navegar a Membresía'),
  onNavigateToNotifications = () => console.log('Navegar a Notificaciones'),
  onNavigateToProfile = () => console.log('Navegar a Perfil'),
}) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Hook centralizado con TanStack Query
  const {
    socio,
    membresia,
    metricasMes,
    proximasReservas,
    qrPaseDigital,
    isLoading,
    isError,
    refetch,
    cancelarReserva,
    isCanceling,
  } = useSocioDashboard();

  const handleCancelReserva = (reservaId) => {
    cancelarReserva(reservaId, {
      onSuccess: () => {
        setToastMessage('Tu reserva ha sido cancelada y el crédito fue reembolsado.');
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('No se pudo cancelar la reserva. Inténtalo de nuevo.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeContainer}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Dumbbell size={16} color={tokens.colors.primary[500]} />
          </View>
          <Text style={styles.brandName}>
            Strong<Text style={styles.brandAccent}>Fit</Text>
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => refetch()}
            activeOpacity={0.7}
          >
            <RefreshCw size={16} color={tokens.colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onNavigateToNotifications}
            activeOpacity={0.7}
          >
            <Bell size={16} color={tokens.colors.text.secondary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerQrBtn}
            onPress={() => setIsQRModalOpen(true)}
            activeOpacity={0.8}
          >
            <QrCode size={16} color={tokens.colors.primary[400]} />
            <Text style={styles.headerQrText}>Pase QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileAvatarBtn}
            onPress={onNavigateToProfile}
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri:
                  socio?.fotoUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
              }}
              style={styles.headerAvatarImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notificación Toast Flotante */}
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Manejo de Error en Conexión */}
      {isError && (
        <View style={styles.errorAlert}>
          <AlertCircle size={18} color="#f87171" />
          <View style={styles.errorTextCol}>
            <Text style={styles.errorTitle}>Error al sincronizar datos</Text>
            <Text style={styles.errorSub}>No pudimos cargar la información en vivo.</Text>
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
        {/* 1. Hero Card de Identidad y Membresía */}
        <HeroIdentityCard
          socio={socio}
          membresia={membresia}
          isLoading={isLoading}
          onOpenQR={() => setIsQRModalOpen(true)}
        />

        {/* 2. Métricas Personales del Mes (3 Mini-KPIs con radius-sm: 8px) */}
        <PersonalMetricsGrid
          metricas={metricasMes}
          isLoading={isLoading}
        />

        {/* 3. Próximas Reservas */}
        <UpcomingReservationsWidget
          reservas={proximasReservas}
          isLoading={isLoading}
          onCancelReserva={handleCancelReserva}
          isCanceling={isCanceling}
          onNavigateToClasses={onNavigateToClasses}
        />

        {/* 4. Accesos Rápidos */}
        <QuickActionButtons
          isLoading={isLoading}
          onNavigateReservas={onNavigateToClasses}
          onNavigateRutinas={onNavigateToRoutines}
          onNavigateMembresia={onNavigateToMembership}
        />
      </ScrollView>

      {/* Modal Interactivo del Pase Digital / QR */}
      <DigitalPassModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        socio={socio}
        membresia={membresia}
        qrData={qrPaseDigital}
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: tokens.colors.text.primary,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: tokens.colors.primary[500],
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.colors.primary[500],
  },
  headerQrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    borderRadius: 9999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  headerQrText: {
    fontSize: 12,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  profileAvatarBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: tokens.colors.primary[500],
    overflow: 'hidden',
  },
  headerAvatarImg: {
    width: '100%',
    height: '100%',
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
});

export default SocioHome;
