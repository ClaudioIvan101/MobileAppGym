import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkinService } from '../services/checkinService';
import { audioFeedback } from '../utils/audioFeedback';

export const CHECKIN_RECIENTES_KEY = ['checkin', 'recientes'];

/**
 * Hook para el flujo de Check-In en Mostrador de Recepción y Kiosko
 */
export const useCheckin = ({ playSound = true } = {}) => {
  const queryClient = useQueryClient();
  const [lastResult, setLastResult] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Consulta de accesos recientes en tiempo real (Polling cada 8s)
  const recientesQuery = useQuery({
    queryKey: CHECKIN_RECIENTES_KEY,
    queryFn: checkinService.getRecientes,
    refetchInterval: 8000,
    staleTime: 1000 * 4,
  });

  // Mutación para validar DNI o QR
  const validarMutation = useMutation({
    mutationFn: (dniOrQr) => checkinService.validarCheckin(dniOrQr),
    onSuccess: (data) => {
      setLastResult(data);
      setSearchValue('');

      // Feedback sonoro inmediato
      if (playSound) {
        if (data.tipoResultado === 'HABILITADO') {
          audioFeedback.playSuccess();
        } else if (data.tipoResultado === 'DENEGADO_CUOTA') {
          audioFeedback.playError();
        } else if (data.tipoResultado === 'SIN_RESERVA') {
          audioFeedback.playWarning();
        }
      }

      // Revalidar feed de accesos recientes
      queryClient.invalidateQueries({ queryKey: CHECKIN_RECIENTES_KEY });
    },
  });

  // Mutación para forzar acceso excepcional
  const forzarAccesoMutation = useMutation({
    mutationFn: ({ socioId, motivo }) => checkinService.forzarAcceso({ socioId, motivo }),
    onSuccess: () => {
      if (lastResult?.socio) {
        setLastResult({
          ...lastResult,
          autorizado: true,
          tipoResultado: 'HABILITADO',
          motivo: 'Acceso Excepcional Autorizado por Staff',
        });
        if (playSound) audioFeedback.playSuccess();
        queryClient.invalidateQueries({ queryKey: CHECKIN_RECIENTES_KEY });
      }
    },
  });

  const handleClearResult = useCallback(() => {
    setLastResult(null);
  }, []);

  return {
    lastResult,
    searchValue,
    setSearchValue,
    validarCheckin: validarMutation.mutate,
    isValidating: validarMutation.isPending,
    forzarAcceso: forzarAccesoMutation.mutate,
    isForcingAcceso: forzarAccesoMutation.isPending,
    recientes: recientesQuery.data || [],
    isRecientesLoading: recientesQuery.isLoading,
    clearResult: handleClearResult,
  };
};

export default useCheckin;
