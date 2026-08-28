import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { ProgressBar } from '../components/ProgressBar';
import { StatusBadge } from '../components/StatusBadge';
import { getInitials } from '../utils/formatters';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCircle,
  FiClock,
  FiSun,
  FiMoon,
  FiUser,
  FiBookOpen,
  FiAward,
  FiCheck,
  FiLogOut,
  FiShield,
} from 'react-icons/fi';

export const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourse, toggleLesson } = useProgress();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  // Re-computed live course state from ProgressContext
  const course = getCourse(courseId);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // =========================================================================
  // Invalid / Unknown Course Handling (Graceful 404 State)
  // =========================================================================
  if (!course) {
    return (
      <div className="min-h-screen bg-canvas-bg text-ink-primary flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-fade-in">
        {/* Nav */}
        <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-2">
          <Link
            to="/"
            className="p-2 sm:px-3.5 sm:py-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-muted hover:text-ink-primary transition-colors flex items-center gap-2 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta shadow-sm"
          >
            <FiArrowLeft className="w-4 h-4 text-brand-terracotta" />
            <span>RETURN TO DASHBOARD</span>
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-primary transition-colors text-xs font-mono flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta shadow-sm"
          >
            {isDark ? <FiSun className="w-4 h-4 text-amber-gauge" /> : <FiMoon className="w-4 h-4 text-ink-muted" />}
          </button>
        </header>

        {/* 404 Container */}
        <main className="max-w-lg mx-auto w-full text-center my-auto p-8 sm:p-10 rounded-lg border border-border-line bg-surface-card shadow-ledger-float">
          <div className="w-14 h-14 rounded-md bg-brand-terracotta/10 border border-brand-terracotta/20 flex items-center justify-center text-brand-terracotta mx-auto mb-4 shadow-sm">
            <FiBookOpen className="w-7 h-7" />
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-brand-terracotta mb-2 font-semibold">
            404 // RECORD NOT FOUND
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-3 text-ink-primary">
            Curriculum Monograph Unavailable
          </h1>

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
            The requested course identifier (<code className="px-1.5 py-0.5 rounded bg-surface-muted border border-border-line font-mono text-ink-primary">{courseId}</code>) does not match any syllabus registered in the active curriculum.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-brand-terracotta text-white text-xs font-mono font-medium tracking-wide shadow-ledger-sm hover:opacity-95 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>RETURN TO COURSE LEDGER</span>
          </Link>
        </main>

        <footer className="text-center text-xs font-mono text-ink-muted py-4">
          The Guild & Ledger • Academic Curriculum Registry
        </footer>
      </div>
    );
  }

  const userInitials = getInitials(user?.name);

  return (
    <div className="min-h-screen bg-canvas-bg text-ink-primary flex flex-col selection:bg-brand-terracotta/20 selection:text-brand-terracotta animate-fade-in">
      {/* ========================================================================= */}
      {/* Top Header Bar */}
      {/* ========================================================================= */}
      <header className="border-b border-border-line bg-surface-card sticky top-0 z-30 shadow-ledger-sm backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back Action & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 sm:px-3 sm:py-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-muted hover:text-ink-primary transition-colors flex items-center gap-2 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta shadow-sm"
              title="Return to Dashboard"
            >
              <FiArrowLeft className="w-4 h-4 text-brand-terracotta" />
              <span className="hidden sm:inline font-mono font-medium">DASHBOARD</span>
            </Link>

            <div className="h-5 w-px bg-border-line" />

            <div className="flex items-center gap-2 text-xs font-mono text-ink-muted truncate">
              <span className="font-semibold text-ink-primary">{course.code}</span>
              <span className="hidden md:inline text-ink-muted/40">•</span>
              <span className="hidden md:inline truncate">{course.title}</span>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-primary transition-colors text-xs font-mono flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta shadow-sm"
            >
              {isDark ? <FiSun className="w-4 h-4 text-amber-gauge" /> : <FiMoon className="w-4 h-4 text-ink-muted" />}
            </button>

            <div className="h-5 w-px bg-border-line" />

            {/* Scholar Avatar */}
            <div
              className="w-9 h-9 rounded-md bg-brand-terracotta/10 border border-brand-terracotta/30 flex items-center justify-center text-brand-terracotta font-mono font-semibold text-xs tracking-wider flex-shrink-0 shadow-sm"
              title={`${user?.name} (${user?.role})`}
            >
              {userInitials}
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign out"
              className="p-2 sm:px-2.5 sm:py-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-muted hover:text-brand-terracotta transition-colors flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta shadow-sm"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* Main Course Content */}
      {/* ========================================================================= */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 space-y-10">
        {/* Course Header Banner */}
        <section
          aria-label="Course Header"
          className="rounded-lg border border-border-line bg-surface-card shadow-ledger-md overflow-hidden"
        >
          {/* Top Architectural Meta Strip */}
          <div className="p-4 sm:p-5 border-b border-border-line bg-surface-muted/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-sm bg-surface-card border border-border-line text-ink-primary">
                {course.code}
              </span>
              <span className="font-mono text-xs text-ink-muted">{course.category}</span>
              <span className="text-ink-muted/40">•</span>
              <span className="font-mono text-xs text-ink-muted">{course.level}</span>
              <span className="text-ink-muted/40">•</span>
              <span className="font-mono text-xs text-ink-muted tabular-nums">{course.duration}</span>
            </div>

            <div>
              <StatusBadge status={course.status} size="md" />
            </div>
          </div>

          {/* Banner Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-terracotta uppercase tracking-wider mb-2">
              <FiShield className="w-3.5 h-3.5" />
              <span>Guild Academic Monograph</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink-primary mb-3 leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-3xl mb-8 font-sans">
              {course.description}
            </p>

            {/* Instructor & Live Progress Section */}
            <div className="pt-6 border-t border-border-line flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Instructor */}
              <div className="flex items-center gap-3.5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-md border border-border-line object-cover flex-shrink-0 shadow-sm"
                />
                <div>
                  <div className="text-[11px] text-ink-muted font-mono uppercase tracking-wider">Course Director</div>
                  <div className="text-sm font-semibold text-ink-primary flex items-center gap-1.5 mt-0.5">
                    <FiUser className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>{course.instructor.name}</span>
                  </div>
                  <div className="text-xs text-ink-muted mt-0.5 font-sans">
                    {course.instructor.title}
                  </div>
                </div>
              </div>

              {/* Shared ProgressBar Component Telemetry */}
              <div className="w-full md:max-w-xs p-4 rounded-md bg-surface-muted/40 border border-border-line shadow-sm">
                <div className="flex justify-between items-center text-xs font-mono mb-2 tabular-nums">
                  <span className="text-ink-muted flex items-center gap-1.5">
                    <FiAward className="w-3.5 h-3.5 text-progress-spruce" />
                    <span>Mastery Progress</span>
                  </span>
                  <span className="font-semibold text-ink-primary">
                    {course.progress}%
                  </span>
                </div>

                <div className="text-[11px] font-mono text-ink-muted mb-2.5 tabular-nums">
                  {course.completedLessons} of {course.totalLessons} lessons mastered
                </div>

                {/* Reusing exact shared ProgressBar component */}
                <ProgressBar
                  segments={course.lessons}
                  progress={course.progress}
                  variant="segmented"
                  size="md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Interactive Syllabus / Lessons Ledger */}
        {/* ========================================================================= */}
        <section aria-label="Syllabus Modules and Lessons" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border-line gap-1">
            <div className="flex items-center gap-2">
              <FiBookOpen className="w-4 h-4 text-brand-terracotta" />
              <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted font-semibold">
                Syllabus Curriculum ({course.lessons.length} Modules)
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-muted">
              Click any module row to toggle completion
            </span>
          </div>

          {/* Lessons List */}
          <div className="space-y-3" role="list">
            {course.lessons.map((lesson, idx) => {
              const lessonNumber = String(idx + 1).padStart(2, '0');
              const isDone = lesson.completed;

              return (
                <div
                  key={lesson.id}
                  role="checkbox"
                  aria-checked={isDone}
                  tabIndex={0}
                  onClick={() => toggleLesson(lesson.id)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleLesson(lesson.id);
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-md border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 min-h-[68px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta ${
                    isDone
                      ? 'bg-surface-card border-progress-spruce/40 hover:border-progress-spruce shadow-ledger-sm'
                      : 'bg-surface-card border-border-line hover:border-brand-terracotta/50 shadow-ledger-sm'
                  }`}
                >
                  {/* Left Indicator & Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Checkbox Icon */}
                    <div className="mt-0.5 flex-shrink-0">
                      {isDone ? (
                        <FiCheckCircle className="w-5 h-5 text-progress-spruce transition-transform duration-200 scale-105" />
                      ) : (
                        <FiCircle className="w-5 h-5 text-ink-muted hover:text-brand-terracotta transition-colors" />
                      )}
                    </div>

                    {/* Lesson Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[11px] font-semibold text-ink-muted">
                          LESSON {lessonNumber}
                        </span>
                        <span className="text-ink-muted/40">•</span>
                        <span className="font-mono text-[11px] text-ink-muted flex items-center gap-1 tabular-nums">
                          <FiClock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold leading-snug tracking-tight text-ink-primary transition-colors">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-ink-muted mt-1 leading-relaxed max-w-2xl font-sans">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Completion Badge */}
                  <div className="flex-shrink-0 self-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-mono uppercase font-semibold transition-all tracking-wider ${
                        isDone
                          ? 'bg-progress-spruce/10 text-progress-spruce border border-progress-spruce/20'
                          : 'bg-surface-muted text-ink-muted border border-border-line'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <FiCheck className="w-3 h-3" />
                          <span>COMPLETED</span>
                        </>
                      ) : (
                        <span>PENDING</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-line bg-surface-card/50 py-5 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-ink-muted gap-2">
          <div>The Guild & Ledger • Course Syllabus Monograph</div>
          <Link to="/" className="hover:text-brand-terracotta underline flex items-center gap-1 font-mono">
            <FiArrowLeft className="w-3 h-3" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default CourseDetailsPage;
