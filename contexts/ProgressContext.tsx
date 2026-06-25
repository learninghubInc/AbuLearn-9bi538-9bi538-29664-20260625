// Powered by OnSpace.AI
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { progressService } from '@/services/progressService';
import { CourseProgress } from '@/services/types';
import { AuthContext } from './AuthContext';

interface ProgressContextType {
  progress: CourseProgress;
  loading: boolean;
  getLessonPercent: (lessonId: string) => number;
  completeLesson: (
    courseId: string,
    lessonId: string,
    percent: number,
  ) => Promise<string[]>;
}

const EMPTY: CourseProgress = { lessons: {}, badges: [] };

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const [progress, setProgress] = useState<CourseProgress>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) {
        setProgress(EMPTY);
        setLoading(false);
        return;
      }
      setLoading(true);
      const loaded = await progressService.load(user.id);
      setProgress(loaded);
      setLoading(false);
    })();
  }, [user]);

  const getLessonPercent = useCallback(
    (lessonId: string) => progress.lessons[lessonId] ?? 0,
    [progress],
  );

  const completeLesson = useCallback(
    async (courseId: string, lessonId: string, percent: number) => {
      if (!user) return [];
      const { progress: updated, newBadges } = await progressService.completeLesson(
        user.id,
        courseId,
        lessonId,
        percent,
      );
      setProgress(updated);
      return newBadges;
    },
    [user],
  );

  return (
    <ProgressContext.Provider value={{ progress, loading, getLessonPercent, completeLesson }}>
      {children}
    </ProgressContext.Provider>
  );
}
