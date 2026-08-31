import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { tokens } from '../../theme/tokens';
import { useRouter } from 'expo-router';
import {
  Dumbbell,
  Smartphone,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react-native';

const LOADING_STEPS = [
  'Inicializando núcleo Fit-Tech...',
  'Conectando control de accesos y torniquetes...',
  'Sincronizando membresías y agenda en tiempo real...',
  '¡Todo listo! Bienvenido a StrongFit.',
];

/**
 * Splash Screen Principal de Bienvenida y Selector de Portal para React Native
 */
export const SplashScreen = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        const next = prev + 5;
        if (next >= 75) setStepIndex(3);
        else if (next >= 50) setStepIndex(2);
        else if (next >= 25) setStepIndex(1);
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (route) => {
    router.replace(route);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {/* Logo y Branding */}
          <View style={styles.logoSection}>
            <View style={styles.iconCircleOuter}>
              <View style={styles.iconCircleInner}>
                <Dumbbell size={32} color={tokens.colors.primary[400]} />
              </View>
            </View>

            <Text style={styles.brandTitle}>
              STRONG<Text style={styles.brandAccent}>FIT</Text>
            </Text>

            <Text style={styles.brandTagline}>
              El Sistema Operativo para Gimnasios de Alto Rendimiento
            </Text>
          </View>

          {/* Barra de Progreso y Carga */}
          {!isLoaded ? (
            <View style={styles.loadingBox}>
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progress}%` },
                  ]}
                />
              </View>

              <View style={styles.loadingStatusRow}>
                <Text style={styles.loadingStepText}>
                  {LOADING_STEPS[stepIndex]}
                </Text>
                <Text style={styles.progressPercentText}>{progress}%</Text>
              </View>

              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => setIsLoaded(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.skipBtnText}>Saltar intro ➔</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Selector de Roles y Acceso Inmediato */
            <View style={styles.roleSelectionBox}>
              <Text style={styles.selectionTitle}>
                SELECCIONA TU EXPERIENCIA DE ACCESO:
              </Text>

              <View style={styles.rolesGrid}>
                {/* Tarjeta 1: Portal del Socio */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleNavigate('/(socio)/Home')}
                  style={[styles.roleCard, styles.roleCardSocio]}
                >
                  <View style={styles.roleHeaderRow}>
                    <View style={styles.roleIconBadgeEmerald}>
                      <Smartphone size={22} color={tokens.colors.primary[400]} />
                    </View>
                    <View style={styles.mobilePill}>
                      <Text style={styles.mobilePillText}>Mobile First</Text>
                    </View>
                  </View>

                  <View style={styles.roleInfo}>
                    <Text style={styles.roleTitle}>Portal del Socio</Text>
                    <Text style={styles.roleDesc}>
                      Pase digital QR, reservas de clases, estado de cuota, asistencias y perfil.
                    </Text>
                  </View>

                  <View style={styles.roleActionRow}>
                    <Text style={styles.actionTextEmerald}>Ingresar como Socio</Text>
                    <ArrowRight size={16} color={tokens.colors.primary[400]} />
                  </View>
                </TouchableOpacity>

                {/* Tarjeta 2: Panel de Administración y Staff */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleNavigate('/(admin)/Home')}
                  style={[styles.roleCard, styles.roleCardAdmin]}
                >
                  <View style={styles.roleHeaderRow}>
                    <View style={styles.roleIconBadgeCyan}>
                      <LayoutDashboard size={22} color={tokens.colors.accent.cyan} />
                    </View>
                    <View style={styles.desktopPill}>
                      <Text style={styles.desktopPillText}>Staff / Admin</Text>
                    </View>
                  </View>

                  <View style={styles.roleInfo}>
                    <Text style={styles.roleTitle}>Panel de Administración</Text>
                    <Text style={styles.roleDesc}>
                      Dashboard, Check-In, Kiosko, Ficha 360°, Pases Diarios, Agenda, Caja y Reportes.
                    </Text>
                  </View>

                  <View style={styles.roleActionRow}>
                    <Text style={styles.actionTextCyan}>Ingresar al Panel Staff</Text>
                    <ArrowRight size={16} color={tokens.colors.accent.cyan} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Footer de Versión */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              StrongFit OS v2.4.0 • Enterprise Edition
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentWrapper: {
    maxWidth: 480,
    width: '100%',
    alignItems: 'center',
    gap: 28,
  },
  logoSection: {
    alignItems: 'center',
    gap: 10,
  },
  iconCircleOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#111726',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  brandAccent: {
    color: '#10B981',
  },
  brandTagline: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 18,
  },
  loadingBox: {
    width: '100%',
    maxWidth: 380,
    gap: 12,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 9999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 9999,
  },
  loadingStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingStepText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  progressPercentText: {
    color: '#10B981',
    fontWeight: '800',
    fontSize: 13,
  },
  skipBtn: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  skipBtnText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  roleSelectionBox: {
    width: '100%',
    gap: 14,
  },
  selectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  rolesGrid: {
    gap: 14,
    width: '100%',
  },
  roleCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    gap: 12,
  },
  roleCardSocio: {
    borderColor: tokens.colors.primary[500],
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  roleCardAdmin: {
    borderColor: tokens.colors.accent.cyan,
    backgroundColor: 'rgba(6, 182, 212, 0.08)',
  },
  roleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roleIconBadgeEmerald: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleIconBadgeCyan: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobilePill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  mobilePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  desktopPill: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  desktopPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#06B6D4',
  },
  roleInfo: {
    gap: 4,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  roleDesc: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 17,
  },
  roleActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 10,
  },
  actionTextEmerald: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  actionTextCyan: {
    fontSize: 13,
    fontWeight: '700',
    color: '#06B6D4',
  },
  footer: {
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 11,
    color: '#475569',
  },
});

export default SplashScreen;
