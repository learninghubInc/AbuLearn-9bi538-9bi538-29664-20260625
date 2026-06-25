// Powered by OnSpace.AI
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { courseService } from '@/services/courseService';

export default function LessonReaderScreen() {
  const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const lesson = courseService.getLesson(courseId ?? '', lessonId ?? '');

  if (!lesson) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Lesson not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.primaryDark, colors.primary]} style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <MaterialIcons name="arrow-back" size={26} color={colors.textInverse} onPress={() => router.back()} />
        <Text style={styles.eyebrow}>LESSON READER</Text>
        <Text style={styles.title}>{lesson.title}</Text>
      </LinearGradient>

      <ScrollView
        style={styles.flex1}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {lesson.chapters.map((chapter, idx) => (
          <View key={chapter.heading} style={styles.chapter}>
            <View style={styles.chapterHeadRow}>
              <View style={styles.chapterNum}>
                <Text style={styles.chapterNumText}>{idx + 1}</Text>
              </View>
              <Text style={styles.chapterHeading}>{chapter.heading}</Text>
            </View>
            <Text style={styles.chapterBody}>{chapter.body}</Text>
          </View>
        ))}

        <View style={styles.quizCta}>
          <MaterialIcons name="quiz" size={30} color={colors.accent} />
          <Text style={styles.quizCtaTitle}>Ready to test your knowledge?</Text>
          <Text style={styles.quizCtaText}>
            Score 80% or higher to mark this lesson 100% complete.
          </Text>
          <Button
            title="Take Quiz"
            variant="accent"
            icon={<MaterialIcons name="arrow-forward" size={18} color={colors.textInverse} />}
            onPress={() =>
              router.push({ pathname: '/quiz', params: { courseId, lessonId } })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex1: { flex: 1 },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  eyebrow: { color: colors.accent, fontSize: fontSize.xs, fontWeight: fontWeight.bold, letterSpacing: 1, marginTop: spacing.md },
  title: { color: colors.textInverse, fontSize: fontSize.xxl, fontWeight: fontWeight.bold, marginTop: 4 },
  content: { padding: spacing.lg },
  chapter: { marginBottom: spacing.xl },
  chapterHeadRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  chapterNum: { width: 28, height: 28, borderRadius: radius.full, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  chapterNumText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.primary },
  chapterHeading: { flex: 1, fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.text },
  chapterBody: { fontSize: fontSize.md, color: colors.textSubtle, lineHeight: 27 },
  quizCta: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quizCtaTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.text },
  quizCtaText: { fontSize: fontSize.sm, color: colors.textSubtle, textAlign: 'center', lineHeight: 20, marginBottom: spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  emptyText: { fontSize: fontSize.md, color: colors.textSubtle },
});
