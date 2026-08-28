import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialCourses, computeCourseMetrics } from '../data/mockData';

const ProgressContext = createContext(null);

const PROGRESS_STORAGE_KEY = 'guild_completed_lessons';

function getInitialCompletedLessonIds() {
  try {
    const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading progress from localStorage:', e);
  }

  // Fallback to defaults from mock data
  const defaultCompleted = [];
  initialCourses.forEach(course => {
    course.lessons.forEach(lesson => {
      if (lesson.completed) {
        defaultCompleted.push(lesson.id);
      }
    });
  });
  return defaultCompleted;
}

export const ProgressProvider = ({ children }) => {
  const [completedLessonIds, setCompletedLessonIds] = useState(getInitialCompletedLessonIds);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedLessonIds));
    } catch (e) {
      console.error('Error saving progress to localStorage:', e);
    }
  }, [completedLessonIds]);

  const completedSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);

  const toggleLesson = (lessonId) => {
    setCompletedLessonIds(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const isLessonCompleted = (lessonId) => {
    return completedSet.has(lessonId);
  };

  const getCourse = (courseId) => {
    const rawCourse = initialCourses.find(c => c.id === courseId);
    if (!rawCourse) return null;

    const populatedLessons = rawCourse.lessons.map(lesson => ({
      ...lesson,
      completed: completedSet.has(lesson.id),
    }));

    return computeCourseMetrics({
      ...rawCourse,
      lessons: populatedLessons,
    }, completedSet);
  };

  const getAllCourses = () => {
    return initialCourses.map(course => {
      const populatedLessons = course.lessons.map(lesson => ({
        ...lesson,
        completed: completedSet.has(lesson.id),
      }));

      return computeCourseMetrics({
        ...course,
        lessons: populatedLessons,
      }, completedSet);
    });
  };

  const resetProgress = () => {
    const defaultCompleted = [];
    initialCourses.forEach(course => {
      course.lessons.forEach(lesson => {
        if (lesson.completed) {
          defaultCompleted.push(lesson.id);
        }
      });
    });
    setCompletedLessonIds(defaultCompleted);
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessonIds,
        toggleLesson,
        isLessonCompleted,
        getCourse,
        getAllCourses,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
