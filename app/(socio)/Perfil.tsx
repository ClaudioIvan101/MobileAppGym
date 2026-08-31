import React from 'react';
import { SocioPerfil } from '../../src/features/socios-portal';
import { useRouter } from 'expo-router';

export default function SocioPerfilScreen() {
  const router = useRouter();

  return (
    <SocioPerfil
      onBack={() => router.replace('/(socio)/Home')}
      onLogout={() => router.replace('/')}
    />
  );
}
