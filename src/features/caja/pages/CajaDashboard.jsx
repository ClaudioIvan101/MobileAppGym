import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../../theme/tokens';
import { useCajaActual } from '../hooks/useCajaActual';
import { useCajaHistorial } from '../hooks/useCajaHistorial';
import { CajaStatusHero } from '../components/CajaStatusHero';
import { PaymentMethodBreakdown } from '../components/PaymentMethodBreakdown';
import { CajaMovementsList } from '../components/CajaMovementsList';
import { CajaHistoryTable } from '../components/CajaHistoryTable';
import { OpenCajaModal } from '../components/OpenCajaModal';
import { CloseCajaBlindModal } from '../components/CloseCajaBlindModal';
import { RegisterExpenseModal } from '../components/RegisterExpenseModal';
import { CheckCircle2 } from 'lucide-react-native';

/**
 * Pantalla Principal del Módulo de Caja universal para React Native
 */
export const CajaDashboard = () => {
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    caja,
    isAbierta,
    abrirCaja,
    isOpening,
    cerrarCaja,
    isClosing,
    registrarEgreso,
    isRegisteringExpense,
  } = useCajaActual();

  const {
    historial,
    exportarExcel,
  } = useCajaHistorial();

  const handleConfirmOpen = (payload) => {
    abrirCaja(payload, {
      onSuccess: () => {
        setIsOpenModalOpen(false);
        setToastMessage(`Caja abierta con fondo de $ ${payload.montoInicial.toLocaleString('es-AR')}.`);
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  const handleConfirmClose = (payload) => {
    cerrarCaja({
      ...payload,
      saldoInicial: caja?.saldoInicial ?? 0,
    }, {
      onSuccess: (resultado) => {
        setIsCloseModalOpen(false);
        setToastMessage(`Cierre realizado con éxito.`);
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  const handleConfirmExpense = (payload) => {
    registrarEgreso(payload, {
      onSuccess: () => {
        setIsExpenseModalOpen(false);
        setToastMessage(`Egreso de $ ${payload.monto.toLocaleString('es-AR')} registrado.`);
        setTimeout(() => setToastMessage(null), 3000);
      },
    });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeContainer}>
      {toastMessage && (
        <View style={styles.toast}>
          <CheckCircle2 size={16} color={tokens.colors.primary[400]} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Estado de Caja Actual */}
        <CajaStatusHero
          caja={caja}
          isAbierta={isAbierta}
          onOpenCaja={() => setIsOpenModalOpen(true)}
          onCloseCaja={() => setIsCloseModalOpen(true)}
          onRegisterExpense={() => setIsExpenseModalOpen(true)}
        />

        {/* 2. Desglose por Método de Pago */}
        {isAbierta && (
          <PaymentMethodBreakdown
            desglose={caja?.desglose}
            totalFacturado={caja?.totalFacturadoTurno}
          />
        )}

        {/* 3. Movimientos en Vivo */}
        {isAbierta && (
          <CajaMovementsList
            movimientos={caja?.movimientos}
          />
        )}

        {/* 4. Historial de Cierres Anteriores */}
        <CajaHistoryTable
          historial={historial}
          onExportExcel={exportarExcel}
        />
      </ScrollView>

      {/* Modales */}
      <OpenCajaModal
        isOpen={isOpenModalOpen}
        onClose={() => setIsOpenModalOpen(false)}
        onConfirmOpen={handleConfirmOpen}
        isLoading={isOpening}
      />

      <CloseCajaBlindModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirmClose={handleConfirmClose}
        isLoading={isClosing}
      />

      <RegisterExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onConfirmExpense={handleConfirmExpense}
        isLoading={isRegisteringExpense}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: tokens.colors.surface.background,
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

export default CajaDashboard;
