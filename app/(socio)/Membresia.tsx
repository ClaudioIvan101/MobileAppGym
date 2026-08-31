import React from 'react';
import { SocioMembresia } from '../../src/features/socios-portal';
import { useRouter } from 'expo-router';

export default function SocioMembresiaScreen() {
  const router = useRouter();

  return (
    <SocioMembresia
      onBack={() => router.replace('/(socio)/Home')}
      onContactSupport={() => console.log('Contactar Recepción')}
    />
  );
}
