// test.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests = [
    {
      id: 1,
      title: 'Évaluation 1',
      content: 'Description complète de la première évaluation...',
      date: '2023-10-15',
      // Add more details as needed
    },
    {
      id: 2,
      title: 'Évaluation 2',
      content: 'Description complète de la deuxième évaluation...',
      date: '2023-10-20',
      // Add more details as needed
    }
  ];

  getTestById(id: string) {
    return this.tests.find(test => test.id === +id);
  }
}