/**
 * Extracts uppercase initials from a scholar or instructor name (e.g. "Elena Rostova" -> "ER")
 * 
 * @param {string} name - Full name
 * @returns {string} Two-character uppercase initials
 */
export function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
