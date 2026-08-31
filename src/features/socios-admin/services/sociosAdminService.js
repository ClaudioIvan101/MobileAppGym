import apiClient from '../../../api/client';

/**
 * Servicio de API para Gestión y Administración de Socios y Ficha 360°
 */
export const sociosAdminService = {
  /**
   * Obtiene el listado de socios con filtros y paginación en servidor
   * Endpoint: GET /api/admin/socios?page=1&limit=10&estado=...&plan=...&search=...
   */
  getSocios: async ({ page = 1, limit = 10, estado = 'all', plan = 'all', search = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (estado && estado !== 'all') params.append('estado', estado);
    if (plan && plan !== 'all') params.append('plan', plan);
    if (search) params.append('search', search);

    const response = await apiClient.get(`/api/admin/socios?${params.toString()}`);
    return response.data;
  },

  /**
   * Obtiene la Ficha 360° integral de un socio por ID
   * Endpoint: GET /api/admin/socios/:id/ficha360
   */
  getSocioFicha360: async (socioId) => {
    const response = await apiClient.get(`/api/admin/socios/${socioId}/ficha360`);
    return response.data;
  },

  /**
   * Registra un pago/cobro de cuota o servicio para el socio
   * Endpoint: POST /api/admin/socios/:id/pagos
   */
  registrarPago: async (socioId, payload) => {
    const response = await apiClient.post(`/api/admin/socios/${socioId}/pagos`, payload);
    return response.data;
  },

  /**
   * Asigna o renueva un plan para el socio
   * Endpoint: POST /api/admin/socios/:id/planes
   */
  asignarPlan: async (socioId, payload) => {
    const response = await apiClient.post(`/api/admin/socios/${socioId}/planes`, payload);
    return response.data;
  },

  /**
   * Agrega una nota interna confidencial del staff
   * Endpoint: POST /api/admin/socios/:id/notas
   */
  agregarNota: async (socioId, payload) => {
    const response = await apiClient.post(`/api/admin/socios/${socioId}/notas`, payload);
    return response.data;
  },

  /**
   * Cambia el estado del socio (Dar de baja, Suspender o Activar)
   * Endpoint: PUT /api/admin/socios/:id/estado
   */
  cambiarEstadoSocio: async (socioId, nuevoEstado) => {
    const response = await apiClient.put(`/api/admin/socios/${socioId}/estado`, { nuevoEstado });
    return response.data;
  }
};

export default sociosAdminService;
