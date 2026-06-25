// Powered by OnSpace.AI
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

interface BadgeChipProps {
  label: string;
  earned?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  description?: string;
}

export function BadgeChip({ label, earned = false, icon = 'emoji-events', description }: BadgeChipProps) {
  return (
    <View style={[styles.card, earned ? styles.earned : styles.locked]}>
      <View style={[styles.iconWrap, earned ? styles.iconEarned : styles.iconLocked]}>
        <MaterialIcons
          name={earned ? icon : 'lock'}
          size={26}
          color={earned ? colors.textInverse : colors.textMuted}
        />
      </View>
      <Text style={[styles.label, !earned && styles.lockedText]} numberOfLines={1}>
        {label}
      </Text>
      {description ? (
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  earned: {
    backgroundColor: colors.surface,
    borderColor: colors.premiumLight,
  },
  locked: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconEarned: {
    backgroundColor: colors.premium,
  },
  iconLocked: {
    backgroundColor: colors.border,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
    includeFontPadding: false,
    textAlign: 'center',
  },
  lockedText: {
    color: colors.textMuted,
  },
  desc: {
    fontSize: fontSize.xs,
    color: colors.textSubtle,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 16,
  },
});
