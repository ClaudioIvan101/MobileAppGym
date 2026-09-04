import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import {
  DollarSign,
  UserPlus,
  LayoutDashboard,
  Clock,
} from 'lucide-react-native';

const RANGOS = [
  { id: 'hoy', label: 'Hoy' },
  { id: '7d', label: '7 días' },
  { id: '30d', label: '30 días' },
  { id: 'mes', label: 'Mes actual' },
];

/**
 * Header del Dashboard universal para React Native
 */
export const DashboardHeader = ({
  rango = 'mes',
  onSelectRango,
  onCobrarPase,
  onNuevoSocio,
  onExportar,
  isExporting = false,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleSection}>
        <View style={styles.iconCircle}>
          <LayoutDashboard size={18} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.subtitle}>GESTIÓN ADMINISTRATIVA</Text>
          <Text style={styles.title}>Panel de Control</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rangePillGroup}
      >
        <Clock size={13} color={tokens.colors.text.muted} />
        {RANGOS.map((item) => {
          const isSelected = item.id === rango;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelectRango && onSelectRango(item.id)}
              activeOpacity={0.75}
              style={[
                styles.rangeButton,
                isSelected ? styles.rangeButtonActive : styles.rangeButtonInactive,
              ]}
            >
              <Text
                style={[
                  styles.rangeText,
                  { color: isSelected ? '#090D14' : tokens.colors.text.secondary },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.actionButtonsRow}>
        <Button
          variant="secondary"
          size="sm"
          icon={DollarSign}
          onPress={onCobrarPase}
          style={{ flex: 1 }}
        >
          Pase Diario
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          onPress={onNuevoSocio}
          style={{ flex: 1 }}
        >
          Nuevo Socio
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 12,
  },
  titleSection: {
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
    fontSize: 18,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  rangePillGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 9999,
    padding: 4,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 4,
  },
  rangeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 9999,
  },
  rangeButtonInactive: {
    backgroundColor: 'transparent',
  },
  rangeButtonActive: {
    backgroundColor: tokens.colors.primary[500],
  },
  rangeText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default DashboardHeader;
