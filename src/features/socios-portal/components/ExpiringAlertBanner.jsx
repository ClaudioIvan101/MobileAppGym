import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { AlertTriangle, ArrowRight } from 'lucide-react-native';

/**
 * Alerta Visual de Vencimiento Próximo universal para React Native
 */
export const ExpiringAlertBanner = ({
  diasRestantes = 5,
  fechaFin,
  onRenovar,
  isLoading = false,
}) => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.contentRow}>
        <View style={styles.iconCircle}>
          <AlertTriangle size={20} color="#fbbf24" />
        </View>

        <View style={styles.textCol}>
          <Text style={styles.badgeText}>RENOVACIÓN PRÓXIMA</Text>
          <Text style={styles.title}>
            Tu cuota vence en <Text style={styles.daysHighlight}>{diasRestantes} días</Text> ({fechaFin})
          </Text>
          <Text style={styles.description}>
            Renueva a tiempo para mantener tu acceso sin interrupciones.
          </Text>
        </View>
      </View>

      <Button
        variant="primary"
        size="sm"
        icon={ArrowRight}
        iconPosition="right"
        loading={isLoading}
        onPress={onRenovar}
        style={styles.actionButton}
      >
        Renovar en recepción
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    gap: 3,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#fbbf24',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
    lineHeight: 18,
  },
  daysHighlight: {
    color: '#fbbf24',
  },
  description: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
  actionButton: {
    backgroundColor: '#f59e0b',
  },
});

export default ExpiringAlertBanner;
