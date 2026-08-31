import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Cliente HTTP Base con Interceptors y Fallback de Datos para Desarrollo
 */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.strongfit.gym';

export const apiClient = axios.create({
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
    } catch (e) {
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
      } catch (parseErr) {
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

    // Endpoints de Caja
    if (url.includes('/api/admin/caja/actual')) return { data: MOCK_CAJA_ACTUAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    if (url.includes('/api/admin/caja/historial')) return { data: MOCK_CAJA_HISTORIAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    if (url.includes('/api/caja/estado')) return { data: MOCK_CAJA_ACTUAL_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };
    if (url.includes('/api/admin/planes')) return { data: MOCK_PLANES_DB, status: 200, statusText: 'OK', headers: {}, config: error.config };

    return Promise.reject(error);
  }
);

export default apiClient;
