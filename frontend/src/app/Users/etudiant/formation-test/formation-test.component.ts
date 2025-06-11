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
    lastName: 'Ben Ali',
    firstName: 'Ahmed',
    email: 'ahmed@example.com',
    birthPlace: 'Tanger',
    birthDate: '2003-05-15',
    program: 'GINF',
    studyYear: '2021/2022',
    apogee: '123456'
  };

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
      title: 'Développement Web avec React',
      tagline: 'Maîtrisez les bases du développement front-end moderne',
      description: '<p>Apprenez à créer des interfaces utilisateur dynamiques et performantes avec React, le framework JavaScript populaire pour le développement web.</p>',
      imageUrl: 'assets/1.jpg',
      itemId: '1a2b3c4d-11aa-22bb-33cc-44dd55667788'
    },
    {
      title: 'Introduction à la Data Science avec Python',
      tagline: 'Exploitez le potentiel de Python pour l’analyse de données',
      description: '<p>Formation pratique sur les bibliothèques Python essentielles pour la data science, comme Pandas, NumPy, et Matplotlib, ainsi que les bases de l’apprentissage automatique.</p>',
      imageUrl: 'assets/2.jpg',
      itemId: '9e8d7c6b-55aa-44bb-88cc-99dd11223344'
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