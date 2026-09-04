import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clasesAdminService } from '../services/clasesAdminService';
import { CLASES_AGENDA_KEY } from './useClasesAdmin';

export const CLASE_DETALLE_KEY = ['admin', 'clases', 'detalle'];

/**
 * Hook para la Ficha en Tiempo Real de la Clase (Inscriptos, Asistencia y Lista de Espera)
 */
export const useClassRealtimeDetail = (claseId) => {
  const queryClient = useQueryClient();

  // Consulta del detalle en vivo
  const {
    data: claseDetalle,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [...CLASE_DETALLE_KEY, claseId],
    queryFn: () => clasesAdminService.getClaseDetalle(claseId),
    enabled: !!claseId,
    refetchInterval: 10000, // Polling cada 10s para cupos en vivo
  });

  // Mutación: Alternar asistencia efectiva
  const toggleAsistenciaMutation = useMutation({
    mutationFn: (socioId) => clasesAdminService.toggleAsistencia(claseId, socioId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...CLASE_DETALLE_KEY, claseId] });
    },
  });

  // Mutación: Inscribir socio manualmente
  const inscribirManualMutation = useMutation({
    mutationFn: (socioPayload) => clasesAdminService.inscribirManual(claseId, socioPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...CLASE_DETALLE_KEY, claseId] });
      queryClient.invalidateQueries({ queryKey: CLASES_AGENDA_KEY });
    },
  });

  // Mutación: Promover de lista de espera
  const promoverEsperaMutation = useMutation({
    mutationFn: (socioId) => clasesAdminService.promoverDeEspera(claseId, socioId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...CLASE_DETALLE_KEY, claseId] });
      queryClient.invalidateQueries({ queryKey: CLASES_AGENDA_KEY });
    },
  });

  return {
    clase: claseDetalle,
    inscriptos: claseDetalle?.inscriptos || [],
    listaEspera: claseDetalle?.listaEspera || [],
    cupoTotal: claseDetalle?.cupoTotal || 0,
    cupoOcupado: claseDetalle?.cupoOcupado || 0,
    cupoLibre: Math.max(0, (claseDetalle?.cupoTotal || 0) - (claseDetalle?.cupoOcupado || 0)),
    isLoading,
    isError,
    refetch,
    toggleAsistencia: toggleAsistenciaMutation.mutate,
    isTogglingAsistencia: toggleAsistenciaMutation.isPending,
    inscribirManual: inscribirManualMutation.mutate,
    isInscribingManual: inscribirManualMutation.isPending,
    promoverEspera: promoverEsperaMutation.mutate,
    isPromoting: promoverEsperaMutation.isPending,
  };
};

export default useClassRealtimeDetail;
