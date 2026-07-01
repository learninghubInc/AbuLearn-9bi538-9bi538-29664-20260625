// Powered by OnSpace.AI - Upgraded with Optional Auth Bypass
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Custom Game/Quiz State Variables for Uptodown Approval
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Lesson Database (Free vs Premium)
  const academyLessons = [
    { title: "🚀 Module 1: Space Exploration", desc: "Learn how rockets break gravity and travel into deep orbit.", type: "Free" },
    { title: "💻 Module 2: Coding Foundations", desc: "Discover how binary logic and loops build software.", type: "Premium" },
    { title: "🧬 Module 3: Micro-Biology", desc: "Explore living organisms under extreme magnification.", type: "Premium" }
  ];

  const quizQuestions = [
    {
      question: "Which force must a rocket overcome to blast off into space?",
      options: ["Friction", "Gravity", "Magnetism", "Centrifugal"],
      answer: "Gravity"
    },
    {
      question: "What language framework are you currently using to run this academy app?",
      options: ["Swift", "Python", "React Native", "C++"],
      answer: "React Native"
    }
  ];

  // Global Interceptor: If user isn't logged in, intercept action and open original login router
  const handleProtectedAction = (actionCallback: () => void) => {
    if (!user) {
      // Redirects to your original authentication tab file
      router.push('/(auth)/login');
    } else {
      actionCallback();
    }
  };

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors?.primary || '#00E676'} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Academy Brand Top Header Bar */}
      <Text style={styles.headerTitle}>AbuLearn Academy</Text>
      <Text style={styles.headerSubtitle}>Premium Educational Hub</Text>

      {/* Course List Section */}
      <Text style={styles.sectionTitle}>📚 Course Curriculum</Text>
      {academyLessons.map((lesson, idx) => (
        <TouchableOpacity 
          key={idx} 
          style={styles.card}
          onPress={() => handleProtectedAction(() => {
            // This code only runs if logged in
            router.push('/(tabs)'); 
          })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{lesson.title}</Text>
            <View style={[styles.badge, { backgroundColor: lesson.type === 'Free' ? '#00E676' : '#FF3366' }]}>
              <Text style={styles.badgeText}>{lesson.type}</Text>
            </View>
          </View>
          <Text style={styles.cardDesc}>{lesson.desc}</Text>
        </TouchableOpacity>
      ))}

      {/* Interactive Assessment Module to fix the Rejection Flag */}
      <Text style={styles.sectionTitle}>⚡ Interactive Exam Center</Text>
      <View style={styles.quizBox}>
        {!quizCompleted ? (
          <View>
            <Text style={styles.progressText}>Question {currentQuestion + 1} of {quizQuestions.length}</Text>
            <Text style={styles.questionText}>{quizQuestions[currentQuestion].question}</Text>
            {quizQuestions[currentQuestion].options.map((option, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={styles.optionBtn} 
                onPress={() => handleProtectedAction(() => handleAnswer(option))}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>🎓 Evaluation Complete!</Text>
            <Text style={styles.scoreText}>Your Score: {score} / {quizQuestions.length}</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={() => setQuizCompleted(false)}>
              <Text style={styles.resetBtnText}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0E1A' },
  container: { padding: 20, backgroundColor: '#0A0E1A', flexGrow: 1 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginTop: 40, textAlign: 'center' },
  headerSubtitle: { fontSize: 14, color: '#00E676', textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center', marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#8E8E93', marginVertical: 15, textTransform: 'uppercase' },
  card: { backgroundColor: '#151D33', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#233052' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#FFF', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { color: '#0A0E1A', fontSize: 10, fontWeight: 'bold' },
  cardDesc: { fontSize: 13, color: '#B0B5C6', marginTop: 6, lineHeight: 18 },
  quizBox: { backgroundColor: '#1C2744', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#00E676', marginBottom: 35 },
  progressText: { fontSize: 11, color: '#00E676', fontWeight: 'bold', marginBottom: 5 },
  questionText: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginBottom: 15 },
  optionBtn: { backgroundColor: '#293963', padding: 12, borderRadius: 8, marginVertical: 6 },
  optionText: { color: '#FFF', fontSize: 14, textAlign: 'center' },
  resultBox: { alignItems: 'center' },
  resultTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  scoreText: { fontSize: 18, color: '#00E676', marginVertical: 12, fontWeight: 'bold' },
  resetBtn: { backgroundColor: '#00E676', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  resetBtnText: { color: '#0A0E1A', fontWeight: 'bold' }
});
