import React from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';
import {
  FiArrowRight,
  FiUser,
  FiBookOpen,
} from 'react-icons/fi';

/**
 * Reusable CourseCard Component
 * 
 * Displays course syllabus telemetry, instructor, category, progress,
 * status badge, and segmented milestone notch bar.
 */
export const CourseCard = ({ course }) => {
  return (
    <article className="group relative bg-surface-card border border-border-line rounded-lg shadow-ledger-sm hover:shadow-ledger-md hover:border-brand-terracotta/40 hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col justify-between overflow-hidden">
      {/* Card Header & Metadata */}
      <div className="p-5 sm:p-6 pb-4">
        {/* Top Tag Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-surface-muted border border-border-line text-ink-primary">
              {course.code}
            </span>
            <span className="text-xs font-mono text-ink-muted">
              {course.category}
            </span>
          </div>

          <div>
            <StatusBadge status={course.status} size="sm" />
          </div>
        </div>

        {/* Course Title with Editorial Display Type */}
        <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-ink-primary group-hover:text-brand-terracotta transition-colors leading-snug line-clamp-2 mb-2">
          <Link
            to={`/course/${course.id}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta rounded"
          >
            {course.title}
          </Link>
        </h3>

        {/* Course Description */}
        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2 mb-5">
          {course.description}
        </p>

        {/* Instructor Info */}
        <div className="flex items-center gap-2.5 text-xs text-ink-muted pt-3.5 border-t border-border-line/70">
          <div className="w-5 h-5 rounded bg-surface-muted border border-border-line flex items-center justify-center text-ink-muted flex-shrink-0">
            <FiUser className="w-3 h-3 text-brand-terracotta" />
          </div>
          <span className="truncate font-sans font-medium text-ink-primary/90">
            {course.instructor.name}
          </span>
          <span className="text-ink-muted/40">•</span>
          <span className="font-mono text-[11px] text-ink-muted tabular-nums">
            {course.duration}
          </span>
        </div>
      </div>

      {/* Card Footer: Progress Telemetry Tray */}
      <div className="p-5 sm:p-6 pt-3.5 bg-surface-muted/35 border-t border-border-line">
        {/* Lesson Count & Progress Percent */}
        <div className="flex justify-between items-center text-xs font-mono mb-2 tabular-nums">
          <span className="text-ink-muted flex items-center gap-1.5">
            <FiBookOpen className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>{course.completedLessons} of {course.totalLessons} lessons</span>
          </span>
          <span className="font-semibold text-ink-primary">
            {course.progress}%
          </span>
        </div>

        {/* Reusable Segmented Milestone Spine Bar */}
        <ProgressBar
          segments={course.lessons}
          progress={course.progress}
          variant="segmented"
          size="md"
        />

        {/* Action Link */}
        <div className="mt-3.5 pt-2 flex items-center justify-end">
          <Link
            to={`/course/${course.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-brand-terracotta group-hover:translate-x-0.5 transition-transform focus-visible:outline-none focus-visible:underline"
          >
            <span>OPEN SYLLABUS</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
