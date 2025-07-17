import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchData<T>(url: string): Promise<[T, null] | [null, Error]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return [
        null,
        new Error(`HTTP error! status: ${response.status} response: ${await response.text()}`),
      ];
    }

    const data: T = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}
