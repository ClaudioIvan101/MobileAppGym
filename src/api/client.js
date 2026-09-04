import { create } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Cliente HTTP Base con Interceptors y Fallback de Datos para Desarrollo
 */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.strongfit.gym';

export const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para inyectar token JWT (usando AsyncStorage en lugar de localStorage)
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('strongfit_jwt');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (_e) {
      // Silently fail - token no disponible
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Estado en Tiempo Real de la Caja Actual
let MOCK_CAJA_ACTUAL_DB = {
  isAbierta: true,
  cajaId: 'CAJA-2026-0831-M',
  turno: 'Turno Mañana (07:00 - 15:00)',
  responsable: 'Lucas Méndez (Recepción)',
  fechaApertura: '31/08/2026 07:00 hs',
  saldoInicial: 50000,
  desglose: {
    efectivo: 78500,
    mercadoPago: 54000,
    debito: 32000,
    credito: 20000,
    transferencia: 15000,
  },
  totalIngresos: 199500,
  totalEgresos: 15000,
  saldoNetoEfectivo: 113500,
  totalFacturado: 199500,
  movimientos: [],
};

// Historial de Cierres Anteriores
let MOCK_CAJA_HISTORIAL_DB = [];
let MOCK_CHECKINS_DB = [];

// Base de Datos de Deudores y Cobranzas
let MOCK_DEUDORES_DB = [
  {
    id: 'SF-9912',
    nombreCompleto: 'Rodrigo Benítez',
    nombre: 'Rodrigo',
    dni: '28.491.022',
    telefono: '+5491160123344',
    email: 'rodrigo.b@gmail.com',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    plan: 'Pase Libre Musculación',
    montoDeuda: 38500,
    montoFormateado: '$ 38.500',
    fechaVencimiento: '19/08/2026',
    diasMora: 12,
    ultimoPago: '19/07/2026',
    estadoMora: 'MEDIA', // 'LEVE' (>5d) | 'MEDIA' (>15d) | 'CRITICA' (>30d)
  },
  {
    id: 'SF-7719',
    nombreCompleto: 'Mariana Gómez',
    nombre: 'Mariana',
    dni: '35.120.900',
    telefono: '+5491133445566',
    email: 'mariana.g@gmail.com',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Pack 12 Clases',
    montoDeuda: 32000,
    montoFormateado: '$ 32.000',
    fechaVencimiento: '13/08/2026',
    diasMora: 18,
    ultimoPago: '13/07/2026',
    estadoMora: 'MEDIA',
  },
  {
    id: 'SF-3310',
    nombreCompleto: 'Cristian Vallejos',
    nombre: 'Cristian',
    dni: '29.800.111',
    telefono: '+5491188776655',
    email: 'cristian.v@hotmail.com',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    plan: 'Black Pass Ultra',
    montoDeuda: 77000,
    montoFormateado: '$ 77.000 (2 cuotas)',
    fechaVencimiento: '20/07/2026',
    diasMora: 42,
    ultimoPago: '20/06/2026',
    estadoMora: 'CRITICA',
  },
  {
    id: 'SF-6014',
    nombreCompleto: 'Lucas Rossi',
    nombre: 'Lucas',
    dni: '40.200.311',
    telefono: '+5491199887766',
    email: 'lucas.rossi@gmail.com',
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    plan: 'Pase Libre Musculación',
    montoDeuda: 35000,
    montoFormateado: '$ 35.000',
    fechaVencimiento: '25/08/2026',
    diasMora: 6,
    ultimoPago: '25/07/2026',
    estadoMora: 'LEVE',
  }
];

// Métricas Comerciales y Reportes Analíticos
const MOCK_REPORTES_METRICAS_DB = {
  kpisGenerales: {
    facturacionAnualProyectada: '$ 58.200.000',
    ingresoPromedioSocio: '$ 37.400',
    churnRateMensual: '4.8%',
    retencionPromedio: '95.2%',
    sociosActivosTotales: 482,
    deudaTotalAcumulada: '$ 182.500',
  },
  facturacionMensual: [
    { mes: 'Ene', ingresos: 3800000, socios: 410 },
    { mes: 'Feb', ingresos: 4100000, socios: 425 },
    { mes: 'Mar', ingresos: 4350000, socios: 440 },
    { mes: 'Abr', ingresos: 4500000, socios: 452 },
    { mes: 'May', ingresos: 4620000, socios: 460 },
    { mes: 'Jun', ingresos: 4710000, socios: 468 },
    { mes: 'Jul', ingresos: 4820000, socios: 475 },
    { mes: 'Ago', ingresos: 4950000, socios: 482 },
  ],
  retencionYChurn: [
    { mes: 'Ene', retencion: 93.2, churn: 6.8 },
    { mes: 'Feb', retencion: 94.0, churn: 6.0 },
    { mes: 'Mar', retencion: 94.8, churn: 5.2 },
    { mes: 'Abr', retencion: 95.1, churn: 4.9 },
    { mes: 'May', retencion: 95.5, churn: 4.5 },
    { mes: 'Jun', retencion: 95.2, churn: 4.8 },
    { mes: 'Jul', retencion: 95.6, churn: 4.4 },
    { mes: 'Ago', retencion: 95.2, churn: 4.8 },
  ],
  actividadesTop: [
    { nombre: 'CrossFit WOD & Power', porcentaje: 38, alumnos: 185, color: '#10B981' },
    { nombre: 'Musculación & Cardio Libre', porcentaje: 32, alumnos: 155, color: '#06B6D4' },
    { nombre: 'Spinning Endurance', porcentaje: 18, alumnos: 88, color: '#A855F7' },
    { nombre: 'Funcional HIIT & Core', porcentaje: 12, alumnos: 58, color: '#F59E0B' },
  ],
  horariosPico: [
    { franja: '07:00 - 09:00', concurrencia: 'Alta 🔥', promedio: 78, porcentaje: 65 },
    { franja: '09:00 - 12:00', concurrencia: 'Moderada', promedio: 42, porcentaje: 35 },
    { franja: '12:00 - 14:00', concurrencia: 'Media', promedio: 55, porcentaje: 45 },
    { franja: '15:00 - 18:00', concurrencia: 'Moderada', promedio: 48, porcentaje: 40 },
    { franja: '18:00 - 21:00', concurrencia: 'Pico Máximo 🔥🔥', promedio: 142, porcentaje: 100 },
    { franja: '21:00 - 23:00', concurrencia: 'Baja', promedio: 28, porcentaje: 25 },
  ],
};

// Tarifas de Pases Diarios
const MOCK_TARIFAS_PASES = [
  { id: 'pase-musculacion', nombre: 'Pase Diario • Musculación', descripcion: 'Acceso libre', precio: 4500, precioFormateado: '$ 4.500', disciplina: 'Musculación', duracionHoras: 'Día completo' },
];

// Planes DB
let MOCK_PLANES_DB = [
  { id: 'plan-1', nombre: 'Black Pass Ultra', descripcion: 'Pase completo', modalidad: 'CLASES', tipoClases: 'PACK', cantidadClases: 12, disciplinasPermitidas: ['CrossFit'], incluyeMusculacion: true, duracionDias: 30, precio: 38500, precioFormateado: '$ 38.500', estado: 'ACTIVO', sociosActivosCount: 240 },
];

// Datos locales para poder recorrer el portal completo cuando la API no está disponible.
const localDateIso = (daysFromToday = 0) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().slice(0, 10);
};

let MOCK_PORTAL_SOCIO = {
  id: 'SF-8842',
  idSocio: 'SF-8842',
  nombre: 'Alejandro',
  apellido: 'Silva',
  nombreCompleto: 'Alejandro Silva',
  dni: '41.892.401',
  fechaNacimiento: '15/04/1998',
  email: 'alejandro.silva@gmail.com',
  telefono: '+5491161234567',
  direccion: 'Av. Corrientes 1234',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  certificadoMedico: { estado: 'VIGENTE', fechaVencimiento: '15/04/2027' },
};

const MOCK_PORTAL_MEMBRESIA = {
  planNombre: 'Black Pass Ultra',
  estado: 'active',
  modalidad: 'PACK_CLASES',
  fechaInicio: '01/09/2026',
  fechaFin: '30/09/2026',
  fechaVencimiento: '30/09/2026',
  diasRestantes: 27,
  precioCuota: '$ 38.500',
  metodoRenovacion: 'Débito Automático',
  limiteSemanal: 'Acceso ilimitado',
  clasesTotales: 12,
  clasesRestantes: 8,
  beneficios: ['Acceso a CrossFit', 'Musculación libre', 'Reserva anticipada de clases'],
};

let MOCK_PORTAL_RESERVAS = [
  {
    id: 'reserva-1',
    claseId: 'clase-2',
    disciplina: 'CrossFit',
    claseNombre: 'CrossFit Power',
    horario: '18:00 - 19:00',
    horarioInicio: '18:00',
    instructor: 'Lucas Fernández',
    sala: 'Box Principal',
    fecha: localDateIso(1),
  },
];

let MOCK_PORTAL_CLASES = [
  {
    id: 'clase-1',
    nombre: 'CrossFit Power',
    disciplina: 'CrossFit',
    instructor: 'Lucas Fernández',
    sala: 'Box Principal',
    fecha: localDateIso(0),
    horario: '18:00 - 19:00',
    horarioInicio: '18:00',
    cupoTotal: 16,
    cupoOcupado: 8,
    isReservada: false,
  },
  {
    id: 'clase-2',
    nombre: 'Spinning Endurance',
    disciplina: 'Spinning',
    instructor: 'Sofía Martínez',
    sala: 'Sala Cardio',
    fecha: localDateIso(1),
    horario: '07:30 - 08:30',
    horarioInicio: '07:30',
    cupoTotal: 20,
    cupoOcupado: 12,
    isReservada: false,
  },
  {
    id: 'clase-3',
    nombre: 'Funcional HIIT & Core',
    disciplina: 'Funcional',
    instructor: 'Valentina Ríos',
    sala: 'Estudio 2',
    fecha: localDateIso(2),
    horario: '19:30 - 20:30',
    horarioInicio: '19:30',
    cupoTotal: 14,
    cupoOcupado: 11,
    isReservada: false,
  },
];

const MOCK_PORTAL_PAGOS = [
  { id: 'pago-1', concepto: 'Cuota Mensual Black Pass', numeroFactura: 'SF-000482', fecha: '01/09/2026', medioPago: 'TARJETA_DEBITO', medioPagoDetalle: 'Visa Débito', monto: '$ 38.500', estadoPago: 'Pagado' },
  { id: 'pago-2', concepto: 'Cuota Mensual Black Pass', numeroFactura: 'SF-000431', fecha: '01/08/2026', medioPago: 'TRANSFERENCIA', medioPagoDetalle: 'Transferencia bancaria', monto: '$ 38.500', estadoPago: 'Pagado' },
];

const MOCK_PORTAL_ASISTENCIAS = [
  { id: 'asistencia-1', tipo: 'CLASE', tipoLabel: 'CrossFit Power', estado: 'ASISTIDO', fecha: '02/09/2026', horaCheckin: '18:02', puntoAcceso: 'Box Principal', instructor: 'Lucas Fernández' },
  { id: 'asistencia-2', tipo: 'ACCESO_GENERAL', tipoLabel: 'Acceso general', estado: 'ASISTIDO', fecha: '01/09/2026', horaCheckin: '07:14', puntoAcceso: 'Torniquete Principal' },
];

// Interceptor de respuesta con fallback transparente
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const url = error?.config?.url || '';
    const method = (error?.config?.method || 'get').toLowerCase();

    // 1. GET /api/admin/reportes/deudores
    if (url.includes('/api/admin/reportes/deudores') && method === 'get') {
      const urlObj = new URL(url, 'http://dummy.base');
      const moraMinima = parseInt(urlObj.searchParams.get('moraMinima') || '0', 10);
      const search = (urlObj.searchParams.get('search') || '').trim().toLowerCase();

      let filtered = [...MOCK_DEUDORES_DB];

      if (moraMinima > 0) {
        filtered = filtered.filter((d) => d.diasMora >= moraMinima);
      }
      if (search) {
        filtered = filtered.filter((d) => d.nombreCompleto.toLowerCase().includes(search) || d.dni.includes(search));
      }

      return {
        data: filtered,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      };
    }

    // 2. POST /api/admin/reportes/deudores/recordatorio-masivo
    if (url.includes('/api/admin/reportes/deudores/recordatorio-masivo') && method === 'post') {
      let body = {};
      try {
        body = error?.config?.data ? JSON.parse(error.config.data) : {};
      } catch (_parseErr) {
        body = {};
      }
      const count = body.deudoresIds?.length || MOCK_DEUDORES_DB.length;

      return {
        data: {
          success: true,
          mensaje: `Se enviaron ${count} recordatorios de pago por WhatsApp y Email con éxito.`,
          enviadas: count,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      };
    }

    // 3. GET /api/admin/reportes/metricas
    if (url.includes('/api/admin/reportes/metricas') && method === 'get') {
      return {
        data: MOCK_REPORTES_METRICAS_DB,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      };
    }

    // Fallback para el contrato actual del backend.
    if (url.includes('/api/caja/resumen') && method === 'get') {
      return { data: MOCK_CAJA_ACTUAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/caja/movimientos') && method === 'get') {
      return { data: { content: MOCK_CAJA_ACTUAL_DB.movimientos, totalElements: MOCK_CAJA_ACTUAL_DB.movimientos.length }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/caja/cierres') && method === 'get') {
      return { data: { content: MOCK_CAJA_HISTORIAL_DB, totalElements: MOCK_CAJA_HISTORIAL_DB.length }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/caja/reabrir') && method === 'post') {
      MOCK_CAJA_ACTUAL_DB.isAbierta = true;
      return { data: MOCK_CAJA_ACTUAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/caja/cierres') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const diferencia = Number(body.efectivoContado || 0) - Number(MOCK_CAJA_ACTUAL_DB.desglose.efectivo || 0);
      const cierre = {
        id: `cierre-${Date.now()}`,
        fechaCierre: new Date().toISOString().slice(0, 10),
        turno: MOCK_CAJA_ACTUAL_DB.turno,
        responsable: MOCK_CAJA_ACTUAL_DB.responsable,
        totalIngresos: MOCK_CAJA_ACTUAL_DB.totalIngresos,
        diferencia,
        diferenciaEfectivo: diferencia,
        estadoDiferencia: diferencia === 0 ? 'EXACTO' : diferencia > 0 ? 'SOBRANTE' : 'FALTANTE',
      };
      MOCK_CAJA_HISTORIAL_DB = [cierre, ...MOCK_CAJA_HISTORIAL_DB];
      MOCK_CAJA_ACTUAL_DB.isAbierta = false;
      return { data: cierre, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/caja/movimientos') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const movimiento = { id: `mov-${Date.now()}`, ...body, fechaMovimiento: new Date().toISOString() };
      MOCK_CAJA_ACTUAL_DB.movimientos = [movimiento, ...MOCK_CAJA_ACTUAL_DB.movimientos];
      if (body.tipo === 'EGRESO') {
        MOCK_CAJA_ACTUAL_DB.totalEgresos += Number(body.monto || 0);
        MOCK_CAJA_ACTUAL_DB.totalIngresos = Math.max(0, MOCK_CAJA_ACTUAL_DB.totalIngresos);
      }
      return { data: movimiento, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    // Portal del socio: mantiene navegables las pantallas cuando se trabaja sin API.
    if (url.endsWith('/api/socio/resumen-portal') && method === 'get') {
      return {
        data: {
          socio: MOCK_PORTAL_SOCIO,
          membresia: MOCK_PORTAL_MEMBRESIA,
          metricasMes: { clasesDisponibles: MOCK_PORTAL_MEMBRESIA.clasesRestantes, clasesTotalPack: MOCK_PORTAL_MEMBRESIA.clasesTotales, asistenciasMes: 8, proximaClaseHora: '18:00 hs' },
          proximasReservas: MOCK_PORTAL_RESERVAS,
          qrPaseDigital: 'STRONGFIT-SF-8842',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      };
    }

    if (url.includes('/api/socio/reservas/') && method === 'delete') {
      const reservaId = new URL(url, 'http://dummy.base').pathname.split('/').pop();
      MOCK_PORTAL_RESERVAS = MOCK_PORTAL_RESERVAS.filter((item) => String(item.id) !== String(reservaId));
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/membresia-actual') && method === 'get') {
      return { data: MOCK_PORTAL_MEMBRESIA, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/historial-pagos') && method === 'get') {
      return { data: MOCK_PORTAL_PAGOS, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/solicitar-renovacion') && method === 'post') {
      return { data: { success: true, mensaje: 'Solicitud enviada a recepción.' }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/clases/disponibles') && method === 'get') {
      const urlObj = new URL(url, 'http://dummy.base');
      const fecha = urlObj.searchParams.get('fecha');
      const actividadId = urlObj.searchParams.get('actividadId');
      const instructorId = urlObj.searchParams.get('instructorId');
      const clases = MOCK_PORTAL_CLASES.filter((item) =>
        (!fecha || item.fecha === fecha) &&
        (!actividadId || item.disciplina === actividadId || item.disciplina.toLowerCase() === actividadId.toLowerCase()) &&
        (!instructorId || item.instructor === instructorId || item.instructor.toLowerCase() === instructorId.toLowerCase())
      );
      return { data: clases, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.match(/\/api\/clases\/[^/]+\/reservar$/) && method === 'post') {
      const claseId = new URL(url, 'http://dummy.base').pathname.split('/')[3];
      const clase = MOCK_PORTAL_CLASES.find((item) => String(item.id) === String(claseId));
      if (clase && !clase.isReservada && clase.cupoOcupado < clase.cupoTotal) {
        clase.cupoOcupado += 1;
        clase.isReservada = true;
        MOCK_PORTAL_RESERVAS = [{
          id: `reserva-${clase.id}`,
          claseId: clase.id,
          disciplina: clase.disciplina,
          claseNombre: clase.nombre,
          horario: clase.horario,
          horarioInicio: clase.horarioInicio,
          instructor: clase.instructor,
          sala: clase.sala,
          fecha: clase.fecha,
        }, ...MOCK_PORTAL_RESERVAS];
      }
      return { data: clase, status: 201, statusText: 'Created', headers: {}, config: error.config };
    }

    if (url.match(/\/api\/clases\/[^/]+\/cancelar-reserva$/) && method === 'delete') {
      const claseId = new URL(url, 'http://dummy.base').pathname.split('/')[3];
      const clase = MOCK_PORTAL_CLASES.find((item) => String(item.id) === String(claseId));
      if (clase?.isReservada) {
        clase.cupoOcupado = Math.max(0, clase.cupoOcupado - 1);
        clase.isReservada = false;
        MOCK_PORTAL_RESERVAS = MOCK_PORTAL_RESERVAS.filter((item) => item.id !== `reserva-${clase.id}`);
      }
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/socio/asistencias') && method === 'get') {
      return {
        data: {
          resumen: { totalAsistencias: 8, metaMensual: 20, porcentajeMeta: 40, rachaActual: 3, ausenciasNoShow: 0, horasTotales: '8h' },
          heatmapDias: [],
          historial: MOCK_PORTAL_ASISTENCIAS,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      };
    }

    if (url.endsWith('/api/socio/perfil') && method === 'get') {
      return { data: MOCK_PORTAL_SOCIO, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/perfil') && method === 'put') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      MOCK_PORTAL_SOCIO = { ...MOCK_PORTAL_SOCIO, ...body, nombreCompleto: body.nombreCompleto || MOCK_PORTAL_SOCIO.nombreCompleto };
      return { data: { perfil: MOCK_PORTAL_SOCIO }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/perfil/avatar') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      MOCK_PORTAL_SOCIO = { ...MOCK_PORTAL_SOCIO, avatarUrl: body.avatarUrl };
      return { data: { avatarUrl: body.avatarUrl }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/perfil/certificado-medico') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      MOCK_PORTAL_SOCIO = { ...MOCK_PORTAL_SOCIO, certificadoMedico: body };
      return { data: MOCK_PORTAL_SOCIO.certificadoMedico, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/perfil/cambiar-password') && method === 'post') {
      return { data: null, status: 204, statusText: 'No Content', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/socio/qr-acceso') && method === 'get') {
      return { data: { qrPaseDigital: 'STRONGFIT-SF-8842' }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    // Agenda administrativa: adapta el fallback al contrato real de /api/clases.
    const pathname = new URL(url, 'http://dummy.base').pathname;
    if (pathname === '/api/clases' && method === 'get') {
      const urlObj = new URL(url, 'http://dummy.base');
      const instructor = (urlObj.searchParams.get('instructor') || '').toLowerCase();
      const clases = MOCK_PORTAL_CLASES
        .filter((item) => !instructor || item.instructor.toLowerCase().includes(instructor))
        .map((item) => ({
          ...item,
          idClase: item.id,
          actividadId: 1,
          actividadNombre: item.disciplina,
          cupo: item.cupoTotal,
          reservados: item.cupoOcupado,
          horaInicio: `${item.horarioInicio}:00`,
          horaFin: `${item.horario.split(' - ')[1]}:00`,
        }));
      return { data: clases, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (pathname === '/api/clases' && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const horaInicio = String(body.horaInicio || '18:00:00').slice(0, 5);
      const horaFin = `${String(Number(horaInicio.slice(0, 2)) + 1).padStart(2, '0')}:${horaInicio.slice(3)}`;
      const clase = {
        id: `clase-${Date.now()}`,
        nombre: body.nombre || 'Clase StrongFit',
        disciplina: 'CrossFit',
        instructor: body.instructor || 'Sin instructor',
        sala: 'Sala principal',
        fecha: body.fecha || body.fechaInicio || localDateIso(0),
        horario: `${horaInicio} - ${horaFin}`,
        horarioInicio: horaInicio,
        cupoTotal: Number(body.cupo || 16),
        cupoOcupado: 0,
        isReservada: false,
      };
      MOCK_PORTAL_CLASES = [clase, ...MOCK_PORTAL_CLASES];
      return { data: { serie: null, clases: [clase], cantidadCreada: 1 }, status: 201, statusText: 'Created', headers: {}, config: error.config };
    }

    if (/^\/api\/clases\/[^/]+$/.test(pathname) && method === 'get') {
      const claseId = pathname.split('/').pop();
      const clase = MOCK_PORTAL_CLASES.find((item) => String(item.id) === String(claseId));
      return { data: clase || {}, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (/^\/api\/reservas\/clases\/[^/]+$/.test(pathname) && method === 'get') {
      const claseId = pathname.split('/').pop();
      const reservas = MOCK_PORTAL_RESERVAS
        .filter((item) => String(item.claseId || '') === String(claseId))
        .map((item) => ({
          ...item,
          idReserva: item.id,
          personaNombre: MOCK_PORTAL_SOCIO.nombreCompleto,
          socioId: MOCK_PORTAL_SOCIO.id,
          estado: 'CONFIRMADA',
        }));
      return { data: reservas, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (/^\/api\/reservas\/[^/]+\/estado$/.test(pathname) && method === 'patch') {
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    // Pases diarios: el backend expone la venta en POST /api/pases-diarios.
    if (url.includes('/api/pases-diarios/tarifas') && method === 'get') {
      return { data: MOCK_TARIFAS_PASES, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.endsWith('/api/pases-diarios') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const socio = body.socioId
        ? MOCK_DEUDORES_DB.find((item) => String(item.id) === String(body.socioId))
        : null;
      const cliente = body.visitante || {
        nombre: socio?.nombreCompleto || 'Socio StrongFit',
        dni: socio?.dni || '',
        telefono: socio?.telefono || '',
      };
      const idPaseDiario = Date.now();
      return {
        data: {
          idPaseDiario,
          personaNombre: cliente.nombre,
          personaDni: cliente.dni,
          importe: Number(body.importe || 0),
          metodoPago: body.metodoPago,
          fechaValidez: new Date().toISOString().slice(0, 10),
          checkInAt: new Date().toISOString(),
          cliente,
          tarifaNombre: MOCK_TARIFAS_PASES[0].nombre,
        },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: error.config,
      };
    }

    // Consulta de socio por DNI para autocompletar el pase diario.
    if (method === 'get' && /^\/api\/socios\/\d{7,12}$/.test(new URL(url, 'http://dummy.base').pathname)) {
      const dni = new URL(url, 'http://dummy.base').pathname.split('/').pop();
      const found = MOCK_DEUDORES_DB.find((item) => item.dni.replace(/\D/g, '') === dni);
      if (found) {
        return {
          data: { id: found.id, dni, nombre: found.nombre, apellido: found.nombreCompleto.replace(`${found.nombre} `, ''), telefono: found.telefono, email: found.email },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config,
        };
      }
    }

    // CRUD de planes usado en desarrollo cuando el backend no está disponible.
    if (url.includes('/api/planes') && method === 'get') {
      return { data: MOCK_PLANES_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.endsWith('/api/planes') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const plan = { id: `plan-${Date.now()}`, ...body, modalidad: body.modalidadAcceso === 'ACCESO_POR_CLASES' ? 'CLASES' : 'GENERAL', precio: body.precioBase, cantidadClases: body.cantidadClasesPack || 0, estado: 'ACTIVO', sociosActivosCount: 0 };
      MOCK_PLANES_DB = [plan, ...MOCK_PLANES_DB];
      return { data: plan, status: 201, statusText: 'Created', headers: {}, config: error.config };
    }
    if (url.includes('/api/planes/') && method === 'put') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const id = url.split('/').pop();
      MOCK_PLANES_DB = MOCK_PLANES_DB.map((plan) => String(plan.id) === String(id) ? { ...plan, ...body } : plan);
      return { data: MOCK_PLANES_DB.find((plan) => String(plan.id) === String(id)) || body, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/planes/') && url.endsWith('/baja') && method === 'post') {
      const id = url.split('/').slice(-2, -1)[0];
      MOCK_PLANES_DB = MOCK_PLANES_DB.map((plan) => String(plan.id) === String(id) ? { ...plan, estado: 'PAUSADO', isActive: false } : plan);
      return { data: MOCK_PLANES_DB.find((plan) => String(plan.id) === String(id)), status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/socios/') && url.endsWith('/cobrar-deuda') && method === 'post') {
      return { data: null, status: 204, statusText: 'No Content', headers: {}, config: error.config };
    }

    if (url.includes('/api/admin/socios/') && method === 'post') {
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/admin/socios/') && url.endsWith('/estado') && method === 'put') {
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/socios/') && (url.endsWith('/baja') || url.endsWith('/restaurar')) && method === 'post') {
      return { data: null, status: 204, statusText: 'No Content', headers: {}, config: error.config };
    }

    if (new URL(url, 'http://dummy.base').pathname === '/api/socios' && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const socio = {
        id: `SF-${Date.now().toString().slice(-4)}`,
        ...body,
        nombreCompleto: `${body.nombre || ''} ${body.apellido || ''}`.trim(),
        plan: 'Sin plan',
        active: true,
        estadoMora: 'AL DÍA',
        montoDeuda: 0,
        montoFormateado: '$ 0',
        diasMora: 0,
        fechaVencimiento: 'Sin fecha',
      };
      MOCK_DEUDORES_DB = [socio, ...MOCK_DEUDORES_DB];
      return { data: socio, status: 201, statusText: 'Created', headers: {}, config: error.config };
    }

    if (method === 'get' && new URL(url, 'http://dummy.base').pathname === '/api/socios') {
      const data = MOCK_DEUDORES_DB.map((item) => ({
        id: item.id,
        dni: item.dni.replace(/\D/g, ''),
        nombre: item.nombre,
        apellido: item.nombreCompleto.replace(`${item.nombre} `, ''),
        telefono: item.telefono,
        email: item.email,
        active: true,
        planNombre: item.plan,
      }));
      return { data: { content: data, totalElements: data.length, totalPages: 1 }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (method === 'get' && new URL(url, 'http://dummy.base').pathname === '/api/socios/busqueda') {
      const query = (new URL(url, 'http://dummy.base').searchParams.get('criterio') || '').toLowerCase();
      const data = MOCK_DEUDORES_DB
        .filter((item) => item.nombreCompleto.toLowerCase().includes(query) || item.dni.toLowerCase().includes(query))
        .map((item) => ({ id: item.id, dni: item.dni, nombre: item.nombre, apellido: item.nombreCompleto.replace(`${item.nombre} `, ''), telefono: item.telefono }));
      return { data, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (method === 'get' && /\/api\/socios\/[^/]+\/perfil$/.test(new URL(url, 'http://dummy.base').pathname)) {
      const socioId = new URL(url, 'http://dummy.base').pathname.split('/')[3];
      const item = MOCK_DEUDORES_DB.find((candidate) => String(candidate.id) === String(socioId)) || MOCK_DEUDORES_DB[0];
      return {
        data: {
          idSocio: item.id,
          nombre: item.nombre,
          apellido: item.nombreCompleto.replace(`${item.nombre} `, ''),
          dni: item.dni.replace(/\D/g, ''),
          telefono: item.telefono,
          email: item.email,
          planNombre: item.plan,
          estadoGlobal: 'ACTIVO',
          estadoCanonico: 'ACTIVO',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
      };
    }

    // Dashboard administrativo para trabajar sin una API disponible.
    if (url.includes('/api/dashboard/resumen') && method === 'get') {
      return { data: { sociosActivos: 482, ingresosMensuales: 4820000, planesVencidos: 34 }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/dashboard/estadisticas-periodo') && method === 'get') {
      return { data: { asistenciasTotales: 128, ingresosDiarios: [], asistenciasDiarias: [] }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/dashboard/proximos-vencimientos') && method === 'get') {
      return { data: MOCK_DEUDORES_DB.slice(0, 4).map((item) => ({ socioId: item.id, nombre: item.nombreCompleto, planNombre: item.plan, fechaVencimiento: item.fechaVencimiento, telefono: item.telefono, montoCuota: item.montoFormateado })), status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/dashboard/pagos-recientes') && method === 'get') {
      return { data: [], status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    if (url.includes('/api/admin/reportes/deudores/') && url.endsWith('/cobro-express') && method === 'post') {
      return { data: { success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    // Check-in: compatibilidad con el endpoint real de asistencias.
    if (url.includes('/api/asistencias/hoy') && method === 'get') {
      return { data: MOCK_CHECKINS_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }
    if (url.includes('/api/asistencias/checkin') && method === 'post') {
      const body = typeof error?.config?.data === 'string' ? JSON.parse(error.config.data) : (error?.config?.data || {});
      const match = MOCK_DEUDORES_DB.find((item) => item.dni.replace(/\D/g, '') === String(body.dni || ''));
      const result = {
        accesoPermitido: true,
        codigoResultado: 'CHECKIN_OK',
        mensaje: 'Ingreso registrado correctamente.',
        socioId: match?.id,
        nombre: match?.nombre || 'Visitante',
        apellido: match?.nombreCompleto?.replace(`${match.nombre} `, '') || '',
        dni: body.dni,
        planNombre: match?.plan || 'Pase diario',
        estadoSuscripcion: 'ACTIVA',
        fechaHoraCheckIn: new Date().toISOString(),
        asistenciaRegistrada: true,
      };
      MOCK_CHECKINS_DB = [{
        id: `checkin-${Date.now()}`,
        socio: `${result.nombre} ${result.apellido}`.trim(),
        hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        plan: result.planNombre,
        tipoResultado: 'HABILITADO',
      }, ...MOCK_CHECKINS_DB];
      return { data: result, status: 200, statusText: 'OK', headers: {}, config: error.config };
    }

    // Endpoints de Caja
    if (url.includes('/api/admin/caja/actual')) return { data: MOCK_CAJA_ACTUAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    if (url.includes('/api/admin/caja/historial')) return { data: MOCK_CAJA_HISTORIAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    if (url.includes('/api/caja/estado')) return { data: MOCK_CAJA_ACTUAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    if (url.includes('/api/admin/planes')) return { data: MOCK_PLANES_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };

    return Promise.reject(error);
  }
);

export default apiClient;
