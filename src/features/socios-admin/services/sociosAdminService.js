import { apiClient } from '../../../api/client';

/**
 * Servicio de API para Gestión y Administración de Socios y Ficha 360°
 */
export const sociosAdminService = {
  crearSocio: async (payload) => {
    const response = await apiClient.post('/api/socios', payload);
    return normalizeSocio(response.data);
  },

  /**
   * Obtiene el listado de socios con filtros y paginación en servidor
   * Endpoint: GET /api/admin/socios?page=1&limit=10&estado=...&plan=...&search=...
   */
  getSocios: async ({ page = 1, limit = 10, estado = 'all', plan = 'all', search = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', Math.max(0, page - 1));
    params.append('size', limit);
    params.append('incluirInactivos', estado !== 'active');
    if (search) params.append('q', search);

    const response = await apiClient.get(`/api/socios?${params.toString()}`);
    const data = response.data || {};
    const items = (Array.isArray(data) ? data : data.content || []).map(normalizeSocio);
    return {
      items: items.filter((item) => estado === 'all' || estado === 'active' && item.active || estado === 'inactive' && !item.active),
      total: data.totalElements ?? items.length,
      totalPages: data.totalPages ?? Math.max(1, Math.ceil((data.totalElements ?? items.length) / limit)),
    };
  },

  /**
   * Obtiene la Ficha 360° integral de un socio por ID
   * Endpoint: GET /api/admin/socios/:id/ficha360
   */
  getSocioFicha360: async (socioId) => {
    const response = await apiClient.get(`/api/socios/${socioId}/perfil`);
    return normalizeSocioProfile(response.data);
  },

  /**
   * Registra un pago/cobro de cuota o servicio para el socio
   * Endpoint: POST /api/admin/socios/:id/pagos
   */
  registrarPago: async (socioId, payload) => {
    const numericId = /^\d+$/.test(String(socioId || ''));
    const endpoint = numericId ? `/api/socios/${socioId}/cobrar-deuda` : `/api/admin/socios/${socioId}/pagos`;
    const body = numericId
      ? {
          monto: parseMoney(payload?.monto),
          metodoPago: normalizeMetodoPago(payload?.medioPago),
        }
      : payload;
    const response = await apiClient.post(endpoint, body);
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
    const numericId = /^\d+$/.test(String(socioId || ''));
    if (numericId) {
      const action = nuevoEstado === 'active' ? 'restaurar' : 'baja';
      const response = await apiClient.post(`/api/socios/${socioId}/${action}`);
      return response.data;
    }
    const response = await apiClient.put(`/api/admin/socios/${socioId}/estado`, { nuevoEstado });
    return response.data;
  }
};

const normalizeSocio = (socio = {}) => ({
  ...socio,
  id: socio.id ?? socio.idSocio,
  nombreCompleto: socio.nombreCompleto || [socio.nombre, socio.apellido].filter(Boolean).join(' '),
  planEstado: socio.planEstado || (socio.active === false ? 'inactive' : 'active'),
  planActual: socio.planActual || socio.planNombre || 'Sin plan',
});

const normalizeSocioProfile = (socio = {}) => ({
  ...normalizeSocio(socio),
  id: socio.id ?? socio.idSocio,
  deuda: Number(socio.deuda || 0),
  saldoAFavor: Number(socio.saldoAFavor || 0),
  historialPlanes: socio.historialPlanes || [],
  cuentaCorriente: socio.cuentaCorriente || [],
  historialAsistencias: socio.historialAsistencias || [],
  notasStaff: socio.notasStaff || [],
  aptoMedico: socio.aptoMedico || {},
});

const parseMoney = (value) => {
  if (typeof value === 'number') return value;
  const normalized = String(value || '').replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  return Number(normalized) || 0;
};

const normalizeMetodoPago = (value) => {
  const method = String(value || '').toLowerCase();
  if (method.includes('efect')) return 'EFECTIVO';
  if (method.includes('transfer') || method.includes('mercado')) return 'TRANSFERENCIA';
  if (method.includes('tarjet') || method.includes('débito') || method.includes('debito') || method.includes('crédito') || method.includes('credito')) return 'TARJETA';
  return 'OTRO';
};

export default sociosAdminService;
