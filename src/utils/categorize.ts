import type { Event } from '../types/Event';

export const categorizeEvent = (event: Event): string => {
  const title = event.title.toLowerCase();
  if (title.includes('meeting') || title.includes('project')) return 'Work';
  if (title.includes('birthday') || title.includes('party')) return 'Personal';
  return 'Other';
};