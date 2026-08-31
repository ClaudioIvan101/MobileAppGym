import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Camera } from 'lucide-react-native';

/**
 * Componente de Foto / Avatar de Perfil universal para React Native
 */
export const ProfileAvatarUpload = ({
  avatarUrl,
  nombreCompleto = 'Alejandro Silva',
  socioId = 'SF-8842',
  onAvatarChange,
  isUpdating = false,
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri:
              avatarUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
          }}
          style={styles.avatarImage}
        />

        {/* Botón de Cámara Flotante */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => onAvatarChange && onAvatarChange('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80')}
          activeOpacity={0.8}
        >
          <Camera size={15} color="#090D14" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCol}>
        <Text style={styles.name}>{nombreCompleto}</Text>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>Socio N° {socioId}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  avatarWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: tokens.colors.primary[500],
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: tokens.colors.primary[400],
    borderWidth: 2,
    borderColor: tokens.colors.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    alignItems: 'center',
    gap: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  idBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  idText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
});

export default ProfileAvatarUpload;
