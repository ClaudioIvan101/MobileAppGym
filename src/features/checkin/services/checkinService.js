import { apiClient } from '../../../api/client';

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
    const dni = String(dniOrQr || '').replace(/\D/g, '');
    const response = await apiClient.post('/api/asistencias/checkin', {
      dni,
      forzarIngreso: false,
    });
    return normalizeCheckinResult(response.data);
  },

  /**
   * Obtiene la lista de últimos accesos en tiempo real
   * Endpoint: GET /api/checkin/recientes
   */
  getRecientes: async () => {
    const response = await apiClient.get('/api/asistencias/hoy');
    const items = Array.isArray(response.data) ? response.data : response.data?.content || [];
    return items.map(normalizeRecentCheckin);
  },

  /**
   * Concede acceso excepcional / forzado con justificación del recepcionista
   * Endpoint: POST /api/checkin/forzar-acceso
   */
  forzarAcceso: async ({ socioId, motivo, dni }) => {
    if (!dni) {
      throw new Error('No se encontró el DNI del socio para forzar el ingreso.');
    }
    const response = await apiClient.post('/api/asistencias/checkin', {
      dni: String(dni).replace(/\D/g, ''),
      forzarIngreso: true,
    });
    return { ...normalizeCheckinResult(response.data), motivo: motivo || response.data?.mensaje };
  }
};

const normalizeCheckinResult = (data = {}) => {
  const codigo = data.codigoResultado || data.tipoResultado || '';
  const tipoResultado = data.tipoResultado || (
    data.accesoPermitido
      ? 'HABILITADO'
      : codigo.includes('RESERVA') || codigo.includes('ACTIVIDAD')
      ? 'SIN_RESERVA'
      : 'DENEGADO_CUOTA'
  );
  const socio = data.socio || (data.socioId || data.dni ? {
    id: data.socioId,
    nombre: [data.nombre, data.apellido].filter(Boolean).join(' '),
    dni: data.dni,
    plan: data.planNombre,
    vencimiento: data.fechaVencimiento,
  } : null);

  return {
    ...data,
    tipoResultado,
    motivo: data.motivo || data.mensaje || codigo,
    socio,
  };
};

const normalizeRecentCheckin = (item = {}) => ({
  ...item,
  id: item.id ?? item.idAsistencia,
  socio: item.socio || [item.nombreSocio, item.apellidoSocio].filter(Boolean).join(' '),
  hora: item.hora || (item.fechaHora ? new Date(item.fechaHora).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : '--:--'),
  plan: item.plan || item.planNombre || 'Sin plan',
  tipoResultado: item.tipoResultado || (item.accesoPermitido ? 'HABILITADO' : 'DENEGADO_CUOTA'),
});

export default checkinService;
