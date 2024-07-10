import { type ClassValue, clsx } from 'clsx';
import { addSeconds, format, intervalToDuration } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const formattedDate = new Date(date);
  return format(formattedDate, 'PP hh:mm a');
};

export const formatCallDuration = (seconds: number) => {
  if (seconds === 0) {
    return '0 seconds';
  }

  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const parts = Object.entries({
    hrs: duration.hours ?? 0,
    mins: duration.minutes ?? 0,
    secs: duration.seconds ?? 0,
  })
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => `${value} ${key}`);

  return parts.join(' ');
};
