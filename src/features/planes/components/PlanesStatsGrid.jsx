import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Layers, Users, TrendingUp } from 'lucide-react-native';

/**
 * Grid de KPIs de Planes universal para React Native
 */
export const PlanesStatsGrid = ({
  totalPlanes = 0,
  planesActivos = 0,
  totalSociosSuscritos = 0,
}) => {
  return (
    <View style={styles.grid}>
      <View style={styles.kpiCard}>
        <View style={styles.iconCircleEmerald}>
          <Layers size={14} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.kpiLabel}>Activos</Text>
          <Text style={styles.kpiValue}>
            {planesActivos}/{totalPlanes}
          </Text>
        </View>
      </View>

      <View style={styles.kpiCard}>
        <View style={styles.iconCircleCyan}>
          <Users size={14} color={tokens.colors.accent.cyan} />
        </View>
        <View>
          <Text style={styles.kpiLabel}>Suscritos</Text>
          <Text style={styles.kpiValue}>
            {totalSociosSuscritos}
          </Text>
        </View>
      </View>

      <View style={styles.kpiCard}>
        <View style={styles.iconCirclePurple}>
          <TrendingUp size={14} color={tokens.colors.accent.purple} />
        </View>
        <View>
          <Text style={styles.kpiLabel}>Top Plan</Text>
          <Text style={styles.kpiValueHighlight}>Black Pass</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleEmerald: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCyan: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCirclePurple: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: tokens.colors.text.muted,
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 13,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  kpiValueHighlight: {
    fontSize: 12,
    fontWeight: '900',
    color: tokens.colors.primary[400],
  },
});

export default PlanesStatsGrid;
