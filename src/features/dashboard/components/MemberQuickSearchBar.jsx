import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { tokens } from '../../../theme/tokens';
import { Badge } from '../../../components/Badge';
import { Search, ArrowUpRight, X, User } from 'lucide-react-native';

/**
 * Barra de Búsqueda Rápida de Socios universal para React Native
 */
export const MemberQuickSearchBar = ({
  value,
  onChange,
  results = [],
  isLoading = false,
  onSelectMember,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (member) => {
    if (onSelectMember) {
      onSelectMember(member);
    }
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Search size={16} color={tokens.colors.text.secondary} />
        <TextInput
          value={value}
          onChangeText={(text) => {
            onChange(text);
            setIsOpen(text.trim().length >= 2);
          }}
          placeholder="Buscar socio por Nombre, DNI o N° Carnet..."
          placeholderTextColor={tokens.colors.text.muted}
          style={styles.input}
        />
        {value ? (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              onChange('');
              setIsOpen(false);
            }}
          >
            <X size={14} color={tokens.colors.text.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Resultados */}
      {isOpen && value.trim().length >= 2 ? (
        <View style={styles.dropdown}>
          {results.length > 0 ? (
            <View style={styles.resultsList}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderText}>{results.length} socios encontrados</Text>
              </View>
              {results.map((member) => (
                <TouchableOpacity
                  key={member.id}
                  onPress={() => handleSelect(member)}
                  activeOpacity={0.75}
                  style={styles.resultItem}
                >
                  <Image
                    source={{
                      uri:
                        member.foto ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                    }}
                    style={styles.avatarImg}
                  />

                  <View style={styles.infoCol}>
                    <View style={styles.nameRow}>
                      <Text style={styles.memberName}>{member.nombreCompleto}</Text>
                      <Badge
                        variant={member.estado === 'active' ? 'active' : member.estado === 'expiring' ? 'expiring' : 'inactive'}
                        size="sm"
                      />
                    </View>

                    <View style={styles.metaRow}>
                      <Text style={styles.metaText}>DNI: {member.dni}</Text>
                      <Text style={styles.metaText}>•</Text>
                      <Text style={styles.planText}>{member.plan}</Text>
                    </View>
                  </View>

                  <ArrowUpRight size={15} color={tokens.colors.primary[400]} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noResultsBox}>
              <User size={18} color={tokens.colors.text.muted} />
              <Text style={styles.noResultsText}>No se encontraron socios.</Text>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    gap: 10,
  },
  input: {
    flex: 1,
    color: tokens.colors.text.primary,
    fontSize: 13,
    padding: 0,
  },
  clearBtn: {
    padding: 2,
  },
  dropdown: {
    backgroundColor: tokens.colors.surface.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: tokens.colors.surface.border,
    marginTop: 6,
    overflow: 'hidden',
  },
  dropdownHeader: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
  },
  dropdownHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: tokens.colors.text.muted,
    textTransform: 'uppercase',
  },
  resultsList: {
    gap: 2,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  avatarImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberName: {
    fontSize: 13,
    fontWeight: '700',
    color: tokens.colors.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: tokens.colors.text.secondary,
  },
  planText: {
    fontSize: 11,
    color: tokens.colors.primary[400],
    fontWeight: '600',
  },
  noResultsBox: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  noResultsText: {
    fontSize: 12,
    color: tokens.colors.text.secondary,
  },
});

export default MemberQuickSearchBar;
