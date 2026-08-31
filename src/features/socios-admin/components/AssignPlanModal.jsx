import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Layers } from 'lucide-react-native';

const PLANES_DISPONIBLES = [
  { id: 'Black Pass Ultra', nombre: 'Black Pass Ultra', precio: '$ 38.500' },
  { id: 'Pase Libre Musculación', nombre: 'Pase Libre Musculación', precio: '$ 35.000' },
  { id: 'Pack 12 Clases', nombre: 'Pack 12 Clases', precio: '$ 32.000' },
];

/**
 * Modal para Asignar o Renovar Plan universal para React Native
 */
export const AssignPlanModal = ({
  isOpen,
  onClose,
  socio,
  onConfirmPlan,
  isLoading = false,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(PLANES_DISPONIBLES[0].id);
  const [fechaInicio, setFechaInicio] = useState('31/08/2026');
  const [fechaFin, setFechaFin] = useState('30/09/2026');

  const selectedPlanObj = PLANES_DISPONIBLES.find((p) => p.id === selectedPlan) || PLANES_DISPONIBLES[0];

  const handleSubmit = () => {
    if (onConfirmPlan && socio) {
      onConfirmPlan({
        socioId: socio.id,
        planNombre: selectedPlanObj.id,
        precio: selectedPlanObj.precio,
        fechaInicio,
        fechaFin,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asignar Plan de Membresía"
      subtitle={socio ? socio.nombreCompleto : ''}
    >
      <View style={styles.form}>
        {socio ? (
          <View style={styles.socioBanner}>
            <Image
              source={{
                uri:
                  socio.foto ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
              }}
              style={styles.avatarImg}
            />
            <View style={styles.bannerTextCol}>
              <Text style={styles.socioName}>{socio.nombreCompleto}</Text>
              <Text style={styles.socioDni}>DNI: {socio.dni} • Plan actual: {socio.planActual}</Text>
            </View>
          </View>
        ) : null}

        {/* Selección de Planes */}
        <Text style={styles.label}>Seleccionar Plan</Text>
        <View style={styles.planesList}>
          {PLANES_DISPONIBLES.map((p) => {
            const isSelected = p.id === selectedPlan;
            return (
              <TouchableOpacity
                key={p.id}
                onPress={() => setSelectedPlan(p.id)}
                activeOpacity={0.75}
                style={[
                  styles.planOption,
                  isSelected ? styles.planOptionActive : styles.planOptionInactive,
                ]}
              >
                <Text style={[styles.planTitle, isSelected && { color: tokens.colors.primary[400] }]}>
                  {p.nombre}
                </Text>
                <Text style={styles.planPrice}>{p.precio}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Fechas */}
        <View style={styles.datesGrid}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Inicio</Text>
            <TextInput
              value={fechaInicio}
              onChangeText={setFechaInicio}
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={tokens.colors.text.muted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Vencimiento</Text>
            <TextInput
              value={fechaFin}
              onChangeText={setFechaFin}
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={tokens.colors.text.muted}
            />
          </View>
        </View>

        {/* Botones */}
        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            icon={Layers}
            loading={isLoading}
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Asignar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  socioBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  avatarImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  bannerTextCol: {
    flex: 1,
  },
  socioName: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  socioDni: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  planesList: {
    gap: 6,
  },
  planOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  planOptionInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  planOptionActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: tokens.colors.primary[500],
  },
  planTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  planPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: tokens.colors.primary[400],
  },
  datesGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  fieldGroup: {
    flex: 1,
    gap: 4,
  },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: tokens.colors.text.primary,
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default AssignPlanModal;
