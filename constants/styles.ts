// Powered by OnSpace.AI
// Reusable style patterns
import { StyleSheet } from 'react-native';
import { colors, radius, spacing, fontSize, fontWeight, shadow } from './theme';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex1: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...(shadow.sm as object),
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    includeFontPadding: false,
  },
  bodyText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    color: colors.textSubtle,
    lineHeight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
