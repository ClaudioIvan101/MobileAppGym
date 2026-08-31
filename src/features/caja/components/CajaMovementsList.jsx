import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Receipt } from 'lucide-react-native';

/**
 * Movimientos de Caja universal para React Native
 */
export const CajaMovementsList = ({
  movimientos = [],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Receipt size={14} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Movimientos del Turno</Text>
        </View>
        <Text style={styles.countText}>{movimientos.length} transacciones</Text>
      </View>

      <View style={styles.list}>
        {movimientos.map((item) => {
          const isIngreso = item.tipo === 'INGRESO';

          return (
            <View key={item.id} style={styles.movementItem}>
              <View style={styles.itemLeft}>
                <Text style={styles.conceptText}>{item.concepto}</Text>
                <Text style={styles.metaText}>{item.hora} • {item.metodo}</Text>
              </View>

              <Text style={[styles.amountText, { color: isIngreso ? tokens.colors.primary[400] : '#f87171' }]}>
                {isIngreso ? '+' : '-'} $ {item.monto?.toLocaleString('es-AR')}
              </Text>
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
  countText: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  list: {
    gap: 8,
  },
  movementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  itemLeft: {
    gap: 2,
    flex: 1,
  },
  conceptText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  metaText: {
    fontSize: 10.5,
    color: tokens.colors.text.secondary,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '900',
  },
});

export default CajaMovementsList;
