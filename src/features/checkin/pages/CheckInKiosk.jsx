import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { useCheckin } from '../hooks/useCheckin';
import {
  Scan,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Dumbbell,
} from 'lucide-react-native';

/**
 * Modo Kiosko / Pantalla del Torniquete universal para React Native
 */
export const CheckInKiosk = ({
  onCloseKiosk,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [countdown, setCountdown] = useState(4);

  const {
    lastResult,
    validarCheckin,
    clearResult,
  } = useCheckin({ playSound: true });

  useEffect(() => {
    if (!lastResult) return;

    setCountdown(4);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearResult();
          setInputVal('');
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [lastResult, clearResult]);

  const handleSubmit = () => {
    if (inputVal.trim()) {
      validarCheckin(inputVal.trim());
      setInputVal('');
    }
  };

  const isHabilitado = lastResult?.tipoResultado === 'HABILITADO';
  const isDenegado = lastResult?.tipoResultado === 'DENEGADO_CUOTA';

  return (
    <SafeAreaView style={styles.kioskContainer}>
      {/* Header */}
      <View style={styles.kioskHeader}>
        <View style={styles.brandRow}>
          <Dumbbell size={24} color={tokens.colors.primary[500]} />
          <Text style={styles.brandName}>StrongFit</Text>
        </View>

        {onCloseKiosk && (
          <TouchableOpacity style={styles.exitKioskBtn} onPress={onCloseKiosk}>
            <Text style={styles.exitKioskText}>Salir</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Contenido Principal */}
      <View style={styles.centerContent}>
        {lastResult ? (
          <View
            style={[
              styles.resultCard,
              {
                borderColor: isHabilitado
                  ? tokens.colors.primary[500]
                  : isDenegado
                  ? '#ef4444'
                  : '#f59e0b',
              },
            ]}
          >
            <Image
              source={{
                uri:
                  lastResult.socio?.foto ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
              }}
              style={[
                styles.avatarGiant,
                {
                  borderColor: isHabilitado
                    ? tokens.colors.primary[500]
                    : isDenegado
                    ? '#ef4444'
                    : '#f59e0b',
                },
              ]}
            />

            <View style={styles.messageGroup}>
              <Text
                style={[
                  styles.stateBadgeText,
                  { color: isHabilitado ? tokens.colors.primary[400] : isDenegado ? '#f87171' : '#fbbf24' },
                ]}
              >
                {isHabilitado ? '¡ACCESO HABILITADO!' : isDenegado ? 'ACCESO DENEGADO' : 'AVISO'}
              </Text>

              <Text style={styles.clientGreeting}>
                {isHabilitado ? `¡A entrenar, ${lastResult.socio?.nombre}!` : lastResult.socio?.nombre}
              </Text>

              <Text style={styles.resultMotivoText}>{lastResult.motivo}</Text>
            </View>

            <Text style={styles.autoResetText}>Listo en {countdown}s...</Text>
          </View>
        ) : (
          <View style={styles.idleKioskBox}>
            <View style={styles.scanLaserBox}>
              <Scan size={56} color={tokens.colors.primary[400]} />
            </View>

            <Text style={styles.kioskInstructionTitle}>
              Apoya tu código QR o digita DNI
            </Text>
            <Text style={styles.kioskInstructionSub}>
              Ubica el código frente al lector
            </Text>

            <View style={styles.inputBox}>
              <TextInput
                value={inputVal}
                onChangeText={setInputVal}
                placeholder="Ingresar DNI manualmente..."
                placeholderTextColor={tokens.colors.text.muted}
                style={styles.manualInput}
                onSubmitEditing={handleSubmit}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  kioskContainer: {
    flex: 1,
    backgroundColor: '#06090F',
  },
  kioskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  exitKioskBtn: {
    backgroundColor: tokens.colors.surface.card,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  exitKioskText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    fontWeight: '700',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  idleKioskBox: {
    alignItems: 'center',
    gap: 14,
    width: '100%',
    maxWidth: 360,
  },
  scanLaserBox: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 2,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  kioskInstructionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: tokens.colors.text.primary,
    textAlign: 'center',
  },
  kioskInstructionSub: {
    fontSize: 13,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
  },
  inputBox: {
    width: '100%',
    marginTop: 10,
  },
  manualInput: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    color: tokens.colors.text.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    alignItems: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 360,
  },
  avatarGiant: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
  },
  messageGroup: {
    alignItems: 'center',
    gap: 6,
  },
  stateBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  clientGreeting: {
    fontSize: 18,
    fontWeight: '900',
    color: tokens.colors.text.primary,
    textAlign: 'center',
  },
  resultMotivoText: {
    fontSize: 13,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
  },
  autoResetText: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
});

export default CheckInKiosk;
