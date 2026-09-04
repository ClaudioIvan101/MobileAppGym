import { apiClient } from '../../../api/client';

/**
 * Servicio de API para el CRUD y Catálogo de Planes de Membresía
 */
export const planesService = {
  /**
   * Obtiene la lista de planes filtrada por modalidad, estado y búsqueda
   * Endpoint: GET /api/admin/planes
   */
  getPlanes: async ({ modalidad = 'all', estado = 'all', search = '' } = {}) => {
    const response = await apiClient.get('/api/planes');
    const data = Array.isArray(response.data) ? response.data : response.data?.content || [];
    return data
      .map(normalizePlan)
      .filter((plan) => modalidad === 'all' || plan.modalidad === modalidad)
      .filter((plan) => estado === 'all' || plan.estado === estado)
      .filter((plan) => !search.trim() || plan.nombre.toLowerCase().includes(search.trim().toLowerCase()));
  },

  /**
   * Crea un nuevo plan de membresía
   * Endpoint: POST /api/admin/planes
   */
  createPlan: async (payload) => {
    const response = await apiClient.post('/api/planes', toBackendPlanPayload(payload));
    return normalizePlan(response.data);
  },

  /**
   * Actualiza los datos de un plan existente
   * Endpoint: PUT /api/admin/planes/:id
   */
  updatePlan: async (planId, payload) => {
    const response = await apiClient.put(`/api/planes/${planId}`, toBackendPlanPayload(payload));
    return normalizePlan(response.data);
  },

  /**
   * Cambia el estado del plan (ACTIVO / PAUSADO)
   * Endpoint: PATCH /api/admin/planes/:id/estado
   */
  toggleEstadoPlan: async (planId, nuevoEstado) => {
    if (nuevoEstado === 'ACTIVO') {
      throw new Error('El backend no expone una operación para reactivar un plan dado de baja.');
    }
    const response = await apiClient.post(`/api/planes/${planId}/baja`, {});
    return normalizePlan(response.data);
  },

  /**
   * Elimina o archiva un plan
   * Endpoint: DELETE /api/admin/planes/:id
   */
  deletePlan: async (planId) => {
    const response = await apiClient.delete(`/api/planes/${planId}`);
    return response.data;
  }
};

const normalizePlan = (plan = {}) => {
  const modalidadAcceso = plan.modalidadAcceso || plan.modalidad;
  const modalidad = modalidadAcceso === 'ACCESO_POR_CLASES' || modalidadAcceso === 'CLASES' ? 'CLASES' : 'GENERAL';
  const precio = Number(plan.precio ?? plan.precioBase ?? 0);
  return {
    ...plan,
    id: plan.id ?? plan.idPlan,
    modalidad,
    cantidadClases: plan.cantidadClases ?? plan.cantidadClasesPack ?? 0,
    duracionDias: plan.duracionDias ?? (plan.duracion === 'TRIMESTRAL' ? 90 : 30),
    precio,
    precioFormateado: plan.precioFormateado || `$ ${precio.toLocaleString('es-AR')}`,
    estado: plan.estado || (plan.isActive === false ? 'PAUSADO' : 'ACTIVO'),
    sociosActivosCount: plan.sociosActivosCount ?? plan.totalSociosActivos ?? 0,
    descripcion: plan.descripcion || (modalidad === 'CLASES' ? 'Acceso a clases del plan' : 'Acceso general al gimnasio'),
    incluyeMusculacion: plan.incluyeMusculacion ?? modalidad === 'GENERAL',
  };
};

const toBackendPlanPayload = (payload = {}) => {
  const modalidad = payload.modalidad === 'CLASES' ? 'ACCESO_POR_CLASES' : 'ACCESO_GENERAL';
  return {
    nombre: payload.nombre?.trim(),
    precioBase: Number(payload.precio ?? payload.precioBase ?? 0),
    modalidadAcceso: modalidad,
    tipoCoberturaClases: modalidad === 'ACCESO_POR_CLASES' ? 'PACK' : null,
    cantidadClasesPack: modalidad === 'ACCESO_POR_CLASES' ? Number(payload.cantidadClases || payload.cantidadClasesPack || 0) : null,
    limiteMensual: null,
    limiteSemanal: null,
    cupoPorHorario: null,
    diasAcceso: [],
    horarios: [],
    actividadIds: [],
    nuevasActividades: [],
    duracion: Number(payload.duracionDias || 30) >= 90 ? 'TRIMESTRAL' : 'MENSUAL',
  };
};

export default planesService;
