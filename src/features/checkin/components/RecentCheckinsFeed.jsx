import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Users } from 'lucide-react-native';

/**
 * Feed de Accesos Recientes universal para React Native
 */
export const RecentCheckinsFeed = ({
  recientes = [],
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Users size={14} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Accesos Recientes</Text>
        </View>
        <View style={styles.liveTag}>
          <Text style={styles.liveTagText}>EN VIVO</Text>
        </View>
      </View>

      <View style={styles.list}>
        {recientes.map((item) => {
          const isHabilitado = item.tipoResultado === 'HABILITADO';
          const isDenegado = item.tipoResultado === 'DENEGADO_CUOTA';

          return (
            <View key={item.id} style={styles.itemCard}>
              <Image
                source={{
                  uri:
                    item.foto ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                }}
                style={[
                  styles.avatar,
                  { borderColor: isHabilitado ? tokens.colors.primary[500] : isDenegado ? '#ef4444' : '#f59e0b' },
                ]}
              />

              <View style={styles.infoCol}>
                <View style={styles.nameRow}>
                  <Text style={styles.socioName}>{item.socio}</Text>
                  <Text style={styles.timeText}>{item.hora}</Text>
                </View>

                <View style={styles.subRow}>
                  <Text style={styles.planText}>{item.plan}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text
                    style={[
                      styles.statusText,
                      { color: isHabilitado ? tokens.colors.primary[400] : isDenegado ? '#f87171' : '#fbbf24' },
                    ]}
                  >
                    {isHabilitado ? 'Habilitado' : isDenegado ? 'Denegado' : 'Sin Reserva'}
                  </Text>
                </View>
              </View>
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
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
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
  liveTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: tokens.colors.primary[500],
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
  },
  liveTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  list: {
    gap: 8,
  },
  itemCard: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socioName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  timeText: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  planText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  dot: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default RecentCheckinsFeed;
