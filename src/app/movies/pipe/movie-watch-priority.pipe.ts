import { Pipe, PipeTransform } from '@angular/core';

// Converts watch priority numeric value to text representation
@Pipe({ name: 'watchPriority' })
export class WatchPriorityPipe implements PipeTransform {

  public transform(value: number): string {
    if (value === 0) { return 'Nie interesuje mnie (0)'; }
    if (value === 1) { return 'Do sprawdzenia (1)'; }
    if (value === 2) { return 'Kiedyś obejrzę (2)'; }
    if (value === 3) { return 'Chętnie obejrzę (3)'; }
    if (value === 4) { return 'Muszę obejrzeć (4)'; }
    if (value === 5) { return 'Zdecydowanie obejrzeć (5)'; }
    return '';
  }
}
