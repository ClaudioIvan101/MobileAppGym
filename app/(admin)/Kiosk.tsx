import React from 'react';
import { CheckInKiosk } from '../../src/features/checkin';
import { useRouter } from 'expo-router';

export default function AdminKioskScreen() {
  const router = useRouter();

  return (
    <CheckInKiosk
      onCloseKiosk={() => router.replace('/(admin)/CheckIn')}
    />
  );
}
