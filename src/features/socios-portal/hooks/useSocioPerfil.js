import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socioPortalService } from '../services/socioPortalService';
import { SOCIO_DASHBOARD_QUERY_KEY } from './useSocioDashboard';

export const PERFIL_QUERY_KEY = ['socio', 'perfil'];

/**
 * Hook para la gestión del Perfil del Socio
 * Maneja datos personales, avatar, apto médico, cambio de contraseña y tema
 */
export const useSocioPerfil = () => {
  const queryClient = useQueryClient();
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

  // Consulta de perfil del socio
  const {
    data: perfil,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: PERFIL_QUERY_KEY,
    queryFn: socioPortalService.getPerfil,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Mutación: Actualizar datos personales
  const updatePerfilMutation = useMutation({
    mutationFn: (updatedData) => socioPortalService.updatePerfil(updatedData),
    onSuccess: (data) => {
      queryClient.setQueryData(PERFIL_QUERY_KEY, data?.perfil || data);
      queryClient.invalidateQueries({ queryKey: SOCIO_DASHBOARD_QUERY_KEY });
    },
  });

  // Mutación: Actualizar Avatar
  const updateAvatarMutation = useMutation({
    mutationFn: (avatarUrl) => socioPortalService.updateAvatar(avatarUrl),
    onSuccess: (data) => {
      queryClient.setQueryData(PERFIL_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, avatarUrl: data.avatarUrl };
      });
      queryClient.invalidateQueries({ queryKey: SOCIO_DASHBOARD_QUERY_KEY });
    },
  });

  // Mutación: Subir Certificado Médico
  const uploadCertificadoMutation = useMutation({
    mutationFn: (payload) => socioPortalService.uploadCertificadoMedico(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERFIL_QUERY_KEY });
    },
  });

  // Mutación: Cambiar Contraseña
  const cambiarPasswordMutation = useMutation({
    mutationFn: ({ passwordActual, passwordNuevo }) =>
      socioPortalService.cambiarPassword({ passwordActual, passwordNuevo }),
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return {
    perfil,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    // Acciones de actualización
    updatePerfil: updatePerfilMutation.mutate,
    isUpdatingPerfil: updatePerfilMutation.isPending,
    updateAvatar: updateAvatarMutation.mutate,
    isUpdatingAvatar: updateAvatarMutation.isPending,
    uploadCertificado: uploadCertificadoMutation.mutate,
    isUploadingCertificado: uploadCertificadoMutation.isPending,
    cambiarPassword: cambiarPasswordMutation.mutate,
    isChangingPassword: cambiarPasswordMutation.isPending,
    // Preferencias de tema
    theme,
    toggleTheme,
  };
};

export default useSocioPerfil;
