import React from 'react';
import { SocioAsistencias } from '../../src/features/socios-portal';
import { useRouter } from 'expo-router';

export default function SocioAsistenciasScreen() {
  const router = useRouter();

  return (
    <SocioAsistencias
      onBack={() => router.replace('/(socio)/Home')}
    />
  );
}
