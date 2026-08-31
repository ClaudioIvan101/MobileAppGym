import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import {
  Lock,
  Unlock,
  MinusCircle,
} from 'lucide-react-native';

/**
 * Hero Card de Estado de Caja universal para React Native
 */
export const CajaStatusHero = ({
  caja,
  isAbierta = false,
  onOpenCaja,
  onCloseCaja,
  onRegisterExpense,
}) => {
  return (
    <View
      style={[
        styles.heroCard,
        { borderColor: isAbierta ? tokens.colors.primary[500] : 'rgba(239, 68, 68, 0.4)' },
      ]}
    >
      <View style={styles.leftCol}>
        <View style={styles.statusBadgeRow}>
          <Text
            style={[
              styles.statusPill,
              { color: isAbierta ? tokens.colors.primary[400] : '#f87171' },
            ]}
          >
            {isAbierta ? '🟢 CAJA ABIERTA' : '🔴 CAJA CERRADA'}
          </Text>
          <Text style={styles.cajaIdText}>{caja?.cajaId || 'Sin turno'}</Text>
        </View>

        <Text style={styles.turnoTitle}>
          {isAbierta ? caja?.turno : 'No hay turno abierto'}
        </Text>

        {isAbierta && (
          <View style={styles.metaGrid}>
            <Text style={styles.metaText}>
              Resp: <Text style={{ fontWeight: '700', color: tokens.colors.text.primary }}>{caja?.responsable}</Text>
            </Text>
            <Text style={styles.metaText}>
              Fondo: <Text style={{ fontWeight: '700', color: tokens.colors.text.primary }}>$ {caja?.saldoInicial?.toLocaleString('es-AR')}</Text>
            </Text>
          </View>
        )}
      </View>

      {/* Efectivo Físico */}
      {isAbierta && (
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Efectivo en Cajón</Text>
          <Text style={styles.balanceAmount}>
            $ {caja?.saldoNetoEfectivo?.toLocaleString('es-AR') || '0'}
          </Text>
        </View>
      )}

      {/* Acciones */}
      <View style={styles.actionsCol}>
        {isAbierta ? (
          <View style={styles.btnRow}>
            <Button
              variant="secondary"
              size="sm"
              icon={MinusCircle}
              onPress={onRegisterExpense}
              style={{ flex: 1 }}
            >
              Gasto
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={Lock}
              onPress={onCloseCaja}
              style={{ flex: 1 }}
            >
              Cerrar Caja
            </Button>
          </View>
        ) : (
          <Button
            variant="primary"
            size="md"
            icon={Unlock}
            onPress={onOpenCaja}
            fullWidth
          >
            Abrir Caja del Turno
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    gap: 12,
  },
  leftCol: {
    gap: 4,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusPill: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  cajaIdText: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  turnoTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  metaText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  balanceBox: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    gap: 2,
  },
  balanceLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: tokens.colors.primary[400],
  },
  actionsCol: {
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default CajaStatusHero;
