import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Calendar } from 'lucide-react-native';

const DIAS_OPTIONS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/**
 * Modal para Programar Clase universal para React Native
 */
export const ScheduleClassModal = ({
  isOpen,
  onClose,
  onConfirmSchedule,
  isLoading = false,
}) => {
  const [nombre, setNombre] = useState('CrossFit Power');
  const [salaNombre, setSalaNombre] = useState('Box Principal (Zona A)');
  const [instructorNombre, setInstructorNombre] = useState('Prof. Lucas Méndez');
  const [horarioInicio, setHorarioInicio] = useState('18:00');
  const [horarioFin, setHorarioFin] = useState('19:00');
  const [cupoTotal, setCupoTotal] = useState('16');
  const [diasRecurrencia, setDiasRecurrencia] = useState(['Lunes', 'Miércoles', 'Viernes']);

  const toggleDia = (dia) => {
    setDiasRecurrencia((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = () => {
    if (onConfirmSchedule) {
      onConfirmSchedule({
        nombre,
        disciplina: 'CrossFit',
        salaId: 'box-a',
        salaNombre,
        instructorId: 'lucas',
        instructorNombre,
        horarioInicio,
        horarioFin,
        cupoTotal: Number(cupoTotal || 16),
        recurrente: true,
        diasRecurrencia,
        diaSemana: diasRecurrencia[0] || 'Lunes',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Programar Nueva Clase"
      subtitle="Agenda Semanal"
    >
      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nombre de la Actividad</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej: CrossFit Power"
            placeholderTextColor={tokens.colors.text.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.rowTwoCols}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Sala</Text>
            <TextInput
              value={salaNombre}
              onChangeText={setSalaNombre}
              placeholder="Box Principal"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>

          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Instructor</Text>
            <TextInput
              value={instructorNombre}
              onChangeText={setInstructorNombre}
              placeholder="Prof. Lucas"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.rowThreeCols}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Inicio</Text>
            <TextInput
              value={horarioInicio}
              onChangeText={setHorarioInicio}
              placeholder="18:00"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>

          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Fin</Text>
            <TextInput
              value={horarioFin}
              onChangeText={setHorarioFin}
              placeholder="19:00"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
            />
          </View>

          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.label}>Cupo</Text>
            <TextInput
              value={cupoTotal}
              onChangeText={setCupoTotal}
              placeholder="16"
              placeholderTextColor={tokens.colors.text.muted}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Días */}
        <Text style={styles.label}>Días de repetición semanal</Text>
        <View style={styles.daysChips}>
          {DIAS_OPTIONS.map((dia) => {
            const isChecked = diasRecurrencia.includes(dia);
            return (
              <TouchableOpacity
                key={dia}
                onPress={() => toggleDia(dia)}
                activeOpacity={0.75}
                style={[
                  styles.dayChip,
                  isChecked ? styles.dayChipActive : styles.dayChipInactive,
                ]}
              >
                <Text
                  style={[
                    styles.dayChipText,
                    { color: isChecked ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                  ]}
                >
                  {dia.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Acciones */}
        <View style={styles.actionsRow}>
          <Button variant="secondary" onPress={onClose} style={{ flex: 1 }}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            icon={Calendar}
            loading={isLoading}
            onPress={handleSubmit}
            style={{ flex: 1 }}
          >
            Guardar
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
  rowTwoCols: {
    flexDirection: 'row',
    gap: 8,
  },
  rowThreeCols: {
    flexDirection: 'row',
    gap: 8,
  },
  daysChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dayChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  dayChipInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  dayChipActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: tokens.colors.primary[500],
  },
  dayChipText: {
    fontSize: 11,
    fontWeight: '800',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
});

export default ScheduleClassModal;
