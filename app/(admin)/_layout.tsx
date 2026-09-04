import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AdminBottomNav } from '../../src/components/PanelBottomNav';

export default function AdminLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" />
        <Stack.Screen name="Socios" />
        <Stack.Screen name="SocioDetail" />
        <Stack.Screen name="CheckIn" />
        <Stack.Screen name="Kiosk" />
        <Stack.Screen name="PaseDiario" />
        <Stack.Screen name="Clases" />
        <Stack.Screen name="Planes" />
        <Stack.Screen name="Caja" />
        <Stack.Screen name="Reportes" />
      </Stack>
      <AdminBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
