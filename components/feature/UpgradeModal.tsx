// Powered by OnSpace.AI
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { PREMIUM_PRICE_ETB } from '@/services/coursesData';
import { billingService } from '@/services/billingService';
import { Button } from '../ui/Button';

interface UpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export function UpgradeModal({ visible, onClose, onUnlocked }: UpgradeModalProps) {
  const [paymentStarted, setPaymentStarted] = useState(false);

  const handlePay = async () => {
    await billingService.payWithTelebirr();
    setPaymentStarted(true);
  };

  const handleConfirm = () => {
    setPaymentStarted(false);
    onUnlocked();
  };

  const handleClose = () => {
    setPaymentStarted(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill as object} onPress={handleClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <LinearGradient
            colors={[colors.premiumLight, colors.premium]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.crown}
          >
            <MaterialIcons name="workspace-premium" size={34} color={colors.surfaceDeep} />
          </LinearGradient>

          <Text style={styles.title}>AbuLearn Premium</Text>
          <Text style={styles.price}>{PREMIUM_PRICE_ETB} ETB</Text>

          <Text style={styles.instruction}>
            To unlock AbuLearn Premium, please pay {PREMIUM_PRICE_ETB} ETB via Telebirr.
          </Text>

          <View style={styles.perks}>
            {[
              'Full access to all premium courses',
              'Advanced lessons and frameworks',
              'Earn exclusive completion badges',
            ].map((p) => (
              <View key={p} style={styles.perkRow}>
                <MaterialIcons name="check-circle" size={18} color={colors.accent} />
                <Text style={styles.perkText}>{p}</Text>
              </View>
            ))}
          </View>

          {!paymentStarted ? (
            <Button
              title="Pay with Telebirr"
              variant="premium"
              icon={<MaterialIcons name="smartphone" size={20} color={colors.surfaceDeep} />}
              onPress={handlePay}
            />
          ) : (
            <View style={styles.confirmBox}>
              <Text style={styles.confirmHint}>
                After completing the Telebirr payment, tap below to unlock your premium access.
              </Text>
              <Button
                title="I have completed payment"
                variant="accent"
                icon={<MaterialIcons name="verified" size={20} color={colors.textInverse} />}
                onPress={handleConfirm}
              />
            </View>
          )}

          <Pressable onPress={handleClose} style={styles.cancel} hitSlop={8}>
            <Text style={styles.cancelText}>Maybe later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
    ...(shadow.lg as object),
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  crown: {
    width: 68,
    height: 68,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    includeFontPadding: false,
  },
  price: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.premium,
    marginTop: spacing.xs,
  },
  instruction: {
    fontSize: fontSize.md,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  perks: {
    alignSelf: 'stretch',
    gap: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  perkText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
  confirmBox: {
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
  confirmHint: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: 20,
  },
  cancel: {
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  cancelText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontWeight: fontWeight.semibold,
  },
});
