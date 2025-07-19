import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchData(
  url: string,
  options?: RequestInit
): Promise<[any, null] | [null, Error]> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return [
        null,
        new Error(`HTTP error! status: ${response.status} response: ${await response.text()}`),
      ];
    }

    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

/**
 * Parses raw data into a model instance and validates it.
 * @param data The raw data to parse.
 * @param modelClass The class constructor of the model.
 * @returns A tuple containing either the validated model instance or an error.
 */
export async function parseToModel<T>(
  data: any,
  modelClass: ClassConstructor<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const instance = plainToInstance(modelClass, data, {
      excludeExtraneousValues: false,
    });

    // Validate the instance
    await validateOrReject(instance as any);

    return [instance, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}
