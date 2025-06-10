import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';

interface QuestionStat {
  question: string;
  responses: { [key: string]: number };
}

interface TestStat {
  totalParticipants: number;
  questions: QuestionStat[];
}

interface Test {
  id: number;
  title: string;
  content: string;
  date: string;
}


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
  objectKeys = Object.keys;
  selectedTest: Test | null = null;

    tests: Test[]  = [
      {
        id: 1,
        title: 'Évaluation Data Science Avancée',
        content: 'Data Science Principles',
        date: 'January 15, 2024'
      },
      {
        id: 2,
        title: 'Évaluation Intelligence Artificielle',
        content: 'Intelligence Artificielle',
        date: 'February 2, 2025'
      },
      {
        id: 3,
        title: 'Évaluation Machine Learning Pratique',
        content: 'Machine Learning',
        date: 'March 18, 2025'
      }
    ];

    testStats: { [key: number]: TestStat } = {
    1: {
      totalParticipants: 65,
      questions: [
        { question: 'Question 1 :Décrivez les étapes principales d\'un projet de data science et leur importance.', responses: { 'Réponse A: Définition du problème': 20, 'Réponse B:Collection et nettoyage des données': 15, 'Réponse C:Analyse exploratoire': 15 ,'Réponse D:Modélisation et validation': 15 } },
        { question: 'Question 2 :Expliquez les différences entre l\'apprentissage supervisé et non supervisé.', responses: { 'Réponse A: Apprentissage supervisé avec données étiquetées': 10, 'Réponse B: Apprentissage non supervisé sans étiquettes': 30, 'Réponse C: Applications pratiques de chaque méthode': 10 } },
      ]
    },
    2: {
      totalParticipants: 50,
      questions: [
        { question: 'Question 1 :Analysez les enjeux éthiques de l\'IA dans le recrutement.', responses: { 'Réponse A : Biais algorithmiques': 18, 'Réponse B :Transparence des décisions': 12, 'Réponse C :Impact sur l\'emploi': 10 ,'Réponse D :Réglementation nécessaire': 10  } },
      ]
    },
    3: {
      totalParticipants: 75,
      questions: [
        { question: 'Question 1 :Évaluez les métriques de performance pour un modèle de classification.', responses: { 'Réponse A : Précision et rappel': 25, 'Réponse B : F1-score': 20, 'Réponse C : Matrice de confusion': 15, 'Réponse D : Courbe ROC': 5 } },
        { question: 'Question 2 :Proposez des solutions pour traiter le surapprentissage.', responses: { 'Réponse A: Régularisation': 30, 'Réponse B : Validation croisée': 20, 'Réponse C : Augmentation des données': 10, 'Réponse D : Simplification du modèle': 10 } },

      ]
    }
  };

  get currentTestStats(): TestStat | null {
    return this.selectedTest ? this.testStats[this.selectedTest.id] || null : null;
  }

  selectedTestId: number | null = null;

  selectTest(testId: number) {
    if (this.selectedTestId === testId) {
      this.selectedTestId = null;  // Désélectionner si on reclique
    } else {
      this.selectedTestId = testId;
    }
  }



  navigateToTestDetails(testId: number) {
    if (this.selectedTest?.id === testId) {
      this.selectedTest = null; // désélectionner si clic sur le même test
    } else {
      this.selectedTest = this.tests.find(t => t.id === testId) || null;
    }
  }


}
