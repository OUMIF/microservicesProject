import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

interface Choice {
  text: string;
}

interface Question {
  text: string;
  choices: Choice[];
  correctAnswer: number;
}

interface Test {
  id: string;
  title: string;
  formation: string;
  dateCreation: string;
  dateFin: string;
  questions: Question[];
}

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SidebarComponent, RouterModule, FormsModule, CommonModule],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent {
  sidebarCollapsed = false;
  showTestForm = false;
  showViewModal = false;
  editMode = false;
  searchTerm = '';
  editingQuestionIndex = -1;

  availableFormations: string[] = [
    'Data Science Principles',
    'Intelligence Artificielle',
    'Machine Learning',
    'Développement Web',
    'Marketing Digital',
    'Gestion de Projet'
  ];

  currentTest: Test = {
    id: '',
    title: '',
    formation: '',
    dateCreation: '',
    dateFin: '',
    questions: []
  };

  viewingTest: Test = {
    id: '',
    title: '',
    formation: '',
    dateCreation: '',
    dateFin: '',
    questions: []
  };

  tests: Test[] = [
    {
      id: '1',
      title: 'Test de validation Data Science',
      formation: 'Data Science Principles',
      dateCreation: '2024-01-15',
      dateFin: '2024-02-15',
      questions: [
        {
          text: 'Quelle est la première étape dans un projet de data science ?',
          choices: [
            { text: 'Collecter les données' },
            { text: 'Définir le problème' },
            { text: 'Nettoyer les données' },
            { text: 'Construire le modèle' }
          ],
          correctAnswer: 1
        },
        {
          text: 'Que signifie l\'acronyme ML ?',
          choices: [
            { text: 'Machine Learning' },
            { text: 'Maximum Likelihood' },
            { text: 'Multiple Linear' },
            { text: 'Model Logic' }
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      id: '2',
      title: 'Quiz Intelligence Artificielle Avancée',
      formation: 'Intelligence Artificielle',
      dateCreation: '2024-01-20',
      dateFin: '2024-03-01',
      questions: [
        {
          text: 'Quel type d\'IA peut apprendre sans supervision humaine ?',
          choices: [
            { text: 'Intelligence Artificielle Générale' },
            { text: 'Apprentissage non supervisé' },
            { text: 'Réseaux de neurones' },
            { text: 'Algorithmes génétiques' }
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: '3',
      title: 'Évaluation Machine Learning Fondamentaux',
      formation: 'Machine Learning',
      dateCreation: '2024-01-25',
      dateFin: '2024-02-25',
      questions: [
        {
          text: 'Quelle métrique est utilisée pour évaluer un modèle de classification ?',
          choices: [
            { text: 'MSE (Mean Squared Error)' },
            { text: 'Accuracy' },
            { text: 'R-squared' },
            { text: 'MAE (Mean Absolute Error)' }
          ],
          correctAnswer: 1
        },
        {
          text: 'Qu\'est-ce que l\'overfitting ?',
          choices: [
            { text: 'Quand le modèle est trop simple' },
            { text: 'Quand le modèle mémorise les données d\'entraînement' },
            { text: 'Quand le modèle ne converge pas' },
            { text: 'Quand les données sont insuffisantes' }
          ],
          correctAnswer: 1
        }
      ]
    }
  ];

  get filteredTests(): Test[] {
    if (!this.searchTerm) {
      return this.tests;
    }
    return this.tests.filter(test => 
      test.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      test.formation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSidebarToggled(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }

  // Test form management
  openTestForm(): void {
    this.resetCurrentTest();
    this.editMode = false;
    this.showTestForm = true;
  }

  closeTestForm(): void {
    this.showTestForm = false;
    this.resetCurrentTest();
  }

  resetCurrentTest(): void {
    this.currentTest = {
      id: '',
      title: '',
      formation: '',
      dateCreation: '',
      dateFin: '',
      questions: []
    };
  }

  submitTestForm(): void {
    if (this.validateTestForm()) {
      if (this.editMode) {
        this.updateTest();
      } else {
        this.createTest();
      }
      this.closeTestForm();
    }
  }

  validateTestForm(): boolean {
    if (!this.currentTest.title || !this.currentTest.formation || 
        !this.currentTest.dateCreation || !this.currentTest.dateFin) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }

    if (new Date(this.currentTest.dateFin) <= new Date(this.currentTest.dateCreation)) {
      alert('La date de fin doit être postérieure à la date de création.');
      return false;
    }

    if (this.currentTest.questions.length === 0) {
      alert('Veuillez ajouter au moins une question.');
      return false;
    }

    // Validate questions
    for (let i = 0; i < this.currentTest.questions.length; i++) {
      const question = this.currentTest.questions[i];
      if (!question.text.trim()) {
        alert(`La question ${i + 1} ne peut pas être vide.`);
        return false;
      }
      
      if (question.choices.length < 2) {
        alert(`La question ${i + 1} doit avoir au moins 2 choix.`);
        return false;
      }

      const hasEmptyChoice = question.choices.some(choice => !choice.text.trim());
      if (hasEmptyChoice) {
        alert(`Tous les choix de la question ${i + 1} doivent être remplis.`);
        return false;
      }

      if (question.correctAnswer === undefined || question.correctAnswer < 0) {
        alert(`Veuillez sélectionner la bonne réponse pour la question ${i + 1}.`);
        return false;
      }
    }

    return true;
  }

  createTest(): void {
    const newTest: Test = {
      ...this.currentTest,
      id: this.generateTestId()
    };
    this.tests.push(newTest);
    alert('Test créé avec succès !');
  }

  updateTest(): void {
    const index = this.tests.findIndex(test => test.id === this.currentTest.id);
    if (index !== -1) {
      this.tests[index] = { ...this.currentTest };
      alert('Test modifié avec succès !');
    }
  }

  generateTestId(): string {
    return (this.tests.length + 1).toString();
  }

  // Question management
  addQuestion(): void {
    const newQuestion: Question = {
      text: '',
      choices: [
        { text: '' },
        { text: '' },
        { text: '' }
      ],
      correctAnswer: -1
    };
    this.currentTest.questions.push(newQuestion);
  }

  removeQuestion(index: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      this.currentTest.questions.splice(index, 1);
    }
  }

  addChoice(questionIndex: number): void {
    if (this.currentTest.questions[questionIndex].choices.length < 5) {
      this.currentTest.questions[questionIndex].choices.push({ text: '' });
    }
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    const question = this.currentTest.questions[questionIndex];
    if (question.choices.length > 3) {
      question.choices.splice(choiceIndex, 1);
      // Adjust correct answer if necessary
      if (question.correctAnswer === choiceIndex) {
        question.correctAnswer = -1;
      } else if (question.correctAnswer > choiceIndex) {
        question.correctAnswer--;
      }
    }
  }

  setCorrectAnswer(questionIndex: number, choiceIndex: number): void {
    this.currentTest.questions[questionIndex].correctAnswer = choiceIndex;
  }

  // Test actions
  viewTest(test: Test): void {
    this.viewingTest = JSON.parse(JSON.stringify(test)); // Deep copy
    this.showViewModal = true;
  }

  deleteTest(test: Test): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le test "${test.title}" ?`)) {
      const index = this.tests.findIndex(t => t.id === test.id);
      if (index !== -1) {
        this.tests.splice(index, 1);
        alert('Test supprimé avec succès !');
      }
    }
  }

  // View modal management
  closeViewModal(): void {
    this.showViewModal = false;
    this.editingQuestionIndex = -1;
  }

  editQuestion(index: number): void {
    this.editingQuestionIndex = index;
  }

  cancelQuestionEdit(): void {
    this.editingQuestionIndex = -1;
    // Restore original data if needed
    const originalTest = this.tests.find(t => t.id === this.viewingTest.id);
    if (originalTest) {
      this.viewingTest = JSON.parse(JSON.stringify(originalTest));
    }
  }

  saveQuestionEdit(index: number): void {
    const question = this.viewingTest.questions[index];
    
    if (!question.text.trim()) {
      alert('La question ne peut pas être vide.');
      return;
    }

    const hasEmptyChoice = question.choices.some(choice => !choice.text.trim());
    if (hasEmptyChoice) {
      alert('Tous les choix doivent être remplis.');
      return;
    }

    if (question.correctAnswer === undefined || question.correctAnswer < 0) {
      alert('Veuillez sélectionner la bonne réponse.');
      return;
    }

    this.editingQuestionIndex = -1;
    alert('Question modifiée avec succès !');
  }

  deleteQuestionFromView(index: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      this.viewingTest.questions.splice(index, 1);
    }
  }

  addQuestionToView(): void {
    const newQuestion: Question = {
      text: '',
      choices: [
        { text: '' },
        { text: '' },
        { text: '' }
      ],
      correctAnswer: -1
    };
    this.viewingTest.questions.push(newQuestion);
    this.editingQuestionIndex = this.viewingTest.questions.length - 1;
  }

  addChoiceInView(questionIndex: number): void {
    if (this.viewingTest.questions[questionIndex].choices.length < 5) {
      this.viewingTest.questions[questionIndex].choices.push({ text: '' });
    }
  }

  removeChoiceInView(questionIndex: number, choiceIndex: number): void {
    const question = this.viewingTest.questions[questionIndex];
    if (question.choices.length > 3) {
      question.choices.splice(choiceIndex, 1);
      // Adjust correct answer if necessary
      if (question.correctAnswer === choiceIndex) {
        question.correctAnswer = -1;
      } else if (question.correctAnswer > choiceIndex) {
        question.correctAnswer--;
      }
    }
  }

  setCorrectAnswerInView(questionIndex: number, choiceIndex: number): void {
    this.viewingTest.questions[questionIndex].correctAnswer = choiceIndex;
  }

  saveTestModifications(): void {
    // Validate all questions before saving
    for (let i = 0; i < this.viewingTest.questions.length; i++) {
      const question = this.viewingTest.questions[i];
      if (!question.text.trim()) {
        alert(`La question ${i + 1} ne peut pas être vide.`);
        return;
      }
      
      const hasEmptyChoice = question.choices.some(choice => !choice.text.trim());
      if (hasEmptyChoice) {
        alert(`Tous les choix de la question ${i + 1} doivent être remplis.`);
        return;
      }

      if (question.correctAnswer === undefined || question.correctAnswer < 0) {
        alert(`Veuillez sélectionner la bonne réponse pour la question ${i + 1}.`);
        return;
      }
    }

    // Save modifications to the main tests array
    const index = this.tests.findIndex(test => test.id === this.viewingTest.id);
    if (index !== -1) {
      this.tests[index] = JSON.parse(JSON.stringify(this.viewingTest));
      alert('Modifications enregistrées avec succès !');
      this.closeViewModal();
    }
  }
}