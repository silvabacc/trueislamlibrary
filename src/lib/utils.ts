import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatElapsedDate(dateStr: string) {
  const now = new Date();
  const then = new Date(dateStr);
  const diffInMs = now - then;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) return `>30ds`;
  if (days > 0) return `${days}ds`;
  if (hours > 0) return `${hours}hrs`;
  if (minutes > 0) return `${minutes}mins`;
  return `${seconds}s`;
}

export function haveIntersection<T>(arr1: T[], arr2: T[]) {
  const set1 = new Set(arr1);
  return arr2.some((item) => set1.has(item));
}
