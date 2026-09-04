import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  UserPlus,
  ShieldAlert,
  Clock,
  Layers,
} from 'lucide-react-native';

/**
 * Panel de Estado de Check-in universal para React Native
 */
export const CheckinResultCard = ({
  result,
  onCobrarPase,
  onRenovarMembresia,
  onForzarAcceso,
  onAsignarCupoClase,
  isForcing = false,
}) => {
  if (!result) {
    return (
      <View style={styles.idleCard}>
        <View style={styles.idleIconCircle}>
          <CheckCircle2 size={32} color={tokens.colors.primary[500]} />
        </View>
        <Text style={styles.idleTitle}>Esperando Validación</Text>
        <Text style={styles.idleSubtitle}>
          Escanea el código QR o ingresa DNI para validar acceso.
        </Text>
      </View>
    );
  }

  const { tipoResultado, motivo, socio, claseActual } = result;

  const isHabilitado = tipoResultado === 'HABILITADO';
  const isDenegado = tipoResultado === 'DENEGADO_CUOTA';
  const isSinReserva = tipoResultado === 'SIN_RESERVA';

  const getThemeConfig = () => {
    if (isHabilitado) {
      return {
        bg: 'rgba(16, 185, 129, 0.08)',
        border: tokens.colors.primary[500],
        title: 'ACCESO PERMITIDO',
        titleColor: tokens.colors.primary[400],
        icon: CheckCircle2,
        iconColor: tokens.colors.primary[400],
      };
    }
    if (isDenegado) {
      return {
        bg: 'rgba(239, 68, 68, 0.08)',
        border: '#ef4444',
        title: 'ACCESO DENEGADO',
        titleColor: '#f87171',
        icon: XCircle,
        iconColor: '#f87171',
      };
    }
    return {
      bg: 'rgba(245, 158, 11, 0.08)',
      border: '#f59e0b',
      title: 'SIN RESERVA PREVIA',
      titleColor: '#fbbf24',
      icon: AlertTriangle,
      iconColor: '#fbbf24',
    };
  };

  const theme = getThemeConfig();
  const IconComponent = theme.icon;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.bg,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Banner */}
      <View style={styles.statusHeaderRow}>
        <View style={styles.statusTitleGroup}>
          <IconComponent size={24} color={theme.iconColor} />
          <View style={styles.titleTextCol}>
            <Text style={[styles.statusMainTitle, { color: theme.titleColor }]}>
              {theme.title}
            </Text>
            <Text style={styles.statusMotivo}>{motivo}</Text>
          </View>
        </View>

        <View style={styles.timestampBadge}>
          <Clock size={12} color={tokens.colors.text.secondary} />
          <Text style={styles.timestampText}>
            {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      {/* Ficha del Socio */}
      {socio && (
        <View style={styles.socioProfileRow}>
          <Image
            source={{
              uri:
                socio.foto ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
            }}
            style={[styles.avatarImg, { borderColor: theme.border }]}
          />

          <View style={styles.socioInfoCol}>
            <Text style={styles.socioName}>{socio.nombre}</Text>
            <Text style={styles.socioDni}>DNI: {socio.dni}</Text>

            <View style={styles.metaCardsGrid}>
              <View style={styles.metaCard}>
                <Layers size={13} color={tokens.colors.primary[400]} />
                <Text style={styles.metaCardValue}>{socio.plan}</Text>
              </View>

              <View style={styles.metaCard}>
                <Calendar size={13} color={tokens.colors.accent.cyan} />
                <Text style={[styles.metaCardValue, isDenegado && { color: '#f87171' }]}>
                  Vence: {socio.vencimiento}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Caso: Sin Reserva con cupo */}
      {isSinReserva && claseActual && (
        <View style={styles.noReservationBox}>
          <Text style={styles.noResTitle}>
            Clase en curso: {claseActual.nombre} ({claseActual.cupoLibre} cupos)
          </Text>
          <Button
            variant="primary"
            size="sm"
            icon={UserPlus}
            onPress={() => onAsignarCupoClase && onAsignarCupoClase(claseActual.id, socio?.id)}
          >
            Asignar Cupo
          </Button>
        </View>
      )}

      {/* Caso: Denegado */}
      {isDenegado && (
        <View style={styles.deniedActionsRow}>
          <Button
            variant="primary"
            size="sm"
            icon={DollarSign}
            onPress={() => onCobrarPase && onCobrarPase(socio)}
            style={{ flex: 1 }}
          >
            Pase Diario
          </Button>

          <Button
            variant="danger"
            size="sm"
            icon={ShieldAlert}
            loading={isForcing}
            onPress={() => onForzarAcceso && onForzarAcceso(socio?.id, 'Autorización recepción')}
            style={{ flex: 1 }}
          >
            Forzar Ingreso
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  idleCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 16,
    padding: 30,
    borderWidth: 2,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: 8,
  },
  idleIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  idleTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  idleSubtitle: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
  },
  cardContainer: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    gap: 14,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
    paddingBottom: 10,
  },
  statusTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  titleTextCol: {
    flex: 1,
  },
  statusMainTitle: {
    fontSize: 14,
    fontWeight: '900',
  },
  statusMotivo: {
    fontSize: 12,
    color: tokens.colors.text.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  timestampBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: tokens.colors.surface.card,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  timestampText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  socioProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
  },
  socioInfoCol: {
    flex: 1,
    gap: 3,
  },
  socioName: {
    fontSize: 16,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  socioDni: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
  metaCardsGrid: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  metaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  metaCardValue: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  noReservationBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  noResTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#fbbf24',
  },
  deniedActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default CheckinResultCard;
