import React from 'react';
import { Alert } from 'react-native';
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
      onNavigateToNotifications={() =>
        Alert.alert('Notificaciones', 'No tienes notificaciones nuevas.')
      }
    />
  );
}
