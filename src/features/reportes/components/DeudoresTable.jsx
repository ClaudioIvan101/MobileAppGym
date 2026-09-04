import React from 'react';
import { View, Text, Image, Linking, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { MessageCircle, CreditCard } from 'lucide-react-native';

/**
 * Tabla de Deudores universal para React Native
 */
export const DeudoresTable = ({
  deudores = [],
  onPaySocio,
}) => {
  const handleOpenWhatsApp = (item) => {
    const cleanPhone = (item.telefono || '').replace(/\D/g, '');
    const mensaje = encodeURIComponent(
      `¡Hola ${item.nombreCompleto}! 👋 Te contactamos desde StrongFit para recordarte que tu cuota de "${item.plan}" por ${item.montoFormateado} venció hace ${item.diasMora} días. Puedes regularizarla por aquí o en recepción. ¡Gracias!`
    );
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${mensaje}`);
  };

  if (deudores.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🎉 No hay socios con deuda en este rango de filtros.</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {deudores.map((item) => {
        const isCritico = item.diasMora >= 30;
        const isMedio = item.diasMora >= 15 && item.diasMora < 30;

        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                source={{
                  uri:
                    item.foto ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImg}
              />

              <View style={styles.socioInfo}>
                <Text style={styles.socioName}>{item.nombreCompleto}</Text>
                <Text style={styles.socioMeta}>{item.plan} • Vence: {item.fechaVencimiento}</Text>
              </View>

              <View
                style={[
                  styles.moraBadge,
                  {
                    backgroundColor: isCritico
                      ? 'rgba(239, 68, 68, 0.15)'
                      : isMedio
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'rgba(234, 179, 8, 0.12)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.moraText,
                    { color: isCritico ? '#f87171' : isMedio ? '#fbbf24' : '#facc15' },
                  ]}
                >
                  {item.diasMora}d mora
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.debtAmount}>{item.montoFormateado}</Text>

              <View style={styles.actionsRow}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={MessageCircle}
                  onPress={() => handleOpenWhatsApp(item)}
                  style={styles.waBtn}
                >
                  WhatsApp
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  icon={CreditCard}
                  onPress={() => onPaySocio && onPaySocio(item)}
                >
                  Cobrar
                </Button>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  card: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  socioInfo: {
    flex: 1,
    gap: 2,
  },
  socioName: {
    fontSize: 13,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  socioMeta: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  moraBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  moraText: {
    fontSize: 10.5,
    fontWeight: '800',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
  },
  debtAmount: {
    fontSize: 14,
    fontWeight: '900',
    color: '#f87171',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  waBtn: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  emptyContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  emptyText: {
    fontSize: 12.5,
    color: tokens.colors.primary[400],
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default DeudoresTable;
