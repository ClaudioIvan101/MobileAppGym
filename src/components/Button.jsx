import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

/**
 * Universal React Native Button Component
 * Soporta variantes: 'primary' (Emerald), 'secondary', 'outline', 'ghost', 'danger'
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onPress,
  style = {},
  textStyle = {},
  ...props
}) => {

  // Configuración de tamaños
  const sizeStyles = {
    sm: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      minHeight: 34,
    },
    md: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      minHeight: 44,
    },
    lg: {
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: 12,
      minHeight: 52,
    },
  }[size] || {};

  const fontSizes = {
    sm: 13,
    md: 14,
    lg: 16,
  }[size] || 14;

  // Configuración de variantes visuales
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: tokens.colors.primary[500],
            borderWidth: 1,
            borderColor: 'transparent',
          },
          text: {
            color: tokens.colors.surface.background,
            fontWeight: '700',
          },
          iconColor: tokens.colors.surface.background,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: tokens.colors.surface.elevated,
            borderWidth: 1,
            borderColor: tokens.colors.surface.borderHighlight,
          },
          text: {
            color: tokens.colors.text.primary,
            fontWeight: '600',
          },
          iconColor: tokens.colors.text.primary,
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: tokens.colors.primary[500],
          },
          text: {
            color: tokens.colors.primary[400],
            fontWeight: '600',
          },
          iconColor: tokens.colors.primary[400],
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'transparent',
          },
          text: {
            color: tokens.colors.text.secondary,
            fontWeight: '500',
          },
          iconColor: tokens.colors.text.secondary,
        };
      case 'danger':
        return {
          container: {
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderWidth: 1,
            borderColor: 'rgba(239, 68, 68, 0.4)',
          },
          text: {
            color: '#f87171',
            fontWeight: '600',
          },
          iconColor: '#f87171',
        };
      default:
        return {
          container: {},
          text: {},
          iconColor: tokens.colors.text.primary,
        };
    }
  };

  const currentVariant = getVariantStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base,
        sizeStyles,
        currentVariant.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? tokens.colors.surface.background : tokens.colors.primary[500]}
        />
      ) : (
        <View style={styles.contentRow}>
          {Icon && iconPosition === 'left' && (
            <Icon
              size={size === 'sm' ? 15 : 18}
              color={currentVariant.iconColor}
              style={styles.iconLeft}
            />
          )}
          {typeof children === 'string' ? (
            <Text
              style={[
                styles.textBase,
                { fontSize: fontSizes },
                currentVariant.text,
                textStyle,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {Icon && iconPosition === 'right' && (
            <Icon
              size={size === 'sm' ? 15 : 18}
              color={currentVariant.iconColor}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  textBase: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 2,
  },
  iconRight: {
    marginLeft: 2,
  },
});

export default Button;
