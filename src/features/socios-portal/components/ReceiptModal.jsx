import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { Download } from 'lucide-react-native';

/**
 * Modal de Visualización y Descarga de Comprobante / Recibo Digital universal para React Native
 */
export const ReceiptModal = ({
  isOpen,
  onClose,
  pago,
  socio,
}) => {
  if (!pago) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Comprobante Electrónico"
      subtitle={`N° ${pago.numeroFactura || pago.id}`}
    >
      <View style={styles.content}>
        <View style={styles.receiptBox}>
          <View style={styles.gymHeader}>
            <View style={styles.gymTitleCol}>
              <Text style={styles.gymName}>StrongFit Gym & Wellness</Text>
              <Text style={styles.gymTaxId}>CUIT / RUT: 30-71829340-9</Text>
            </View>
            <Badge variant="active" size="sm">Aprobado</Badge>
          </View>

          <View style={styles.divider} />

          {/* Datos */}
          <View style={styles.sectionRow}>
            <Text style={styles.label}>Titular:</Text>
            <Text style={styles.value}>{socio?.nombreCompleto || 'Alejandro Silva'}</Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{pago.fecha}</Text>
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.label}>Medio de Pago:</Text>
            <Text style={styles.value}>{pago.medioPagoDetalle || pago.medioPago}</Text>
          </View>

          <View style={styles.divider} />

          {/* Concepto y Total */}
          <View style={styles.itemRow}>
            <Text style={styles.conceptName}>{pago.concepto}</Text>
            <Text style={styles.conceptPrice}>{pago.monto}</Text>
          </View>

          <View style={styles.dividerBold} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Abonado:</Text>
            <Text style={styles.totalValue}>{pago.monto}</Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cerrar
          </Button>

          <Button
            variant="primary"
            icon={Download}
            onPress={onClose}
            style={{ flex: 1 }}
          >
            Descargar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 14,
  },
  receiptBox: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
  },
  gymHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  gymTitleCol: {
    flex: 1,
  },
  gymName: {
    fontSize: 15,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  gymTaxId: {
    fontSize: 11,
    color: tokens.colors.text.muted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: tokens.colors.surface.border,
    marginVertical: 4,
  },
  dividerBold: {
    height: 2,
    backgroundColor: tokens.colors.primary[500],
    marginVertical: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: tokens.colors.text.primary,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  conceptName: {
    fontSize: 12.5,
    fontWeight: '600',
    color: tokens.colors.text.primary,
    flex: 1,
  },
  conceptPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: tokens.colors.primary[400],
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default ReceiptModal;
