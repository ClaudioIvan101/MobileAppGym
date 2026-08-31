import React from 'react';
import { SocioHome } from '../../src/features/socios-portal';
import { useRouter } from 'expo-router';

export default function SocioHomeScreen() {
  const router = useRouter();

  return (
    <SocioHome
      onNavigateToClasses={() => router.push('/(socio)/Clases')}
      onNavigateToRoutines={() => router.push('/(socio)/Asistencias')}
      onNavigateToMembership={() => router.push('/(socio)/Membresia')}
      onNavigateToProfile={() => router.push('/(socio)/Perfil')}
      onNavigateToNotifications={() => console.log('Navegar a Notificaciones')}
    />
  );
}
