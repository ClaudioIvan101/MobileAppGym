import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import { Check, Edit2, PauseCircle, PlayCircle, Users } from 'lucide-react-native';

/**
 * Tarjeta de Plan universal para React Native
 */
export const PlanCard = ({
  plan,
  onEdit,
  onToggleEstado,
}) => {
  if (!plan) return null;

  const isGeneral = plan.modalidad === 'GENERAL';
  const isActivo = plan.estado === 'ACTIVO';

  return (
    <View
      style={[
        styles.card,
        { borderTopColor: plan.badgeColor || tokens.colors.primary[500] },
        !isActivo && { opacity: 0.7 },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={[styles.modalidadPill, { color: isGeneral ? tokens.colors.accent.cyan : tokens.colors.primary[400] }]}>
            {isGeneral ? '🏋️ General' : `🥊 Pack ${plan.cantidadClases || 12} Clases`}
          </Text>
          <Text style={styles.planTitle}>{plan.nombre}</Text>
        </View>

        <Badge variant={isActivo ? 'active' : 'inactive'} size="sm" />
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>{plan.precioFormateado}</Text>
        <Text style={styles.periodText}>/ {plan.duracionDias} días</Text>
      </View>

      <Text style={styles.description}>{plan.descripcion}</Text>

      {/* Beneficios */}
      <View style={styles.featuresList}>
        {plan.incluyeMusculacion && (
          <View style={styles.featureItem}>
            <Check size={11} color={tokens.colors.primary[400]} />
            <Text style={styles.featureText}>Musculación & Cardio libre</Text>
          </View>
        )}
        <View style={styles.featureItem}>
          <Check size={11} color={tokens.colors.primary[400]} />
          <Text style={styles.featureText}>Pase QR y vestuarios</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.subscribersBadge}>
          <Users size={12} color={tokens.colors.text.secondary} />
          <Text style={styles.subscribersText}>{plan.sociosActivosCount || 0} socios</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onToggleEstado && onToggleEstado(plan)}
            activeOpacity={0.7}
          >
            {isActivo ? (
              <PauseCircle size={15} color="#fbbf24" />
            ) : (
              <PlayCircle size={15} color={tokens.colors.primary[400]} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onEdit && onEdit(plan)}
            activeOpacity={0.7}
          >
            <Edit2 size={13} color={tokens.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    borderTopWidth: 4,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    gap: 2,
  },
  modalidadPill: {
    fontSize: 10.5,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  planTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  periodText: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  description: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  featuresList: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 8,
    gap: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 11,
    color: tokens.colors.text.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
  },
  subscribersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subscribersText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: tokens.colors.surface.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
});

export default PlanCard;
