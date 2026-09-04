import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { useClassRealtimeDetail } from '../hooks/useClassRealtimeDetail';
import {
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  UserPlus,
  ArrowUpRight,
} from 'lucide-react-native';

/**
 * Ficha de Clase en Tiempo Real universal para React Native
 */
export const ClassLiveDetailModal = ({
  isOpen,
  onClose,
  claseId,
}) => {
  const [showManualEnroll, setShowManualEnroll] = useState(false);
  const [manualNombre, setManualNombre] = useState('');
  const [manualDni, setManualDni] = useState('');

  const {
    clase,
    inscriptos,
    listaEspera,
    cupoTotal,
    cupoOcupado,
    cupoLibre,
    toggleAsistencia,
    inscribirManual,
    isInscribingManual,
    promoverEspera,
    isPromoting,
  } = useClassRealtimeDetail(claseId);

  if (!isOpen || !claseId) return null;

  const handleManualSubmit = () => {
    if (manualNombre.trim()) {
      inscribirManual({
        socioId: `SF-${Math.floor(1000 + Math.random() * 9000)}`,
        nombre: manualNombre.trim(),
        dni: manualDni.trim() || '40.100.200',
      });
      setManualNombre('');
      setManualDni('');
      setShowManualEnroll(false);
    }
  };

  const isLleno = cupoLibre === 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ficha de Clase en Vivo"
      subtitle={clase?.nombre || ''}
    >
      <View style={styles.modalContent}>
        {/* Banner */}
        <View style={styles.classBanner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.className}>{clase?.nombre}</Text>
            <View style={styles.metaRow}>
              <Clock size={11} color={tokens.colors.primary[400]} />
              <Text style={styles.metaText}>{clase?.horario}</Text>
              <Text style={styles.dot}>•</Text>
              <MapPin size={11} color={tokens.colors.text.muted} />
              <Text style={styles.metaText}>{clase?.sala}</Text>
            </View>
          </View>

          <View style={styles.cuposBox}>
            <Text style={styles.cuposRatio}>{cupoOcupado}/{cupoTotal}</Text>
            <Text style={[styles.cuposStatus, { color: isLleno ? '#f87171' : tokens.colors.primary[400] }]}>
              {isLleno ? 'Lleno' : `${cupoLibre} disp.`}
            </Text>
          </View>
        </View>

        {/* Inscripción Manual Toggle */}
        <View style={styles.inscriptosHeader}>
          <Text style={styles.sectionTitle}>Inscriptos ({inscriptos.length})</Text>
          {!isLleno && !showManualEnroll && (
            <Button
              variant="outline"
              size="sm"
              icon={UserPlus}
              onPress={() => setShowManualEnroll(true)}
            >
              Agregar Socio
            </Button>
          )}
        </View>

        {/* Form Manual */}
        {showManualEnroll && (
          <View style={styles.manualForm}>
            <TextInput
              value={manualNombre}
              onChangeText={setManualNombre}
              placeholder="Nombre del socio"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
            <View style={styles.formBtns}>
              <Button variant="secondary" size="sm" onPress={() => setShowManualEnroll(false)}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" loading={isInscribingManual} onPress={handleManualSubmit}>
                Confirmar
              </Button>
            </View>
          </View>
        )}

        {/* Lista de Inscriptos */}
        <View style={styles.inscriptosList}>
          {inscriptos.map((item) => (
            <View key={item.socioId} style={styles.inscriptoCard}>
              <Image
                source={{
                  uri:
                    item.foto ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImg}
              />

              <View style={styles.infoCol}>
                <Text style={styles.socioName}>{item.nombre}</Text>
                <Text style={styles.planText}>{item.plan}</Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleAsistencia(item.reservaId, item.asistio ? 'CONFIRMADA' : 'ASISTIO')}
                activeOpacity={0.75}
                style={[
                  styles.checkBtn,
                  item.asistio ? styles.checkBtnPresent : styles.checkBtnAbsent,
                ]}
              >
                {item.asistio ? (
                  <CheckCircle2 size={14} color="#10B981" />
                ) : (
                  <XCircle size={14} color="#f87171" />
                )}
                <Text
                  style={[
                    styles.checkText,
                    { color: item.asistio ? tokens.colors.primary[400] : tokens.colors.text.muted },
                  ]}
                >
                  {item.asistio ? 'Presente' : 'Ausente'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Lista de Espera */}
        {listaEspera.length > 0 && (
          <View style={styles.waitlistSection}>
            <Text style={styles.waitlistTitle}>Lista de Espera ({listaEspera.length})</Text>
            {listaEspera.map((item) => (
              <View key={item.socioId} style={styles.waitlistCard}>
                <Text style={styles.waitlistOrder}>#{item.orden}</Text>
                <Text style={styles.waitlistName}>{item.nombre}</Text>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={ArrowUpRight}
                  loading={isPromoting}
                  onPress={() => promoverEspera(item.socioId)}
                >
                  Promover
                </Button>
              </View>
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    gap: 12,
  },
  classBanner: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  bannerLeft: {
    flex: 1,
    gap: 3,
  },
  className: {
    fontSize: 14,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  dot: {
    color: tokens.colors.text.muted,
  },
  cuposBox: {
    alignItems: 'center',
    gap: 2,
  },
  cuposRatio: {
    fontSize: 14,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  cuposStatus: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  inscriptosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  manualForm: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 8,
    padding: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
  },
  input: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: tokens.colors.text.primary,
    fontSize: 12,
  },
  formBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
  },
  inscriptosList: {
    gap: 6,
  },
  inscriptoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
  },
  avatarImg: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  infoCol: {
    flex: 1,
  },
  socioName: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  planText: {
    fontSize: 10.5,
    color: tokens.colors.primary[400],
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  checkBtnPresent: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  checkBtnAbsent: {
    backgroundColor: tokens.colors.surface.elevated,
  },
  checkText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  waitlistSection: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderStyle: 'dashed',
    gap: 8,
  },
  waitlistTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fbbf24',
  },
  waitlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 6,
    padding: 6,
  },
  waitlistOrder: {
    fontSize: 11,
    fontWeight: '900',
    color: '#fbbf24',
  },
  waitlistName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
});

export default ClassLiveDetailModal;
