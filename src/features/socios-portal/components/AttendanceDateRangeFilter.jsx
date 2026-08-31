import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Filter, Calendar } from 'lucide-react-native';

/**
 * Filtros de Rango de Fechas y Tipo de Ingreso universal para React Native
 */
export const AttendanceDateRangeFilter = ({
  rango = 'month',
  onSelectRango,
  tipoFiltro = 'ALL',
  onSelectTipoFiltro,
}) => {
  const rangos = [
    { id: '30d', label: '30 días' },
    { id: 'month', label: 'Mes actual' },
    { id: 'year', label: 'Año actual' },
  ];

  const tipos = [
    { id: 'ALL', label: 'Todos' },
    { id: 'ACCESO_GENERAL', label: 'Musculación' },
    { id: 'CLASE', label: 'Clases' },
  ];

  return (
    <View style={styles.container}>
      {/* 1. Selector de Rango */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        <View style={styles.groupLabel}>
          <Calendar size={13} color={tokens.colors.primary[400]} />
          <Text style={styles.labelText}>Período:</Text>
        </View>
        {rangos.map((r) => {
          const isActive = rango === r.id;
          return (
            <TouchableOpacity
              key={r.id}
              onPress={() => onSelectRango(r.id)}
              activeOpacity={0.75}
              style={[
                styles.pillBtn,
                isActive ? styles.pillBtnActive : styles.pillBtnInactive,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: isActive ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                ]}
              >
                {r.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2. Selector de Tipo */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        <View style={styles.groupLabel}>
          <Filter size={13} color={tokens.colors.text.secondary} />
          <Text style={styles.labelText}>Tipo:</Text>
        </View>
        {tipos.map((t) => {
          const isActive = tipoFiltro === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => onSelectTipoFiltro(t.id)}
              activeOpacity={0.75}
              style={[
                styles.pillBtn,
                isActive ? styles.pillBtnActive : styles.pillBtnInactive,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: isActive ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                ]}
              >
                {t.label}
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
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 4,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  pillBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pillBtnInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  pillBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: tokens.colors.primary[500],
  },
  pillText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
});

export default AttendanceDateRangeFilter;
