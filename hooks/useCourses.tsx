// Powered by OnSpace.AI
import { useMemo } from 'react';
import { courseService } from '@/services/courseService';

export function useCourses() {
  return useMemo(
    () => ({
      free: courseService.getByCategory('free'),
      premium: courseService.getByCategory('premium'),
      all: courseService.getAll(),
      totalLessons: courseService.totalLessons(),
    }),
    [],
  );
}
