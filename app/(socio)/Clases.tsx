import React from 'react';
import { SocioClases } from '../../src/features/socios-portal';
import { useRouter } from 'expo-router';

export default function SocioClasesScreen() {
  const router = useRouter();

  return (
    <SocioClases
      onBack={() => router.replace('/(socio)/Home')}
    />
  );
}
