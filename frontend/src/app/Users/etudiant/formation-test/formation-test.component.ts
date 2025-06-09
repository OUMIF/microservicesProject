import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Course {
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  itemId: string;
}

interface EvaluationQuestion {
  text: string;
  choices: { text: string }[];
  selectedAnswer?: number;
}

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
  selector: 'app-formation-test',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, RouterModule],
  templateUrl: './formation-test.component.html',
  styleUrl: './formation-test.component.css'
})
export class FormationTestComponent implements OnInit {
  course: Course | undefined;
  mayOfferDetails: any;
  augustOfferDetails: any;
  
  // Propriétés pour le header/footer
  showAccountModal = false;
  showNotifications = false;
  showHistory = false;

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
  
  evaluationQuestions: EvaluationQuestion[] = [
    {
      text: "Quelle est la première étape d'un projet de data science?",
      choices: [
        { text: "Collecte des données" },
        { text: "Nettoyage des données" },
        { text: "Définition du problème" },
        { text: "Visualisation des données" }
      ]
    },
    {
      text: "Quel est l'objectif principal de l'analyse exploratoire des données?",
      choices: [
        { text: "Prédire les résultats futurs" },
        { text: "Comprendre les caractéristiques des données" },
        { text: "Nettoyer automatiquement les données" },
        { text: "Créer des rapports pour les managers" }
      ]
    },
    {
      text: "Quelle technique utilise-t-on pour traiter les valeurs manquantes?",
      choices: [
        { text: "Suppression des lignes concernées" },
        { text: "Imputation par la moyenne/médiane" },
        { text: "Les deux méthodes sont valables" },
        { text: "Aucune de ces réponses" }
      ]
    }
  ];

  courses = [
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/1.jpg',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Data Science for Business',
      tagline: 'Move beyond the spreadsheet',
      description: '<p>Designed for managers, this course provides a hands-on approach for demystifying the data science ecosystem and making you a more conscientious.</p>',
      imageUrl: 'assets/2.jpg',
      itemId: '98160cc0-5769-4b63-a7b3-01d150d36b13'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.course = this.courses.find(c => c.itemId === courseId);
      
      if (this.course) {
        this.processCourseData();
      } else {
        console.error('Course not found with ID:', courseId);
        setTimeout(() => {
          this.router.navigate(['/accueil-etudiant']);
        }, 2000);
      }
    } else {
      console.error('No course ID provided');
      this.router.navigate(['/accueil-etudiant']);
    }
  }

  private processCourseData(): void {
    // Simuler des données pour le test
    this.augustOfferDetails = {
      month: 'August 2025',
      length: '4 weeks',
      hours: '4-5 hours per week',
      price: '$1200',
      dates: 'Aug 1, 2025 - Aug 29, 2025',
      applicationClose: 'Aug 18, 2025'
    };
  }

  submitEvaluation(): void {
    const score = this.calculateScore();
    alert(`Merci d'avoir complété l'évaluation! Votre score: ${score}/${this.evaluationQuestions.length}`);
  }

  private calculateScore(): number {
    // Logique de calcul du score basée sur les réponses sélectionnées
    // Ici, nous considérons que la première réponse est toujours la bonne pour l'exemple
    return this.evaluationQuestions.reduce((acc, question) => {
      return acc + (question.selectedAnswer === 0 ? 1 : 0);
    }, 0);
  }

  applyNow(): void {
    alert('Application form will open here');
  }

  enrollGroup(): void {
    alert('Group enrollment form will open here');
  }

  goBack(): void {
    this.router.navigate(['/accueil-etudiant']);
  }

  // Méthodes pour le header/footer
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

  openAccountModal() {
    this.showAccountModal = true;
  }

  closeAccountModal() {
    this.showAccountModal = false;
  }

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
}