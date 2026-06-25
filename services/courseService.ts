// Powered by OnSpace.AI
// Pure data access for courses
import { COURSES } from './coursesData';
import { Course, Lesson } from './types';

export const courseService = {
  getAll(): Course[] {
    return COURSES;
  },
  getByCategory(category: 'free' | 'premium'): Course[] {
    return COURSES.filter((c) => c.category === category);
  },
  getById(id: string): Course | undefined {
    return COURSES.find((c) => c.id === id);
  },
  getLesson(courseId: string, lessonId: string): Lesson | undefined {
    return COURSES.find((c) => c.id === courseId)?.lessons.find((l) => l.id === lessonId);
  },
  totalLessons(): number {
    return COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  },
};
