import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

/**
 * Universal Fit-Tech Card Component para React Native
 */
export const Card = ({
  children,
  radius = 'lg',
  glow = false,
  glowColor = tokens.colors.primary.glow,
  interactive = false,
  glass = false,
  padding = 16,
  style = {},
  onPress,
  ...props
}) => {
  const borderRadius = typeof radius === 'number' ? radius : radius === 'sm' ? 8 : radius === 'lg' ? 16 : radius === 'xl' ? 24 : 12;

  const cardStyle = {
    backgroundColor: glass ? tokens.colors.surface.glass : tokens.colors.surface.card,
    borderRadius,
    padding: typeof padding === 'string' ? parseInt(padding, 10) || 16 : padding,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    overflow: 'hidden',
  };

  if (interactive || onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[cardStyle, style]}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;
