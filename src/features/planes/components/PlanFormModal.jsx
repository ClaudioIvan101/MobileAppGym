import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Layers } from 'lucide-react-native';

const DURACIONES = [
  { dias: 30, label: '30 días' },
  { dias: 90, label: '90 días' },
];

/**
 * Modal para Crear / Editar Plan universal para React Native
 */
export const PlanFormModal = ({
  isOpen,
  onClose,
  plan,
  onSave,
  isLoading = false,
}) => {
  const isEditing = !!plan;

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [modalidad, setModalidad] = useState('GENERAL');
  const [cantidadClases, setCantidadClases] = useState('12');
  const [duracionDias, setDuracionDias] = useState(30);
  const [precio, setPrecio] = useState('38500');

  useEffect(() => {
    if (plan) {
      setNombre(plan.nombre || '');
      setDescripcion(plan.descripcion || '');
      setModalidad(plan.modalidad || 'GENERAL');
      setCantidadClases(String(plan.cantidadClases || 12));
      setDuracionDias(plan.duracionDias || 30);
      setPrecio(String(plan.precio || 38500));
    } else {
      setNombre('');
      setDescripcion('');
      setModalidad('GENERAL');
      setCantidadClases('12');
      setDuracionDias(30);
      setPrecio('38500');
    }
  }, [plan, isOpen]);

  const handleSubmit = () => {
    if (onSave && nombre.trim()) {
      onSave({
        nombre,
        descripcion,
        modalidad,
        cantidadClases: modalidad === 'CLASES' ? Number(cantidadClases) : 0,
        duracionDias: Number(duracionDias),
        precio: Number(precio),
        estado: 'ACTIVO',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Plan' : 'Crear Plan'}
      subtitle="Configuración Comercial"
    >
      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nombre del Plan</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej: Black Pass Ultra"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Alcance del plan..."
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        {/* Modalidad */}
        <Text style={styles.label}>Modalidad de Acceso</Text>
        <View style={styles.modalidadRow}>
          <TouchableOpacity
            onPress={() => setModalidad('GENERAL')}
            activeOpacity={0.75}
            style={[
              styles.modalidadBtn,
              modalidad === 'GENERAL' ? styles.modalidadActive : styles.modalidadInactive,
            ]}
          >
            <Text style={[styles.modalidadText, modalidad === 'GENERAL' && { color: tokens.colors.primary[400] }]}>
              🏋️ General
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalidad('CLASES')}
            activeOpacity={0.75}
            style={[
              styles.modalidadBtn,
              modalidad === 'CLASES' ? styles.modalidadActive : styles.modalidadInactive,
            ]}
          >
            <Text style={[styles.modalidadText, modalidad === 'CLASES' && { color: tokens.colors.primary[400] }]}>
              🥊 Por Clases
            </Text>
          </TouchableOpacity>
        </View>

        {modalidad === 'CLASES' && (
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Cantidad de Clases / Mes</Text>
            <TextInput
              value={cantidadClases}
              onChangeText={setCantidadClases}
              placeholder="12"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Duraciones */}
        <Text style={styles.label}>Duración</Text>
        <View style={styles.duracionesRow}>
          {DURACIONES.map((d) => {
            const isSelected = duracionDias === d.dias;
            return (
              <TouchableOpacity
                key={d.dias}
                onPress={() => setDuracionDias(d.dias)}
                activeOpacity={0.75}
                style={[
                  styles.duracionBtn,
                  isSelected ? styles.duracionActive : styles.duracionInactive,
                ]}
              >
                <Text style={[styles.duracionText, isSelected && { color: tokens.colors.primary[400] }]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Precio */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Precio ($)</Text>
          <TextInput
            value={precio}
            onChangeText={setPrecio}
            placeholder="38500"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        {/* Acciones */}
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
            {isEditing ? 'Guardar' : 'Crear'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 10,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  input: {
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: tokens.colors.text.primary,
    fontSize: 12.5,
  },
  modalidadRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modalidadBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalidadInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  modalidadActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: tokens.colors.primary[500],
  },
  modalidadText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  duracionesRow: {
    flexDirection: 'row',
    gap: 6,
  },
  duracionBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  duracionInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  duracionActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: tokens.colors.primary[500],
  },
  duracionText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default PlanFormModal;
