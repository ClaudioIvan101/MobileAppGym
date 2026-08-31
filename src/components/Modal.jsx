import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { tokens } from '../theme/tokens';
import { X } from 'lucide-react-native';

/**
 * Universal Fit-Tech Modal Component para React Native
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null;

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.modalCard}
          onPress={(e) => e.stopPropagation?.()}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              {title && <Text style={styles.titleText}>{title}</Text>}
              {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color={tokens.colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Body Content */}
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 13, 20, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: tokens.colors.surface.elevated,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: tokens.colors.surface.borderHighlight,
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.surface.border,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: tokens.colors.text.primary,
  },
  subtitleText: {
    fontSize: 13,
    color: tokens.colors.text.secondary,
    marginTop: 3,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
  },
  bodyContent: {
    padding: 20,
  },
});

export default Modal;
