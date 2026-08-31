import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sociosAdminService } from '../services/sociosAdminService';
import { SOCIOS_LIST_KEY } from './useSociosList';

export const SOCIO_FICHA_360_KEY = ['admin', 'socio', 'ficha360'];

/**
 * Hook para la Ficha 360° Integral del Socio
 */
export const useSocioProfile360 = (socioId) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('membresias'); // 'membresias' | 'pagos' | 'asistencias' | 'notas'

  // Consulta de la ficha 360 del socio
  const {
    data: socio,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...SOCIO_FICHA_360_KEY, socioId],
    queryFn: () => sociosAdminService.getSocioFicha360(socioId),
    enabled: !!socioId,
    staleTime: 1000 * 60 * 2,
  });

  // Mutación: Registrar Cobro / Pago
  const registrarPagoMutation = useMutation({
    mutationFn: (payload) => sociosAdminService.registrarPago(socioId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...SOCIO_FICHA_360_KEY, socioId] });
      queryClient.invalidateQueries({ queryKey: SOCIOS_LIST_KEY });
    },
  });

  // Mutación: Asignar / Renovar Plan
  const asignarPlanMutation = useMutation({
    mutationFn: (payload) => sociosAdminService.asignarPlan(socioId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...SOCIO_FICHA_360_KEY, socioId] });
      queryClient.invalidateQueries({ queryKey: SOCIOS_LIST_KEY });
    },
  });

  // Mutación: Agregar Nota Interna
  const agregarNotaMutation = useMutation({
    mutationFn: (payload) => sociosAdminService.agregarNota(socioId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...SOCIO_FICHA_360_KEY, socioId] });
    },
  });

  return {
    socio,
    activeTab,
    setActiveTab,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    registrarPago: registrarPagoMutation.mutate,
    isRegisteringPago: registrarPagoMutation.isPending,
    asignarPlan: asignarPlanMutation.mutate,
    isAssigningPlan: asignarPlanMutation.isPending,
    agregarNota: agregarNotaMutation.mutate,
    isAddingNota: agregarNotaMutation.isPending,
  };
};

export default useSocioProfile360;
