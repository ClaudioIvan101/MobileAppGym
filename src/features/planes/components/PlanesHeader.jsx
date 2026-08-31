import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Search, Plus, Layers } from 'lucide-react-native';

/**
 * Header y Filtros del Catálogo de Planes universal para React Native
 */
export const PlanesHeader = ({
  search,
  onSearchChange,
  modalidad,
  onModalidadChange,
  onOpenCreateModal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <View style={styles.iconCircle}>
            <Layers size={18} color={tokens.colors.primary[400]} />
          </View>
          <View>
            <Text style={styles.subtitle}>CONFIGURACIÓN COMERCIAL</Text>
            <Text style={styles.title}>Planes y Membresías</Text>
          </View>
        </View>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onPress={onOpenCreateModal}
        >
          Nuevo Plan
        </Button>
      </View>

      {/* Búsqueda */}
      <View style={styles.searchWrapper}>
        <Search size={14} color={tokens.colors.text.secondary} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Buscar plan..."
          placeholderTextColor={tokens.colors.text.muted}
          style={styles.searchInput}
        />
      </View>

      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterPillsGroup}
      >
        <TouchableOpacity
          onPress={() => onModalidadChange('all')}
          style={[
            styles.filterPill,
            modalidad === 'all' ? styles.filterPillActive : styles.filterPillInactive,
          ]}
        >
          <Text style={[styles.filterPillText, modalidad === 'all' && { color: tokens.colors.primary[400] }]}>
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onModalidadChange('GENERAL')}
          style={[
            styles.filterPill,
            modalidad === 'GENERAL' ? styles.filterPillActive : styles.filterPillInactive,
          ]}
        >
          <Text style={[styles.filterPillText, modalidad === 'GENERAL' && { color: tokens.colors.primary[400] }]}>
            🏋️ General
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onModalidadChange('CLASES')}
          style={[
            styles.filterPill,
            modalidad === 'CLASES' ? styles.filterPillActive : styles.filterPillInactive,
          ]}
        >
          <Text style={[styles.filterPillText, modalidad === 'CLASES' && { color: tokens.colors.primary[400] }]}>
            🥊 Clases
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: tokens.colors.text.primary,
    fontSize: 13,
    padding: 2,
  },
  filterPillsGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  filterPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  filterPillInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  filterPillActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: tokens.colors.primary[500],
  },
  filterPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
});

export default PlanesHeader;
