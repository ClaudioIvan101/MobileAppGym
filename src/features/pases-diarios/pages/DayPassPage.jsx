import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { tokens } from '../../../theme/tokens';
import { useDayPassSale } from '../hooks/useDayPassSale';
import { CashRegisterGuardBanner } from '../components/CashRegisterGuardBanner';
import { VisitorDniLookupCard } from '../components/VisitorDniLookupCard';
import { DayPassTariffSelector } from '../components/DayPassTariffSelector';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { DayPassSuccessModal } from '../components/DayPassSuccessModal';
import { OpenCashRegisterModal } from '../components/OpenCashRegisterModal';
import { Button } from '../../../components/Button';
import {
  DollarSign,
  Ticket,
  CheckCircle2,
  Lock,
} from 'lucide-react-native';

/**
 * Pantalla de Venta de Pase Diario universal para React Native
 */
export const DayPassPage = () => {
  const [isOpenCajaModalVisible, setIsOpenCajaModalVisible] = useState(false);
  const [successModalData, setSuccessModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    dni,
    setDni,
    nombre,
    setNombre,
    apellido,
    setApellido,
    email,
    setEmail,
    telefono,
    setTelefono,
    isExistingPerson,
    selectedTarifaId,
    setSelectedTarifaId,
    tarifas,
    selectedTarifa,
    paymentMethod,
    setPaymentMethod,
    isCajaAbierta,
    cajaData,
    abrirCaja,
    isOpeningCaja,
    venderPase,
    isSubmitting,
    canSubmit,
  } = useDayPassSale();

  const handleConfirmOpenCaja = (montoInicial) => {
    abrirCaja(montoInicial, {
      onSuccess: () => {
        setIsOpenCajaModalVisible(false);
        setToastMessage('Caja abierta con éxito.');
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  const handleExecuteSale = () => {
    venderPase(null, {
      onSuccess: (result) => {
        setSuccessModalData(result);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <Ticket size={18} color={tokens.colors.primary[400]} />
          </View>
          <View>
            <Text style={styles.headerSubtitle}>MOSTRADOR • RECEPCIÓN</Text>
            <Text style={styles.headerTitle}>Venta de Pase Diario</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Caja */}
        <CashRegisterGuardBanner
          isCajaAbierta={isCajaAbierta}
          cajaData={cajaData}
          onOpenCaja={() => setIsOpenCajaModalVisible(true)}
        />

        {/* 1. Identificación */}
        <VisitorDniLookupCard
          dni={dni}
          onDniChange={setDni}
          nombre={nombre}
          onNombreChange={setNombre}
          apellido={apellido}
          onApellidoChange={setApellido}
          email={email}
          onEmailChange={setEmail}
          telefono={telefono}
          onTelefonoChange={setTelefono}
          isExistingPerson={isExistingPerson}
        />

        {/* 2. Tipo de Pase */}
        <DayPassTariffSelector
          tarifas={tarifas}
          selectedTarifaId={selectedTarifaId}
          onSelectTarifa={setSelectedTarifaId}
        />

        {/* 3. Método de Pago */}
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
        />

        {/* Botón de Venta */}
        <Button
          variant="primary"
          size="lg"
          icon={isCajaAbierta ? DollarSign : Lock}
          loading={isSubmitting}
          disabled={!canSubmit}
          onPress={handleExecuteSale}
          fullWidth
        >
          {isCajaAbierta
            ? `Cobrar ${selectedTarifa?.precioFormateado || '$ 4.500'} y Check-in`
            : 'Caja Cerrada (Abrir primero)'}
        </Button>
      </ScrollView>

      {/* Modales */}
      <DayPassSuccessModal
        isOpen={!!successModalData}
        onClose={() => setSuccessModalData(null)}
        saleResult={successModalData}
      />

      <OpenCashRegisterModal
        isOpen={isOpenCajaModalVisible}
        onClose={() => setIsOpenCajaModalVisible(false)}
        onConfirmOpen={handleConfirmOpenCaja}
        isLoading={isOpeningCaja}
      />
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
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: tokens.colors.primary[400],
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: tokens.colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  toast: {
    position: 'absolute',
    top: 50,
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
});

export default DayPassPage;
