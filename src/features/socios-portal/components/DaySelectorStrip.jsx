import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Calendar } from 'lucide-react-native';

/**
 * Selector Horizontal de Días de la Semana universal para React Native
 */
export const DaySelectorStrip = ({
  selectedDate,
  onSelectDate,
}) => {
  const weekDays = [
    { dayName: 'LUN', dayNumber: '31', fullDate: '2026-08-31', isToday: true },
    { dayName: 'MAR', dayNumber: '01', fullDate: '2026-09-01', isToday: false },
    { dayName: 'MIÉ', dayNumber: '02', fullDate: '2026-09-02', isToday: false },
    { dayName: 'JUE', dayNumber: '03', fullDate: '2026-09-03', isToday: false },
    { dayName: 'VIE', dayNumber: '04', fullDate: '2026-09-04', isToday: false },
    { dayName: 'SÁB', dayNumber: '05', fullDate: '2026-09-05', isToday: false },
    { dayName: 'DOM', dayNumber: '06', fullDate: '2026-09-06', isToday: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.monthTag}>
          <Calendar size={13} color={tokens.colors.primary[400]} />
          <Text style={styles.monthText}>Agosto - Septiembre 2026</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stripScrollContainer}
      >
        {weekDays.map((day) => {
          const isSelected = day.fullDate === selectedDate;
          return (
            <TouchableOpacity
              key={day.fullDate}
              onPress={() => onSelectDate(day.fullDate)}
              activeOpacity={0.8}
              style={[
                styles.dayButton,
                isSelected ? styles.dayButtonActive : styles.dayButtonInactive,
              ]}
            >
              {day.isToday && (
                <View style={styles.todayIndicator}>
                  <Text style={styles.todayText}>Hoy</Text>
                </View>
              )}
              <Text
                style={[
                  styles.dayName,
                  { color: isSelected ? tokens.colors.surface.background : tokens.colors.text.secondary },
                ]}
              >
                {day.dayName}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  { color: isSelected ? tokens.colors.surface.background : tokens.colors.text.primary },
                ]}
              >
                {day.dayNumber}
              </Text>

              {isSelected && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    paddingHorizontal: 4,
  },
  monthTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  monthText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
  },
  stripScrollContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 6,
  },
  dayButton: {
    minWidth: 54,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    position: 'relative',
  },
  dayButtonInactive: {
    backgroundColor: tokens.colors.surface.card,
    borderColor: tokens.colors.surface.border,
  },
  dayButtonActive: {
    backgroundColor: tokens.colors.primary[500],
    borderColor: tokens.colors.primary[400],
  },
  todayIndicator: {
    position: 'absolute',
    top: -6,
    backgroundColor: tokens.colors.accent.cyan,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 9999,
  },
  todayText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#090D14',
  },
  dayName: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '800',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: tokens.colors.surface.background,
    marginTop: 2,
  },
});

export default DaySelectorStrip;
