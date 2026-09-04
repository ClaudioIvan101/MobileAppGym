import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Activity,
  CalendarDays,
  CreditCard,
  Home,
  ScanLine,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react-native';
import { tokens } from '../theme/tokens';

const ADMIN_ITEMS = [
  { label: 'Inicio', route: '/(admin)/Home', Icon: Home },
  { label: 'Check-in', route: '/(admin)/CheckIn', Icon: ScanLine },
  { label: 'Clases', route: '/(admin)/Clases', Icon: CalendarDays },
  {
    label: 'Socios',
    route: '/(admin)/Socios',
    activeRoutes: ['/(admin)/Socios', '/(admin)/SocioDetail'],
    Icon: Users,
  },
  { label: 'Caja', route: '/(admin)/Caja', Icon: Wallet },
];

const SOCIO_ITEMS = [
  { label: 'Inicio', route: '/(socio)/Home', Icon: Home },
  { label: 'Clases', route: '/(socio)/Clases', Icon: CalendarDays },
  { label: 'Asistencias', route: '/(socio)/Asistencias', Icon: Activity },
  { label: 'Membresía', route: '/(socio)/Membresia', Icon: CreditCard },
  { label: 'Perfil', route: '/(socio)/Perfil', Icon: UserRound },
];

const isRouteActive = (pathname, item) => {
  const normalizeRoute = (route) => route.replace(/\/\([^/]+\)/g, '');
  const normalizedPathname = normalizeRoute(pathname);
  const routes = (item.activeRoutes || [item.route]).map(normalizeRoute);
  return routes.some(
    (route) =>
      normalizedPathname === route || normalizedPathname.startsWith(`${route}/`)
  );
};

const PanelBottomNav = ({ items, hiddenOnKiosk = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (hiddenOnKiosk && pathname.includes('/Kiosk')) {
    return null;
  }

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const active = isRouteActive(pathname, item);
        const color = active ? tokens.colors.primary[400] : tokens.colors.text.muted;

        return (
          <Pressable
            key={item.route}
            accessibilityLabel={`Ir a ${item.label}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              if (!active) {
                router.replace(item.route);
              }
            }}
            style={({ pressed }) => [
              styles.item,
              active && styles.itemActive,
              pressed && styles.itemPressed,
            ]}
          >
            <item.Icon size={21} color={color} strokeWidth={active ? 2.5 : 2} />
            <Text style={[styles.label, { color }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export const AdminBottomNav = () => (
  <PanelBottomNav items={ADMIN_ITEMS} hiddenOnKiosk />
);

export const SocioBottomNav = () => <PanelBottomNav items={SOCIO_ITEMS} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: tokens.colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
  },
  item: {
    minHeight: 52,
    minWidth: 56,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: 10,
    paddingHorizontal: 2,
  },
  itemActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  itemPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default PanelBottomNav;
