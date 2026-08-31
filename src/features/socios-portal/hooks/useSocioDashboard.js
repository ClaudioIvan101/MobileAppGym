import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socioPortalService } from '../services/socioPortalService';

export const SOCIO_DASHBOARD_QUERY_KEY = ['socio', 'resumen-portal'];

/**
 * Custom Hook para el Dashboard del Socio con TanStack Query
 * Maneja caché, revalidación, estados de carga y cancelación de reservas
 */
export const useSocioDashboard = () => {
  const queryClient = useQueryClient();

  // Consulta principal para el resumen del portal del socio
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: SOCIO_DASHBOARD_QUERY_KEY,
    queryFn: socioPortalService.getResumenPortal,
    staleTime: 1000 * 60 * 2, // 2 minutos de stale time
    refetchOnWindowFocus: true,
  });

  // Mutación para cancelar reservas de clases
  const cancelReservationMutation = useMutation({
    mutationFn: (reservaId) => socioPortalService.cancelarReserva(reservaId),
    onSuccess: (_, reservaId) => {
      // Actualización optimista o invalidación en caché
      queryClient.setQueryData(SOCIO_DASHBOARD_QUERY_KEY, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          proximasReservas: oldData.proximasReservas?.filter((r) => r.id !== reservaId) || [],
          metricasMes: {
            ...oldData.metricasMes,
            clasesDisponibles: (oldData.metricasMes?.clasesDisponibles || 0) + 1, // Devuelve el crédito
          },
        };
      });
      // Revalida los datos con el servidor
      queryClient.invalidateQueries({ queryKey: SOCIO_DASHBOARD_QUERY_KEY });
    },
  });

  return {
    dashboardData: data,
    socio: data?.socio,
    membresia: data?.membresia,
    metricasMes: data?.metricasMes,
    proximasReservas: data?.proximasReservas || [],
    qrPaseDigital: data?.qrPaseDigital,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    cancelarReserva: cancelReservationMutation.mutate,
    isCanceling: cancelReservationMutation.isPending,
  };
};

export default useSocioDashboard;
