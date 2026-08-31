import React from 'react';
import { SociosList } from '../../src/features/socios-admin';
import { useRouter } from 'expo-router';

export default function AdminSociosScreen() {
  const router = useRouter();

  return (
    <SociosList
      onViewSocioProfile={(socio) => router.push(`/(admin)/SocioDetail?id=${socio.id}`)}
      onNuevoSocio={() => console.log('Crear nuevo socio')}
    />
  );
}
