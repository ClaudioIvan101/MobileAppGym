import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { PlanCard } from './PlanCard';
import { Layers } from 'lucide-react-native';

/**
 * Grilla de Tarjetas de Planes universal para React Native
 */
export const PlanesGrid = ({
  planes = [],
  isLoading = false,
  onEditPlan,
  onToggleEstado,
}) => {
  if (planes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Layers size={32} color={tokens.colors.text.muted} />
        <Text style={styles.emptyTitle}>No hay planes con los filtros aplicados</Text>
      </View>
    );
  }

  return (
    <View style={styles.grid}>
      {planes.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onEdit={onEditPlan}
          onToggleEstado={onToggleEstado}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 30,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 13,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
  },
});

export default PlanesGrid;
