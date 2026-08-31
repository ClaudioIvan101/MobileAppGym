import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planesService } from '../services/planesService';

export const PLANES_QUERY_KEY = ['admin', 'planes'];

/**
 * Hook para la gestión del CRUD de Planes de Membresía
 */
export const usePlanesList = () => {
  const queryClient = useQueryClient();
  const [modalidad, setModalidad] = useState('all'); // 'all' | 'GENERAL' | 'CLASES'
  const [estado, setEstado] = useState('all'); // 'all' | 'ACTIVO' | 'PAUSADO'
  const [search, setSearch] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedPlanForEdit, setSelectedPlanForEdit] = useState(null);

  // Consulta de la lista de planes
  const {
    data: planes,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...PLANES_QUERY_KEY, { modalidad, estado, search }],
    queryFn: () => planesService.getPlanes({ modalidad, estado, search }),
    staleTime: 1000 * 60 * 3,
  });

  // Mutación: Crear Plan
  const createPlanMutation = useMutation({
    mutationFn: (payload) => planesService.createPlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANES_QUERY_KEY });
      setIsFormModalOpen(false);
      setSelectedPlanForEdit(null);
    },
  });

  // Mutación: Editar Plan
  const updatePlanMutation = useMutation({
    mutationFn: ({ planId, payload }) => planesService.updatePlan(planId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANES_QUERY_KEY });
      setIsFormModalOpen(false);
      setSelectedPlanForEdit(null);
    },
  });

  // Mutación: Cambiar Estado (Pausar / Activar)
  const toggleEstadoMutation = useMutation({
    mutationFn: ({ planId, nuevoEstado }) => planesService.toggleEstadoPlan(planId, nuevoEstado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANES_QUERY_KEY });
    },
  });

  // Mutación: Eliminar Plan
  const deletePlanMutation = useMutation({
    mutationFn: (planId) => planesService.deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANES_QUERY_KEY });
    },
  });

  // Métricas calculadas en el frontend
  const totalPlanes = planes?.length || 0;
  const planesActivos = planes?.filter((p) => p.estado === 'ACTIVO').length || 0;
  const totalSociosSuscritos = planes?.reduce((acc, p) => acc + (p.sociosActivosCount || 0), 0) || 0;

  const handleOpenCreateModal = () => {
    setSelectedPlanForEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (plan) => {
    setSelectedPlanForEdit(plan);
    setIsFormModalOpen(true);
  };

  return {
    planes: planes || [],
    totalPlanes,
    planesActivos,
    totalSociosSuscritos,
    modalidad,
    setModalidad,
    estado,
    setEstado,
    search,
    setSearch,
    isFormModalOpen,
    setIsFormModalOpen,
    selectedPlanForEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    createPlan: createPlanMutation.mutate,
    isCreating: createPlanMutation.isPending,
    updatePlan: updatePlanMutation.mutate,
    isUpdating: updatePlanMutation.isPending,
    toggleEstado: toggleEstadoMutation.mutate,
    isTogglingEstado: toggleEstadoMutation.isPending,
    deletePlan: deletePlanMutation.mutate,
    isDeleting: deletePlanMutation.isPending,
  };
};

export default usePlanesList;
