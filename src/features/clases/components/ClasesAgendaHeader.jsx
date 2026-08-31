import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Button } from '../../../components/Button';
import { Calendar, Plus } from 'lucide-react-native';

/**
 * Header de la Agenda de Clases universal para React Native
 */
export const ClasesAgendaHeader = ({
  onOpenScheduleModal,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleRow}>
        <View style={styles.iconCircle}>
          <Calendar size={18} color={tokens.colors.primary[400]} />
        </View>
        <View>
          <Text style={styles.subtitle}>GESTIÓN Y PROGRAMACIÓN</Text>
          <Text style={styles.title}>Agenda Semanal</Text>
        </View>
      </View>

      <Button
        variant="primary"
        size="sm"
        icon={Plus}
        onPress={onOpenScheduleModal}
      >
        Programar Clase
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
});

export default ClasesAgendaHeader;
