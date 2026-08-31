import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
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
  );
}