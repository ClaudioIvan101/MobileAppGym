import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { CheckCircle2, MessageCircle } from 'lucide-react-native';

/**
 * Modal de Confirmación de Pase Diario universal para React Native
 */
export const DayPassSuccessModal = ({
  isOpen,
  onClose,
  saleResult,
}) => {
  if (!saleResult) return null;

  const {
    ticketNumero = 'TK-PASS-2026-0849',
    monto = 4500,
    medioPago = 'EFECTIVO',
    cliente = {},
    tarifaNombre = 'Pase Diario Musculación',
    codigoAcceso = 'SF-PASS-8849',
    paseValidoHasta = 'Hoy hasta las 23:59 hs',
  } = saleResult;

  const handleWhatsApp = () => {
    const cleanPhone = (cliente.telefono || '').replace(/\D/g, '');
    const text = encodeURIComponent(
      `¡Hola ${cliente.nombre}! Tu Pase Diario "${tarifaNombre}" en StrongFit está activo. Código de acceso: ${codigoAcceso}. Válido: ${paseValidoHasta}.`
    );
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${text}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¡Venta y Check-In Completados!"
      subtitle={ticketNumero}
    >
      <View style={styles.modalBody}>
        {/* Banner */}
        <View style={styles.successBanner}>
          <CheckCircle2 size={24} color={tokens.colors.primary[400]} />
          <View style={styles.bannerTextCol}>
            <Text style={styles.successTitle}>Pase Diario Habilitado</Text>
            <Text style={styles.successSub}>
              Cobrado $ {monto.toLocaleString('es-AR')} • Check-in registrado
            </Text>
          </View>
        </View>

        {/* Tarjeta del Pase */}
        <View style={styles.passCard}>
          <Text style={styles.passTitle}>{tarifaNombre}</Text>

          {/* QR */}
          <View style={styles.qrSection}>
            <View style={styles.qrBox}>
              <Svg width={90} height={90} viewBox="0 0 100 100">
                <Rect width="100" height="100" fill="#FFFFFF" rx="4" />
                <Rect x="10" y="10" width="30" height="30" fill="#090D14" rx="2" />
                <Rect x="16" y="16" width="18" height="18" fill="#FFFFFF" rx="1" />
                <Rect x="20" y="20" width="10" height="10" fill="#090D14" />
                <Rect x="60" y="10" width="30" height="30" fill="#090D14" rx="2" />
                <Rect x="66" y="16" width="18" height="18" fill="#FFFFFF" rx="1" />
                <Rect x="70" y="20" width="10" height="10" fill="#090D14" />
                <Rect x="10" y="60" width="30" height="30" fill="#090D14" rx="2" />
                <Rect x="16" y="66" width="18" height="18" fill="#FFFFFF" rx="1" />
                <Rect x="20" y="70" width="10" height="10" fill="#090D14" />
                <Rect x="50" y="50" width="10" height="10" fill="#10B981" rx="1" />
              </Svg>
            </View>

            <View style={styles.qrDetails}>
              <Text style={styles.codeLabel}>Código Torniquete:</Text>
              <Text style={styles.codeText}>{codigoAcceso}</Text>
              <Text style={styles.validText}>{paseValidoHasta}</Text>
            </View>
          </View>

          <View style={styles.clientFoot}>
            <Text style={styles.footText}>Cliente: {cliente.nombre} (DNI: {cliente.dni})</Text>
            <Text style={styles.footText}>Pago: {medioPago}</Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsRow}>
          {cliente.telefono ? (
            <TouchableOpacity style={styles.whatsAppBtn} onPress={handleWhatsApp} activeOpacity={0.75}>
              <MessageCircle size={14} color="#22c55e" />
              <Text style={styles.whatsAppText}>WhatsApp</Text>
            </TouchableOpacity>
          ) : null}

          <Button
            variant="primary"
            onPress={onClose}
            style={{ flex: 1 }}
          >
            Finalizar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    gap: 12,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    borderRadius: 10,
    padding: 12,
  },
  bannerTextCol: {
    flex: 1,
  },
  successTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  successSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  passCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
  },
  passTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  qrSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  qrBox: {
    padding: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  qrDetails: {
    flex: 1,
    gap: 2,
  },
  codeLabel: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  codeText: {
    fontSize: 15,
    fontWeight: '900',
    color: tokens.colors.primary[400],
  },
  validText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  clientFoot: {
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
    gap: 2,
  },
  footText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  whatsAppBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 8,
    paddingVertical: 8,
  },
  whatsAppText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#22c55e',
  },
});

export default DayPassSuccessModal;
