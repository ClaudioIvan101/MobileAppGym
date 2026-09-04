import { apiClient } from '../../../api/client';

/**
 * Servicio de API para el Control de Caja Diaria, Arqueo Ciego, Egresos e Historial de Cierres
 */
export const cajaService = {
  /**
   * Obtiene el estado en tiempo real de la caja actual del turno
   * Endpoint: GET /api/admin/caja/actual
   */
  getCajaActual: async () => {
    const [summaryResponse, movementsResponse] = await Promise.all([
      apiClient.get('/api/caja/resumen'),
      apiClient.get('/api/caja/movimientos?page=0&size=50'),
    ]);
    const summary = summaryResponse.data || {};
    const movements = movementsResponse.data;
    return normalizeCajaActual({
      ...summary,
      movimientos: Array.isArray(movements) ? movements : movements?.content || [],
    });
  },

  /**
   * Abre la caja diaria con el fondo de inicio de turno
   * Endpoint: POST /api/admin/caja/abrir
   */
  abrirCaja: async (payload) => {
    const response = await apiClient.post('/api/caja/reabrir', payload);
    return response.data;
  },

  /**
   * Realiza el Arqueo Ciego y Cierre de Caja
   * Endpoint: POST /api/admin/caja/cerrar
   */
  cerrarCaja: async (payload) => {
    const response = await apiClient.post('/api/caja/cierres', {
      saldoInicial: payload?.saldoInicial ?? payload?.montoInicial ?? 0,
      efectivoContado: payload?.efectivoContado ?? payload?.efectivoDeclarado ?? 0,
      observacion: payload?.observacion ?? payload?.observaciones,
    });
    return normalizeCierre(response.data);
  },

  /**
   * Registra un egreso/gasto de caja chica
   * Endpoint: POST /api/admin/caja/egreso
   */
  registrarEgreso: async (payload) => {
    const response = await apiClient.post('/api/caja/movimientos', {
      tipo: 'EGRESO',
      categoria: payload?.categoria || 'OTROS',
      concepto: payload?.concepto || 'Egreso de caja',
      detalle: payload?.detalle || payload?.comprobante,
      monto: payload?.monto,
      metodoPago: payload?.metodoPago || 'EFECTIVO',
    });
    return response.data;
  },

  /**
   * Obtiene el historial de todos los cierres de caja anteriores
   * Endpoint: GET /api/admin/caja/historial
   */
  getHistorialCierres: async () => {
    const response = await apiClient.get('/api/caja/cierres?page=0&size=100');
    const data = response.data;
    const items = Array.isArray(data) ? data : data?.content || [];
    return items.map(normalizeCierre);
  }
};

const normalizeCajaActual = (data) => {
  const totalFacturadoTurno = data.totalFacturadoTurno
    ?? data.totalFacturado
    ?? Number(data.ingresosSistema || 0) + Number(data.ingresosProductos || 0) + Number(data.ingresosManuales || 0);
  const desglose = data.desglose || (data.metodosSistema || []).reduce((result, item) => {
    const metodo = String(item.metodoPago || '').toLowerCase();
    const key = metodo.includes('efect')
      ? 'efectivo'
      : metodo.includes('mercado')
      ? 'mercadoPago'
      : metodo.includes('deb')
      ? 'debito'
      : metodo.includes('cred') || metodo.includes('tarjet')
      ? 'credito'
      : 'transferencia';
    result[key] = Number(result[key] || 0) + Number(item.total || 0);
    return result;
  }, { efectivo: 0, mercadoPago: 0, debito: 0, credito: 0, transferencia: 0 });

  return {
    ...data,
    isAbierta: data.isAbierta ?? !data.cajaCerrada,
    totalFacturadoTurno,
    totalIngresos: data.totalIngresos ?? totalFacturadoTurno,
    totalEgresos: data.totalEgresos ?? data.egresosManuales ?? 0,
    saldoNetoEfectivo: data.saldoNetoEfectivo ?? data.saldoNeto ?? 0,
    desglose,
    movimientos: (data.movimientos || []).map((item) => ({
      ...item,
      id: item.id ?? item.idMovimiento,
      tipo: item.tipo || 'EGRESO',
      monto: Number(item.monto || 0),
    })),
  };
};

const normalizeCierre = (item = {}) => {
  const ingresos = Number(item.totalIngresos ?? Number(item.ingresosSistema || 0) + Number(item.ingresosProductos || 0) + Number(item.ingresosManuales || 0));
  const diferencia = Number(item.diferencia ?? item.diferenciaEfectivo ?? 0);
  return {
    ...item,
    id: item.id ?? item.idCierre,
    fechaCierre: item.fechaCierre || item.fechaHoraCierre || '',
    turno: item.turno || 'Turno completo',
    responsable: item.responsable || item.usuario?.nombreCompleto || item.usuario?.identificador || 'Staff',
    totalIngresos: ingresos,
    diferencia,
    estadoDiferencia: item.estadoDiferencia || (diferencia === 0 ? 'EXACTO' : diferencia > 0 ? 'SOBRANTE' : 'FALTANTE'),
  };
};

export default cajaService;
