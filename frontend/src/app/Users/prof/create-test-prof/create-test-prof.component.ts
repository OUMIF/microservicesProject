import { Component } from '@angular/core';
import { SidebarProfComponent } from '../sidebar-prof/sidebar-prof.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

interface Choice {
  text: string;
}

interface Question {
  text: string;
  choices: Choice[];
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
  selector: 'app-create-test-prof',
  standalone: true,
  imports: [SidebarProfComponent, RouterModule, FormsModule, CommonModule],
  templateUrl: './create-test-prof.component.html',
  styleUrl: './create-test-prof.component.css'
})

export class CreateTestProfComponent  {
  sidebarCollapsed = false;
  showTestForm = false;
  showViewModal = false;
  editMode = false;
  searchTerm = '';
  editingQuestionIndex = -1;

  // Propriétés pour la modal de confirmation
  showConfirmationModal = false;
  confirmationData = {
    title: '',
    message: '',
    type: 'delete' as 'delete' | 'warning' | 'info' | 'edit',
    onConfirm: () => {}
  };

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
      title: 'Évaluation Data Science Avancée',
      formation: 'Data Science Principles',
      dateCreation: '2024-01-15',
      dateFin: '2024-02-15',
      questions: [
        {
          text: 'Décrivez les étapes principales d\'un projet de data science et leur importance.',
          choices: [
            { text: 'Définition du problème' },
            { text: 'Collection et nettoyage des données' },
            { text: 'Analyse exploratoire' },
            { text: 'Modélisation et validation' }
          ]
        },
        {
          text: 'Expliquez les différences entre l\'apprentissage supervisé et non supervisé.',
          choices: [
            { text: 'Apprentissage supervisé avec données étiquetées' },
            { text: 'Apprentissage non supervisé sans étiquettes' },
            { text: 'Applications pratiques de chaque méthode' }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Évaluation Intelligence Artificielle',
      formation: 'Intelligence Artificielle',
      dateCreation: '2024-01-20',
      dateFin: '2024-03-01',
      questions: [
        {
          text: 'Analysez les enjeux éthiques de l\'IA dans le recrutement.',
          choices: [
            { text: 'Biais algorithmiques' },
            { text: 'Transparence des décisions' },
            { text: 'Impact sur l\'emploi' },
            { text: 'Réglementation nécessaire' }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Évaluation Machine Learning Pratique',
      formation: 'Machine Learning',
      dateCreation: '2024-01-25',
      dateFin: '2024-02-25',
      questions: [
        {
          text: 'Évaluez les métriques de performance pour un modèle de classification.',
          choices: [
            { text: 'Précision et rappel' },
            { text: 'F1-score' },
            { text: 'Matrice de confusion' },
            { text: 'Courbe ROC' }
          ]
        },
        {
          text: 'Proposez des solutions pour traiter le surapprentissage.',
          choices: [
            { text: 'Régularisation' },
            { text: 'Validation croisée' },
            { text: 'Augmentation des données' },
            { text: 'Simplification du modèle' }
          ]
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

  // Méthodes pour la modal de confirmation
  openConfirmationModal(title: string, message: string, type: 'delete' | 'warning' | 'info' | 'edit', onConfirm: () => void) {
    this.confirmationData = {
      title,
      message,
      type,
      onConfirm
    };
    this.showConfirmationModal = true;
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
  }

  confirmAction() {
    this.confirmationData.onConfirm();
    this.closeConfirmationModal();
  }

  getConfirmButtonText(): string {
    switch (this.confirmationData.type) {
      case 'delete':
        return 'Supprimer';
      case 'edit':
        return 'Modifier';
      case 'info':
        return 'Enregistrer';
      default:
        return 'Confirmer';
    }
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
        alert(`La question ${i + 1} doit avoir au moins 2 options.`);
        return false;
      }

      const hasEmptyChoice = question.choices.some(choice => !choice.text.trim());
      if (hasEmptyChoice) {
        alert(`Toutes les options de la question ${i + 1} doivent être remplies.`);
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
    alert('Test d\'évaluation créé avec succès !');
  }

  updateTest(): void {
    const index = this.tests.findIndex(test => test.id === this.currentTest.id);
    if (index !== -1) {
      this.tests[index] = { ...this.currentTest };
      alert('Test d\'évaluation modifié avec succès !');
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
        { text: '' }
      ]
    };
    this.currentTest.questions.push(newQuestion);
  }

  removeQuestion(index: number): void {
    this.openConfirmationModal(
      'Supprimer la question',
      `Êtes-vous sûr de vouloir supprimer la question ${index + 1} ? Cette action est irréversible.`,
      'delete',
      () => {
        this.currentTest.questions.splice(index, 1);
      }
    );
  }

  addChoice(questionIndex: number): void {
    if (this.currentTest.questions[questionIndex].choices.length < 5) {
      this.currentTest.questions[questionIndex].choices.push({ text: '' });
    }
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    const question = this.currentTest.questions[questionIndex];
    if (question.choices.length > 2) {
      question.choices.splice(choiceIndex, 1);
    }
  }

  // Test actions
  viewTest(test: Test): void {
    this.viewingTest = JSON.parse(JSON.stringify(test)); // Deep copy
    this.showViewModal = true;
  }

  deleteTest(test: Test): void {
    this.openConfirmationModal(
      'Supprimer le test',
      `Êtes-vous sûr de vouloir supprimer le test "${test.title}" ? Cette action est irréversible.`,
      'delete',
      () => {
        const index = this.tests.findIndex(t => t.id === test.id);
        if (index !== -1) {
          this.tests.splice(index, 1);
        }
      }
    );
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
      alert('Toutes les options doivent être remplies.');
      return;
    }

    this.openConfirmationModal(
      'Confirmer la modification',
      'Êtes-vous sûr de vouloir sauvegarder les modifications de cette question ?',
      'edit',
      () => {
        this.editingQuestionIndex = -1;
      }
    );
  }

  

  deleteQuestionFromView(index: number): void {
    this.openConfirmationModal(
      'Supprimer la question',
      `Êtes-vous sûr de vouloir supprimer la question ${index + 1} ? Cette action est irréversible.`,
      'delete',
      () => {
        this.viewingTest.questions.splice(index, 1);
      }
    );
  }

  addQuestionToView(): void {
    const newQuestion: Question = {
      text: '',
      choices: [
        { text: '' },
        { text: '' }
      ]
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
    if (question.choices.length > 2) {
      question.choices.splice(choiceIndex, 1);
    }
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
        alert(`Toutes les options de la question ${i + 1} doivent être remplies.`);
        return;
      }
    }

    this.openConfirmationModal(
      'Enregistrer les modifications',
      'Êtes-vous sûr de vouloir enregistrer toutes les modifications apportées à ce test d\'évaluation ?',
      'info',
      () => {
        // Save modifications to the main tests array
        const index = this.tests.findIndex(test => test.id === this.viewingTest.id);
        if (index !== -1) {
          this.tests[index] = JSON.parse(JSON.stringify(this.viewingTest));
          this.closeViewModal();
        }
      }
    );
  }
}