import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { FileBarChart2, AlertTriangle, Download } from 'lucide-react-native';
import { Button } from '../../../components/Button';

/**
 * Header y Selector de Pestañas universal para React Native
 */
export const ReportesHeader = ({
  activeTab = 'deudores',
  onSelectTab,
  onExportExcel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <View style={styles.iconCircle}>
            <FileBarChart2 size={18} color={tokens.colors.primary[400]} />
          </View>
          <View>
            <Text style={styles.subtitle}>REPORTES & FINANZAS</Text>
            <Text style={styles.title}>Deudores y Métricas</Text>
          </View>
        </View>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onPress={onExportExcel}
        >
          Exportar
        </Button>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          onPress={() => onSelectTab('deudores')}
          activeOpacity={0.75}
          style={[
            styles.tabBtn,
            activeTab === 'deudores' ? styles.tabBtnActive : styles.tabBtnInactive,
          ]}
        >
          <AlertTriangle size={13} color={activeTab === 'deudores' ? '#f87171' : tokens.colors.text.secondary} />
          <Text style={[styles.tabText, activeTab === 'deudores' && { color: tokens.colors.text.primary }]}>
            1. Deudores
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectTab('metricas')}
          activeOpacity={0.75}
          style={[
            styles.tabBtn,
            activeTab === 'metricas' ? styles.tabBtnActive : styles.tabBtnInactive,
          ]}
        >
          <FileBarChart2 size={13} color={activeTab === 'metricas' ? tokens.colors.primary[400] : tokens.colors.text.secondary} />
          <Text style={[styles.tabText, activeTab === 'metricas' && { color: tokens.colors.text.primary }]}>
            2. Métricas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleGroup: {
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
    fontSize: 17,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabBtnInactive: {
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: tokens.colors.surface.elevated,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
});

export default ReportesHeader;
