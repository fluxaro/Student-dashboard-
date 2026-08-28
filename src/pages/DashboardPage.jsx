import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { CourseCard } from '../components/CourseCard';
import { ProgressBar } from '../components/ProgressBar';
import { getInitials } from '../utils/formatters';
import {
  FiBookOpen,
  FiLogOut,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiX,
  FiAward,
  FiRotateCcw,
  FiSliders,
} from 'react-icons/fi';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { getAllCourses, resetProgress } = useProgress();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dynamically computed courses from ProgressContext
  const courses = getAllCourses();

  // Aggregate live metrics across all courses
  const stats = useMemo(() => {
    const totalCourses = courses.length;
    const completedCourses = courses.filter((c) => c.status === 'Completed').length;
    const inProgressCourses = courses.filter((c) => c.status === 'In Progress').length;
    const notStartedCourses = courses.filter((c) => c.status === 'Not Started').length;

    let totalLessonsCount = 0;
    let completedLessonsCount = 0;

    courses.forEach((c) => {
      totalLessonsCount += c.totalLessons;
      completedLessonsCount += c.completedLessons;
    });

    const overallProgress =
      totalLessonsCount > 0
        ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
        : 0;

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      notStartedCourses,
      totalLessonsCount,
      completedLessonsCount,
      overallProgress,
    };
  }, [courses]);

  // Filtered courses based on title search and status filter
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesStatus =
        statusFilter === 'All' || course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, searchQuery, statusFilter]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  const userInitials = getInitials(user?.name);

  return (
    <div className="min-h-screen bg-canvas-bg text-ink-primary flex flex-col selection:bg-brand-terracotta/20 selection:text-brand-terracotta animate-fade-in">
      {/* ========================================================================= */}
      {/* 1. Navigation Bar */}
      {/* ========================================================================= */}
      <header className="border-b border-border-line bg-surface-card sticky top-0 z-30 shadow-ledger-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-brand-terracotta/10 border border-brand-terracotta/20 flex items-center justify-center text-brand-terracotta flex-shrink-0 shadow-sm">
              <FiBookOpen className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest block">
                The Guild & Ledger
              </span>
              <span className="font-display text-base sm:text-lg font-semibold tracking-tight">
                Academic Ledger
              </span>
            </div>
          </div>

          {/* User Controls / Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 sm:px-3 sm:py-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-primary transition-colors text-xs font-mono flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
            >
              {isDark ? (
                <FiSun className="w-4 h-4 text-amber-gauge" />
              ) : (
                <FiMoon className="w-4 h-4 text-ink-muted" />
              )}
              <span className="hidden md:inline font-mono">{isDark ? 'LIGHT' : 'DARK'}</span>
            </button>

            <div className="h-5 w-px bg-border-line" />

            {/* Student Initials Avatar & Info */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-md bg-brand-terracotta/10 border border-brand-terracotta/30 flex items-center justify-center text-brand-terracotta font-mono font-semibold text-xs tracking-wider flex-shrink-0 shadow-sm"
                title={`${user?.name} (${user?.email})`}
                aria-label={`Initials for ${user?.name}`}
              >
                {userInitials}
              </div>

              <div className="hidden sm:block text-left max-w-[140px] md:max-w-[180px]">
                <div className="text-xs font-medium truncate text-ink-primary">
                  {user?.name}
                </div>
                <div className="text-[10px] font-mono text-ink-muted truncate">
                  {user?.role}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Sign Out of Session"
              aria-label="Sign out"
              className="p-2 sm:px-2.5 sm:py-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-ink-muted hover:text-brand-terracotta transition-colors flex items-center gap-1.5 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="hidden lg:inline">SIGN OUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* Main Content View */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 space-y-10">
        {/* ========================================================================= */}
        {/* 2. Stat Summary Centerpiece (High visual weight & generous whitespace) */}
        {/* ========================================================================= */}
        <section
          aria-label="Curriculum Overview & Telemetry"
          className="rounded-lg border border-border-line bg-surface-card shadow-ledger-md overflow-hidden"
        >
          {/* Header Bar of the Ledger */}
          <div className="p-6 sm:p-8 border-b border-border-line bg-surface-muted/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-sm bg-brand-terracotta/10 border border-brand-terracotta/20 text-brand-terracotta font-mono text-[11px] uppercase font-semibold">
                  {user?.cohort || 'Guild Scholar'}
                </span>
                <span className="text-xs font-mono text-ink-muted tabular-nums">
                  Enrolled Since {user?.enrolledSince || '2025'}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink-primary leading-tight">
                Scholar Overview & Syllabus Telemetry
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed">
                Live academic registry tracking modular completion metrics, mastery velocity, and syllabus requirements across your active curriculum.
              </p>
            </div>

            {/* Reset Mock State Action */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={resetProgress}
                title="Reset lesson progress back to default baseline"
                className="px-3.5 py-2 rounded-md border border-border-line bg-surface-card hover:bg-surface-muted text-xs font-mono text-ink-muted hover:text-ink-primary transition-colors flex items-center gap-1.5 shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
              >
                <FiRotateCcw className="w-3.5 h-3.5" />
                <span>RESET BASELINE</span>
              </button>
            </div>
          </div>

          {/* Grid of Highlighted Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-line">
            {/* Metric 1: Overall Mastery Percentage */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Overall Mastery
                </span>
                <div className="w-7 h-7 rounded bg-progress-spruce/10 border border-progress-spruce/20 flex items-center justify-center text-progress-spruce shadow-sm">
                  <FiAward className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary tabular-nums">
                  {stats.overallProgress}%
                </div>
                <div className="text-xs font-mono text-ink-muted mt-1 tabular-nums">
                  {stats.completedLessonsCount} of {stats.totalLessonsCount} total lessons mastered
                </div>
              </div>
              <ProgressBar
                progress={stats.overallProgress}
                variant="continuous"
                size="sm"
                className="mt-2"
              />
            </div>

            {/* Metric 2: Enrolled Monographs */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Enrolled Tracks
                </span>
                <div className="w-7 h-7 rounded bg-surface-muted border border-border-line flex items-center justify-center text-ink-muted shadow-sm">
                  <FiBookOpen className="w-4 h-4 text-brand-terracotta" />
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary tabular-nums">
                  {stats.totalCourses}
                </div>
                <div className="text-xs font-mono text-ink-muted mt-1">
                  Active academic monographs
                </div>
              </div>
              <div className="text-[11px] font-mono text-ink-muted pt-2 border-t border-border-line/60">
                Full syllabus curriculum
              </div>
            </div>

            {/* Metric 3: In Progress Courses */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-gauge font-medium">
                  In Progress
                </span>
                <div className="w-7 h-7 rounded bg-amber-gauge/10 border border-amber-gauge/20 flex items-center justify-center text-amber-gauge shadow-sm">
                  <FiClock className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-amber-gauge tabular-nums">
                  {stats.inProgressCourses}
                </div>
                <div className="text-xs font-mono text-ink-muted mt-1">
                  Active studies undergoing review
                </div>
              </div>
              <div className="text-[11px] font-mono text-ink-muted pt-2 border-t border-border-line/60">
                Requires active study session
              </div>
            </div>

            {/* Metric 4: Completed Courses */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-progress-spruce font-medium">
                  Mastered & Completed
                </span>
                <div className="w-7 h-7 rounded bg-progress-spruce/10 border border-progress-spruce/20 flex items-center justify-center text-progress-spruce shadow-sm">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-progress-spruce tabular-nums">
                  {stats.completedCourses}
                </div>
                <div className="text-xs font-mono text-ink-muted mt-1">
                  Full syllabi completed (100%)
                </div>
              </div>
              <div className="text-[11px] font-mono text-ink-muted pt-2 border-t border-border-line/60">
                Certified guild credits
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. Search & Filter Bar */}
        {/* ========================================================================= */}
        <section aria-label="Course Filters & Search" className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input Field */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                <FiSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, code, or discipline..."
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-md bg-surface-card border border-border-line text-ink-primary placeholder:text-ink-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:border-brand-terracotta shadow-ledger-sm font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-muted hover:text-ink-primary"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-mono text-ink-muted hidden lg:inline mr-1 flex items-center gap-1">
                <FiSliders className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { label: 'All', count: courses.length },
                {
                  label: 'In Progress',
                  count: courses.filter((c) => c.status === 'In Progress').length,
                },
                {
                  label: 'Completed',
                  count: courses.filter((c) => c.status === 'Completed').length,
                },
                {
                  label: 'Not Started',
                  count: courses.filter((c) => c.status === 'Not Started').length,
                },
              ].map((tab) => {
                const isActive = statusFilter === tab.label;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setStatusFilter(tab.label)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase whitespace-nowrap transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta ${
                      isActive
                        ? 'bg-brand-terracotta text-white shadow-ledger-sm font-semibold'
                        : 'bg-surface-card text-ink-muted hover:text-ink-primary border border-border-line hover:bg-surface-muted'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                        isActive
                          ? 'bg-white/20 text-white font-semibold'
                          : 'bg-surface-muted text-ink-muted'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. Course Grid & Signature Bespoke Empty State */}
        {/* ========================================================================= */}
        <section aria-label="Curriculum Grid">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            /* Signature Bespoke Architectural Empty State (Handcrafted SVG Folio) */
            <div className="p-10 sm:p-14 rounded-lg border border-dashed border-border-line bg-surface-card/60 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-ledger-sm my-6">
              {/* Bespoke Architectural Folio Illustration */}
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-5 text-brand-terracotta"
                aria-hidden="true"
              >
                <rect x="12" y="14" width="48" height="44" rx="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
                <path d="M36 14V58" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
                <path d="M20 24H30M20 32H28M20 40H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                <path d="M42 24H52M42 32H50M42 40H48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                <circle cx="36" cy="36" r="10" stroke="currentColor" strokeWidth="1.5" className="text-brand-terracotta" />
                <path d="M36 31V37L39 39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="font-mono text-xs uppercase tracking-widest text-brand-terracotta mb-1 font-semibold">
                QUERY ZERO // REGISTER UNMATCHED
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary mb-2">
                No Monographs Found
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mb-6 max-w-sm leading-relaxed font-sans">
                {searchQuery
                  ? `No course records match "${searchQuery}" under the "${statusFilter}" filter in the current register.`
                  : `There are currently no course records filed under the "${statusFilter}" filter.`}
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2.5 rounded-md bg-surface-muted hover:bg-surface-card border border-border-line text-xs font-mono text-ink-primary transition-all flex items-center gap-2 shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
              >
                <FiRotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR SEARCH & FILTERS</span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ========================================================================= */}
      {/* Footer */}
      {/* ========================================================================= */}
      <footer className="border-t border-border-line bg-surface-card/50 py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-ink-muted gap-2">
          <div>The Guild & Ledger • Academic Curriculum Registry</div>
          <div className="tabular-nums">5 Syllabus Tracks Active</div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
