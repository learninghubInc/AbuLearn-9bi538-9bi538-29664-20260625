// Powered by OnSpace.AI
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { courseService } from '@/services/courseService';
import { useProgress } from '@/hooks/useProgress';

const PASS_THRESHOLD = 80;

export default function QuizScreen() {
  const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeLesson } = useProgress();

  const lesson = courseService.getLesson(courseId ?? '', lessonId ?? '');
  const questions = lesson?.quiz ?? [];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const allAnswered = useMemo(
    () => questions.length > 0 && questions.every((q) => answers[q.id] !== undefined),
    [questions, answers],
  );

  if (!lesson) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Quiz not found.</Text>
      </View>
    );
  }

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    const pct = Math.round((correct / questions.length) * 100);
    setScore(pct);
    setSubmitted(true);
    if (pct >= PASS_THRESHOLD) {
      const badges = await completeLesson(courseId!, lessonId!, 100);
      setEarnedBadges(badges);
    }
  };

  const passed = score >= PASS_THRESHOLD;

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.primaryDark, colors.primary]} style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <MaterialIcons name="close" size={26} color={colors.textInverse} onPress={() => router.back()} />
        <Text style={styles.eyebrow}>QUIZ</Text>
        <Text style={styles.title}>{lesson.title}</Text>
      </LinearGradient>

      <ScrollView
        style={styles.flex1}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {submitted ? (
          <View style={[styles.resultCard, passed ? styles.resultPass : styles.resultFail]}>
            <MaterialIcons
              name={passed ? 'check-circle' : 'replay-circle-filled'}
              size={52}
              color={passed ? colors.success : colors.premium}
            />
            <Text style={styles.resultScore}>{score}%</Text>
            <Text style={styles.resultTitle}>{passed ? 'Lesson Complete!' : 'Almost there!'}</Text>
            <Text style={styles.resultText}>
              {passed
                ? 'Great work. This lesson is now 100% complete.'
                : `You need ${PASS_THRESHOLD}% to pass. Review the lesson and try again.`}
            </Text>
            {earnedBadges.length > 0 ? (
              <View style={styles.badgeAward}>
                <MaterialIcons name="emoji-events" size={18} color={colors.premium} />
                <Text style={styles.badgeAwardText}>
                  New badge: {earnedBadges.join(', ')}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {questions.map((q, qIndex) => {
          const selected = answers[q.id];
          return (
            <View key={q.id} style={styles.questionCard}>
              <Text style={styles.questionNum}>Question {qIndex + 1} of {questions.length}</Text>
              <Text style={styles.questionText}>{q.question}</Text>
              {q.options.map((option, oIndex) => {
                const isSelected = selected === oIndex;
                const isCorrect = oIndex === q.correctIndex;
                let optionStyle = styles.option;
                let textStyle = styles.optionText;
                let iconName: keyof typeof MaterialIcons.glyphMap = 'radio-button-unchecked';
                let iconColor = colors.textMuted;

                if (submitted) {
                  if (isCorrect) {
                    optionStyle = { ...styles.option, ...styles.optionCorrect };
                    textStyle = { ...styles.optionText, ...styles.optionTextStrong };
                    iconName = 'check-circle';
                    iconColor = colors.success;
                  } else if (isSelected) {
                    optionStyle = { ...styles.option, ...styles.optionWrong };
                    textStyle = { ...styles.optionText, ...styles.optionTextStrong };
                    iconName = 'cancel';
                    iconColor = colors.danger;
                  }
                } else if (isSelected) {
                  optionStyle = { ...styles.option, ...styles.optionSelected };
                  textStyle = { ...styles.optionText, ...styles.optionTextStrong };
                  iconName = 'radio-button-checked';
                  iconColor = colors.primary;
                }

                return (
                  <Pressable
                    key={`${q.id}-${oIndex}`}
                    onPress={() => handleSelect(q.id, oIndex)}
                    style={optionStyle}
                  >
                    <MaterialIcons name={iconName} size={22} color={iconColor} />
                    <Text style={textStyle}>{option}</Text>
                  </Pressable>
                );
              })}
            </View>
          );
        })}

        {!submitted ? (
          <Button title="Submit Quiz" onPress={handleSubmit} disabled={!allAnswered} />
        ) : passed ? (
          <Button
            title="Back to Course"
            variant="accent"
            onPress={() => router.back()}
          />
        ) : (
          <View style={{ gap: spacing.sm }}>
            <Button
              title="Try Again"
              onPress={() => {
                setAnswers({});
                setSubmitted(false);
                setScore(0);
                setEarnedBadges([]);
              }}
            />
            <Button title="Review Lesson" variant="outline" onPress={() => router.back()} />
          </View>
        )}
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
  title: { color: colors.textInverse, fontSize: fontSize.xl, fontWeight: fontWeight.bold, marginTop: 4 },
  content: { padding: spacing.lg },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...(shadow.sm as object),
  },
  questionNum: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, color: colors.accentDark, letterSpacing: 0.5 },
  questionText: { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.text, marginTop: spacing.xs, marginBottom: spacing.md, lineHeight: 25 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.surfaceAlt },
  optionCorrect: { borderColor: colors.success, backgroundColor: '#ECFDF5' },
  optionWrong: { borderColor: colors.danger, backgroundColor: '#FEF2F2' },
  optionText: { flex: 1, fontSize: fontSize.md, color: colors.textSubtle },
  optionTextStrong: { color: colors.text, fontWeight: fontWeight.semibold },
  resultCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
  },
  resultPass: { backgroundColor: '#ECFDF5', borderColor: colors.success },
  resultFail: { backgroundColor: '#FFFBEB', borderColor: colors.premium },
  resultScore: { fontSize: fontSize.display, fontWeight: fontWeight.bold, color: colors.text, marginTop: spacing.sm },
  resultTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.text },
  resultText: { fontSize: fontSize.sm, color: colors.textSubtle, textAlign: 'center', lineHeight: 20, marginTop: spacing.xs },
  badgeAward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    marginTop: spacing.md,
  },
  badgeAwardText: { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.premium },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  emptyText: { fontSize: fontSize.md, color: colors.textSubtle },
});
