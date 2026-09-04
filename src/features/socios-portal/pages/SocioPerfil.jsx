import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../../theme/tokens';
import { useSocioPerfil } from '../hooks/useSocioPerfil';
import { ProfileAvatarUpload } from '../components/ProfileAvatarUpload';
import { PersonalDataForm } from '../components/PersonalDataForm';
import { MedicalCertificateCard } from '../components/MedicalCertificateCard';
import { SecurityPasswordForm } from '../components/SecurityPasswordForm';
import { ThemeAppearanceCard } from '../components/ThemeAppearanceCard';
import { Button } from '../../../components/Button';
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from 'lucide-react-native';

/**
 * Pantalla de Perfil del Socio universal para React Native
 */
export const SocioPerfil = ({
  onBack = () => console.log('Volver'),
  onLogout = () => console.log('Cerrar Sesión'),
}) => {
  const [toastMessage, setToastMessage] = useState(null);

  const {
    perfil,
    isLoading,
    isError,
    refetch,
    updatePerfil,
    isUpdatingPerfil,
    updateAvatar,
    isUpdatingAvatar,
    uploadCertificado,
    isUploadingCertificado,
    cambiarPassword,
    isChangingPassword,
    theme,
    toggleTheme,
  } = useSocioPerfil();

  const handleSavePersonalData = (formData) => {
    updatePerfil(formData, {
      onSuccess: () => {
        setToastMessage('¡Datos personales actualizados!');
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('Error al actualizar datos personales.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  const handleAvatarChange = (newAvatarUrl) => {
    updateAvatar(newAvatarUrl, {
      onSuccess: () => {
        setToastMessage('¡Foto de perfil actualizada!');
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('Error al subir la nueva foto.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  const handleUploadCertificado = (file) => {
    uploadCertificado(file, {
      onSuccess: () => {
        setToastMessage('¡Certificado médico subido!');
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('Error al subir el certificado.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  const handleChangePassword = (payload, options) => {
    cambiarPassword(payload, {
      onSuccess: () => {
        setToastMessage('¡Contraseña actualizada con éxito!');
        options?.onSuccess?.();
        setTimeout(() => setToastMessage(null), 4000);
      },
      onError: () => {
        setToastMessage('Error al cambiar la contraseña.');
        setTimeout(() => setToastMessage(null), 4000);
      },
    });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeContainer}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={18} color={tokens.colors.text.primary} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>CONFIGURACIÓN</Text>
            <Text style={styles.headerTitle}>Mi Perfil</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => refetch()}
          activeOpacity={0.7}
        >
          <RefreshCw size={16} color={tokens.colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Toast Feedback */}
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Alerta de Error */}
      {isError && (
        <View style={styles.errorAlert}>
          <AlertCircle size={18} color="#f87171" />
          <View style={styles.errorTextCol}>
            <Text style={styles.errorTitle}>Error al sincronizar</Text>
            <Text style={styles.errorSub}>No pudimos cargar los datos de tu cuenta.</Text>
          </View>
          <Button variant="outline" size="sm" onPress={() => refetch()}>
            Reintentar
          </Button>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Avatar & Nombre */}
        <ProfileAvatarUpload
          avatarUrl={perfil?.avatarUrl}
          nombreCompleto={perfil?.nombreCompleto}
          socioId={perfil?.id}
          onAvatarChange={handleAvatarChange}
          isUpdating={isUpdatingAvatar}
          isLoading={isLoading}
        />

        {/* 2. Datos Personales */}
        <PersonalDataForm
          perfil={perfil}
          onSave={handleSavePersonalData}
          isLoading={isUpdatingPerfil}
        />

        {/* 3. Certificado Médico */}
        <MedicalCertificateCard
          certificadoMedico={perfil?.certificadoMedico}
          onUploadCertificado={handleUploadCertificado}
          isUploading={isUploadingCertificado}
        />

        {/* 4. Seguridad & Contraseña */}
        <SecurityPasswordForm
          onChangePassword={handleChangePassword}
          isLoading={isChangingPassword}
        />

        {/* 5. Tema */}
        <ThemeAppearanceCard
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* 6. Cerrar Sesión */}
        <Button
          variant="danger"
          fullWidth
          icon={LogOut}
          onPress={onLogout}
        >
          Cerrar Sesión
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: tokens.colors.surface.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#090D14',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: tokens.colors.surface.card,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: tokens.colors.surface.card,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  toast: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: tokens.colors.surface.elevated,
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 100,
  },
  toastText: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  errorAlert: {
    margin: 16,
    padding: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  errorTextCol: {
    flex: 1,
  },
  errorTitle: {
    color: '#f87171',
    fontSize: 13,
    fontWeight: '700',
  },
  errorSub: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
});

export default SocioPerfil;
