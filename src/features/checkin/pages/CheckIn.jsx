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
import { useCheckin } from '../hooks/useCheckin';
import { CheckinScannerInput } from '../components/CheckinScannerInput';
import { CheckinResultCard } from '../components/CheckinResultCard';
import { RecentCheckinsFeed } from '../components/RecentCheckinsFeed';
import { Button } from '../../../components/Button';
import {
  Scan,
  Monitor,
  Volume2,
  VolumeX,
  CheckCircle2,
} from 'lucide-react-native';

/**
 * Pantalla de Control de Check-In universal para React Native
 */
export const CheckIn = ({
  onOpenKiosk = () => console.log('Abrir Kiosko'),
  onCobrarPase = (socio) => console.log('Cobrar Pase Diario a:', socio),
  onRenovarMembresia = (socio) => console.log('Renovar a:', socio),
}) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    lastResult,
    searchValue,
    setSearchValue,
    validarCheckin,
    isValidating,
    forzarAcceso,
    isForcingAcceso,
    recientes,
    isRecientesLoading,
  } = useCheckin({ playSound: audioEnabled });

  const handleForzarAcceso = (socioId, motivo) => {
    forzarAcceso(
      { socioId, motivo },
      {
        onSuccess: () => {
          setToastMessage('Acceso excepcional registrado con éxito.');
          setTimeout(() => setToastMessage(null), 3000);
        },
      }
    );
  };

  const handleAsignarCupo = (claseId, socioId) => {
    setToastMessage('Cupo asignado. Ingreso permitido.');
    setTimeout(() => setToastMessage(null), 3000);
    validarCheckin('41.892.401');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.badgeStaff}>
            <Scan size={18} color={tokens.colors.primary[400]} />
          </View>
          <View>
            <Text style={styles.headerSubtitle}>STAFF • RECEPCIÓN</Text>
            <Text style={styles.headerTitle}>Punto de Check-In</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.iconControlBtn,
              audioEnabled && { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: tokens.colors.primary[500] },
            ]}
            onPress={() => setAudioEnabled((prev) => !prev)}
            activeOpacity={0.7}
          >
            {audioEnabled ? (
              <Volume2 size={16} color={tokens.colors.primary[400]} />
            ) : (
              <VolumeX size={16} color={tokens.colors.text.muted} />
            )}
          </TouchableOpacity>

          <Button
            variant="outline"
            size="sm"
            icon={Monitor}
            onPress={onOpenKiosk}
          >
            Kiosko
          </Button>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scanner / Buscador */}
        <CheckinScannerInput
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={(code) => validarCheckin(code)}
          isLoading={isValidating}
        />

        {/* Tarjeta de Resultado Grande */}
        <CheckinResultCard
          result={lastResult}
          onCobrarPase={onCobrarPase}
          onRenovarMembresia={onRenovarMembresia}
          onForzarAcceso={handleForzarAcceso}
          onAsignarCupoClase={handleAsignarCupo}
          isForcing={isForcingAcceso}
        />

        {/* Feed de Accesos Recientes */}
        <RecentCheckinsFeed
          recientes={recientes}
          isLoading={isRecientesLoading}
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
    gap: 10,
  },
  badgeStaff: {
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconControlBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
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

export default CheckIn;
