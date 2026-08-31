import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Moon, Sun } from 'lucide-react-native';

/**
 * Tarjeta de Preferencias de Tema Visual universal para React Native
 */
export const ThemeAppearanceCard = ({
  theme = 'dark',
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          {isDark ? (
            <Moon size={16} color={tokens.colors.primary[400]} />
          ) : (
            <Sun size={16} color="#fbbf24" />
          )}
        </View>
        <View style={styles.headerTextCol}>
          <Text style={styles.title}>Apariencia</Text>
          <Text style={styles.subtitle}>Personaliza el contraste visual</Text>
        </View>
      </View>

      <View style={styles.optionsGrid}>
        {/* Opción Dark Mode */}
        <TouchableOpacity
          style={[
            styles.themeOptionBtn,
            isDark ? styles.themeOptionActive : styles.themeOptionInactive,
          ]}
          onPress={() => {
            if (!isDark && onToggleTheme) onToggleTheme();
          }}
          activeOpacity={0.8}
        >
          <Moon size={18} color={isDark ? tokens.colors.primary[400] : tokens.colors.text.secondary} />
          <View style={styles.themeInfo}>
            <Text style={[styles.themeTitle, { color: isDark ? tokens.colors.primary[400] : tokens.colors.text.primary }]}>
              Modo Oscuro
            </Text>
            <Text style={styles.themeSub}>Fit-Tech Emerald</Text>
          </View>
        </TouchableOpacity>

        {/* Opción Light Mode */}
        <TouchableOpacity
          style={[
            styles.themeOptionBtn,
            !isDark ? styles.themeOptionActive : styles.themeOptionInactive,
          ]}
          onPress={() => {
            if (isDark && onToggleTheme) onToggleTheme();
          }}
          activeOpacity={0.8}
        >
          <Sun size={18} color={!isDark ? tokens.colors.primary[400] : tokens.colors.text.secondary} />
          <View style={styles.themeInfo}>
            <Text style={[styles.themeTitle, { color: !isDark ? tokens.colors.primary[400] : tokens.colors.text.primary }]}>
              Modo Claro
            </Text>
            <Text style={styles.themeSub}>Alto brillo diurno</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
  optionsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOptionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  themeOptionInactive: {
    backgroundColor: tokens.colors.surface.elevated,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  themeOptionActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: tokens.colors.primary[500],
  },
  themeInfo: {
    flex: 1,
    gap: 2,
  },
  themeTitle: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  themeSub: {
    fontSize: 10.5,
    color: tokens.colors.text.secondary,
  },
});

export default ThemeAppearanceCard;
