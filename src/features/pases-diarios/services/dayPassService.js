import { apiClient } from '../../../api/client';

/**
 * Servicio de API para Venta de Pases Diarios, Control de Caja y Check-In Automático
 */
export const dayPassService = {
  /**
   * Consulta el estado de apertura de la caja diaria del turno
   * Endpoint: GET /api/caja/estado
   */
  getCajaEstado: async () => {
    const response = await apiClient.get('/api/caja/resumen');
    const data = response.data || {};
    return {
      ...data,
      isAbierta: data.isAbierta ?? !data.cajaCerrada,
      saldoInicial: data.saldoInicial ?? data.ultimoCierre?.saldoInicial ?? 0,
    };
  },

  /**
   * Realiza la apertura de la caja diaria con un monto inicial
   * Endpoint: POST /api/caja/abrir
   */
  abrirCaja: async (montoInicial) => {
    // El backend considera abierta la caja mientras no exista un cierre del día.
    // Para reabrir una caja cerrada expone /api/caja/reabrir.
    const response = await apiClient.post('/api/caja/reabrir', { montoInicial });
    return response.data;
  },

  /**
   * Obtiene el listado de tarifas y tipos de pases diarios vigentes
   * Endpoint: GET /api/pases-diarios/tarifas
   */
  getTarifas: async () => {
    const response = await apiClient.get('/api/pases-diarios/tarifas');
    return response.data || [];
  },

  /**
   * Busca si el DNI ya pertenece a un socio o visitante previo en el sistema
   * Endpoint: GET /api/pases-diarios/buscar-dni?dni=...
   */
  buscarPorDni: async (dni) => {
    if (!dni || dni.trim().length < 6) return { existe: false, persona: null };
    try {
      const response = await apiClient.get(`/api/socios/${encodeURIComponent(dni.trim())}`);
      const persona = response.data;
      return {
        existe: Boolean(persona),
        persona: persona
          ? {
              ...persona,
              id: persona.id ?? persona.idSocio,
              nombre: persona.nombre,
              apellido: persona.apellido,
            }
          : null,
      };
    } catch (error) {
      if (error?.response?.status === 404) {
        return { existe: false, persona: null };
      }
      throw error;
    }
  },

  /**
   * Operación Atómica de Venta:
   * 1. Cobro del pase con el medio de pago
   * 2. Registro del ingreso en la caja diaria
   * 3. Check-in automático de asistencia para el día de hoy
   * Endpoint: POST /api/pases-diarios/venta-atomica
   */
  venderPaseAtomico: async (payload) => {
    const response = await apiClient.post('/api/pases-diarios', payload);
    const data = response.data || {};
    const fechaValidez = data.fechaValidez;
    return {
      ...data,
      ticketNumero: data.ticketNumero || (data.idPaseDiario ? `PASE-${data.idPaseDiario}` : undefined),
      monto: data.monto ?? Number(data.importe ?? payload.importe ?? 0),
      medioPago: data.medioPago || data.metodoPago || payload.metodoPago,
      cliente: data.cliente || {
        nombre: data.personaNombre || payload.visitante?.nombre || '',
        dni: data.personaDni || payload.visitante?.dni || '',
        telefono: payload.visitante?.telefono || '',
      },
      tarifaNombre: data.tarifaNombre || 'Pase Diario',
      codigoAcceso: data.codigoAcceso || (data.idPaseDiario ? `PASE-${data.idPaseDiario}` : undefined),
      paseValidoHasta: data.paseValidoHasta || fechaValidez || 'Hoy',
    };
  }
};

export default dayPassService;
