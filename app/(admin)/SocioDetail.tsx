import React from 'react';
import { SocioProfile } from '../../src/features/socios-admin';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AdminSocioDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const socioId = (params.id as string) || 'SF-8842';

  return (
    <SocioProfile
      socioId={socioId}
      onBack={() => router.replace('/(admin)/Socios')}
    />
  );
}
