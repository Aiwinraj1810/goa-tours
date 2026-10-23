import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A package image counts as a real photograph only if one was supplied; the
// stock placeholder art used by some code-based content does not count.
export function hasPhoto(image?: string | null): image is string {
  return Boolean(image) && !/placeholder\.svg$/i.test(image as string)
}
