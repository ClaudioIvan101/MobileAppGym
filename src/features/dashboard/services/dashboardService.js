import { apiClient } from '../../../api/client';

/**
 * Servicio de API para el Dashboard de Gestión Administrativa
 */
export const dashboardService = {
  /**
   * Obtiene las métricas consolidadas del dashboard administrativo
   * Endpoint: GET /api/admin/dashboard?rango=hoy|7d|30d|mes
   */
  getDashboard: async (rango = 'mes') => {
    const { desde, hasta } = getDateRange(rango);
    const [resumenResponse, estadisticasResponse, vencimientosResponse, pagosResponse] = await Promise.all([
      apiClient.get('/api/dashboard/resumen'),
      apiClient.get(`/api/dashboard/estadisticas-periodo?desde=${desde}&hasta=${hasta}`),
      apiClient.get('/api/dashboard/proximos-vencimientos?dias=14&limite=8'),
      apiClient.get('/api/dashboard/pagos-recientes?limite=8'),
    ]);

    const resumen = resumenResponse.data || {};
    const estadisticas = estadisticasResponse.data || {};
    const vencimientos = vencimientosResponse.data || [];
    const pagos = pagosResponse.data || [];
    const ingresosDiarios = estadisticas.ingresosDiarios || [];
    const asistenciasDiarias = estadisticas.asistenciasDiarias || [];
    const asistenciaPorFecha = new Map(asistenciasDiarias.map((item) => [String(item.fecha), item.cantidad]));

    return {
      kpis: {
        sociosActivos: resumen.sociosActivos,
        ingresosPeriodo: formatCurrency(resumen.ingresosMensuales),
        planesPorVencer: resumen.planesVencidos,
        asistenciasHoy: estadisticas.asistenciasTotales,
      },
      graficoMetricas: ingresosDiarios.map((item) => ({
        dia: formatShortDate(item.fecha),
        ingresos: Number(item.total || 0),
        asistencias: Number(asistenciaPorFecha.get(String(item.fecha)) || 0),
      })),
      actividadEnVivo: {
        pagos: pagos.map((item) => ({
          id: item.idPago,
          socio: [item.nombreSocio, item.apellidoSocio].filter(Boolean).join(' '),
          concepto: item.planNombre || 'Pago',
          medio: item.metodoPago,
          monto: formatCurrency(item.monto),
          hora: item.fechaPago ? new Date(item.fechaPago).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : '--:--',
        })),
      },
      proximosVencimientos: vencimientos.map((item) => ({
        id: item.socioId,
        nombre: [item.nombre, item.apellido].filter(Boolean).join(' '),
        plan: item.planNombre,
        fechaVencimiento: item.fechaVencimiento,
        diasRestantes: Math.max(0, Math.ceil((new Date(item.fechaVencimiento).getTime() - Date.now()) / 86400000)),
        telefono: item.telefono,
        montoCuota: item.montoCuota || 'Consultar',
      })),
    };
  },

  /**
   * Búsqueda en tiempo real de socios con autocompletado
   * Endpoint: GET /api/admin/socios/buscar?q=...
   */
  buscarSocios: async (query) => {
    if (!query || query.trim().length < 2) return [];
    const response = await apiClient.get(`/api/socios/busqueda?criterio=${encodeURIComponent(query.trim())}`);
    const data = Array.isArray(response.data) ? response.data : response.data?.content || [];
    return data.map((item) => ({
      ...item,
      id: item.id ?? item.idSocio,
      nombreCompleto: item.nombreCompleto || [item.nombre, item.apellido].filter(Boolean).join(' '),
    }));
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

const getDateRange = (rango) => {
  const today = new Date();
  const hasta = today.toISOString().slice(0, 10);
  const desdeDate = new Date(today);
  if (rango === 'hoy') {
    // keep today's date
  } else if (rango === '7d') {
    desdeDate.setDate(today.getDate() - 6);
  } else if (rango === '30d') {
    desdeDate.setDate(today.getDate() - 29);
  } else {
    desdeDate.setDate(1);
  }
  return { desde: desdeDate.toISOString().slice(0, 10), hasta };
};

const formatCurrency = (value) => {
  if (typeof value === 'string' && value.includes('$')) return value;
  return `$ ${Number(value || 0).toLocaleString('es-AR')}`;
};

const formatShortDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
};

export default dashboardService;
