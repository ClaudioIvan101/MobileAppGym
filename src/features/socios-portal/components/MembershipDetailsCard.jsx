import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import {
  CreditCard,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Zap,
  Layers,
} from 'lucide-react-native';

/**
 * Ficha de Detalles de Membresía Actual universal para React Native
 */
export const MembershipDetailsCard = ({
  membresia,
  isLoading = false,
}) => {
  const planNombre = membresia?.planNombre || 'Membresía StrongFit';
  const modalidad = membresia?.modalidad || 'ACCESO_GENERAL';
  const isGeneral = modalidad === 'ACCESO_GENERAL';
  const estado = membresia?.estado || 'active';
  const fechaInicio = membresia?.fechaInicio || '01/08/2026';
  const fechaFin = membresia?.fechaFin || '01/09/2026';
  const precioCuota = membresia?.precioCuota || '$ 38.500';
  const metodoRenovacion = membresia?.metodoRenovacion || 'Débito Automático';
  const limiteSemanal = membresia?.limiteSemanal || 'Acceso Ilimitado';
  const beneficios = membresia?.beneficios || [
    'Acceso ilimitado a áreas de musculación',
    'Ingreso con carnet QR digital',
    'Casilleros y duchas',
  ];

  return (
    <View style={styles.cardContainer}>
      {/* Header del Plan */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.planBadgeContainer}>
            <Layers size={13} color={tokens.colors.primary[400]} />
            <Text style={styles.modalidadTag}>
              {isGeneral ? 'Acceso General' : 'Pack de Clases'}
            </Text>
          </View>
          <Text style={styles.planTitle}>{planNombre}</Text>
        </View>

        <Badge variant={estado} size="md">
          {estado === 'active' ? 'Vigente' : estado === 'expiring' ? 'Por vencer' : 'Inactivo'}
        </Badge>
      </View>

      {/* Grid de Metadatos */}
      <View style={styles.metaGrid}>
        <View style={styles.metaBox}>
          <View style={styles.metaIconCircle}>
            <Calendar size={15} color={tokens.colors.primary[400]} />
          </View>
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>Vigencia</Text>
            <Text style={styles.metaValue}>{fechaInicio} - {fechaFin}</Text>
          </View>
        </View>

        <View style={styles.metaBox}>
          <View style={styles.metaIconCircle}>
            <Zap size={15} color={tokens.colors.accent.cyan} />
          </View>
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>Acceso</Text>
            <Text style={styles.metaValue}>{limiteSemanal}</Text>
          </View>
        </View>

        <View style={styles.metaBox}>
          <View style={styles.metaIconCircle}>
            <CreditCard size={15} color={tokens.colors.accent.purple} />
          </View>
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>Valor Cuota</Text>
            <Text style={styles.metaValueHighlight}>{precioCuota}</Text>
          </View>
        </View>

        <View style={styles.metaBox}>
          <View style={styles.metaIconCircle}>
            <ShieldCheck size={15} color={tokens.colors.primary[400]} />
          </View>
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>Renovación</Text>
            <Text style={styles.metaValue}>{metodoRenovacion}</Text>
          </View>
        </View>
      </View>

      {/* Beneficios */}
      <View style={styles.beneficiosContainer}>
        <Text style={styles.beneficiosTitle}>Beneficios incluidos</Text>
        <View style={styles.beneficiosList}>
          {beneficios.map((beneficio, index) => (
            <View key={index} style={styles.beneficioItem}>
              <CheckCircle size={13} color={tokens.colors.primary[400]} />
              <Text style={styles.beneficioText}>{beneficio}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerLeft: {
    flex: 1,
  },
  planBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  modalidadTag: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.primary[400],
    textTransform: 'uppercase',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  metaGrid: {
    gap: 8,
  },
  metaBox: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaTextCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10.5,
    color: tokens.colors.text.secondary,
  },
  metaValue: {
    fontSize: 12.5,
    fontWeight: '600',
    color: tokens.colors.text.primary,
  },
  metaValueHighlight: {
    fontSize: 13,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  beneficiosContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
    gap: 8,
  },
  beneficiosTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
  },
  beneficiosList: {
    gap: 6,
  },
  beneficioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  beneficioText: {
    fontSize: 12,
    color: tokens.colors.text.primary,
  },
});

export default MembershipDetailsCard;
