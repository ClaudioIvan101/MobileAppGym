import apiClient from '../../../api/client';

/**
 * Servicio de API para el Dashboard de Gestión Administrativa
 */
export const dashboardService = {
  /**
   * Obtiene las métricas consolidadas del dashboard administrativo
   * Endpoint: GET /api/admin/dashboard?rango=hoy|7d|30d|mes
   */
  getDashboard: async (rango = 'mes') => {
    const response = await apiClient.get(`/api/admin/dashboard?rango=${rango}`);
    return response.data;
  },

  /**
   * Búsqueda en tiempo real de socios con autocompletado
   * Endpoint: GET /api/admin/socios/buscar?q=...
   */
  buscarSocios: async (query) => {
    if (!query || query.trim().length < 2) return [];
    const response = await apiClient.get(`/api/admin/socios/buscar?q=${encodeURIComponent(query.trim())}`);
    return response.data;
  },

  /**
   * Exporta el reporte ejecutivo en formato Excel / PDF
   * Endpoint: POST /api/admin/reportes/exportar
   */
  exportarReporte: async (rango = 'mes') => {
    const response = await apiClient.post('/api/admin/reportes/exportar', { rango });
    return response.data;
  }
};

export default dashboardService;
