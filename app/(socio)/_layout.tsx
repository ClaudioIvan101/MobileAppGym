import React from 'react';
import { Stack } from 'expo-router';

export default function SocioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" />
      <Stack.Screen name="Membresia" />
      <Stack.Screen name="Clases" />
      <Stack.Screen name="Asistencias" />
      <Stack.Screen name="Perfil" />
    </Stack>
  );
}
