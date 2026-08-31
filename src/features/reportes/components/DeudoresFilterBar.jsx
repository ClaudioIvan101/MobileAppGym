import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Search, MessageCircle } from 'lucide-react-native';

const MORA_FILTERS = [
  { dias: 0, label: 'Todos' },
  { dias: 5, label: '> 5d' },
  { dias: 15, label: '> 15d' },
  { dias: 30, label: '> 30d' },
];

/**
 * Barra de Filtros para Deudores universal para React Native
 */
export const DeudoresFilterBar = ({
  search,
  onSearchChange,
  moraMinima,
  onMoraMinimaChange,
  totalResultados = 0,
  onOpenBulkModal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Search size={14} color={tokens.colors.text.secondary} />
        <TextInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Buscar deudor..."
          placeholderTextColor={tokens.colors.text.muted}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.bottomRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsGroup}
        >
          {MORA_FILTERS.map((item) => {
            const isSelected = moraMinima === item.dias;
            return (
              <TouchableOpacity
                key={item.dias}
                onPress={() => onMoraMinimaChange(item.dias)}
                activeOpacity={0.75}
                style={[
                  styles.pillBtn,
                  isSelected ? styles.pillActive : styles.pillInactive,
                ]}
              >
                <Text style={[styles.pillText, isSelected && { color: '#f87171' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Button
          variant="secondary"
          size="sm"
          icon={MessageCircle}
          onPress={onOpenBulkModal}
          style={styles.bulkBtn}
        >
          WhatsApp ({totalResultados})
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: tokens.colors.text.primary,
    fontSize: 12.5,
    padding: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  pillsGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  pillBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pillInactive: {
    backgroundColor: tokens.colors.surface.elevated,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  pillActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  bulkBtn: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
});

export default DeudoresFilterBar;
