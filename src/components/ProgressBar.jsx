import React, { useState, useEffect } from 'react';

/**
 * Reusable Progress Bar & Signature "Ledger Milestone Spine" Component
 * 
 * Distinctive progress visualization featuring:
 * 1. Segmented Milestone Spine: discrete physical notches with micro-tick indicators
 * 2. Continuous Telemetry Bar: smooth eased progress fill
 */
export const ProgressBar = ({
  progress = 0,
  totalSegments = 0,
  completedSegments = 0,
  segments = [],
  variant = 'segmented',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Eased animation on mount
    const timer = setTimeout(() => {
      setAnimatedProgress(clampedProgress);
    }, 50);
    return () => clearTimeout(timer);
  }, [clampedProgress]);

  // Determine segment list: either passed explicit segment array or generated from counts
  const segmentList = segments.length > 0
    ? segments
    : Array.from({ length: totalSegments }, (_, i) => ({
        id: `seg-${i}`,
        completed: i < completedSegments,
      }));

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  if (variant === 'segmented' && segmentList.length > 0) {
    // First incomplete lesson index (for active in-progress indicator)
    const firstIncompleteIdx = segmentList.findIndex((s) => !s.completed);

    return (
      <div className={`w-full ${className}`}>
        {showLabel && (
          <div className="flex justify-between items-center text-xs font-mono mb-1.5 tabular-nums">
            <span className="text-ink-muted">
              {completedSegments} of {segmentList.length} Lessons
            </span>
            <span className="font-semibold text-ink-primary">
              {clampedProgress}%
            </span>
          </div>
        )}

        {/* Signature Segmented Milestone Spine Track */}
        <div
          className={`flex gap-1.5 ${heightClass} w-full`}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Milestone progress: ${clampedProgress}%`}
        >
          {segmentList.map((seg, idx) => {
            const isCompleted = seg.completed;
            const isActiveNext = idx === firstIncompleteIdx && clampedProgress > 0 && clampedProgress < 100;

            return (
              <div
                key={seg.id || idx}
                title={seg.title ? `${seg.title} (${isCompleted ? 'Mastered' : 'Pending'})` : `Lesson ${idx + 1}`}
                className={`flex-1 rounded-[2px] transition-all duration-300 relative overflow-hidden ${
                  isCompleted
                    ? 'bg-progress-spruce shadow-sm'
                    : isActiveNext
                    ? 'bg-surface-muted border border-amber-gauge/60'
                    : 'bg-surface-muted border border-border-line'
                }`}
              >
                {/* Subtle sheen highlight on completed segments */}
                {isCompleted && (
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/25" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Continuous linear progress bar
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono mb-1.5 tabular-nums">
          <span className="text-ink-muted">Mastery Index</span>
          <span className="font-semibold text-ink-primary">{clampedProgress}%</span>
        </div>
      )}

      <div
        className={`w-full bg-surface-muted border border-border-line rounded-full overflow-hidden ${heightClass} p-[1px]`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`Overall progress: ${clampedProgress}%`}
      >
        <div
          className="h-full bg-progress-spruce transition-all duration-700 ease-out rounded-full relative"
          style={{ width: `${animatedProgress}%` }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
