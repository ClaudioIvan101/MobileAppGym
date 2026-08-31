import { Stack } from 'expo-router';
import { QueryProvider } from '../src/context/QueryProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(socio)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryProvider>
  );
}