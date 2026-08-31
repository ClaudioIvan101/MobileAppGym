import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clasesAdminService } from '../services/clasesAdminService';

export const CLASES_AGENDA_KEY = ['admin', 'clases', 'agenda'];

/**
 * Hook para la Agenda Semanal de Clases de Administración
 */
export const useClasesAdmin = () => {
  const queryClient = useQueryClient();
  const [selectedSalaId, setSelectedSalaId] = useState('all');
  const [selectedInstructorId, setSelectedInstructorId] = useState('all');
  const [selectedDay, setSelectedDay] = useState('Lunes');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedClassForDetail, setSelectedClassForDetail] = useState(null);

  // Consulta de la agenda semanal
  const {
    data: clases,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [...CLASES_AGENDA_KEY, { salaId: selectedSalaId, instructorId: selectedInstructorId }],
    queryFn: () => clasesAdminService.getAgenda({ salaId: selectedSalaId, instructorId: selectedInstructorId }),
    staleTime: 1000 * 60 * 2,
  });

  // Mutación: Programar nueva clase (individual o recurrente)
  const programarClaseMutation = useMutation({
    mutationFn: (payload) => clasesAdminService.programarClase(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASES_AGENDA_KEY });
      setIsScheduleModalOpen(false);
    },
  });

  return {
    clases: clases || [],
    selectedSalaId,
    setSelectedSalaId,
    selectedInstructorId,
    setSelectedInstructorId,
    selectedDay,
    setSelectedDay,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    selectedClassForDetail,
    setSelectedClassForDetail,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    programarClase: programarClaseMutation.mutate,
    isScheduling: programarClaseMutation.isPending,
  };
};

export default useClasesAdmin;
