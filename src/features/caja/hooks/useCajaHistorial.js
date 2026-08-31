import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cajaService } from '../services/cajaService';
import { CAJA_HISTORIAL_KEY } from './useCajaActual';

/**
 * Hook para el historial de cierres de caja anteriores
 */
export const useCajaHistorial = () => {
  const [search, setSearch] = useState('');
  const [selectedCierreDetail, setSelectedCierreDetail] = useState(null);

  const {
    data: historial,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: CAJA_HISTORIAL_KEY,
    queryFn: cajaService.getHistorialCierres,
    staleTime: 1000 * 60 * 5,
  });

  const filteredHistorial = (historial || []).filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.responsable.toLowerCase().includes(q) ||
      item.turno.toLowerCase().includes(q) ||
      item.fechaCierre.includes(q) ||
      item.cajaId.toLowerCase().includes(q)
    );
  });

  return {
    historial: filteredHistorial,
    rawHistorial: historial || [],
    search,
    setSearch,
    selectedCierreDetail,
    setSelectedCierreDetail,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  };
};

export default useCajaHistorial;
