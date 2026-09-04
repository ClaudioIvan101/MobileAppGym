import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SocioBottomNav } from '../../src/components/PanelBottomNav';

export default function SocioLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" />
        <Stack.Screen name="Membresia" />
        <Stack.Screen name="Clases" />
        <Stack.Screen name="Asistencias" />
        <Stack.Screen name="Perfil" />
      </Stack>
      <SocioBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
