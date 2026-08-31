import React from 'react';
import { Dashboard } from '../../src/features/dashboard';
import { useRouter } from 'expo-router';

export default function AdminHomeScreen() {
  const router = useRouter();

  return (
    <Dashboard
      onOpenSocioFicha={(socio) => router.push(`/(admin)/SocioDetail?id=${socio.id}`)}
      onCobrarPase={() => router.push('/(admin)/PaseDiario')}
      onNuevoSocio={() => router.push('/(admin)/Socios')}
      onExportar={() => router.push('/(admin)/Reportes')}
    />
  );
}