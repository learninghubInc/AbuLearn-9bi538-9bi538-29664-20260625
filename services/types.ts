// Powered by OnSpace.AI
// Shared domain types

export type CourseCategory = 'free' | 'premium';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  chapters: { heading: string; body: string }[];
  quiz: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  image: string;
  level: string;
  lessons: Lesson[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

export interface CourseProgress {
  // lessonId -> completion percent (0-100)
  lessons: Record<string, number>;
  badges: string[];
}
