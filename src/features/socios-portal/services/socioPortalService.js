import { apiClient } from '../../../api/client';

/**
 * Servicio de API para el Portal de Socios, Perfil, Membresías, Clases y Asistencias
 */
export const socioPortalService = {
  /**
   * Obtiene el resumen consolidado del dashboard del socio
   * Endpoint: GET /api/socio/resumen-portal
   */
  getResumenPortal: async () => {
    const response = await apiClient.get('/api/socio/resumen-portal');
    return response.data;
  },

  /**
   * Cancela una reserva de clase desde el portal
   * Endpoint: DELETE /api/socio/reservas/:id
   */
  cancelarReserva: async (reservaId) => {
    const response = await apiClient.delete(`/api/socio/reservas/${reservaId}`);
    return response.data;
  },

  /**
   * Obtiene el detalle de la membresía activa del socio
   * Endpoint: GET /api/socio/membresia-actual
   */
  getMembresiaActual: async () => {
    const response = await apiClient.get('/api/socio/membresia-actual');
    return response.data;
  },

  /**
   * Obtiene el historial de pagos y comprobantes del socio
   * Endpoint: GET /api/socio/historial-pagos
   */
  getHistorialPagos: async () => {
    const response = await apiClient.get('/api/socio/historial-pagos');
    return response.data;
  },

  /**
   * Solicita la renovación de membresía a recepción
   * Endpoint: POST /api/socio/solicitar-renovacion
   */
  solicitarRenovacion: async (payload = {}) => {
    const response = await apiClient.post('/api/socio/solicitar-renovacion', payload);
    return response.data;
  },

  /**
   * Obtiene las clases disponibles filtradas por fecha, actividad e instructor
   * Endpoint: GET /api/clases/disponibles?fecha=YYYY-MM-DD&actividadId=...&instructorId=...
   */
  getClasesDisponibles: async ({ fecha, actividadId, instructorId } = {}) => {
    const params = new URLSearchParams();
    if (fecha) params.append('fecha', fecha);
    if (actividadId && actividadId !== 'all') params.append('actividadId', actividadId);
    if (instructorId && instructorId !== 'all') params.append('instructorId', instructorId);

    const response = await apiClient.get(`/api/clases/disponibles?${params.toString()}`);
    return response.data;
  },

  /**
   * Reserva cupo en una clase específica
   * Endpoint: POST /api/clases/{id}/reservar
   */
  reservarClase: async (claseId) => {
    const response = await apiClient.post(`/api/clases/${claseId}/reservar`);
    return response.data;
  },

  /**
   * Cancela la reserva de una clase específica
   * Endpoint: DELETE /api/clases/{id}/cancelar-reserva
   */
  cancelarReservaClase: async (claseId) => {
    const response = await apiClient.delete(`/api/clases/${claseId}/cancelar-reserva`);
    return response.data;
  },

  /**
   * Obtiene el historial cronológico y heatmap de asistencias del socio
   * Endpoint: GET /api/socio/asistencias?rango=30d|month|year
   */
  getAsistencias: async (rango = 'month') => {
    const response = await apiClient.get(`/api/socio/asistencias?rango=${rango}`);
    return response.data;
  },

  /**
   * Obtiene el perfil integral del socio
   * Endpoint: GET /api/socio/perfil
   */
  getPerfil: async () => {
    const response = await apiClient.get('/api/socio/perfil');
    return response.data;
  },

  /**
   * Actualiza los datos personales editables del socio
   * Endpoint: PUT /api/socio/perfil
   */
  updatePerfil: async (data) => {
    const response = await apiClient.put('/api/socio/perfil', data);
    return response.data;
  },

  /**
   * Actualiza el avatar o foto de perfil
   * Endpoint: POST /api/socio/perfil/avatar
   */
  updateAvatar: async (avatarUrl) => {
    const response = await apiClient.post('/api/socio/perfil/avatar', { avatarUrl });
    return response.data;
  },

  /**
   * Sube una nueva foto/documento de certificado médico
   * Endpoint: POST /api/socio/perfil/certificado-medico
   */
  uploadCertificadoMedico: async (payload) => {
    const response = await apiClient.post('/api/socio/perfil/certificado-medico', payload);
    return response.data;
  },

  /**
   * Cambia la contraseña del socio
   * Endpoint: POST /api/socio/perfil/cambiar-password
   */
  cambiarPassword: async ({ passwordActual, passwordNuevo }) => {
    const response = await apiClient.post('/api/socio/perfil/cambiar-password', {
      passwordActual,
      passwordNuevo,
    });
    return response.data;
  },

  /**
   * Obtiene un token QR dinámico actualizado
   * Endpoint: GET /api/socio/qr-acceso
   */
  getDynamicQR: async () => {
    const response = await apiClient.get('/api/socio/qr-acceso');
    return response.data;
  }
};

export default socioPortalService;
