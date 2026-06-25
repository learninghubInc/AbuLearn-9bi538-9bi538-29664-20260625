// Powered by OnSpace.AI
// Progress + badge persistence (mock backend)
import { storage, STORAGE_KEYS } from './storage';
import { CourseProgress } from './types';
import { courseService } from './courseService';

export const BADGES = {
  quickLearner: 'Quick Learner',
  courseMaster: 'Course Master',
} as const;

const EMPTY: CourseProgress = { lessons: {}, badges: [] };

function keyFor(userId: string): string {
  return `${STORAGE_KEYS.progress}:${userId}`;
}

export const progressService = {
  async load(userId: string): Promise<CourseProgress> {
    return (await storage.get<CourseProgress>(keyFor(userId))) ?? { ...EMPTY };
  },

  async save(userId: string, progress: CourseProgress): Promise<void> {
    await storage.set(keyFor(userId), progress);
  },

  // Mark a lesson complete and evaluate badge awards. Returns updated progress
  // and any newly earned badges.
  async completeLesson(
    userId: string,
    courseId: string,
    lessonId: string,
    percent: number,
  ): Promise<{ progress: CourseProgress; newBadges: string[] }> {
    const current = await this.load(userId);
    const isFirstEverCompletion =
      Object.values(current.lessons).filter((p) => p >= 100).length === 0 && percent >= 100;

    const lessons = { ...current.lessons, [lessonId]: Math.max(current.lessons[lessonId] ?? 0, percent) };
    const badges = [...current.badges];
    const newBadges: string[] = [];

    if (isFirstEverCompletion && !badges.includes(BADGES.quickLearner)) {
      badges.push(BADGES.quickLearner);
      newBadges.push(BADGES.quickLearner);
    }

    // Course Master: all lessons in this course at 100%
    const course = courseService.getById(courseId);
    if (course) {
      const allDone = course.lessons.every((l) => (lessons[l.id] ?? 0) >= 100);
      if (allDone && !badges.includes(BADGES.courseMaster)) {
        badges.push(BADGES.courseMaster);
        newBadges.push(BADGES.courseMaster);
      }
    }

    const updated: CourseProgress = { lessons, badges };
    await this.save(userId, updated);
    return { progress: updated, newBadges };
  },
};
