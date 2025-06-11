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
      title: 'Développement Web avec React',
      tagline: 'Maîtrisez les bases du développement front-end moderne',
      description: '<p>Apprenez à créer des interfaces utilisateur dynamiques et performantes avec React, le framework JavaScript populaire pour le développement web.</p>',
      imageUrl: 'assets/1.jpg',
      school: '',
      category: '',
      category2: '',
      certificatePrice: '',
      programDates: '',
      itemId: '1a2b3c4d-11aa-22bb-33cc-44dd55667788'
    },
    {
      title: 'Introduction à la Data Science avec Python',
      tagline: 'Exploitez le potentiel de Python pour l’analyse de données',
      description: '<p>Formation pratique sur les bibliothèques Python essentielles pour la data science, comme Pandas, NumPy, et Matplotlib, ainsi que les bases de l’apprentissage automatique.</p>',
      imageUrl: 'assets/2.jpg',
      school: '',
      category: '',
      category2: '',
      certificatePrice: '',
      programDates: '',
      itemId: '9e8d7c6b-55aa-44bb-88cc-99dd11223344'
    },
    {
      title: 'Systèmes embarqués et programmation Arduino',
      tagline: 'Découvrez le monde de l’électronique programmable',
      description: '<p>Apprenez à concevoir et programmer des systèmes embarqués avec Arduino. Idéal pour les étudiants en génie électrique et électronique.</p>',
      imageUrl: 'assets/3.jpg',
      school: '',
      category: '',
      category2: '',
      certificatePrice: '',
      programDates: '',
      itemId: '3f4g5h6i-77cc-88dd-99ee-00ff11223344'
    },
    {
      title: 'Sécurité des réseaux et cryptographie',
      tagline: 'Protégez vos données et communications',
      description: '<p>Ce cours vous initie aux principes de la cybersécurité, de la cryptographie et des protocoles de sécurité réseau.</p>',
      imageUrl: 'assets/4.jpg',
      school: '',
      category: '',
      category2: '',
      certificatePrice: '',
      programDates: '',
      itemId: 'aabbccdd-eeff-0011-2233-445566778899'
    },
    {
      title: 'Optimisation des processus industriels',
      tagline: 'Améliorez la performance industrielle',
      description: '<p>Ce module aborde les techniques modernes d’optimisation, la logistique et la gestion de la production industrielle.</p>',
      imageUrl: 'assets/5.jpg',
      school: '',
      category: '',
      category2: '',
      certificatePrice: '',
      programDates: '',
      itemId: '99887766-5544-3322-1100-aabbccddeeff'
    },
    {
      title: 'Administration des bases de données',
      tagline: 'Gérez efficacement vos données',
      description: '<p>Maîtrisez la conception, l’administration et l’optimisation des bases de données relationnelles avec SQL Server et PostgreSQL.</p>',
      imageUrl: 'assets/6.jpg',
      school: '',
      category: '',
      category2: '',
      certificatePrice: '',
      programDates: '',
      itemId: '1122aabb-3344-5566-7788-99aabbccdde0'
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
    lastName: 'Ben Ali',
    firstName: 'Ahmed',
    email: 'ahmed@example.com',
    birthPlace: 'Tanger',
    birthDate: '2003-05-15',
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
    title: 'Évaluation - Développement Web avec React',
    message: 'Test de programmation Java - Niveau intermédiaire',
    date: 'Il y a 5 min',
    read: false
  },
  {
    id: 2,
    title: 'Test terminé',
    message: 'Évaluation - Systèmes embarqués et programmation Arduino',
    date: '10/06/2025',
    read: true
  },
  {
    id: 3,
    title: 'Rappel de test',
    message: 'Évaluation - Introduction à la Data Science avec Python',
    date: 'Il y a 5 heures',
    read: false
  }
];

testHistory = [
  {
    id: 101,
    title: 'Évaluation - Sécurité des réseaux et cryptographie',
    score: '',
    date: '30/05/2025'
  },
  {
    id: 102,
    title: 'Évaluation - Optimisation des processus industriels',
    score: '',
    date: '20/05/2025'
  },
  {
    id: 103,
    title: 'Évaluation - Administration des bases de données',
    score: '',
    date: '30/04/2025'
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


