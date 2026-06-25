// Powered by OnSpace.AI
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';

type Variant = 'primary' | 'accent' | 'outline' | 'premium';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const GRADIENTS: Record<Exclude<Variant, 'outline'>, [string, string]> = {
  primary: [colors.primaryLight, colors.primary],
  accent: [colors.accent, colors.accentDark],
  premium: [colors.premiumLight, colors.premium],
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  fullWidth = true,
  icon,
  style,
}: ButtonProps) {
  const isOutline = variant === 'outline';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      hitSlop={6}
      style={({ pressed }) => [
        fullWidth && { alignSelf: 'stretch' },
        { borderRadius: radius.md, opacity: isDisabled ? 0.55 : pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
        !isOutline && (shadow.sm as object),
        style,
      ]}
    >
      {isOutline ? (
        <Text style={[styles.inner, styles.outline, styles.outlineText]}>
          {icon}
          {icon ? '  ' : ''}
          {title}
        </Text>
      ) : (
        <LinearGradient
          colors={GRADIENTS[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inner}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} />
          ) : (
            <Text style={styles.label}>
              {icon}
              {icon ? '  ' : ''}
              {title}
            </Text>
          )}
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inner: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
  label: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    includeFontPadding: false,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  outlineText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    includeFontPadding: false,
  },
});
