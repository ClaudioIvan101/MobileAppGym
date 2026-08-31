import apiClient from '../../../api/client';

/**
 * Servicio de API para la Gestión de Clases, Agenda Semanal y Control de Cupos en Vivo
 */
export const clasesAdminService = {
  /**
   * Obtiene la agenda semanal de clases filtrada por sala e instructor
   * Endpoint: GET /api/admin/clases/agenda?salaId=...&instructorId=...
   */
  getAgenda: async ({ salaId = 'all', instructorId = 'all' } = {}) => {
    const params = new URLSearchParams();
    if (salaId && salaId !== 'all') params.append('salaId', salaId);
    if (instructorId && instructorId !== 'all') params.append('instructorId', instructorId);

    const response = await apiClient.get(`/api/admin/clases/agenda?${params.toString()}`);
    return response.data;
  },

  /**
   * Programa una clase individual o recurrente en el calendario
   * Endpoint: POST /api/admin/clases/programar
   */
  programarClase: async (payload) => {
    const response = await apiClient.post('/api/admin/clases/programar', payload);
    return response.data;
  },

  /**
   * Obtiene la ficha de la clase en tiempo real (inscriptos, asistencias y lista de espera)
   * Endpoint: GET /api/admin/clases/:id/detalle
   */
  getClaseDetalle: async (claseId) => {
    const response = await apiClient.get(`/api/admin/clases/${claseId}/detalle`);
    return response.data;
  },

  /**
   * Marca o desmarca la asistencia efectiva del socio en la clase
   * Endpoint: PUT /api/admin/clases/:id/asistencia/:socioId
   */
  toggleAsistencia: async (claseId, socioId) => {
    const response = await apiClient.put(`/api/admin/clases/${claseId}/asistencia/${socioId}`);
    return response.data;
  },

  /**
   * Inscribe manualmente a un socio en la clase si hay cupo libre
   * Endpoint: POST /api/admin/clases/:id/inscribir-manual
   */
  inscribirManual: async (claseId, socioPayload) => {
    const response = await apiClient.post(`/api/admin/clases/${claseId}/inscribir-manual`, socioPayload);
    return response.data;
  },

  /**
   * Promueve a un socio de la lista de espera a la lista oficial de inscriptos
   * Endpoint: POST /api/admin/clases/:id/promover-espera
   */
  promoverDeEspera: async (claseId, socioId) => {
    const response = await apiClient.post(`/api/admin/clases/${claseId}/promover-espera`, { socioId });
    return response.data;
  }
};

export default clasesAdminService;
