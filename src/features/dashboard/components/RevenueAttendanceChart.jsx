import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { BarChart3 } from 'lucide-react-native';

/**
 * Gráfico Comparativo universal para React Native
 */
export const RevenueAttendanceChart = ({
  data = [],
  isLoading = false,
}) => {
  const maxAsistencias = Math.max(...data.map((d) => d.asistencias), 1);
  const maxIngresos = Math.max(...data.map((d) => d.ingresos), 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <BarChart3 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Asistencias vs Facturación</Text>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: tokens.colors.primary[500] }]} />
            <Text style={styles.legendText}>Asist.</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: tokens.colors.accent.cyan }]} />
            <Text style={styles.legendText}>Ingr.</Text>
          </View>
        </View>
      </View>

      {/* Gráfico de Barras */}
      <View style={styles.chartArea}>
        {data.map((item, index) => {
          const assistHeight = Math.max(8, (item.asistencias / maxAsistencias) * 90);
          const revHeight = Math.max(8, (item.ingresos / maxIngresos) * 90);

          return (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barGroup}>
                <View
                  style={[
                    styles.barAssist,
                    { height: assistHeight },
                  ]}
                />
                <View
                  style={[
                    styles.barRevenue,
                    { height: revHeight },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{item.dia}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 10,
  },
  barColumn: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 90,
  },
  barAssist: {
    width: 8,
    backgroundColor: tokens.colors.primary[500],
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  barRevenue: {
    width: 8,
    backgroundColor: tokens.colors.accent.cyan,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  dayLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
});

export default RevenueAttendanceChart;
