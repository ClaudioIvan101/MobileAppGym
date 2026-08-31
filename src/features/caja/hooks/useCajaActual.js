import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cajaService } from '../services/cajaService';

export const CAJA_ACTUAL_KEY = ['admin', 'caja', 'actual'];
export const CAJA_HISTORIAL_KEY = ['admin', 'caja', 'historial'];

/**
 * Hook para la gestión de la caja actual en vivo, arqueo ciego y egresos
 */
export const useCajaActual = () => {
  const queryClient = useQueryClient();
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [lastClosingReport, setLastClosingReport] = useState(null);

  // Consulta de la caja actual
  const {
    data: caja,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: CAJA_ACTUAL_KEY,
    queryFn: cajaService.getCajaActual,
    staleTime: 1000 * 30,
    refetchInterval: 15000, // Refresh cada 15s para caja en vivo
  });

  // Mutación: Abrir Caja
  const abrirCajaMutation = useMutation({
    mutationFn: (payload) => cajaService.abrirCaja(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAJA_ACTUAL_KEY });
      setIsOpenModalOpen(false);
    },
  });

  // Mutación: Cerrar Caja (Arqueo Ciego)
  const cerrarCajaMutation = useMutation({
    mutationFn: (payload) => cajaService.cerrarCaja(payload),
    onSuccess: (data) => {
      setLastClosingReport(data?.cierre);
      queryClient.invalidateQueries({ queryKey: CAJA_ACTUAL_KEY });
      queryClient.invalidateQueries({ queryKey: CAJA_HISTORIAL_KEY });
      setIsCloseModalOpen(false);
    },
  });

  // Mutación: Registrar Egreso
  const registrarEgresoMutation = useMutation({
    mutationFn: (payload) => cajaService.registrarEgreso(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAJA_ACTUAL_KEY });
      setIsExpenseModalOpen(false);
    },
  });

  return {
    caja,
    isAbierta: caja?.isAbierta ?? false,
    desglose: caja?.desglose || { efectivo: 0, mercadoPago: 0, debito: 0, credito: 0, transferencia: 0 },
    movimientos: caja?.movimientos || [],
    saldoNetoEfectivo: caja?.saldoNetoEfectivo || 0,
    totalIngresos: caja?.totalIngresos || 0,
    totalEgresos: caja?.totalEgresos || 0,
    isOpenModalOpen,
    setIsOpenModalOpen,
    isCloseModalOpen,
    setIsCloseModalOpen,
    isExpenseModalOpen,
    setIsExpenseModalOpen,
    lastClosingReport,
    clearLastClosingReport: () => setLastClosingReport(null),
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    abrirCaja: abrirCajaMutation.mutate,
    isOpening: abrirCajaMutation.isPending,
    cerrarCaja: cerrarCajaMutation.mutate,
    isClosing: cerrarCajaMutation.isPending,
    registrarEgreso: registrarEgresoMutation.mutate,
    isRegisteringExpense: registrarEgresoMutation.isPending,
  };
};

export default useCajaActual;
