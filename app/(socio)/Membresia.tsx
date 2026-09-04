import React from 'react';
import { Alert } from 'react-native';
import { SocioMembresia } from '../../src/features/socios-portal';
import { useRouter } from 'expo-router';

export default function SocioMembresiaScreen() {
  const router = useRouter();

  return (
    <SocioMembresia
      onBack={() => router.replace('/(socio)/Home')}
      onContactSupport={() =>
        Alert.alert(
          'Contactar recepción',
          'Acércate a recepción para recibir asistencia con tu membresía.'
        )
      }
    />
  );
}
