import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';

/**
 * Barra de Filtros por Disciplina universal para React Native
 */
export const ClassFiltersBar = ({
  selectedActivity = 'all',
  onSelectActivity,
  selectedInstructor = 'all',
  onSelectInstructor,
}) => {
  const activities = [
    { id: 'all', label: 'Todas las Clases' },
    { id: 'crossfit', label: 'CrossFit' },
    { id: 'spinning', label: 'Spinning' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'funcional', label: 'Funcional' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        {activities.map((act) => {
          const isActive = selectedActivity === act.id;
          return (
            <TouchableOpacity
              key={act.id}
              onPress={() => onSelectActivity(act.id)}
              activeOpacity={0.75}
              style={[
                styles.chipButton,
                isActive ? styles.chipActive : styles.chipInactive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isActive ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                ]}
              >
                {act.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  chipsScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  chipButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 9999,
    borderWidth: 1,
  },
  chipInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  chipActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: tokens.colors.primary[500],
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ClassFiltersBar;
