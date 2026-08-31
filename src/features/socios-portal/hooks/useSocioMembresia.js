import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socioPortalService } from '../services/socioPortalService';

export const MEMBRESIA_ACTUAL_QUERY_KEY = ['socio', 'membresia-actual'];
export const HISTORIAL_PAGOS_QUERY_KEY = ['socio', 'historial-pagos'];

/**
 * Custom Hook para la pantalla de Membresía y Pagos del Socio
 * Consume TanStack Query para estado de membresía e historial de comprobantes
 */
export const useSocioMembresia = () => {
  const queryClient = useQueryClient();

  // Consulta de la membresía actual
  const membresiaQuery = useQuery({
    queryKey: MEMBRESIA_ACTUAL_QUERY_KEY,
    queryFn: socioPortalService.getMembresiaActual,
    staleTime: 1000 * 60 * 5, // 5 minutos de stale time
  });

  // Consulta del historial de pagos y facturación
  const pagosQuery = useQuery({
    queryKey: HISTORIAL_PAGOS_QUERY_KEY,
    queryFn: socioPortalService.getHistorialPagos,
    staleTime: 1000 * 60 * 5,
  });

  // Mutación para solicitar renovación o aviso a recepción
  const renovacionMutation = useMutation({
    mutationFn: (payload) => socioPortalService.solicitarRenovacion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBRESIA_ACTUAL_QUERY_KEY });
    },
  });

  const membresia = membresiaQuery.data;
  const historialPagos = pagosQuery.data || [];

  // Cálculos derivados del negocio
  const diasRestantes = membresia?.diasRestantes ?? 0;
  const isExpiringSoon = diasRestantes <= 7 || membresia?.estado === 'expiring';
  const isPackClases = membresia?.modalidad === 'PACK_CLASES';
  
  const clasesTotales = membresia?.clasesTotales || 0;
  const clasesRestantes = membresia?.clasesRestantes || 0;
  const clasesConsumidas = clasesTotales - clasesRestantes;
  const porcentajeConsumido = clasesTotales > 0 
    ? Math.round((clasesConsumidas / clasesTotales) * 100) 
    : 0;

  return {
    membresia,
    historialPagos,
    // Estados de carga
    isLoading: membresiaQuery.isLoading || pagosQuery.isLoading,
    isMembresiaLoading: membresiaQuery.isLoading,
    isPagosLoading: pagosQuery.isLoading,
    isError: membresiaQuery.isError || pagosQuery.isError,
    error: membresiaQuery.error || pagosQuery.error,
    // Revalidación
    refetch: () => {
      membresiaQuery.refetch();
      pagosQuery.refetch();
    },
    isRefetching: membresiaQuery.isRefetching || pagosQuery.isRefetching,
    // Datos procesados
    isExpiringSoon,
    isPackClases,
    clasesTotales,
    clasesRestantes,
    clasesConsumidas,
    porcentajeConsumido,
    // Acciones
    solicitarRenovacion: renovacionMutation.mutate,
    isSolicitandoRenovacion: renovacionMutation.isPending,
  };
};

export default useSocioMembresia;
