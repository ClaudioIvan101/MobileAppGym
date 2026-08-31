import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import { QrCode, Sparkles, Clock } from 'lucide-react-native';

/**
 * Hero Card de Identidad del Socio universal para React Native
 */
export const HeroIdentityCard = ({
  socio,
  membresia,
  isLoading = false,
  onOpenQR,
}) => {
  const nombre = socio?.nombre || 'Atleta';
  const plan = membresia?.planNombre || 'Membresía General';
  const estado = membresia?.estado || 'active'; // 'active' | 'expiring' | 'inactive'
  const vencimiento = membresia?.fechaVencimiento || 'Sin fecha';
  const diasRestantes = membresia?.diasRestantes;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentRow}>
        <View style={styles.infoCol}>
          {/* Header con bienvenida */}
          <View style={styles.welcomeTag}>
            <Sparkles size={14} color={tokens.colors.primary[400]} />
            <Text style={styles.welcomeSub}>BIENVENIDO DE VUELTA</Text>
          </View>

          <Text style={styles.title}>
            ¡A entrenar, <Text style={styles.nameHighlight}>{nombre}</Text>!
          </Text>

          {/* Estado de Membresía & Vencimiento */}
          <View style={styles.statusRow}>
            <Badge variant={estado} size="md">
              {estado === 'active' ? 'Activo' : estado === 'expiring' ? 'Por vencer' : 'Inactivo'}
            </Badge>

            <View style={styles.planInfo}>
              <Text style={styles.planName}>{plan}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.vencimientoText}>
                Vence: {vencimiento} {diasRestantes !== undefined && `(${diasRestantes}d)`}
              </Text>
            </View>
          </View>
        </View>

        {/* Acceso Rápido al Pase Digital */}
        <View style={styles.qrButtonCol}>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={onOpenQR}
            activeOpacity={0.8}
          >
            <View style={styles.qrIconWrapper}>
              <QrCode size={26} color={tokens.colors.primary[400]} />
            </View>
            <Text style={styles.qrButtonLabel}>Pase Digital</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  infoCol: {
    flex: 1,
    minWidth: 200,
  },
  welcomeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  welcomeSub: {
    fontSize: 11,
    letterSpacing: 0.8,
    color: tokens.colors.primary[400],
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: tokens.colors.text.primary,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  nameHighlight: {
    color: tokens.colors.primary[400],
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  planName: {
    fontWeight: '700',
    color: tokens.colors.text.primary,
    fontSize: 12.5,
  },
  separator: {
    color: tokens.colors.text.muted,
    fontSize: 12,
  },
  vencimientoText: {
    color: tokens.colors.text.secondary,
    fontSize: 11.5,
  },
  qrButtonCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.primary[600],
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 90,
  },
  qrIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
  },
  qrButtonLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: tokens.colors.text.primary,
    letterSpacing: 0.2,
  },
});

export default HeroIdentityCard;
