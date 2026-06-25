// Powered by OnSpace.AI
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { Course } from '@/services/types';
import { ProgressBar } from '../ui/ProgressBar';

interface CourseCardProps {
  course: Course;
  locked: boolean;
  percent: number;
  onPress: () => void;
}

function CourseCardBase({ course, locked, percent, onPress }: CourseCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.985 }] }]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: course.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={['transparent', 'rgba(15,33,103,0.85)']}
          style={StyleSheet.absoluteFill as object}
        />
        <View style={styles.levelTag}>
          <Text style={styles.levelText}>{course.level}</Text>
        </View>
        {locked ? (
          <View style={styles.lockBadge}>
            <MaterialIcons name="lock" size={16} color={colors.surfaceDeep} />
            <Text style={styles.lockText}>Premium</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {course.subtitle}
        </Text>

        <View style={styles.metaRow}>
          <MaterialIcons name="menu-book" size={15} color={colors.textMuted} />
          <Text style={styles.metaText}>{course.lessons.length} lessons</Text>
        </View>

        {locked ? (
          <View style={styles.unlockRow}>
            <MaterialIcons name="lock-open" size={16} color={colors.premium} />
            <Text style={styles.unlockText}>Unlock with Telebirr</Text>
          </View>
        ) : (
          <View style={styles.progressWrap}>
            <ProgressBar percent={percent} />
            <Text style={styles.progressText}>{Math.round(percent)}% complete</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export const CourseCard = memo(CourseCardBase);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...(shadow.md as object),
  },
  imageWrap: {
    height: 150,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  levelTag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  levelText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  lockBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.premiumLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  lockText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.surfaceDeep,
  },
  body: {
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.sm,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  progressWrap: {
    marginTop: spacing.sm,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.accentDark,
    fontWeight: fontWeight.semibold,
  },
  unlockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.sm,
  },
  unlockText: {
    fontSize: fontSize.sm,
    color: colors.premium,
    fontWeight: fontWeight.bold,
  },
});
