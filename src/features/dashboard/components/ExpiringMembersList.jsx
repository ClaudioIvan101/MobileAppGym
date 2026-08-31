import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import {
  CalendarAlert,
  MessageCircle,
  CreditCard,
  Clock,
} from 'lucide-react-native';

/**
 * Lista de Próximos Vencimientos universal para React Native
 */
export const ExpiringMembersList = ({
  vencimientos = [],
  isLoading = false,
  onCobrarCuota,
}) => {
  const getUrgencyConfig = (diasRestantes) => {
    if (diasRestantes <= 3) {
      return {
        badgeBg: 'rgba(239, 68, 68, 0.12)',
        badgeBorder: 'rgba(239, 68, 68, 0.4)',
        textColor: '#f87171',
        label: diasRestantes === 1 ? '¡Mañana!' : `${diasRestantes}d`,
      };
    }
    return {
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      badgeBorder: 'rgba(245, 158, 11, 0.4)',
      textColor: '#fbbf24',
      label: `${diasRestantes}d`,
    };
  };

  const handleWhatsAppContact = (item) => {
    const cleanPhone = (item.telefono || '').replace(/\D/g, '');
    const text = encodeURIComponent(
      `¡Hola ${item.nombre}! Te recordamos de StrongFit que tu plan "${item.plan}" vence el ${item.fechaVencimiento}.`
    );
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${text}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <CalendarAlert size={16} color="#fbbf24" />
          <Text style={styles.title}>Próximos Vencimientos</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{vencimientos.length} socios</Text>
        </View>
      </View>

      <View style={styles.list}>
        {vencimientos.map((item) => {
          const urgency = getUrgencyConfig(item.diasRestantes);

          return (
            <View key={item.id} style={styles.cardItem}>
              <View style={styles.cardTop}>
                <View style={styles.memberInfoRow}>
                  <Image
                    source={{
                      uri:
                        item.foto ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                    }}
                    style={styles.avatarImg}
                  />
                  <View style={styles.textCol}>
                    <Text style={styles.memberName}>{item.nombre}</Text>
                    <Text style={styles.planSub}>{item.plan}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.urgencyBadge,
                    {
                      backgroundColor: urgency.badgeBg,
                      borderColor: urgency.badgeBorder,
                    },
                  ]}
                >
                  <Clock size={10} color={urgency.textColor} />
                  <Text style={[styles.urgencyText, { color: urgency.textColor }]}>
                    {urgency.label}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.amountValue}>{item.montoCuota}</Text>

                <View style={styles.btnActionsGroup}>
                  <TouchableOpacity
                    onPress={() => handleWhatsAppContact(item)}
                    activeOpacity={0.75}
                    style={styles.whatsAppBtn}
                  >
                    <MessageCircle size={12} color="#22c55e" />
                    <Text style={styles.whatsAppText}>WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => onCobrarCuota && onCobrarCuota(item)}
                    activeOpacity={0.75}
                    style={styles.cobrarBtn}
                  >
                    <CreditCard size={12} color="#090D14" />
                    <Text style={styles.cobrarText}>Cobrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  countBadge: {
    backgroundColor: tokens.colors.surface.elevated,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  countText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  list: {
    gap: 8,
  },
  cardItem: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 8,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  avatarImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textCol: {
    flex: 1,
  },
  memberName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  planSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
    borderWidth: 1,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
    paddingTop: 6,
  },
  amountValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  btnActionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  whatsAppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  whatsAppText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#22c55e',
  },
  cobrarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: tokens.colors.primary[400],
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  cobrarText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#090D14',
  },
});

export default ExpiringMembersList;
