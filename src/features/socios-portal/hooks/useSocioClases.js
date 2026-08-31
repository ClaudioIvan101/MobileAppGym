import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socioPortalService } from '../services/socioPortalService';
import { SOCIO_DASHBOARD_QUERY_KEY } from './useSocioDashboard';

export const CLASES_QUERY_KEY = 'clases_disponibles';

/**
 * Hook para la gestión de reservas de clases con Optimistic Updates
 */
export const useSocioClases = () => {
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [selectedInstructor, setSelectedInstructor] = useState('all');

  const queryFilters = {
    fecha: selectedDate,
    actividadId: selectedActivity,
    instructorId: selectedInstructor,
  };

  const currentQueryKey = [CLASES_QUERY_KEY, queryFilters];

  // Consulta de clases disponibles para la fecha y filtros
  const {
    data: clases = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: currentQueryKey,
    queryFn: () => socioPortalService.getClasesDisponibles(queryFilters),
    staleTime: 1000 * 30, // 30 segundos
  });

  // Mutación Optimista: Reservar Cupo
  const reservarMutation = useMutation({
    mutationFn: (claseId) => socioPortalService.reservarClase(claseId),
    onMutate: async (claseId) => {
      // 1. Cancelar queries salientes para evitar sobrescribir el estado optimista
      await queryClient.cancelQueries({ queryKey: currentQueryKey });

      // 2. Guardar snapshot del estado previo
      const previousClases = queryClient.getQueryData(currentQueryKey);

      // 3. Actualizar la caché de forma optimista
      queryClient.setQueryData(currentQueryKey, (old = []) =>
        old.map((c) => {
          if (c.id === claseId) {
            return {
              ...c,
              cupoOcupado: Math.min(c.cupoTotal, c.cupoOcupado + 1),
              isReservada: true,
            };
          }
          return c;
        })
      );

      return { previousClases };
    },
    onError: (err, claseId, context) => {
      // Revertir a la snapshot previa en caso de error
      if (context?.previousClases) {
        queryClient.setQueryData(currentQueryKey, context.previousClases);
      }
    },
    onSettled: () => {
      // Sincronizar con el servidor y refrescar dashboard
      queryClient.invalidateQueries({ queryKey: [CLASES_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: SOCIO_DASHBOARD_QUERY_KEY });
    },
  });

  // Mutación Optimista: Cancelar Reserva
  const cancelarMutation = useMutation({
    mutationFn: (claseId) => socioPortalService.cancelarReservaClase(claseId),
    onMutate: async (claseId) => {
      await queryClient.cancelQueries({ queryKey: currentQueryKey });
      const previousClases = queryClient.getQueryData(currentQueryKey);

      queryClient.setQueryData(currentQueryKey, (old = []) =>
        old.map((c) => {
          if (c.id === claseId) {
            return {
              ...c,
              cupoOcupado: Math.max(0, c.cupoOcupado - 1),
              isReservada: false,
            };
          }
          return c;
        })
      );

      return { previousClases };
    },
    onError: (err, claseId, context) => {
      if (context?.previousClases) {
        queryClient.setQueryData(currentQueryKey, context.previousClases);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CLASES_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: SOCIO_DASHBOARD_QUERY_KEY });
    },
  });

  /**
   * Valida si una clase puede ser cancelada según la regla de negocio (hasta 2 horas antes)
   * @param {string} fecha YYYY-MM-DD
   * @param {string} horarioInicio HH:mm
   * @returns {{ canCancel: boolean, hoursRemaining: number, reason?: string }}
   */
  const checkCancellationEligibility = (fecha, horarioInicio) => {
    try {
      const [year, month, day] = fecha.split('-').map(Number);
      const [hour, minute] = horarioInicio.split(':').map(Number);
      const classDate = new Date(year, month - 1, day, hour, minute);
      
      // Fecha actual de referencia
      const now = new Date();
      const diffMs = classDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // Si la clase es para hoy después de las 14:22 hs o para días futuros, permite cancelación (> 2 horas)
      if (diffHours >= 2) {
        return { canCancel: true, hoursRemaining: Math.round(diffHours) };
      }

      return {
        canCancel: false,
        hoursRemaining: Math.max(0, diffHours),
        reason: 'Faltan menos de 2 horas para el inicio. Cancelación bloqueada.',
      };
    } catch {
      return { canCancel: false, hoursRemaining: 0, reason: 'Error al calcular la elegibilidad de cancelación.' };
    }
  };

  return {
    clases,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    // Filtros
    selectedDate,
    setSelectedDate,
    selectedActivity,
    setSelectedActivity,
    selectedInstructor,
    setSelectedInstructor,
    // Acciones optimistas
    reservarClase: reservarMutation.mutate,
    isReservando: reservarMutation.isPending,
    cancelarReserva: cancelarMutation.mutate,
    isCancelando: cancelarMutation.isPending,
    // Reglas de negocio
    checkCancellationEligibility,
  };
};

export default useSocioClases;
