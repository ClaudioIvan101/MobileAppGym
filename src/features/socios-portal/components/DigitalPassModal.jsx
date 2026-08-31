import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { RefreshCw } from 'lucide-react-native';

/**
 * Modal de Pase Digital / QR de Acceso al Gimnasio universal para React Native
 */
export const DigitalPassModal = ({
  isOpen,
  onClose,
  socio,
  membresia,
  qrData,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsRemaining(60);
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 60;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const codigoSocio = socio?.id || 'SF-8842';
  const nombreSocio = socio?.nombreCompleto || `${socio?.nombre || 'Socio'} ${socio?.apellido || ''}`;
  const plan = membresia?.planNombre || 'Membresía Activa';
  const estado = membresia?.estado || 'active';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pase Digital de Acceso"
      subtitle="Apoya el código frente al lector de torniquete o mostrador"
    >
      <View style={styles.modalContent}>
        {/* Tarjeta de Identidad en el Pase */}
        <View style={styles.passHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.memberName}>{nombreSocio}</Text>
            <View style={styles.memberMeta}>
              <Text style={styles.memberId}>ID: {codigoSocio}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.planBadge}>{plan}</Text>
            </View>
          </View>
          <Badge variant={estado} size="sm" />
        </View>

        {/* QR Code Svg */}
        <View style={styles.qrContainer}>
          <Svg viewBox="0 0 200 200" width={180} height={180}>
            {/* Fondo blanco */}
            <Rect width="200" height="200" fill="#FFFFFF" rx="12" />

            {/* Patrones de Esquinas */}
            <Rect x="20" y="20" width="40" height="40" fill="#090D14" rx="4" />
            <Rect x="26" y="26" width="28" height="28" fill="#FFFFFF" rx="2" />
            <Rect x="32" y="32" width="16" height="16" fill="#10B981" rx="2" />

            <Rect x="140" y="20" width="40" height="40" fill="#090D14" rx="4" />
            <Rect x="146" y="26" width="28" height="28" fill="#FFFFFF" rx="2" />
            <Rect x="152" y="32" width="16" height="16" fill="#10B981" rx="2" />

            <Rect x="20" y="140" width="40" height="40" fill="#090D14" rx="4" />
            <Rect x="26" y="146" width="28" height="28" fill="#FFFFFF" rx="2" />
            <Rect x="32" y="152" width="16" height="16" fill="#10B981" rx="2" />

            {/* Matriz central */}
            <G fill="#090D14">
              <Rect x="70" y="25" width="8" height="8" />
              <Rect x="85" y="25" width="12" height="8" />
              <Rect x="105" y="25" width="8" height="8" />
              <Rect x="120" y="25" width="8" height="8" />

              <Rect x="70" y="40" width="12" height="8" fill="#10B981" />
              <Rect x="90" y="40" width="8" height="8" />
              <Rect x="105" y="40" width="14" height="8" />
              
              <Rect x="25" y="70" width="8" height="12" />
              <Rect x="40" y="70" width="12" height="8" />
              <Rect x="60" y="70" width="8" height="8" />
              <Rect x="75" y="70" width="16" height="16" />
              <Rect x="100" y="70" width="8" height="8" />
              <Rect x="115" y="70" width="12" height="12" />
              <Rect x="135" y="70" width="8" height="8" />
              <Rect x="150" y="70" width="16" height="8" />

              <Rect x="25" y="90" width="12" height="8" />
              <Rect x="45" y="90" width="8" height="12" />
              <Rect x="60" y="95" width="12" height="8" fill="#10B981" />
              <Rect x="80" y="95" width="8" height="8" />
              <Rect x="95" y="90" width="16" height="8" />
              <Rect x="120" y="90" width="8" height="8" />
              <Rect x="135" y="90" width="12" height="12" />
              <Rect x="155" y="95" width="14" height="8" />

              <Rect x="25" y="110" width="8" height="8" />
              <Rect x="40" y="110" width="16" height="8" />
              <Rect x="65" y="110" width="8" height="12" />
              <Rect x="80" y="110" width="12" height="8" />
              <Rect x="100" y="110" width="8" height="8" />
              <Rect x="115" y="110" width="14" height="8" fill="#10B981" />
              <Rect x="135" y="110" width="8" height="8" />
              <Rect x="150" y="110" width="8" height="12" />

              <Rect x="70" y="140" width="12" height="8" />
              <Rect x="90" y="140" width="8" height="14" />
              <Rect x="105" y="140" width="14" height="8" />
              <Rect x="125" y="140" width="8" height="8" />
              <Rect x="140" y="140" width="12" height="8" />

              <Rect x="70" y="160" width="8" height="8" />
              <Rect x="85" y="155" width="12" height="12" fill="#10B981" />
              <Rect x="105" y="160" width="8" height="8" />
              <Rect x="120" y="160" width="16" height="8" />
              <Rect x="145" y="160" width="8" height="8" />
              <Rect x="160" y="155" width="12" height="12" />
            </G>

            {/* Logo Central de Seguridad StrongFit */}
            <Circle cx="100" cy="100" r="14" fill="#090D14" stroke="#10B981" strokeWidth="2" />
            <Path
              d="M94 100 L98 104 L106 96"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        {/* Temporizador */}
        <View style={styles.timerBox}>
          <View style={styles.timerHeader}>
            <View style={styles.timerTitleRow}>
              <RefreshCw size={13} color={tokens.colors.primary[400]} />
              <Text style={styles.timerLabel}>Código Dinámico Anti-Fraude</Text>
            </View>
            <Text style={styles.secondsCounter}>{secondsRemaining}s</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(secondsRemaining / 60) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Respaldo Manual */}
        <View style={styles.fallbackBox}>
          <Text style={styles.fallbackLabel}>Código manual para recepción:</Text>
          <Text style={styles.fallbackCode}>{codigoSocio}</Text>
        </View>

        {/* Botón de cierre */}
        <Button variant="secondary" fullWidth onPress={onClose} style={{ marginTop: 6 }}>
          Listo, volver
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    gap: 14,
  },
  passHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  headerLeft: {
    flex: 1,
    marginRight: 8,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  memberMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  memberId: {
    fontWeight: '700',
    color: tokens.colors.primary[400],
    fontSize: 12,
  },
  dotSeparator: {
    color: tokens.colors.text.muted,
    fontSize: 11,
  },
  planBadge: {
    color: tokens.colors.text.secondary,
    fontSize: 12,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBox: {
    backgroundColor: tokens.colors.surface.card,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 8,
  },
  timerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: tokens.colors.text.secondary,
  },
  secondsCounter: {
    fontSize: 13,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  progressBarBg: {
    height: 4,
    backgroundColor: tokens.colors.surface.border,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: tokens.colors.primary[500],
  },
  fallbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
  },
  fallbackLabel: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  fallbackCode: {
    fontSize: 14,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
});

export default DigitalPassModal;
