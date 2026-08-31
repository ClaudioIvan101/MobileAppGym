import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Plus } from 'lucide-react-native';

/**
 * Pestaña 1 - Membresías y Planes universal para React Native
 */
export const TabMemberships = ({
  socio,
  onOpenAssignPlan,
}) => {
  const {
    planActual = 'Black Pass Ultra',
    planModalidad = 'Pack 12 Clases + Musculación',
    fechaVencimiento = '05/09/2026',
    diasRestantes = 5,
    clasesConsumidas = 4,
    clasesTotales = 12,
    historialPlanes = [],
  } = socio || {};

  const clasesDisponibles = Math.max(0, clasesTotales - clasesConsumidas);
  const progressPercent = clasesTotales > 0 ? (clasesConsumidas / clasesTotales) * 100 : 100;

  return (
    <View style={styles.tabContainer}>
      {/* Tarjeta de Plan Vigente */}
      <View style={styles.currentPlanCard}>
        <View style={styles.planCardHeader}>
          <View style={styles.planTitleCol}>
            <Text style={styles.subLabel}>PLAN ACTIVO</Text>
            <Text style={styles.planTitle}>{planActual}</Text>
            <Text style={styles.modalidadText}>{planModalidad}</Text>
          </View>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onPress={onOpenAssignPlan}
          >
            Asignar Plan
          </Button>
        </View>

        {clasesTotales > 0 && (
          <View style={styles.progressBox}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressTitle}>Créditos de Clases</Text>
              <Text style={styles.progressCount}>
                {clasesDisponibles} de {clasesTotales} disp.
              </Text>
            </View>

            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>

            <View style={styles.progressFoot}>
              <Text style={styles.footText}>{clasesConsumidas} consumidas</Text>
              <Text style={styles.footText}>Vence: {fechaVencimiento} ({diasRestantes}d)</Text>
            </View>
          </View>
        )}
      </View>

      {/* Historial */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Historial de Planes</Text>
        <View style={styles.historyList}>
          {historialPlanes.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.itemLeft}>
                <Text style={styles.planNameText}>{item.plan}</Text>
                <Text style={styles.periodText}>{item.fechaInicio} ➔ {item.fechaFin}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.amountText}>{item.monto}</Text>
                <Text style={[styles.statusTag, { color: item.estado === 'VIGENTE' ? tokens.colors.primary[400] : tokens.colors.text.muted }]}>
                  {item.estado}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    gap: 16,
  },
  currentPlanCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 14,
  },
  planCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  planTitleCol: {
    flex: 1,
  },
  subLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  modalidadText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  progressBox: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTitle: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  progressCount: {
    fontSize: 12,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: tokens.colors.primary[500],
  },
  progressFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footText: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  historySection: {
    gap: 10,
  },
  historyTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    gap: 2,
  },
  planNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  periodText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  itemRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  statusTag: {
    fontSize: 10.5,
    fontWeight: '700',
  },
});

export default TabMemberships;
