import { apiClient } from '../../../api/client';

/**
 * Servicio de API para la Gestión de Clases, Agenda Semanal y Control de Cupos en Vivo
 */
export const clasesAdminService = {
  /**
   * Obtiene la agenda semanal de clases filtrada por sala e instructor
   * Endpoint: GET /api/admin/clases/agenda?salaId=...&instructorId=...
   */
  getAgenda: async ({ salaId = 'all', instructorId = 'all' } = {}) => {
    const params = new URLSearchParams();
    const { desde, hasta } = getWeekRange();
    params.append('desde', desde);
    params.append('hasta', hasta);
    if (salaId && salaId !== 'all') params.append('salaId', salaId);
    if (instructorId && instructorId !== 'all') params.append('instructor', instructorId);

    const response = await apiClient.get(`/api/clases?${params.toString()}`);
    const data = Array.isArray(response.data) ? response.data : response.data?.content || [];
    return data.map(normalizeClase);
  },

  /**
   * Programa una clase individual o recurrente en el calendario
   * Endpoint: POST /api/admin/clases/programar
   */
  programarClase: async (payload) => {
    let actividadId = payload?.actividadId;
    if (!actividadId) {
      try {
        const activitiesResponse = await apiClient.get('/api/actividades/activas');
        const activities = Array.isArray(activitiesResponse.data) ? activitiesResponse.data : [];
        actividadId = activities[0]?.id ?? activities[0]?.idActividad;
      } catch {
        actividadId = 1;
      }
    }
    const response = await apiClient.post('/api/clases', toBackendSchedulePayload({ ...payload, actividadId }));
    return response.data;
  },

  /**
   * Obtiene la ficha de la clase en tiempo real (inscriptos, asistencias y lista de espera)
   * Endpoint: GET /api/admin/clases/:id/detalle
   */
  getClaseDetalle: async (claseId) => {
    const [classResponse, reservationsResponse] = await Promise.all([
      apiClient.get(`/api/clases/${claseId}`),
      apiClient.get(`/api/reservas/clases/${claseId}`),
    ]);
    const clase = normalizeClase(classResponse.data);
    const reservas = Array.isArray(reservationsResponse.data) ? reservationsResponse.data : [];
    const inscriptos = reservas
      .filter((item) => item.estado !== 'CANCELADA')
      .map((item) => ({
        reservaId: item.idReserva,
        socioId: item.socioId,
        nombre: item.personaNombre || 'Socio',
        plan: item.planNombre || 'Plan activo',
        asistio: item.estado === 'ASISTIO',
      }));
    return {
      ...clase,
      inscriptos,
      listaEspera: [],
      cupoTotal: clase.cupoTotal,
      cupoOcupado: inscriptos.length,
    };
  },

  /**
   * Marca o desmarca la asistencia efectiva del socio en la clase
   * Endpoint: PUT /api/admin/clases/:id/asistencia/:socioId
   */
  toggleAsistencia: async (reservaId, estado = 'ASISTIO') => {
    const response = await apiClient.patch(`/api/reservas/${reservaId}/estado`, { estado });
    return response.data;
  },

  /**
   * Inscribe manualmente a un socio en la clase si hay cupo libre
   * Endpoint: POST /api/admin/clases/:id/inscribir-manual
   */
  inscribirManual: async (claseId, socioPayload) => {
    const response = await apiClient.post(`/api/admin/clases/${claseId}/inscribir-manual`, socioPayload);
    return response.data;
  },

  /**
   * Promueve a un socio de la lista de espera a la lista oficial de inscriptos
   * Endpoint: POST /api/admin/clases/:id/promover-espera
   */
  promoverDeEspera: async (claseId, socioId) => {
    const response = await apiClient.post(`/api/admin/clases/${claseId}/promover-espera`, { socioId });
    return response.data;
  }
};

const normalizeClase = (item = {}) => {
  const horaInicio = formatTime(item.horaInicio || item.horarioInicio);
  const horaFin = formatTime(item.horaFin || item.horarioFin);
  const fecha = item.fecha || '';
  return {
    ...item,
    id: item.id ?? item.idClase,
    nombre: item.nombre || item.actividadNombre || 'Clase',
    sala: item.sala || item.salaNombre || 'Sala principal',
    instructor: item.instructor || item.instructorNombre || 'Sin instructor',
    horario: item.horario || [horaInicio, horaFin].filter(Boolean).join(' - '),
    diaSemana: item.diaSemana || getSpanishDay(fecha),
    cupoTotal: Number(item.cupoTotal ?? item.cupo ?? 0),
    cupoOcupado: Number(item.cupoOcupado ?? item.reservados ?? 0),
    color: item.color || '#10B981',
  };
};

const toBackendSchedulePayload = (payload = {}) => {
  const fecha = payload.fecha || getWeekRange().desde;
  const recurrente = payload.recurrente !== false;
  const [startHours, startMinutes] = String(payload.horarioInicio || '18:00').split(':').map(Number);
  const [endHours, endMinutes] = String(payload.horarioFin || '19:00').split(':').map(Number);
  const duration = Math.max(15, ((endHours * 60 + endMinutes) - (startHours * 60 + startMinutes)) || 60);
  const diaMap = {
    Lunes: 'LUNES', Martes: 'MARTES', Miércoles: 'MIERCOLES',
    Jueves: 'JUEVES', Viernes: 'VIERNES', Sábado: 'SABADO', Domingo: 'DOMINGO',
  };

  return {
    actividadId: Number(payload.actividadId || 1),
    nombre: payload.nombre || 'Clase StrongFit',
    instructor: payload.instructor || payload.instructorNombre || 'Sin instructor',
    cupo: Number(payload.cupo ?? payload.cupoTotal ?? 16),
    tipoProgramacion: recurrente ? 'RECURRENTE' : 'UNICA',
    fecha: recurrente ? null : fecha,
    fechaInicio: recurrente ? (payload.fechaInicio || fecha) : null,
    diasSemana: recurrente ? (payload.diasRecurrencia || []).map((dia) => diaMap[dia] || dia) : [],
    tipoFinalizacion: recurrente ? 'CANTIDAD' : null,
    cantidadClases: recurrente ? Number(payload.cantidadClases || 12) : null,
    fechaFin: recurrente ? (payload.fechaFin || null) : null,
    horaInicio: `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}:00`,
    duracionMinutos: duration,
    toleranciaCheckInMinutos: 30,
    notas: payload.notas || null,
    ignorarConflictos: false,
  };
};

const getWeekRange = () => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { desde: formatDate(monday), hasta: formatDate(sunday) };
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (value) => {
  if (!value) return '';
  return String(value).slice(0, 5);
};

const getSpanishDay = (value) => {
  if (!value) return '';
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? '' : days[date.getDay()];
};

export default clasesAdminService;
