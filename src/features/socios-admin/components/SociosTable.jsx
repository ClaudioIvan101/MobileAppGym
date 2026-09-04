import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import {
  Eye,
  CreditCard,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';

/**
 * Tabla / Lista de Socios universal para React Native
 */
export const SociosTable = ({
  socios = [],
  total = 0,
  page = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
  onViewProfile,
  onRegisterPayment,
  onAssignPlan,
  onToggleStatus,
}) => {
  return (
    <View style={styles.tableCard}>
      <View style={styles.list}>
        {socios.map((item) => {
          const isActive = item.planEstado === 'active';
          const isExpiring = item.planEstado === 'expiring';
          const isDeudor = item.planEstado === 'deudor';

          return (
            <View key={item.id} style={styles.socioItem}>
              {/* Header: Foto, Nombre, Estado */}
              <View style={styles.socioHeader}>
                <Image
                  source={{
                    uri:
                      item.foto ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                  }}
                  style={styles.avatarImg}
                />
                <View style={styles.infoCol}>
                  <Text style={styles.socioName}>{item.nombreCompleto}</Text>
                  <Text style={styles.socioDni}>DNI: {item.dni} • ID: {item.id}</Text>
                </View>
                <Badge
                  variant={isActive ? 'active' : isExpiring ? 'expiring' : isDeudor ? 'inactive' : 'inactive'}
                  size="sm"
                />
              </View>

              {/* Detalles */}
              <View style={styles.metaBox}>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Plan:</Text>
                  <Text style={styles.planName}>{item.planActual}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Vence:</Text>
                  <Text style={[styles.vencText, { color: isDeudor ? '#f87171' : isExpiring ? '#fbbf24' : tokens.colors.text.secondary }]}>
                    {item.fechaVencimiento}
                  </Text>
                </View>
              </View>

              {/* Acciones */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionBtnPrimary}
                  onPress={() => onViewProfile && onViewProfile(item)}
                  activeOpacity={0.75}
                >
                  <Eye size={13} color={tokens.colors.primary[400]} />
                  <Text style={styles.actionTextPrimary}>Ficha 360°</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnCyan}
                  onPress={() => onRegisterPayment && onRegisterPayment(item)}
                  activeOpacity={0.75}
                >
                  <CreditCard size={13} color={tokens.colors.accent.cyan} />
                  <Text style={styles.actionTextCyan}>Cobrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnAmber}
                  onPress={() => onAssignPlan && onAssignPlan(item)}
                  activeOpacity={0.75}
                >
                  <Layers size={13} color="#fbbf24" />
                  <Text style={styles.actionTextAmber}>Plan</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Paginación */}
      <View style={styles.paginationRow}>
        <Text style={styles.paginationInfo}>
          Página {page} de {totalPages} ({total} socios)
        </Text>

        <View style={styles.paginationBtns}>
          <TouchableOpacity
            style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
            onPress={() => page > 1 && onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft size={14} color={tokens.colors.text.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pageBtn, page >= totalPages && styles.pageBtnDisabled]}
            onPress={() => page < totalPages && onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight size={14} color={tokens.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableCard: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    overflow: 'hidden',
  },
  list: {
    gap: 8,
    padding: 12,
  },
  socioItem: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    gap: 8,
  },
  socioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  socioName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  socioDni: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  metaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 8,
    borderRadius: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 11,
    color: tokens.colors.text.muted,
  },
  planName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  vencText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    paddingVertical: 5,
    borderRadius: 6,
  },
  actionTextPrimary: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.primary[400],
  },
  actionBtnCyan: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: tokens.colors.accent.cyan,
    paddingVertical: 5,
    borderRadius: 6,
  },
  actionTextCyan: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.accent.cyan,
  },
  actionBtnAmber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: '#f59e0b',
    paddingVertical: 5,
    borderRadius: 6,
  },
  actionTextAmber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fbbf24',
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.surface.border,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  paginationInfo: {
    fontSize: 11.5,
    color: tokens.colors.text.secondary,
  },
  paginationBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  pageBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: tokens.colors.surface.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
});

export default SociosTable;
