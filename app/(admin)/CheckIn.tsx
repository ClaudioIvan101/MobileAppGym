import React from 'react';
import { CheckIn } from '../../src/features/checkin';
import { useRouter } from 'expo-router';

export default function AdminCheckInScreen() {
  const router = useRouter();

  return (
    <CheckIn
      onOpenKiosk={() => router.push('/(admin)/Kiosk')}
      onCobrarPase={(socio) => router.push('/(admin)/PaseDiario')}
      onRenovarMembresia={(socio) => router.push(`/(admin)/SocioDetail?id=${socio?.id || 'SF-8842'}`)}
    />
  );
}
