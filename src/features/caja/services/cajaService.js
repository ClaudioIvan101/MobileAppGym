import apiClient from '../../../api/client';

/**
 * Servicio de API para el Control de Caja Diaria, Arqueo Ciego, Egresos e Historial de Cierres
 */
export const cajaService = {
  /**
   * Obtiene el estado en tiempo real de la caja actual del turno
   * Endpoint: GET /api/admin/caja/actual
   */
  getCajaActual: async () => {
    const response = await apiClient.get('/api/admin/caja/actual');
    return response.data;
  },

  /**
   * Abre la caja diaria con el fondo de inicio de turno
   * Endpoint: POST /api/admin/caja/abrir
   */
  abrirCaja: async (payload) => {
    const response = await apiClient.post('/api/admin/caja/abrir', payload);
    return response.data;
  },

  /**
   * Realiza el Arqueo Ciego y Cierre de Caja
   * Endpoint: POST /api/admin/caja/cerrar
   */
  cerrarCaja: async (payload) => {
    const response = await apiClient.post('/api/admin/caja/cerrar', payload);
    return response.data;
  },

  /**
   * Registra un egreso/gasto de caja chica
   * Endpoint: POST /api/admin/caja/egreso
   */
  registrarEgreso: async (payload) => {
    const response = await apiClient.post('/api/admin/caja/egreso', payload);
    return response.data;
  },

  /**
   * Obtiene el historial de todos los cierres de caja anteriores
   * Endpoint: GET /api/admin/caja/historial
   */
  getHistorialCierres: async () => {
    const response = await apiClient.get('/api/admin/caja/historial');
    return response.data;
  }
};

export default cajaService;
