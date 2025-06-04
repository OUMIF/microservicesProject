import { Component, Output, EventEmitter ,HostListener} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule,Router } from '@angular/router';



interface Student {
  photo: string;
  cne: string;
  lastName: string;
  firstName: string;
  email: string;
  birthPlace: string;
  birthDate: string;
  program: string;
  studyYear: string;
  apogee: string;
}


@Component({
  selector: 'app-accueil-etudiant',
  standalone: true,
  imports: [RouterModule,CommonModule, DatePipe],
  templateUrl: './accueil-etudiant.component.html',
  styleUrl: './accueil-etudiant.component.css'
})
export class AccueilEtudiantComponent {
  courses = [
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/1.jpg',
      school: 'Harvard Faculty of Arts & Sciences',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '950, 950',
      programDates: 'May 28, 2025 - Jun 25, 2025, Aug 27, 2025 - Sep 24, 2025',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Data Science for Business',
      tagline: 'Move beyond the spreadsheet',
      description: '<p>Designed for managers, this course provides a hands-on approach for demystifying the data science ecosystem and making you a more conscientious.</p>',
      imageUrl: 'assets/2.jpg',
      school: 'Harvard Business School',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '1600, 1600',
      programDates: 'Jun 11, 2025 - Jul 09, 2025, Sep 24, 2025 - Oct 22, 2025',
      itemId: '98160cc0-5769-4b63-a7b3-01d150d36b13'
    },
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/3.jpg',
      school: 'Harvard Faculty of Arts & Sciences',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '950, 950',
      programDates: 'May 28, 2025 - Jun 25, 2025, Aug 27, 2025 - Sep 24, 2025',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Data Science for Business',
      tagline: 'Move beyond the spreadsheet',
      description: '<p>Designed for managers, this course provides a hands-on approach for demystifying the data science ecosystem and making you a more conscientious.</p>',
      imageUrl: 'assets/4.jpg',
      school: 'Harvard Business School',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '1600, 1600',
      programDates: 'Jun 11, 2025 - Jul 09, 2025, Sep 24, 2025 - Oct 22, 2025',
      itemId: '98160cc0-5769-4b63-a7b3-01d150d36b13'
    },
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy.</p>',
      imageUrl: 'assets/5.jpg',
      school: 'Harvard Faculty of Arts & Sciences',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '950, 950',
      programDates: 'May 28, 2025 - Jun 25, 2025, Aug 27, 2025 - Sep 24, 2025',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Open Innovation',
      tagline: 'Solve your organization’s problems by looking outside your organization',
      description: '<p>Open innovation is a strategy that suggests the best ideas, solutions, and people necessary to solve your organization’s difficult problems may come ;</p>',
      imageUrl: 'https://www.harvardonline.harvard.edu/sites/default/files/styles/teaser/public/2022-01/078916028-crowd-people-walking-street.jpeg.webp?itok=_EK-25lu',
      school: 'Harvard Business School',
      category: 'Business',
      category2: '',
      certificatePrice: '950, 950',
      programDates: 'Jun 18, 2025 - Jul 30, 2025, Aug 27, 2025 - Oct 08, 2025',
      itemId: 'db7d6b76-d3d9-4657-b2fd-19f96ed507d2'
    }
  ];
  

  showAccountModal = false; // Ajouter la propriété manquante

  openAccountModal() {
    this.showAccountModal = true;
  }

  closeAccountModal() {
    this.showAccountModal = false;
  }

  currentStudent: Student = {
    photo: '',
    cne: 'A123456',
    lastName: 'Doe',
    firstName: 'John',
    email: 'john.doe@example.com',
    birthPlace: 'Casa',
    birthDate: '1995-05-15',
    program: 'GINF',
    studyYear: '2021/2022',
    apogee: '123456'
  };

  constructor(private router: Router) { }

  getInitials(): string {
    return (
      this.currentStudent.firstName[0] + 
      this.currentStudent.lastName[0]
    ).toUpperCase();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentStudent.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }














  // Ajouter ces propriétés à la classe
showNotifications = false;
showHistory = false;

notifications = [
  {
    id: 1,
    title: 'Nouveau test disponible',
    message: 'Test de programmation Java - Niveau intermédiaire',
    date: 'Il y a 2 heures',
    read: false
  },
  {
    id: 2,
    title: 'Test terminé',
    message: 'Web Frontend - Score: 85%',
    date: '15/03/2024',
    read: true
  },
  {
    id: 3,
    title: 'Rappel de test',
    message: 'Test de sécurité réseau - Échéance dans 24h',
    date: 'Il y a 5 heures',
    read: false
  }
];

testHistory = [
  {
    id: 101,
    title: 'Web Frontend Avancé',
    score: '85%',
    date: '15/03/2024'
  },
  {
    id: 102,
    title: 'Réseaux Informatiques',
    score: '92%',
    date: '10/03/2024'
  },
  {
    id: 103,
    title: 'Base de données SQL',
    score: '78%',
    date: '01/03/2024'
  }
];

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.notification-container')) {
    this.showNotifications = false;
  }
  if (!target.closest('.history-container')) {
    this.showHistory = false;
  }
}

toggleNotifications(event: Event) {
  event.preventDefault();
  this.showNotifications = !this.showNotifications;
  this.showHistory = false;
}

toggleHistory(event: Event) {
  event.preventDefault();
  this.showHistory = !this.showHistory;
  this.showNotifications = false;
}

// Calculer les notifications non lues
get unreadNotificationsCount(): number {
  return this.notifications.filter(notif => !notif.read).length;
}

// Méthodes
markAsRead(index: number): void {
  this.notifications[index].read = true;
}

navigateToTest(testId: number): void {
  this.router.navigate(['/test', testId]);
  this.showHistory = false;
}


navigateToCourseDetail(course: any): void {
  this.router.navigate(['/formation-test', course.itemId], { 
    state: { course: course }
  });
}

}


