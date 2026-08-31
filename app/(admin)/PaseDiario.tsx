import React from 'react';
import { DayPassPage } from '../../src/features/pases-diarios';
import { useRouter } from 'expo-router';

export default function AdminDayPassScreen() {
  const router = useRouter();

  return (
    <DayPassPage
      onBack={() => router.replace('/(admin)/Home')}
    />
  );
}
