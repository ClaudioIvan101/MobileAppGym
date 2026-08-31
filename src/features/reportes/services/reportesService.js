import apiClient from '../../../api/client';

/**
 * Servicio de API para Gestión de Deudores, Cobranzas y Métricas Comerciales de Reportes
 */
export const reportesService = {
  /**
   * Obtiene la lista de socios en mora con filtros de días de atraso y búsqueda
   * Endpoint: GET /api/admin/reportes/deudores
   */
  getDeudores: async ({ moraMinima = 0, search = '' } = {}) => {
    const params = new URLSearchParams();
    if (moraMinima > 0) params.append('moraMinima', String(moraMinima));
    if (search && search.trim()) params.append('search', search.trim());

    const response = await apiClient.get(`/api/admin/reportes/deudores?${params.toString()}`);
    return response.data;
  },

  /**
   * Envía recordatorio masivo de pago por WhatsApp y Email a los deudores seleccionados
   * Endpoint: POST /api/admin/reportes/deudores/recordatorio-masivo
   */
  enviarRecordatorioMasivo: async (payload) => {
    const response = await apiClient.post('/api/admin/reportes/deudores/recordatorio-masivo', payload);
    return response.data;
  },

  /**
   * Obtiene los datos analíticos de facturación, retención, churn rate, actividades y horas pico
   * Endpoint: GET /api/admin/reportes/metricas
   */
  getMetricas: async () => {
    const response = await apiClient.get('/api/admin/reportes/metricas');
    return response.data;
  }
};

export default reportesService;
