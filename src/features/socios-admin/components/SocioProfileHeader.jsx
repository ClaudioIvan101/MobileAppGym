import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import {
  MessageCircle,
  CreditCard,
  Layers,
  ArrowLeft,
  Phone,
  Mail,
} from 'lucide-react-native';

/**
 * Cabecera de la Ficha 360° universal para React Native
 */
export const SocioProfileHeader = ({
  socio,
  onBack,
  onOpenPaymentModal,
  onOpenPlanModal,
}) => {
  if (!socio) return null;

  const isActive = socio.planEstado === 'active';
  const isExpiring = socio.planEstado === 'expiring';

  const handleWhatsApp = () => {
    const cleanPhone = (socio.telefono || '').replace(/\D/g, '');
    const text = encodeURIComponent(`¡Hola ${socio.nombre}! Te contactamos desde StrongFit.`);
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${text}`);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Botón Volver */}
      <View style={styles.topNavRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ArrowLeft size={16} color={tokens.colors.text.primary} />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.socioIdTag}>ID: {socio.id}</Text>
      </View>

      {/* Tarjeta Principal */}
      <View style={styles.profileCard}>
        <View style={styles.profileMain}>
          <Image
            source={{
              uri:
                socio.foto ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            }}
            style={styles.avatarImg}
          />

          <View style={styles.infoCol}>
            <View style={styles.nameRow}>
              <Text style={styles.nombreTitle}>{socio.nombreCompleto}</Text>
              <Badge
                variant={isActive ? 'active' : isExpiring ? 'expiring' : 'inactive'}
                size="sm"
              />
            </View>

            <View style={styles.quickDataGrid}>
              <Text style={styles.dataItem}>DNI: {socio.dni}</Text>
              <Text style={styles.dataItem}>•</Text>
              <Text style={styles.dataItem}>{socio.telefono}</Text>
            </View>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.headerActionsCol}>
          <TouchableOpacity style={styles.whatsAppBtn} onPress={handleWhatsApp} activeOpacity={0.75}>
            <MessageCircle size={14} color="#22c55e" />
            <Text style={styles.whatsAppText}>WhatsApp</Text>
          </TouchableOpacity>

          <Button
            variant="primary"
            size="sm"
            icon={CreditCard}
            onPress={onOpenPaymentModal}
          >
            Cobrar
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={Layers}
            onPress={onOpenPlanModal}
          >
            Plan
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 10,
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  socioIdTag: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.muted,
  },
  profileCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  profileMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: tokens.colors.primary[500],
  },
  infoCol: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nombreTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  quickDataGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dataItem: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  headerActionsCol: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 10,
  },
  whatsAppBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 6,
    paddingVertical: 6,
  },
  whatsAppText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#22c55e',
  },
});

export default SocioProfileHeader;
