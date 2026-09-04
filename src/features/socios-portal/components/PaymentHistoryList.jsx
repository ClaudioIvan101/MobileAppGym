import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import {
  FileText,
  Download,
  CreditCard,
  Building2,
  Banknote,
  CheckCircle2,
  Eye,
} from 'lucide-react-native';

/**
 * Listado del Historial de Pagos y Comprobantes universal para React Native
 */
export const PaymentHistoryList = ({
  pagos = [],
  isLoading = false,
  onViewReceipt,
  onDownloadReceipt,
}) => {
  const getMedioPagoIcon = (medio) => {
    switch (medio) {
      case 'TARJETA_CREDITO':
      case 'TARJETA_DEBITO':
        return <CreditCard size={16} color={tokens.colors.primary[400]} />;
      case 'TRANSFERENCIA':
        return <Building2 size={16} color={tokens.colors.accent.cyan} />;
      case 'EFECTIVO':
        return <Banknote size={16} color="#fbbf24" />;
      default:
        return <CreditCard size={16} color={tokens.colors.text.secondary} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <FileText size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.title}>Historial de Pagos</Text>
        </View>
        <View style={styles.countTag}>
          <Text style={styles.countTagText}>{pagos.length} comprobantes</Text>
        </View>
      </View>

      {pagos.length > 0 ? (
        <View style={styles.listContainer}>
          {pagos.map((pago) => (
            <View key={pago.id} style={styles.paymentCard}>
              <View style={styles.leftCol}>
                <View style={styles.iconCircle}>
                  {getMedioPagoIcon(pago.medioPago)}
                </View>

                <View style={styles.infoCol}>
                  <Text style={styles.conceptTitle}>{pago.concepto}</Text>
                  <Text style={styles.invoiceNumber}>{pago.numeroFactura || pago.id}</Text>

                  <View style={styles.metaRow}>
                    <Text style={styles.dateText}>{pago.fecha}</Text>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.paymentMethodText}>
                      {pago.medioPagoDetalle || pago.medioPago}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.rightCol}>
                <View style={styles.amountCol}>
                  <Text style={styles.amountText}>{pago.monto}</Text>
                  <View style={styles.statusRow}>
                    <CheckCircle2 size={11} color={tokens.colors.primary[400]} />
                    <Text style={styles.statusText}>{pago.estadoPago || 'Pagado'}</Text>
                  </View>
                </View>

                <View style={styles.actionsGroup}>
                  <TouchableOpacity
                    style={styles.actionIconBtn}
                    onPress={() => onViewReceipt(pago)}
                    activeOpacity={0.7}
                  >
                    <Eye size={15} color={tokens.colors.text.secondary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.downloadPdfBtn}
                    onPress={() => onDownloadReceipt(pago)}
                    activeOpacity={0.7}
                  >
                    <Download size={13} color={tokens.colors.primary[400]} />
                    <Text style={styles.downloadPdfText}>PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyBox}>
          <FileText size={26} color={tokens.colors.text.muted} />
          <Text style={styles.emptyText}>No tienes registros de pagos históricos.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  countTag: {
    backgroundColor: tokens.colors.surface.card,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  countTagText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
    fontWeight: '600',
  },
  listContainer: {
    gap: 8,
  },
  paymentCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  conceptTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  invoiceNumber: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  dateText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  separator: {
    color: tokens.colors.text.muted,
    fontSize: 11,
  },
  paymentMethodText: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
  },
  amountCol: {
    gap: 2,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: tokens.colors.primary[400],
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIconBtn: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    borderRadius: 6,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadPdfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  downloadPdfText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  emptyBox: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emptyText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
});

export default PaymentHistoryList;
