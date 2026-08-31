import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import {
  Users,
  CreditCard,
  ShoppingBag,
  Receipt,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react-native';

const TABS = [
  { id: 'checkins', label: 'Check-ins', icon: Users },
  { id: 'pagos', label: 'Pagos', icon: CreditCard },
  { id: 'ventas', label: 'Ventas', icon: ShoppingBag },
  { id: 'egresos', label: 'Egresos', icon: Receipt },
];

/**
 * Pestañas de Actividad Operativa en Vivo universal para React Native
 */
export const LiveActivityTabs = ({
  actividad = {},
}) => {
  const [activeTab, setActiveTab] = useState('checkins');

  const {
    checkins = [],
    pagos = [],
    ventasMostrador = [],
    egresos = [],
  } = actividad || {};

  return (
    <View style={styles.container}>
      {/* Selector de Pestañas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsHeader}
      >
        {TABS.map((tab) => {
          const isSelected = tab.id === activeTab;
          const IconComp = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.75}
              style={[
                styles.tabBtn,
                isSelected ? styles.tabBtnActive : styles.tabBtnInactive,
              ]}
            >
              <IconComp size={13} color={isSelected ? tokens.colors.primary[400] : tokens.colors.text.secondary} />
              <Text
                style={[
                  styles.tabText,
                  { color: isSelected ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Contenido */}
      <View style={styles.tabBody}>
        {activeTab === 'checkins' && (
          <View style={styles.list}>
            {checkins.map((item) => (
              <View key={item.id} style={styles.rowItem}>
                <View style={styles.rowLeft}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: item.estado === 'HABILITADO' ? tokens.colors.primary[500] : '#ef4444' },
                    ]}
                  />
                  <View style={styles.textCol}>
                    <Text style={styles.primaryText}>{item.socio}</Text>
                    <Text style={styles.secondaryText}>{item.detalle}</Text>
                  </View>
                </View>
                <Text style={styles.timeTag}>{item.hora}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'pagos' && (
          <View style={styles.list}>
            {pagos.map((item) => (
              <View key={item.id} style={styles.rowItem}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircleEmerald}>
                    <ArrowUpRight size={13} color={tokens.colors.primary[400]} />
                  </View>
                  <View style={styles.textCol}>
                    <Text style={styles.primaryText}>{item.socio}</Text>
                    <Text style={styles.secondaryText}>{item.concepto} • {item.medio}</Text>
                  </View>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.amountGreen}>{item.monto}</Text>
                  <Text style={styles.timeTag}>{item.hora}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'ventas' && (
          <View style={styles.list}>
            {ventasMostrador.map((item) => (
              <View key={item.id} style={styles.rowItem}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircleCyan}>
                    <ShoppingBag size={13} color={tokens.colors.accent.cyan} />
                  </View>
                  <View style={styles.textCol}>
                    <Text style={styles.primaryText}>{item.item}</Text>
                    <Text style={styles.secondaryText}>{item.cliente} • {item.medio}</Text>
                  </View>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.amountCyan}>{item.monto}</Text>
                  <Text style={styles.timeTag}>{item.hora}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'egresos' && (
          <View style={styles.list}>
            {egresos.map((item) => (
              <View key={item.id} style={styles.rowItem}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircleRed}>
                    <ArrowDownRight size={13} color="#f87171" />
                  </View>
                  <View style={styles.textCol}>
                    <Text style={styles.primaryText}>{item.concepto}</Text>
                    <Text style={styles.secondaryText}>{item.responsable}</Text>
                  </View>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.amountRed}>- {item.monto}</Text>
                  <Text style={styles.timeTag}>{item.hora}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
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
  tabsHeader: {
    flexDirection: 'row',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
    paddingBottom: 8,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  tabBtnInactive: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: tokens.colors.primary[500],
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tabBody: {
    minHeight: 120,
  },
  list: {
    gap: 6,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  textCol: {
    flex: 1,
  },
  iconCircleEmerald: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCyan: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleRed: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  secondaryText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amountGreen: {
    fontSize: 12.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  amountCyan: {
    fontSize: 12.5,
    fontWeight: '800',
    color: tokens.colors.accent.cyan,
  },
  amountRed: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#f87171',
  },
  timeTag: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
});

export default LiveActivityTabs;
