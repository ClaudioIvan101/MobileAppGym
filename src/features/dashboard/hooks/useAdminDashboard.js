import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';

export const ADMIN_DASHBOARD_KEY = ['admin', 'dashboard'];

/**
 * Hook para el Dashboard de Gestión Administrativa
 */
export const useAdminDashboard = () => {
  const [rango, setRango] = useState('mes'); // 'hoy' | '7d' | '30d' | 'mes' | 'personalizado'
  const [searchQuery, setSearchQuery] = useState('');

  // Consulta de métricas del dashboard
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...ADMIN_DASHBOARD_KEY, rango],
    queryFn: () => dashboardService.getDashboard(rango),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });

  // Búsqueda de socios con autocompletado
  const searchSociosQuery = useQuery({
    queryKey: ['admin', 'socios', 'buscar', searchQuery],
    queryFn: () => dashboardService.buscarSocios(searchQuery),
    enabled: searchQuery.trim().length >= 2,
    staleTime: 1000 * 30,
  });

  return {
    rango,
    setRango,
    searchQuery,
    setSearchQuery,
    searchResults: searchSociosQuery.data || [],
    isSearching: searchSociosQuery.isLoading,
    kpis: dashboardData?.kpis,
    graficoMetricas: dashboardData?.graficoMetricas || [],
    actividadEnVivo: dashboardData?.actividadEnVivo || {},
    proximosVencimientos: dashboardData?.proximosVencimientos || [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};

export default useAdminDashboard;
