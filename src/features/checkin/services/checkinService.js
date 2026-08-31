import apiClient from '../../../api/client';

/**
 * Servicio de API para Check-In de Recepción y Kiosko
 */
export const checkinService = {
  /**
   * Valida un DNI o código QR para registrar acceso
   * Endpoint: POST /api/checkin/validar
   * Body: { dniOrQr }
   */
  validarCheckin: async (dniOrQr) => {
    const response = await apiClient.post('/api/checkin/validar', { dniOrQr });
    return response.data;
  },

  /**
   * Obtiene la lista de últimos accesos en tiempo real
   * Endpoint: GET /api/checkin/recientes
   */
  getRecientes: async () => {
    const response = await apiClient.get('/api/checkin/recientes');
    return response.data;
  },

  /**
   * Concede acceso excepcional / forzado con justificación del recepcionista
   * Endpoint: POST /api/checkin/forzar-acceso
   */
  forzarAcceso: async ({ socioId, motivo }) => {
    const response = await apiClient.post('/api/checkin/forzar-acceso', { socioId, motivo });
    return response.data;
  }
};

export default checkinService;
