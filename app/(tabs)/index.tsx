// Powered by OnSpace.AI
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';
import { CourseCard } from '@/components/feature/CourseCard';
import { UpgradeModal } from '@/components/feature/UpgradeModal';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { useCourses } from '@/hooks/useCourses';
import { Course } from '@/services/types';

function coursePercent(course: Course, getLessonPercent: (id: string) => number): number {
  if (course.lessons.length === 0) return 0;
  const total = course.lessons.reduce((sum, l) => sum + getLessonPercent(l.id), 0);
  return total / course.lessons.length;
}

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, unlockPremium } = useAuth();
  const { getLessonPercent, progress } = useProgress();
  const { free, premium, totalLessons } = useCourses();
  const [upgradeVisible, setUpgradeVisible] = useState(false);

  const completedCount = useMemo(
    () => Object.values(progress.lessons).filter((p) => p >= 100).length,
    [progress],
  );

  const handleCoursePress = (course: Course) => {
    if (course.category === 'premium' && !user?.isPremium) {
      setUpgradeVisible(true);
      return;
    }
    router.push({ pathname: '/course/[id]', params: { id: course.id } });
  };

  const handleUnlocked = async () => {
    await unlockPremium();
    setUpgradeVisible(false);
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.primaryDark, colors.primary]} style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name} numberOfLines={1}>{user?.name ?? 'Student'}</Text>
          </View>
          {user?.isPremium ? (
            <View style={styles.premiumChip}>
              <MaterialIcons name="workspace-premium" size={16} color={colors.surfaceDeep} />
              <Text style={styles.premiumChipText}>Premium</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.statsCard}>
          <Stat icon="task-alt" value={`${completedCount}`} label="Completed" />
          <View style={styles.statDivider} />
          <Stat icon="menu-book" value={`${totalLessons}`} label="Lessons" />
          <View style={styles.statDivider} />
          <Stat icon="emoji-events" value={`${progress.badges.length}`} label="Badges" />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.flex1}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader icon="lock-open" title="Free Courses" tint={colors.accent} />
        {free.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            locked={false}
            percent={coursePercent(course, getLessonPercent)}
            onPress={() => handleCoursePress(course)}
          />
        ))}

        <View style={styles.premiumHeaderRow}>
          <SectionHeader icon="workspace-premium" title="Premium Courses" tint={colors.premium} />
          {!user?.isPremium ? (
            <Text style={styles.upgradeLink} onPress={() => setUpgradeVisible(true)}>
              Upgrade
            </Text>
          ) : null}
        </View>
        {premium.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            locked={!user?.isPremium}
            percent={coursePercent(course, getLessonPercent)}
            onPress={() => handleCoursePress(course)}
          />
        ))}
      </ScrollView>

      <UpgradeModal
        visible={upgradeVisible}
        onClose={() => setUpgradeVisible(false)}
        onUnlocked={handleUnlocked}
      />
    </View>
  );
}

function Stat({ icon, value, label }: { icon: keyof typeof MaterialIcons.glyphMap; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <MaterialIcons name={icon} size={20} color={colors.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SectionHeader({ icon, title, tint }: { icon: keyof typeof MaterialIcons.glyphMap; title: string; tint: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIcon, { backgroundColor: tint }]}>
        <MaterialIcons name={icon} size={16} color={colors.textInverse} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex1: { flex: 1 },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  greeting: { color: 'rgba(255,255,255,0.8)', fontSize: fontSize.sm },
  name: { color: colors.textInverse, fontSize: fontSize.xxl, fontWeight: fontWeight.bold },
  premiumChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.premiumLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  premiumChipText: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, color: colors.surfaceDeep },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { color: colors.textInverse, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  statLabel: { color: 'rgba(255,255,255,0.75)', fontSize: fontSize.xs },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  content: { padding: spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  sectionIcon: { width: 28, height: 28, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.text, includeFontPadding: false },
  premiumHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  upgradeLink: { color: colors.premium, fontSize: fontSize.sm, fontWeight: fontWeight.bold, marginBottom: spacing.md },
});
