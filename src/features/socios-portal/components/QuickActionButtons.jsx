import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { CalendarPlus, Activity, CreditCard, ChevronRight } from 'lucide-react-native';

/**
 * Accesos Rápidos para el Portal del Socio universal para React Native
 */
export const QuickActionButtons = ({
  isLoading = false,
  onNavigateReservas,
  onNavigateRutinas,
  onNavigateMembresia,
}) => {
  const actions = [
    {
      id: 'reservar',
      title: 'Reservar Clase',
      subtitle: 'Explorar horarios y cupos',
      icon: CalendarPlus,
      iconColor: tokens.colors.primary[400],
      iconBg: 'rgba(16, 185, 129, 0.12)',
      onPress: onNavigateReservas,
    },
    {
      id: 'asistencias',
      title: 'Historial de Asistencias',
      subtitle: 'Heatmap de constancia y accesos',
      icon: Activity,
      iconColor: tokens.colors.accent.cyan,
      iconBg: 'rgba(6, 182, 212, 0.12)',
      onPress: onNavigateRutinas,
    },
    {
      id: 'membresia',
      title: 'Mi Membresía',
      subtitle: 'Facturas, plan y pagos',
      icon: CreditCard,
      iconColor: tokens.colors.accent.purple,
      iconBg: 'rgba(139, 92, 246, 0.12)',
      onPress: onNavigateMembresia,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Accesos Rápidos</Text>

      <View style={styles.grid}>
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={action.onPress}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: action.iconBg },
                ]}
              >
                <IconComponent size={20} color={action.iconColor} />
              </View>

              <View style={styles.textCol}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>

              <ChevronRight size={18} color={tokens.colors.text.muted} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  grid: {
    gap: 8,
  },
  actionCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  actionSubtitle: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
});

export default QuickActionButtons;
