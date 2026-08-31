import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

/**
 * Status Badge Pill Component universal para React Native
 * Variantes: 'active' (🟢 Activo), 'expiring' (🟡 Por vencer), 'inactive' (🔴 Inactivo), 'info'
 */
export const Badge = ({
  variant = 'active',
  children,
  size = 'md',
  showDot = true,
  style = {},
  textStyle = {},
}) => {
  const statusConfig = tokens.colors.status[variant] || {
    bg: 'rgba(100, 116, 139, 0.15)',
    border: '#64748b',
    text: '#cbd5e1',
    dot: '#94a3b8',
    label: typeof children === 'string' ? children : 'Estado',
  };

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: isSmall ? 2 : 4,
          paddingHorizontal: isSmall ? 8 : 12,
          backgroundColor: statusConfig.bg,
          borderColor: statusConfig.border,
        },
        style,
      ]}
    >
      {showDot && (
        <View
          style={[
            styles.dot,
            {
              width: isSmall ? 6 : 8,
              height: isSmall ? 6 : 8,
              borderRadius: isSmall ? 3 : 4,
              backgroundColor: statusConfig.dot,
            },
          ]}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            fontSize: isSmall ? 11 : 13,
            color: statusConfig.text,
          },
          textStyle,
        ]}
      >
        {children || statusConfig.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    gap: 6,
    alignSelf: 'flex-start',
  },
  dot: {
    flexShrink: 0,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default Badge;
