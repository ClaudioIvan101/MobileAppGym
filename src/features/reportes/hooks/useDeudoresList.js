import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportesService } from '../services/reportesService';

export const DEUDORES_QUERY_KEY = ['admin', 'reportes', 'deudores'];

/**
 * Hook para la gestión de deudores, filtros por días de mora y cobranzas
 */
export const useDeudoresList = () => {
  const queryClient = useQueryClient();
  const [moraMinima, setMoraMinima] = useState(0); // 0 (todos), 5 (>5d), 15 (>15d), 30 (>30d)
  const [search, setSearch] = useState('');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedDeudoresIds, setSelectedDeudoresIds] = useState([]);

  // Consulta de deudores
  const {
    data: deudores,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...DEUDORES_QUERY_KEY, { moraMinima, search }],
    queryFn: () => reportesService.getDeudores({ moraMinima, search }),
    staleTime: 1000 * 60 * 2,
  });

  // Mutación: Envío de recordatorio masivo
  const enviarRecordatorioMasivoMutation = useMutation({
    mutationFn: (payload) => reportesService.enviarRecordatorioMasivo(payload),
    onSuccess: () => {
      setIsBulkModalOpen(false);
      setSelectedDeudoresIds([]);
    },
  });

  // KPIs calculados
  const totalDeudores = deudores?.length || 0;
  const deudaTotalSum = (deudores || []).reduce((acc, d) => acc + (d.montoDeuda || 0), 0);
  const deudoresCriticosCount = (deudores || []).filter((d) => d.diasMora >= 30).length;

  return {
    deudores: deudores || [],
    totalDeudores,
    deudaTotalSum,
    deudoresCriticosCount,
    moraMinima,
    setMoraMinima,
    search,
    setSearch,
    isBulkModalOpen,
    setIsBulkModalOpen,
    selectedDeudoresIds,
    setSelectedDeudoresIds,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    enviarRecordatorioMasivo: enviarRecordatorioMasivoMutation.mutate,
    isSendingBulk: enviarRecordatorioMasivoMutation.isPending,
  };
};

export default useDeudoresList;
