import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Unlock, Lock, AlertTriangle } from 'lucide-react-native';

/**
 * Banner de Validación y Estado de Caja universal para React Native
 */
export const CashRegisterGuardBanner = ({
  isCajaAbierta = true,
  cajaData,
  onOpenCaja,
}) => {
  if (!isCajaAbierta) {
    return (
      <View style={styles.alertBanner}>
        <View style={styles.alertRow}>
          <AlertTriangle size={18} color="#f87171" />
          <View style={styles.alertTextCol}>
            <Text style={styles.alertTitle}>Caja Cerrada • Ventas Bloqueadas</Text>
            <Text style={styles.alertSub}>
              Debes abrir la caja del turno con el fondo inicial antes de vender.
            </Text>
          </View>
        </View>

        <Button
          variant="danger"
          size="sm"
          icon={Unlock}
          onPress={onOpenCaja}
          style={{ marginTop: 6 }}
        >
          Abrir Caja
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.openBanner}>
      <View style={styles.openLeft}>
        <View style={styles.openIconBadge}>
          <Lock size={12} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.statusPill}>🟢 Caja Abierta • {cajaData?.turno || 'Turno Mañana'}</Text>
          <Text style={styles.responsableText}>
            Resp: {cajaData?.responsable || 'Staff'} • Fondo: $ {cajaData?.saldoInicial?.toLocaleString?.('es-AR') || '50.000'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alertTextCol: {
    flex: 1,
    gap: 2,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#f87171',
  },
  alertSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  openBanner: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  openLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  responsableText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
});

export default CashRegisterGuardBanner;
