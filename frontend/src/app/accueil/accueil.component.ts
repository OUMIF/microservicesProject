import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GrapheComponent } from './graphe/graphe.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule, SidebarComponent,GrapheComponent,BarChartComponent],
  standalone: true,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  sidebarCollapsed = true;

  onSidebarToggled(event: boolean) {
    this.sidebarCollapsed = event;
  }

  testInfo = {
    name: 'Math Test',
    createdDate: new Date('2025-05-01'),
    totalPeople: 42,
    isVoteOpen: true
  };

courses = [
    {
      title: 'Mathématiques de base',
      description: 'Concepts fondamentaux pour débutants',
      progress: 10,
      completed: 42,
      total: 200
    },
    {
      title: 'Algèbre avancée',
      description: 'Maîtrise des équations et fonctions',
      progress: 56,
      completed: 84,
      total: 150
    },
    {
      title: 'Fondamentaux de la géométrie',
      description: 'Formes, angles et mesures',
      progress: 89,
      completed: 178,
      total: 200
    }
  ];

  getProgressColor(progress: number): string {
    if (progress < 40) return '#eb3434';      // soft RED
    if (progress < 60) return '#e9c46a';      // mellow yellow
    return '#2a9d8f';                         // mint green
  }
}
