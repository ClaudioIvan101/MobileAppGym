import apiClient from '../../../api/client';

/**
 * Servicio de API para Venta de Pases Diarios, Control de Caja y Check-In Automático
 */
export const dayPassService = {
  /**
   * Consulta el estado de apertura de la caja diaria del turno
   * Endpoint: GET /api/caja/estado
   */
  getCajaEstado: async () => {
    const response = await apiClient.get('/api/caja/estado');
    return response.data;
  },

  /**
   * Realiza la apertura de la caja diaria con un monto inicial
   * Endpoint: POST /api/caja/abrir
   */
  abrirCaja: async (montoInicial) => {
    const response = await apiClient.post('/api/caja/abrir', { montoInicial });
    return response.data;
  },

  /**
   * Obtiene el listado de tarifas y tipos de pases diarios vigentes
   * Endpoint: GET /api/pases-diarios/tarifas
   */
  getTarifas: async () => {
    const response = await apiClient.get('/api/pases-diarios/tarifas');
    return response.data;
  },

  /**
   * Busca si el DNI ya pertenece a un socio o visitante previo en el sistema
   * Endpoint: GET /api/pases-diarios/buscar-dni?dni=...
   */
  buscarPorDni: async (dni) => {
    if (!dni || dni.trim().length < 6) return { existe: false, persona: null };
    const response = await apiClient.get(`/api/pases-diarios/buscar-dni?dni=${encodeURIComponent(dni.trim())}`);
    return response.data;
  },

  /**
   * Operación Atómica de Venta:
   * 1. Cobro del pase con el medio de pago
   * 2. Registro del ingreso en la caja diaria
   * 3. Check-in automático de asistencia para el día de hoy
   * Endpoint: POST /api/pases-diarios/venta-atomica
   */
  venderPaseAtomico: async (payload) => {
    const response = await apiClient.post('/api/pases-diarios/venta-atomica', payload);
    return response.data;
  }
};

export default dayPassService;
