import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

/**
 * Skeleton Loader universal para React Native
 */
export const Skeleton = ({
  variant = 'rect',
  width = '100%',
  height = 20,
  radius = 'md',
  style = {},
}) => {
  const getBorderRadius = () => {
    if (variant === 'circle') return 9999;
    if (variant === 'text') return 4;
    return typeof radius === 'number' ? radius : 8;
  };

  const parsedHeight = typeof height === 'string' ? parseInt(height, 10) || 20 : height;

  return (
    <View
      style={[
        styles.skeleton,
        {
          width: variant === 'circle' ? parsedHeight : width,
          height: parsedHeight,
          borderRadius: getBorderRadius(),
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: tokens.colors.surface.cardHover,
    opacity: 0.6,
  },
});

export default Skeleton;
