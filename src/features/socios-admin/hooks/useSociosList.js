import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sociosAdminService } from '../services/sociosAdminService';

export const SOCIOS_LIST_KEY = ['admin', 'socios', 'list'];

/**
 * Hook para la gestión y paginación en servidor del listado de socios
 */
export const useSociosList = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [estado, setEstado] = useState('all'); // 'all' | 'active' | 'expiring' | 'deudor' | 'inactive'
  const [plan, setPlan] = useState('all');
  const [search, setSearch] = useState('');

  // Consulta de socios con filtros y paginación
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...SOCIOS_LIST_KEY, { page, limit, estado, plan, search }],
    queryFn: () => sociosAdminService.getSocios({ page, limit, estado, plan, search }),
    staleTime: 1000 * 60 * 2,
  });

  // Mutación: Cambiar estado (Dar de baja / Activar)
  const cambiarEstadoMutation = useMutation({
    mutationFn: ({ socioId, nuevoEstado }) =>
      sociosAdminService.cambiarEstadoSocio(socioId, nuevoEstado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIOS_LIST_KEY });
    },
  });

  const registrarPagoMutation = useMutation({
    mutationFn: ({ socioId, payload }) => sociosAdminService.registrarPago(socioId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIOS_LIST_KEY });
    },
  });

  const asignarPlanMutation = useMutation({
    mutationFn: ({ socioId, payload }) => sociosAdminService.asignarPlan(socioId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIOS_LIST_KEY });
    },
  });

  const crearSocioMutation = useMutation({
    mutationFn: (payload) => sociosAdminService.crearSocio(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOCIOS_LIST_KEY });
    },
  });

  return {
    socios: data?.items || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    page,
    setPage,
    limit,
    setLimit,
    estado,
    setEstado: (val) => {
      setEstado(val);
      setPage(1);
    },
    plan,
    setPlan: (val) => {
      setPlan(val);
      setPage(1);
    },
    search,
    setSearch: (val) => {
      setSearch(val);
      setPage(1);
    },
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    cambiarEstado: cambiarEstadoMutation.mutate,
    isChangingEstado: cambiarEstadoMutation.isPending,
    registrarPago: registrarPagoMutation.mutate,
    isRegisteringPago: registrarPagoMutation.isPending,
    asignarPlan: asignarPlanMutation.mutate,
    isAssigningPlan: asignarPlanMutation.isPending,
    crearSocio: crearSocioMutation.mutate,
    isCreatingSocio: crearSocioMutation.isPending,
  };
};

export default useSociosList;
