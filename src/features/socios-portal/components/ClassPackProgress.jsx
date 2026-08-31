import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Dumbbell, CheckCircle2 } from 'lucide-react-native';

/**
 * Barra de Progreso Visual de Pack de Clases universal para React Native
 */
export const ClassPackProgress = ({
  clasesTotales = 12,
  clasesRestantes = 8,
  isLoading = false,
}) => {
  const consumidas = Math.max(0, clasesTotales - clasesRestantes);
  const porcentajeRestante = clasesTotales > 0 ? Math.round((clasesRestantes / clasesTotales) * 100) : 0;

  const slots = Array.from({ length: clasesTotales }, (_, i) => ({
    id: i,
    isUsed: i < consumidas,
  }));

  return (
    <View style={styles.container}>
      {/* Header del Pack */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Dumbbell size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Consumo de Pack</Text>
        </View>
        <View style={styles.counterPill}>
          <Text style={styles.counterRemaining}>{clasesRestantes}</Text>
          <Text style={styles.counterTotal}>/ {clasesTotales} disp.</Text>
        </View>
      </View>

      {/* Barra de Progreso */}
      <View style={styles.progressBarWrapper}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${porcentajeRestante}%` },
          ]}
        />
      </View>

      {/* Grid de Casillas */}
      <View style={styles.slotsGrid}>
        {slots.map((slot) => (
          <View
            key={slot.id}
            style={[
              styles.slotChip,
              slot.isUsed ? styles.slotUsed : styles.slotAvailable,
            ]}
          >
            {slot.isUsed ? (
              <CheckCircle2 size={11} color={tokens.colors.text.muted} />
            ) : (
              <View style={styles.activeDot} />
            )}
            <Text
              style={[
                styles.slotText,
                { color: slot.isUsed ? tokens.colors.text.muted : tokens.colors.primary[400] },
              ]}
            >
              #{slot.id + 1}
            </Text>
          </View>
        ))}
      </View>

      {/* Resumen */}
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          {consumidas} de {clasesTotales} clases utilizadas
        </Text>
        <Text style={styles.percentText}>{porcentajeRestante}% restante</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  counterPill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
  },
  counterRemaining: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  counterTotal: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  progressBarWrapper: {
    height: 8,
    backgroundColor: tokens.colors.surface.border,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: tokens.colors.primary[500],
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  slotChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
  },
  slotUsed: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: tokens.colors.surface.border,
    opacity: 0.5,
  },
  slotAvailable: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: tokens.colors.primary[400],
  },
  slotText: {
    fontSize: 10,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  percentText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
});

export default ClassPackProgress;
