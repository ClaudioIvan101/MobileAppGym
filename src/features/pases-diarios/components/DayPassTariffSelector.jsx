import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Layers, Clock } from 'lucide-react-native';

/**
 * Selector de Tarifas de Pases Diarios universal para React Native
 */
export const DayPassTariffSelector = ({
  tarifas = [],
  selectedTarifaId,
  onSelectTarifa,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Layers size={14} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.title}>2. Seleccionar Tipo de Pase Diario</Text>
          <Text style={styles.subtitle}>Define el alcance del acceso</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {tarifas.map((item) => {
          const isSelected = item.id === selectedTarifaId;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelectTarifa(item.id)}
              activeOpacity={0.75}
              style={[
                styles.tariffCard,
                isSelected ? styles.tariffCardActive : styles.tariffCardInactive,
              ]}
            >
              <View style={styles.cardTop}>
                <Text style={styles.disciplineTag}>{item.disciplina}</Text>
                <Text style={styles.priceTag}>{item.precioFormateado}</Text>
              </View>

              <Text style={styles.tariffName}>{item.nombre}</Text>
              <Text style={styles.tariffDesc}>{item.descripcion}</Text>

              <View style={styles.durationRow}>
                <Clock size={10} color={tokens.colors.text.muted} />
                <Text style={styles.durationText}>{item.duracionHoras}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  subtitle: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  grid: {
    gap: 8,
  },
  tariffCard: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 2,
    gap: 4,
  },
  tariffCardInactive: {
    backgroundColor: tokens.colors.surface.elevated,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  tariffCardActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: tokens.colors.primary[500],
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disciplineTag: {
    fontSize: 10,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    textTransform: 'uppercase',
  },
  priceTag: {
    fontSize: 14,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  tariffName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  tariffDesc: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  durationText: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
});

export default DayPassTariffSelector;
