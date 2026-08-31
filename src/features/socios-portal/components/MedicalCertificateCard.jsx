import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import {
  FileCheck2,
  Upload,
  Calendar,
  ShieldCheck,
} from 'lucide-react-native';

/**
 * Tarjeta de Estado del Certificado Médico universal para React Native
 */
export const MedicalCertificateCard = ({
  certificadoMedico,
  onUploadCertificado,
  isUploading = false,
}) => {
  const {
    estado = 'vigente',
    fechaVencimiento = '15/12/2026',
    diasRestantes = 106,
    medicoEmisor = 'Dr. Roberto González (MN 89410)',
  } = certificadoMedico || {};

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <FileCheck2 size={16} color={tokens.colors.primary[400]} />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.title}>Apto Físico / Certificado</Text>
            <Text style={styles.subtitle}>Requisito obligatorio</Text>
          </View>
        </View>

        <Badge variant={estado === 'vigente' ? 'active' : estado === 'expiring' ? 'expiring' : 'inactive'} size="md">
          {estado === 'vigente' ? 'Vigente' : estado === 'expiring' ? 'Por vencer' : 'Vencido'}
        </Badge>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailBox}>
          <Calendar size={14} color={tokens.colors.primary[400]} />
          <View style={styles.detailTextCol}>
            <Text style={styles.detailLabel}>Vencimiento</Text>
            <Text style={styles.detailValue}>{fechaVencimiento} ({diasRestantes} días)</Text>
          </View>
        </View>

        <View style={styles.detailBox}>
          <ShieldCheck size={14} color={tokens.colors.accent.cyan} />
          <View style={styles.detailTextCol}>
            <Text style={styles.detailLabel}>Profesional</Text>
            <Text style={styles.detailValue}>{medicoEmisor}</Text>
          </View>
        </View>
      </View>

      <Button
        variant="outline"
        size="sm"
        icon={Upload}
        loading={isUploading}
        onPress={() => onUploadCertificado && onUploadCertificado('mock-file')}
      >
        Subir Nuevo Certificado
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  subtitle: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  detailsGrid: {
    gap: 8,
  },
  detailBox: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailTextCol: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
});

export default MedicalCertificateCard;
