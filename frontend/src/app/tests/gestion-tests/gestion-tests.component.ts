import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-tests',
  imports: [CommonModule , SidebarComponent],
  templateUrl: './gestion-tests.component.html',
  styleUrl: './gestion-tests.component.css'
})
export class GestionTestsComponent {
  sidebarCollapsed = false;

  onSidebarToggled(event: boolean) {
    this.sidebarCollapsed = event;
  }
  constructor(private router: Router) {}
  
  navigateToTestDetails(testId: number): void {
    this.router.navigate(['/test-details', testId]);
  }


  tests = [
    {
      id: 1,
      title: 'AI in Agriculture',
      content: 'Exploring how AI is transforming farming and food production.',
      date: 'January 10, 2024'
    },
    {
      id: 2,
      title: 'Space Tech 2025',
      content: 'New missions and innovations in space exploration.',
      date: 'February 2, 2025'
    },
    {
      id: 3,
      title: 'Cybersecurity Trends',
      content: 'Emerging threats and how companies are defending against them.',
      date: 'March 18, 2025'
    },
    {
      id: 4,
      title: 'Climate Change',
      content: 'How global warming is reshaping our world.',
      date: 'April 1, 2025'
    },
    {
      id: 5,
      title: 'Quantum Computing',
      content: 'The future of computation is closer than we think.',
      date: 'May 20, 2025'
    },
    {
      id: 6,
      title: 'Renewable Energy',
      content: 'Solar and wind energy driving the next revolution.',
      date: 'June 12, 2025'
    },
    {
      id: 7,
      title: 'EdTech Revolution',
      content: 'AI and online tools are redefining classrooms.',
      date: 'July 30, 2025'
    },
    {
      id: 8,
      title: 'Smart Cities',
      content: 'Technology improving urban life and sustainability.',
      date: 'August 21, 2025'
    },
    {
      id: 9,
      title: 'Biotech Breakthroughs',
      content: 'New therapies and innovations in healthcare.',
      date: 'September 14, 2025'
    }
  ];
}
