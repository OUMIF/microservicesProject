import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeJoin',
  standalone: true // Angular 17+ standalone component (optional)
})
export class SafeJoinPipe implements PipeTransform {
  transform(value: unknown, separator: string = ', '): string {
    if (value == null) return ''; // Handles null/undefined
    return Array.isArray(value) 
      ? value.join(separator) 
      : String(value); // Fallback for non-arrays
  }
}