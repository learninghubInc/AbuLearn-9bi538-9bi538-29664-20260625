// Powered by OnSpace.AI
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { courseService } from '@/services/courseService';
import { useProgress } from '@/hooks/useProgress';
import { LessonRow } from '@/components/feature/LessonRow';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getLessonPercent } = useProgress();

  const course = courseService.getById(id ?? '');

  if (!course) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Course not found.</Text>
      </View>
    );
  }

  const completed = course.lessons.filter((l) => getLessonPercent(l.id) >= 100).length;

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Image source={{ uri: course.image }} style={StyleSheet.absoluteFill as object} contentFit="cover" transition={200} />
        <LinearGradient colors={['rgba(15,33,103,0.3)', 'rgba(15,33,103,0.92)']} style={StyleSheet.absoluteFill as object} />
        <View style={[styles.heroContent, { paddingTop: insets.top + spacing.sm }]}>
          <MaterialIcons name="arrow-back" size={26} color={colors.textInverse} onPress={() => router.back()} />
          <View style={styles.heroBottom}>
            <View style={styles.levelTag}>
              <Text style={styles.levelText}>{course.level}</Text>
            </View>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.subtitle}>{course.subtitle}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.flex1}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>{course.description}</Text>

        <View style={styles.summaryRow}>
          <Summary icon="menu-book" label={`${course.lessons.length} Lessons`} />
          <Summary icon="task-alt" label={`${completed} Done`} />
          <Summary icon="quiz" label="Quizzes" />
        </View>

        <Text style={styles.sectionTitle}>Lessons</Text>
        {course.lessons.map((lesson, index) => (
          <LessonRow
            key={lesson.id}
            index={index + 1}
            title={lesson.title}
            summary={lesson.summary}
            percent={getLessonPercent(lesson.id)}
            onPress={() =>
              router.push({ pathname: '/lesson', params: { courseId: course.id, lessonId: lesson.id } })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Summary({ icon, label }: { icon: keyof typeof MaterialIcons.glyphMap; label: string }) {
  return (
    <View style={styles.summaryItem}>
      <MaterialIcons name={icon} size={20} color={colors.primary} />
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex1: { flex: 1 },
  hero: { height: 240 },
  heroContent: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'space-between', paddingBottom: spacing.lg },
  heroBottom: {},
  levelTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  levelText: { color: colors.textInverse, fontSize: fontSize.xs, fontWeight: fontWeight.bold },
  title: { color: colors.textInverse, fontSize: fontSize.xxl, fontWeight: fontWeight.bold },
  subtitle: { color: 'rgba(255,255,255,0.85)', fontSize: fontSize.sm, marginTop: 4 },
  content: { padding: spacing.lg },
  description: { fontSize: fontSize.md, color: colors.textSubtle, lineHeight: 24 },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    ...(shadow.sm as object),
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryLabel: { fontSize: fontSize.xs, color: colors.textSubtle, fontWeight: fontWeight.semibold },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  emptyText: { fontSize: fontSize.md, color: colors.textSubtle },
});
