import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Clock, MapPin, User, ChevronRight } from 'lucide-react-native';

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/**
 * Grilla de Calendario Semanal universal para React Native
 */
export const WeeklyScheduleGrid = ({
  clases = [],
  isLoading = false,
  onSelectClass,
}) => {
  const [selectedDayTab, setSelectedDayTab] = useState('Lunes');

  const clasesDelDia = clases.filter(
    (c) => c.diaSemana === selectedDayTab || (c.recurrencia && c.recurrencia.includes(selectedDayTab))
  );

  return (
    <View style={styles.container}>
      {/* Selector de Días */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayTabsRow}
      >
        {DIAS_SEMANA.map((dia) => {
          const isSelected = dia === selectedDayTab;
          const countClases = clases.filter(
            (c) => c.diaSemana === dia || (c.recurrencia && c.recurrencia.includes(dia))
          ).length;

          return (
            <TouchableOpacity
              key={dia}
              onPress={() => setSelectedDayTab(dia)}
              activeOpacity={0.75}
              style={[
                styles.dayTabBtn,
                isSelected ? styles.dayTabBtnActive : styles.dayTabBtnInactive,
              ]}
            >
              <Text
                style={[
                  styles.dayName,
                  { color: isSelected ? '#090D14' : tokens.colors.text.secondary },
                ]}
              >
                {dia}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  { backgroundColor: isSelected ? '#090D14' : tokens.colors.surface.elevated },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    { color: isSelected ? tokens.colors.primary[400] : tokens.colors.text.secondary },
                  ]}
                >
                  {countClases}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Clases del Día */}
      <View style={styles.cardsList}>
        {clasesDelDia.length > 0 ? (
          clasesDelDia.map((item) => {
            const isLleno = item.cupoOcupado >= item.cupoTotal;
            const cuposLibres = Math.max(0, item.cupoTotal - item.cupoOcupado);

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelectClass && onSelectClass(item)}
                activeOpacity={0.8}
                style={[
                  styles.classCard,
                  { borderLeftColor: item.color || tokens.colors.primary[500] },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.timeBadge}>
                    <Clock size={12} color={tokens.colors.primary[400]} />
                    <Text style={styles.timeText}>{item.horario}</Text>
                  </View>

                  <View
                    style={[
                      styles.cuposBadge,
                      {
                        backgroundColor: isLleno
                          ? 'rgba(239, 68, 68, 0.12)'
                          : cuposLibres <= 2
                          ? 'rgba(245, 158, 11, 0.12)'
                          : 'rgba(16, 185, 129, 0.12)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.cuposText,
                        {
                          color: isLleno
                            ? '#f87171'
                            : cuposLibres <= 2
                            ? '#fbbf24'
                            : tokens.colors.primary[400],
                        },
                      ]}
                    >
                      {isLleno ? 'Lleno' : `${item.cupoOcupado}/${item.cupoTotal} insc.`}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.classTitle}>{item.nombre}</Text>

                  <View style={styles.metaRow}>
                    <MapPin size={11} color={tokens.colors.text.muted} />
                    <Text style={styles.metaText}>{item.sala}</Text>
                    <Text style={styles.dot}>•</Text>
                    <User size={11} color={tokens.colors.accent.cyan} />
                    <Text style={[styles.metaText, { color: tokens.colors.accent.cyan }]}>
                      {item.instructor}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.manageHint}>Ver inscriptos y asistencia</Text>
                  <ChevronRight size={14} color={tokens.colors.primary[400]} />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyCard}>
            <Clock size={28} color={tokens.colors.text.muted} />
            <Text style={styles.emptyTitle}>No hay clases los días {selectedDayTab}.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  dayTabsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dayTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  dayTabBtnInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  dayTabBtnActive: {
    backgroundColor: tokens.colors.primary[500],
    borderColor: tokens.colors.primary[500],
  },
  dayName: {
    fontSize: 12,
    fontWeight: '800',
  },
  countBadge: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 9999,
  },
  countText: {
    fontSize: 10,
    fontWeight: '800',
  },
  cardsList: {
    gap: 10,
  },
  classCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    borderLeftWidth: 4,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: tokens.colors.surface.elevated,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  cuposBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  cuposText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  cardBody: {
    gap: 4,
  },
  classTitle: {
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
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    paddingTop: 8,
  },
  manageHint: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  emptyCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 13,
    color: tokens.colors.text.secondary,
  },
});

export default WeeklyScheduleGrid;
