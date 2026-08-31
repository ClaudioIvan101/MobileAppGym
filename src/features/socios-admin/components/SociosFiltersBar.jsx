import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Search, UserPlus, Download, X } from 'lucide-react-native';

const ESTADOS = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'Activos' },
  { id: 'expiring', label: 'Por Vencer' },
  { id: 'deudor', label: 'Deudores' },
  { id: 'inactive', label: 'Inactivos' },
];

/**
 * Barra de Filtros y Búsqueda universal para React Native
 */
export const SociosFiltersBar = ({
  search = '',
  onSearchChange,
  estado = 'all',
  onEstadoChange,
  totalResults = 0,
  onNuevoSocio,
  onExportar,
}) => {
  return (
    <View style={styles.container}>
      {/* Búsqueda */}
      <View style={styles.searchBox}>
        <Search size={16} color={tokens.colors.text.secondary} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Buscar por Nombre, DNI, Email..."
          placeholderTextColor={tokens.colors.text.muted}
          style={styles.input}
        />
        {search ? (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <X size={14} color={tokens.colors.text.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Selector de Estados */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        {ESTADOS.map((item) => {
          const isSelected = item.id === estado;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onEstadoChange(item.id)}
              activeOpacity={0.75}
              style={[
                styles.pillBtn,
                isSelected ? styles.pillActive : styles.pillInactive,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: isSelected ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Botones de Acción */}
      <View style={styles.actionsRow}>
        <Text style={styles.countText}>{totalResults} socios</Text>
        <View style={styles.btnGroup}>
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onPress={onExportar}
          >
            Exportar
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={UserPlus}
            onPress={onNuevoSocio}
          >
            Nuevo Socio
          </Button>
        </View>
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
    gap: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 8,
  },
  input: {
    flex: 1,
    color: tokens.colors.text.primary,
    fontSize: 13,
    padding: 0,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pillBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pillInactive: {
    backgroundColor: tokens.colors.surface.elevated,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  pillActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: tokens.colors.primary[500],
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
  },
  countText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 6,
  },
});

export default SociosFiltersBar;
