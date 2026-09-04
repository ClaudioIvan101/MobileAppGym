import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dayPassService } from '../services/dayPassService';

export const CAJA_ESTADO_KEY = ['caja', 'estado'];
export const TARIFAS_PASES_KEY = ['pases-diarios', 'tarifas'];

/**
 * Hook para el flujo y operación atómica de Venta de Pase Diario
 */
export const useDayPassSale = () => {
  const queryClient = useQueryClient();

  // Estados del Formulario
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedTarifaId, setSelectedTarifaId] = useState('pase-musculacion');
  const [medioPago, setMedioPago] = useState('EFECTIVO');
  const [puntoAcceso, setPuntoAcceso] = useState('Torniquete Principal (Entrada A)');
  const [isExistingPerson, setIsExistingPerson] = useState(false);
  const [existingPersonaData, setExistingPersonaData] = useState(null);
  const [saleResult, setSaleResult] = useState(null);
  const [isOpenCajaModalOpen, setIsOpenCajaModalOpen] = useState(false);

  // 1. Consulta de Estado de Caja Diaria
  const cajaQuery = useQuery({
    queryKey: CAJA_ESTADO_KEY,
    queryFn: dayPassService.getCajaEstado,
    staleTime: 1000 * 30,
  });

  // 2. Consulta de Tarifas Vigentes
  const tarifasQuery = useQuery({
    queryKey: TARIFAS_PASES_KEY,
    queryFn: dayPassService.getTarifas,
    staleTime: 1000 * 60 * 5,
  });

  // 3. Búsqueda automática por DNI
  const cleanDni = dni.replace(/\D/g, '');
  const dniSearchQuery = useQuery({
    queryKey: ['pases-diarios', 'buscar-dni', cleanDni],
    queryFn: () => dayPassService.buscarPorDni(cleanDni),
    enabled: cleanDni.length >= 7,
    staleTime: 1000 * 30,
  });

  // Autocompletar datos cuando se encuentra una persona
  useEffect(() => {
    if (dniSearchQuery.data?.existe && dniSearchQuery.data.persona) {
      const p = dniSearchQuery.data.persona;
      setNombre(p.nombre || '');
      setApellido(p.apellido || '');
      setEmail(p.email || '');
      setTelefono(p.telefono || '');
      setIsExistingPerson(true);
      setExistingPersonaData(p);
    } else if (dniSearchQuery.data && !dniSearchQuery.data.existe) {
      setIsExistingPerson(false);
      setExistingPersonaData(null);
    }
  }, [dniSearchQuery.data]);

  // Mutación: Abrir Caja
  const abrirCajaMutation = useMutation({
    mutationFn: (montoInicial) => dayPassService.abrirCaja(montoInicial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAJA_ESTADO_KEY });
      setIsOpenCajaModalOpen(false);
    },
  });

  // Mutación: Venta Atómica
  const venderPaseMutation = useMutation({
    mutationFn: (payload) => dayPassService.venderPaseAtomico(payload),
    onSuccess: (data) => {
      setSaleResult(data);
      queryClient.invalidateQueries({ queryKey: CAJA_ESTADO_KEY });
    },
  });

  const selectedTarifa = tarifasQuery.data?.find((t) => t.id === selectedTarifaId) || tarifasQuery.data?.[0];
  const isCajaAbierta = cajaQuery.data?.isAbierta ?? false;

  const canSubmit = Boolean(
    isCajaAbierta &&
      selectedTarifa &&
      cleanDni.length >= 7 &&
      nombre.trim().length >= 2 &&
      !venderPaseMutation.isPending
  );

  const handleResetForm = () => {
    setDni('');
    setNombre('');
    setApellido('');
    setEmail('');
    setTelefono('');
    setIsExistingPerson(false);
    setExistingPersonaData(null);
    setSaleResult(null);
  };

  return {
    caja: cajaQuery.data,
    cajaData: cajaQuery.data,
    isCajaLoading: cajaQuery.isLoading,
    isCajaAbierta,
    tarifas: tarifasQuery.data || [],
    isTarifasLoading: tarifasQuery.isLoading,
    selectedTarifa,
    selectedTarifaId,
    setSelectedTarifaId,
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
    medioPago,
    setMedioPago,
    paymentMethod: medioPago,
    setPaymentMethod: setMedioPago,
    puntoAcceso,
    setPuntoAcceso,
    isExistingPerson,
    existingPersonaData,
    isSearchingDni: dniSearchQuery.isLoading,
    abrirCaja: abrirCajaMutation.mutate,
    isOpeningCaja: abrirCajaMutation.isPending,
    venderPase: venderPaseMutation.mutate,
    isSelling: venderPaseMutation.isPending,
    isSubmitting: venderPaseMutation.isPending,
    canSubmit,
    saleResult,
    clearSaleResult: handleResetForm,
    isOpenCajaModalOpen,
    setIsOpenCajaModalOpen,
  };
};

export default useDayPassSale;
