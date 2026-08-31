import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import {
  FileCheck2,
  MessageSquarePlus,
  Calendar,
  ShieldCheck,
  Send,
} from 'lucide-react-native';

/**
 * Pestaña 4 - Apto Médico y Notas Internas universal para React Native
 */
export const TabMedicalNotes = ({
  socio,
  onAddNota,
  isAdding = false,
}) => {
  const [nuevaNota, setNuevaNota] = useState('');

  const {
    aptoMedico = {},
    notasStaff = [],
  } = socio || {};

  const handlePostNota = () => {
    if (nuevaNota.trim() && onAddNota) {
      onAddNota(
        {
          autor: 'Recepción (Staff)',
          texto: nuevaNota.trim(),
        },
        {
          onSuccess: () => setNuevaNota(''),
        }
      );
    }
  };

  const isVigente = aptoMedico.estado === 'vigente';

  return (
    <View style={styles.tabContainer}>
      {/* 1. Apto Médico */}
      <View style={styles.sectionCard}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircleEmerald}>
              <FileCheck2 size={16} color={tokens.colors.primary[400]} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Apto Físico / Certificado</Text>
              <Text style={styles.sectionSub}>Documentación de salud</Text>
            </View>
          </View>

          <Badge variant={isVigente ? 'active' : 'inactive'} size="sm" />
        </View>

        <View style={styles.medicalDetailsGrid}>
          <View style={styles.medBox}>
            <Calendar size={13} color={tokens.colors.primary[400]} />
            <Text style={styles.boxLabel}>Vencimiento:</Text>
            <Text style={styles.boxValue}>{aptoMedico.fechaVencimiento || 'Sin fecha'}</Text>
          </View>

          <View style={styles.medBox}>
            <ShieldCheck size={13} color={tokens.colors.accent.cyan} />
            <Text style={styles.boxLabel}>Médico:</Text>
            <Text style={styles.boxValue}>{aptoMedico.medico || 'No especificado'}</Text>
          </View>
        </View>
      </View>

      {/* 2. Notas Internas */}
      <View style={styles.sectionCard}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <View style={styles.iconCirclePurple}>
              <MessageSquarePlus size={16} color={tokens.colors.accent.purple} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Notas Internas del Staff</Text>
              <Text style={styles.sectionSub}>Visible solo para el equipo</Text>
            </View>
          </View>
        </View>

        {/* Input */}
        <View style={styles.addNotaForm}>
          <TextInput
            value={nuevaNota}
            onChangeText={setNuevaNota}
            placeholder="Observación interna (lesiones, acuerdos)..."
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
            multiline
            numberOfLines={3}
          />
          <Button
            variant="primary"
            size="sm"
            icon={Send}
            loading={isAdding}
            disabled={!nuevaNota.trim()}
            onPress={handlePostNota}
          >
            Agregar Nota
          </Button>
        </View>

        {/* Notas List */}
        <View style={styles.notesFeed}>
          {notasStaff.map((item) => (
            <View key={item.id} style={styles.noteItem}>
              <View style={styles.noteHeader}>
                <Text style={styles.authorBadge}>{item.autor}</Text>
                <Text style={styles.noteDate}>{item.fecha}</Text>
              </View>
              <Text style={styles.noteText}>{item.texto}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    gap: 14,
  },
  sectionCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleEmerald: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCirclePurple: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  sectionSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  medicalDetailsGrid: {
    gap: 6,
  },
  medBox: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  boxLabel: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  boxValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  addNotaForm: {
    gap: 8,
  },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    padding: 10,
    color: tokens.colors.text.primary,
    fontSize: 12.5,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  notesFeed: {
    gap: 8,
  },
  noteItem: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 4,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  noteDate: {
    fontSize: 10.5,
    color: tokens.colors.text.muted,
  },
  noteText: {
    fontSize: 12,
    color: tokens.colors.text.primary,
    lineHeight: 16,
  },
});

export default TabMedicalNotes;
