import React from 'react';
import { FiCheckCircle, FiClock, FiLayers } from 'react-icons/fi';

/**
 * Reusable StatusBadge Component
 * 
 * Enforces coherent status typography, colors, and iconography across all views.
 */
export const StatusBadge = ({ status, size = 'md', className = '' }) => {
  const isSm = size === 'sm';
  const paddingClass = isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]';
  const iconClass = isSm ? 'w-3 h-3' : 'w-3.5 h-3.5';

  switch (status) {
    case 'Completed':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-sm font-mono uppercase font-semibold bg-progress-spruce/10 text-progress-spruce border border-progress-spruce/25 tracking-wide ${paddingClass} ${className}`}
        >
          <FiCheckCircle className={`${iconClass} flex-shrink-0`} />
          <span>Completed</span>
        </span>
      );
    case 'In Progress':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-sm font-mono uppercase font-semibold bg-amber-gauge/10 text-amber-gauge border border-amber-gauge/25 tracking-wide ${paddingClass} ${className}`}
        >
          <FiClock className={`${iconClass} flex-shrink-0`} />
          <span>In Progress</span>
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-sm font-mono uppercase font-medium bg-surface-muted text-ink-muted border border-border-line tracking-wide ${paddingClass} ${className}`}
        >
          <FiLayers className={`${iconClass} flex-shrink-0`} />
          <span>Not Started</span>
        </span>
      );
  }
};

export default StatusBadge;
