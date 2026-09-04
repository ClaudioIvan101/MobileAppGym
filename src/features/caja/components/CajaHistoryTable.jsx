import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Download } from 'lucide-react-native';
import { Button } from '../../../components/Button';

/**
 * Historial de Cierres de Caja universal para React Native
 */
export const CajaHistoryTable = ({
  historial = [],
  onExportExcel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial de Cierres de Turno</Text>
        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onPress={onExportExcel}
        >
          Exportar
        </Button>
      </View>

      <View style={styles.list}>
        {historial.map((cierre) => {
          const isExacto = cierre.estadoDiferencia === 'EXACTO';
          const isSobrante = cierre.estadoDiferencia === 'SOBRANTE';

          return (
            <View key={cierre.id} style={styles.cierreItem}>
              <View style={styles.cierreHeader}>
                <Text style={styles.dateText}>{cierre.fechaCierre} • {cierre.turno}</Text>
                <View
                  style={[
                    styles.difBadge,
                    {
                      backgroundColor: isExacto
                        ? 'rgba(16, 185, 129, 0.12)'
                        : isSobrante
                        ? 'rgba(245, 158, 11, 0.12)'
                        : 'rgba(239, 68, 68, 0.12)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.difText,
                      {
                        color: isExacto
                          ? tokens.colors.primary[400]
                          : isSobrante
                          ? '#fbbf24'
                          : '#f87171',
                      },
                    ]}
                  >
                    {isExacto ? 'Exacto' : isSobrante ? `+$${cierre.diferencia}` : `-$${Math.abs(cierre.diferencia)}`}
                  </Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Responsable:</Text>
                <Text style={styles.metaValue}>{cierre.responsable}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Total Facturado:</Text>
                <Text style={[styles.metaValue, { color: tokens.colors.primary[400], fontWeight: '800' }]}>
                  $ {cierre.totalIngresos?.toLocaleString('es-AR')}
                </Text>
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
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  list: {
    gap: 8,
  },
  cierreItem: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 6,
  },
  cierreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  difBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  difText: {
    fontSize: 10.5,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  metaValue: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
});

export default CajaHistoryTable;
