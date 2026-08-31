import { useQuery } from '@tanstack/react-query';
import { reportesService } from '../services/reportesService';

export const REPORTES_METRICAS_KEY = ['admin', 'reportes', 'metricas'];

/**
 * Hook para las métricas analíticas de facturación, retención, churn rate y actividades
 */
export const useReportesMetricas = () => {
  const {
    data: metricas,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: REPORTES_METRICAS_KEY,
    queryFn: reportesService.getMetricas,
    staleTime: 1000 * 60 * 5,
  });

  return {
    kpis: metricas?.kpisGenerales || {},
    facturacionMensual: metricas?.facturacionMensual || [],
    retencionYChurn: metricas?.retencionYChurn || [],
    actividadesTop: metricas?.actividadesTop || [],
    horariosPico: metricas?.horariosPico || [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};

export default useReportesMetricas;
