import apiClient from '../../../api/client';

/**
 * Servicio de API para el CRUD y Catálogo de Planes de Membresía
 */
export const planesService = {
  /**
   * Obtiene la lista de planes filtrada por modalidad, estado y búsqueda
   * Endpoint: GET /api/admin/planes
   */
  getPlanes: async ({ modalidad = 'all', estado = 'all', search = '' } = {}) => {
    const params = new URLSearchParams();
    if (modalidad && modalidad !== 'all') params.append('modalidad', modalidad);
    if (estado && estado !== 'all') params.append('estado', estado);
    if (search && search.trim()) params.append('search', search.trim());

    const response = await apiClient.get(`/api/admin/planes?${params.toString()}`);
    return response.data;
  },

  /**
   * Crea un nuevo plan de membresía
   * Endpoint: POST /api/admin/planes
   */
  createPlan: async (payload) => {
    const response = await apiClient.post('/api/admin/planes', payload);
    return response.data;
  },

  /**
   * Actualiza los datos de un plan existente
   * Endpoint: PUT /api/admin/planes/:id
   */
  updatePlan: async (planId, payload) => {
    const response = await apiClient.put(`/api/admin/planes/${planId}`, payload);
    return response.data;
  },

  /**
   * Cambia el estado del plan (ACTIVO / PAUSADO)
   * Endpoint: PATCH /api/admin/planes/:id/estado
   */
  toggleEstadoPlan: async (planId, nuevoEstado) => {
    const response = await apiClient.patch(`/api/admin/planes/${planId}/estado`, { nuevoEstado });
    return response.data;
  },

  /**
   * Elimina o archiva un plan
   * Endpoint: DELETE /api/admin/planes/:id
   */
  deletePlan: async (planId) => {
    const response = await apiClient.delete(`/api/admin/planes/${planId}`);
    return response.data;
  }
};

export default planesService;
