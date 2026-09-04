import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { socioPortalService } from '../services/socioPortalService';

export const ASISTENCIAS_QUERY_KEY = ['socio', 'asistencias'];

/**
 * Hook para la pantalla de Asistencias y Constancia del Socio
 */
export const useSocioAsistencias = () => {
  const [rango, setRango] = useState('month'); // '30d' | 'month' | 'year'
  const [tipoFiltro, setTipoFiltro] = useState('ALL'); // 'ALL' | 'ACCESO_GENERAL' | 'CLASE'

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...ASISTENCIAS_QUERY_KEY, rango],
    queryFn: () => socioPortalService.getAsistencias(rango),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });

  const resumen = data?.resumen || {
    totalAsistencias: 0,
    metaMensual: 20,
    porcentajeMeta: 0,
    rachaActual: 0,
    ausenciasNoShow: 0,
    horasTotales: '0h',
  };

  const heatmapDias = data?.heatmapDias || [];
  // Filtrado en memoria por tipo de acceso
  const historialFiltrado = useMemo(() => {
    const historialCompleto = data?.historial || [];
    if (tipoFiltro === 'ALL') return historialCompleto;
    return historialCompleto.filter((item) => item.tipo === tipoFiltro);
  }, [data?.historial, tipoFiltro]);

  return {
    resumen,
    heatmapDias,
    historial: historialFiltrado,
    totalRegistros: historialFiltrado.length,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    // Filtros de fecha y tipo
    rango,
    setRango,
    tipoFiltro,
    setTipoFiltro,
  };
};

export default useSocioAsistencias;
