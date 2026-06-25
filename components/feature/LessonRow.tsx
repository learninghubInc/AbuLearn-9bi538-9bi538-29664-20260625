// Powered by OnSpace.AI
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';

interface LessonRowProps {
  index: number;
  title: string;
  summary: string;
  percent: number;
  onPress: () => void;
}

function LessonRowBase({ index, title, summary, percent, onPress }: LessonRowProps) {
  const done = percent >= 100;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }]}
    >
      <View style={[styles.badge, done ? styles.badgeDone : styles.badgeDefault]}>
        {done ? (
          <MaterialIcons name="check" size={20} color={colors.textInverse} />
        ) : (
          <Text style={styles.badgeNum}>{index}</Text>
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.summary} numberOfLines={1}>{summary}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.textMuted} />
    </Pressable>
  );
}

export const LessonRow = memo(LessonRowBase);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    ...(shadow.sm as object),
  },
  badge: { width: 40, height: 40, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
  badgeDefault: { backgroundColor: colors.surfaceAlt },
  badgeDone: { backgroundColor: colors.success },
  badgeNum: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.primary },
  body: { flex: 1 },
  title: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.text },
  summary: { fontSize: fontSize.sm, color: colors.textSubtle, marginTop: 2 },
});
