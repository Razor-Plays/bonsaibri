import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(priceInCents: number | null): string {
  if (priceInCents === null) return ''
  return `$${(priceInCents / 100).toFixed(2)}`
}

export function formatDimensions(length?: number, width?: number, height?: number): string {
  const parts = []
  if (length) parts.push(`${length}cm`)
  if (width) parts.push(`${width}cm`)
  if (height) parts.push(`${height}cm`)
  return parts.join(' × ')
}

export function sortImagesByOrder(images: { order: number }[]): { order: number }[] {
  return [...images].sort((a, b) => a.order - b.order)
}
