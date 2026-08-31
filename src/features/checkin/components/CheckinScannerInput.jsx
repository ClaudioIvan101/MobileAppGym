import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Scan, ArrowRight } from 'lucide-react-native';

/**
 * Input para Scanner / DNI universal para React Native
 */
export const CheckinScannerInput = ({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}) => {
  const setTestQuery = (query) => {
    onChange(query);
    onSubmit(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Scan size={20} color={tokens.colors.primary[400]} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Escanear QR o ingresar DNI..."
          placeholderTextColor={tokens.colors.text.muted}
          style={styles.input}
          keyboardType="default"
          onSubmitEditing={() => value.trim() && onSubmit(value.trim())}
        />
        <Button
          variant="primary"
          size="sm"
          loading={isLoading}
          disabled={!value.trim()}
          icon={ArrowRight}
          onPress={() => value.trim() && onSubmit(value.trim())}
        >
          Validar
        </Button>
      </View>

      {/* Pruebas rápidas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.demoChipsRow}
      >
        <Text style={styles.demoLabel}>Pruebas:</Text>
        <TouchableOpacity
          style={[styles.demoChip, { borderColor: tokens.colors.primary[500] }]}
          onPress={() => setTestQuery('41.892.401')}
        >
          <Text style={[styles.demoChipText, { color: tokens.colors.primary[400] }]}>
            🟢 Habilitado (41.892.401)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.demoChip, { borderColor: '#ef4444' }]}
          onPress={() => setTestQuery('28.491.022')}
        >
          <Text style={[styles.demoChipText, { color: '#f87171' }]}>
            🔴 Vencido (28.491.022)
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: tokens.colors.primary[500],
    gap: 8,
  },
  input: {
    flex: 1,
    color: tokens.colors.text.primary,
    fontSize: 14,
    fontWeight: '700',
    padding: 6,
  },
  demoChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  demoLabel: {
    fontSize: 11,
    color: tokens.colors.text.muted,
    fontWeight: '600',
  },
  demoChip: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderRadius: 9999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  demoChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default CheckinScannerInput;
