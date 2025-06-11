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
    title: 'Évaluation - Développement Web avec React',
    formation: 'Développement Web avec React',
    dateCreation: '2025-06-01',
    dateFin: '2025-06-30',
    questions: [
      {
        text: 'Comment évaluez-vous la qualité globale de cette formation React ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Le contenu de la formation correspond-il à vos attentes ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Plutôt bien' },
          { text: 'Partiellement' },
          { text: 'Peu' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'La progression pédagogique vous semble-t-elle adaptée ?',
        choices: [
          { text: 'Très bien adaptée' },
          { text: 'Bien adaptée' },
          { text: 'Moyennement adaptée' },
          { text: 'Mal adaptée' }
        ]
      },
      {
        text: 'Comment jugez-vous la clarté des explications du professeur ?',
        choices: [
          { text: 'Très claire' },
          { text: 'Claire' },
          { text: 'Acceptable' },
          { text: 'Confuse' },
          { text: 'Très confuse' }
        ]
      },
      {
        text: 'Les exercices pratiques sont-ils suffisamment nombreux ?',
        choices: [
          { text: 'Largement suffisants' },
          { text: 'Suffisants' },
          { text: 'Juste suffisants' },
          { text: 'Insuffisants' }
        ]
      },
      {
        text: 'La durée de la formation (3 mois) vous paraît-elle appropriée ?',
        choices: [
          { text: 'Parfaite' },
          { text: 'Légèrement longue' },
          { text: 'Légèrement courte' },
          { text: 'Trop longue' },
          { text: 'Trop courte' }
        ]
      },
      {
        text: 'Recommanderiez-vous cette formation à un collègue ?',
        choices: [
          { text: 'Certainement' },
          { text: 'Probablement' },
          { text: 'Peut-être' },
          { text: 'Probablement pas' },
          { text: 'Certainement pas' }
        ]
      },
      {
        text: 'Comment évaluez-vous la qualité des supports de cours ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Correcte' },
          { text: 'Médiocre' }
        ]
      },
      {
        text: 'Le rythme de la formation vous convient-il ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Plutôt bien' },
          { text: 'Un peu rapide' },
          { text: 'Un peu lent' },
          { text: 'Inadapté' }
        ]
      },
      {
        text: 'Les concepts React sont-ils bien expliqués ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Moyennement' },
          { text: 'Mal' }
        ]
      },
      {
        text: 'Estimez-vous avoir acquis les compétences attendues ?',
        choices: [
          { text: 'Complètement' },
          { text: 'En grande partie' },
          { text: 'Partiellement' },
          { text: 'Très peu' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Comment jugez-vous l\'organisation générale de la formation ?',
        choices: [
          { text: 'Très bien organisée' },
          { text: 'Bien organisée' },
          { text: 'Correctement organisée' },
          { text: 'Mal organisée' }
        ]
      },
      {
        text: 'La formation vous aide-t-elle dans votre projet professionnel ?',
        choices: [
          { text: 'Énormément' },
          { text: 'Beaucoup' },
          { text: 'Modérément' },
          { text: 'Peu' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Comment évaluez-vous la disponibilité du formateur ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Satisfaisante' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les outils et technologies présentés sont-ils actuels ?',
        choices: [
          { text: 'Très actuels' },
          { text: 'Actuels' },
          { text: 'Moyennement actuels' },
          { text: 'Dépassés' }
        ]
      },
      {
        text: 'Comment notez-vous l\'ambiance de travail durant la formation ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Correcte' },
          { text: 'Tendue' },
          { text: 'Désagréable' }
        ]
      },
      {
        text: 'La formation répond-elle aux besoins du marché du travail ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Bien' },
          { text: 'Partiellement' },
          { text: 'Peu' }
        ]
      },
      {
        text: 'Quel est votre niveau de satisfaction global ?',
        choices: [
          { text: 'Très satisfait' },
          { text: 'Satisfait' },
          { text: 'Moyennement satisfait' },
          { text: 'Insatisfait' },
          { text: 'Très insatisfait' }
        ]
      },
      {
        text: 'Comment évaluez-vous le rapport qualité/durée de la formation ?',
        choices: [
          { text: 'Excellent' },
          { text: 'Bon' },
          { text: 'Correct' },
          { text: 'Médiocre' }
        ]
      },
      {
        text: 'Souhaiteriez-vous suivre d\'autres formations avec ce même formateur ?',
        choices: [
          { text: 'Absolument' },
          { text: 'Oui' },
          { text: 'Peut-être' },
          { text: 'Non' },
          { text: 'Absolument pas' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Évaluation - Introduction à la Data Science avec Python',
    formation: 'Introduction à la Data Science avec Python',
    dateCreation: '2025-07-15',
    dateFin: '2025-08-15',
    questions: [
      {
        text: 'Comment évaluez-vous la qualité globale de cette formation Data Science ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'L\'introduction aux bibliothèques Python est-elle suffisante ?',
        choices: [
          { text: 'Largement suffisante' },
          { text: 'Suffisante' },
          { text: 'Juste suffisante' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'La formation couvre-t-elle bien Pandas et NumPy ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Moyennement' },
          { text: 'Insuffisamment' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Comment jugez-vous la progression du niveau débutant vers l\'apprentissage automatique ?',
        choices: [
          { text: 'Très progressive' },
          { text: 'Progressive' },
          { text: 'Acceptable' },
          { text: 'Trop brutale' }
        ]
      },
      {
        text: 'Les exemples pratiques sont-ils pertinents ?',
        choices: [
          { text: 'Très pertinents' },
          { text: 'Pertinents' },
          { text: 'Moyennement pertinents' },
          { text: 'Peu pertinents' },
          { text: 'Pas pertinents' }
        ]
      },
      {
        text: 'La durée de 3 mois vous semble-t-elle adaptée pour ce contenu ?',
        choices: [
          { text: 'Parfaitement adaptée' },
          { text: 'Adaptée' },
          { text: 'Un peu courte' },
          { text: 'Un peu longue' }
        ]
      },
      {
        text: 'Comment évaluez-vous l\'expertise du formateur en Data Science ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les projets pratiques vous permettent-ils d\'appliquer les concepts ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Bien' },
          { text: 'Partiellement' },
          { text: 'Peu' }
        ]
      },
      {
        text: 'Comment notez-vous la qualité de l\'enseignement de Matplotlib ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Correcte' },
          { text: 'Médiocre' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'La formation vous prépare-t-elle bien aux défis réels de la Data Science ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Moyennement' },
          { text: 'Mal' }
        ]
      },
      {
        text: 'Recommanderiez-vous cette formation à quelqu\'un débutant en Data Science ?',
        choices: [
          { text: 'Vivement recommandée' },
          { text: 'Recommandée' },
          { text: 'Peut-être' },
          { text: 'Non recommandée' },
          { text: 'Fortement déconseillée' }
        ]
      },
      {
        text: 'Comment jugez-vous l\'équilibre théorie/pratique ?',
        choices: [
          { text: 'Parfait' },
          { text: 'Bon' },
          { text: 'Trop théorique' },
          { text: 'Trop pratique' }
        ]
      },
      {
        text: 'Les bases de l\'apprentissage automatique sont-elles bien présentées ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Correctement' },
          { text: 'Mal' },
          { text: 'Très mal' }
        ]
      },
      {
        text: 'Comment évaluez-vous la qualité des données utilisées dans les exercices ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Médiocre' }
        ]
      },
      {
        text: 'La formation vous donne-t-elle confiance pour vos futurs projets Data Science ?',
        choices: [
          { text: 'Beaucoup de confiance' },
          { text: 'Confiance' },
          { text: 'Un peu de confiance' },
          { text: 'Peu de confiance' },
          { text: 'Aucune confiance' }
        ]
      },
      {
        text: 'Comment notez-vous la disponibilité du formateur pour les questions ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Satisfaisante' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les outils et méthodes enseignés sont-ils utilisés en entreprise ?',
        choices: [
          { text: 'Très utilisés' },
          { text: 'Utilisés' },
          { text: 'Moyennement utilisés' },
          { text: 'Peu utilisés' }
        ]
      },
      {
        text: 'Votre niveau de satisfaction concernant l\'organisation pédagogique ?',
        choices: [
          { text: 'Très satisfait' },
          { text: 'Satisfait' },
          { text: 'Moyennement satisfait' },
          { text: 'Insatisfait' },
          { text: 'Très insatisfait' }
        ]
      },
      {
        text: 'Comment évaluez-vous la pertinence des cas d\'usage présentés ?',
        choices: [
          { text: 'Très pertinents' },
          { text: 'Pertinents' },
          { text: 'Moyennement pertinents' },
          { text: 'Peu pertinents' }
        ]
      },
      {
        text: 'Souhaiteriez-vous approfondir avec une formation avancée en Data Science ?',
        choices: [
          { text: 'Absolument' },
          { text: 'Oui' },
          { text: 'Peut-être' },
          { text: 'Non' },
          { text: 'Pas du tout' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Évaluation - Systèmes embarqués et programmation Arduino',
    formation: 'Systèmes embarqués et programmation Arduino',
    dateCreation: '2025-04-10',
    dateFin: '2025-05-10',
    questions: [
      {
        text: 'Comment évaluez-vous la qualité globale de cette formation Arduino ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'L\'introduction aux systèmes embarqués est-elle claire ?',
        choices: [
          { text: 'Très claire' },
          { text: 'Claire' },
          { text: 'Acceptable' },
          { text: 'Confuse' }
        ]
      },
      {
        text: 'La partie pratique avec Arduino est-elle suffisante ?',
        choices: [
          { text: 'Largement suffisante' },
          { text: 'Suffisante' },
          { text: 'Juste suffisante' },
          { text: 'Insuffisante' },
          { text: 'Très insuffisante' }
        ]
      },
      {
        text: 'Comment jugez-vous la progression des projets Arduino ?',
        choices: [
          { text: 'Très bien progressive' },
          { text: 'Bien progressive' },
          { text: 'Correcte' },
          { text: 'Trop rapide' }
        ]
      },
      {
        text: 'Les composants électroniques sont-ils bien expliqués ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Moyennement' },
          { text: 'Mal' },
          { text: 'Très mal' }
        ]
      },
      {
        text: 'La durée de 2 mois est-elle appropriée pour ce contenu ?',
        choices: [
          { text: 'Parfaite' },
          { text: 'Appropriée' },
          { text: 'Un peu courte' },
          { text: 'Un peu longue' }
        ]
      },
      {
        text: 'Comment évaluez-vous l\'expertise du formateur en électronique ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les projets pratiques correspondent-ils aux applications réelles ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Bien' },
          { text: 'Partiellement' },
          { text: 'Peu' }
        ]
      },
      {
        text: 'Comment notez-vous la qualité du matériel Arduino fourni ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Correcte' },
          { text: 'Médiocre' }
        ]
      },
      {
        text: 'La formation vous prépare-t-elle à développer vos propres projets ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Moyennement' },
          { text: 'Mal' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Recommanderiez-vous cette formation aux étudiants en G3EI ?',
        choices: [
          { text: 'Vivement recommandée' },
          { text: 'Recommandée' },
          { text: 'Peut-être' },
          { text: 'Non recommandée' }
        ]
      },
      {
        text: 'Comment jugez-vous l\'équilibre théorie électronique/pratique Arduino ?',
        choices: [
          { text: 'Parfait' },
          { text: 'Bon' },
          { text: 'Trop théorique' },
          { text: 'Trop pratique' }
        ]
      },
      {
        text: 'Les concepts de programmation embarquée sont-ils bien transmis ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Correctement' },
          { text: 'Mal' }
        ]
      },
      {
        text: 'Comment évaluez-vous la diversité des capteurs et actionneurs étudiés ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' },
          { text: 'Très insuffisante' }
        ]
      },
      {
        text: 'La formation stimule-t-elle votre créativité en électronique ?',
        choices: [
          { text: 'Énormément' },
          { text: 'Beaucoup' },
          { text: 'Modérément' },
          { text: 'Peu' }
        ]
      },
      {
        text: 'Comment notez-vous l\'accompagnement pendant les travaux pratiques ?',
        choices: [
          { text: 'Excellent' },
          { text: 'Bon' },
          { text: 'Satisfaisant' },
          { text: 'Insuffisant' }
        ]
      },
      {
        text: 'Les compétences acquises sont-elles transférables à d\'autres plateformes ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Bien' },
          { text: 'Partiellement' },
          { text: 'Peu' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Votre niveau de satisfaction concernant les ressources pédagogiques ?',
        choices: [
          { text: 'Très satisfait' },
          { text: 'Satisfait' },
          { text: 'Moyennement satisfait' },
          { text: 'Insatisfait' }
        ]
      },
      {
        text: 'Comment évaluez-vous la pertinence pour votre filière G3EI ?',
        choices: [
          { text: 'Très pertinente' },
          { text: 'Pertinente' },
          { text: 'Moyennement pertinente' },
          { text: 'Peu pertinente' }
        ]
      },
      {
        text: 'Souhaiteriez-vous une formation avancée en robotique ou IoT ?',
        choices: [
          { text: 'Absolument' },
          { text: 'Oui' },
          { text: 'Peut-être' },
          { text: 'Non' },
          { text: 'Pas du tout' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Évaluation - Sécurité des réseaux et cryptographie',
    formation: 'Sécurité des réseaux et cryptographie',
    dateCreation: '2025-06-30',
    dateFin: '2025-07-30',
    questions: [
      {
        text: 'Comment évaluez-vous la qualité globale de cette formation en cybersécurité ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'L\'introduction aux principes de cybersécurité est-elle complète ?',
        choices: [
          { text: 'Très complète' },
          { text: 'Complète' },
          { text: 'Acceptable' },
          { text: 'Incomplète' }
        ]
      },
      {
        text: 'La partie cryptographie est-elle bien structurée ?',
        choices: [
          { text: 'Très bien structurée' },
          { text: 'Bien structurée' },
          { text: 'Moyennement structurée' },
          { text: 'Mal structurée' },
          { text: 'Très mal structurée' }
        ]
      },
      {
        text: 'Comment jugez-vous la complexité des concepts enseignés ?',
        choices: [
          { text: 'Bien adaptée' },
          { text: 'Acceptable' },
          { text: 'Trop complexe' },
          { text: 'Trop simple' }
        ]
      },
      {
        text: 'Les protocoles de sécurité réseau sont-ils clairement expliqués ?',
        choices: [
          { text: 'Très clairement' },
          { text: 'Clairement' },
          { text: 'Moyennement' },
          { text: 'Confusément' },
          { text: 'Très confusément' }
        ]
      },
      {
        text: 'La durée de 2 mois est-elle suffisante pour ce contenu dense ?',
        choices: [
          { text: 'Largement suffisante' },
          { text: 'Suffisante' },
          { text: 'Juste suffisante' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Comment évaluez-vous l\'expertise du formateur en cybersécurité ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les cas pratiques de sécurité sont-ils réalistes ?',
        choices: [
          { text: 'Très réalistes' },
          { text: 'Réalistes' },
          { text: 'Moyennement réalistes' },
          { text: 'Peu réalistes' }
        ]
      },
      {
        text: 'Comment notez-vous l\'actualité des menaces présentées ?',
        choices: [
          { text: 'Très actuelles' },
          { text: 'Actuelles' },
          { text: 'Moyennement actuelles' },
          { text: 'Dépassées' }
        ]
      },
      {
        text: 'La formation vous prépare-t-elle aux défis de sécurité en entreprise ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Bien' },
          { text: 'Partiellement' },
          { text: 'Mal' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Recommanderiez-vous cette formation aux étudiants GSEA ?',
        choices: [
          { text: 'Vivement recommandée' },
          { text: 'Recommandée' },
          { text: 'Peut-être' },
          { text: 'Non recommandée' }
        ]
      },
      {
        text: 'Comment jugez-vous l\'équilibre entre théorie et outils pratiques ?',
        choices: [
          { text: 'Parfait' },
          { text: 'Bon' },
          { text: 'Trop théorique' },
          { text: 'Trop pratique' }
        ]
      },
      {
        text: 'Les méthodes d\'attaque et de défense sont-elles bien présentées ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Correctement' },
          { text: 'Mal' }
        ]
      },
      {
        text: 'Comment évaluez-vous la qualité des exercices de cryptographie ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Médiocre' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'La formation développe-t-elle votre esprit critique en sécurité ?',
        choices: [
          { text: 'Énormément' },
          { text: 'Beaucoup' },
          { text: 'Modérément' },
          { text: 'Peu' }
        ]
      },
      {
        text: 'Comment notez-vous la présentation des normes et réglementations ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Satisfaisante' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les outils de sécurité présentés sont-ils utilisés professionnellement ?',
        choices: [
          { text: 'Très utilisés' },
          { text: 'Utilisés' },
          { text: 'Moyennement utilisés' },
          { text: 'Peu utilisés' },
          { text: 'Obsolètes' }
        ]
      },
      {
        text: 'Votre niveau de satisfaction concernant les démonstrations pratiques ?',
        choices: [
          { text: 'Très satisfait' },
          { text: 'Satisfait' },
          { text: 'Moyennement satisfait' },
          { text: 'Insatisfait' }
        ]
      },
      {
        text: 'Comment évaluez-vous la pertinence pour les enjeux actuels de sécurité ?',
        choices: [
          { text: 'Très pertinente' },
          { text: 'Pertinente' },
          { text: 'Moyennement pertinente' },
          { text: 'Peu pertinente' }
        ]
      },
      {
        text: 'Souhaiteriez-vous approfondir avec une formation spécialisée en cybersécurité ?',
        choices: [
          { text: 'Absolument' },
          { text: 'Oui' },
          { text: 'Peut-être' },
          { text: 'Non' },
          { text: 'Pas du tout' }
        ]
      }
    ]
  },
  
  {
    id: '5',
    title: 'Évaluation - Optimisation des processus industriels',
    formation: 'Optimisation des processus industriels',
    dateCreation: '2025-06-20',
    dateFin: '2025-07-20',
    questions: [
      {
        text: 'Comment évaluez-vous la qualité globale de cette formation en optimisation industrielle ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'L\'introduction aux techniques d\'optimisation est-elle claire ?',
        choices: [
          { text: 'Très claire' },
          { text: 'Claire' },
          { text: 'Acceptable' },
          { text: 'Confuse' }
        ]
      },
      {
        text: 'La partie logistique industrielle est-elle bien développée ?',
        choices: [
          { text: 'Très bien développée' },
          { text: 'Bien développée' },
          { text: 'Moyennement développée' },
          { text: 'Mal développée' },
          { text: 'Très mal développée' }
        ]
      },
      {
        text: 'Comment jugez-vous la pertinence des cas d\'étude industriels ?',
        choices: [
          { text: 'Très pertinents' },
          { text: 'Pertinents' },
          { text: 'Moyennement pertinents' },
          { text: 'Peu pertinents' }
        ]
      },
      {
        text: 'Les méthodes de gestion de production sont-elles actuelles ?',
        choices: [
          { text: 'Très actuelles' },
          { text: 'Actuelles' },
          { text: 'Moyennement actuelles' },
          { text: 'Dépassées' },
          { text: 'Obsolètes' }
        ]
      },
      {
        text: 'La durée de 3 mois est-elle appropriée pour ce contenu ?',
        choices: [
          { text: 'Parfaitement appropriée' },
          { text: 'Appropriée' },
          { text: 'Un peu courte' },
          { text: 'Un peu longue' }
        ]
      },
      {
        text: 'Comment évaluez-vous la complémentarité des deux formateurs ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Très bonne' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les outils d\'optimisation présentés sont-ils utilisables en entreprise ?',
        choices: [
          { text: 'Parfaitement utilisables' },
          { text: 'Utilisables' },
          { text: 'Partiellement utilisables' },
          { text: 'Peu utilisables' }
        ]
      },
      {
        text: 'Comment notez-vous la qualité des simulations industrielles ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Correcte' },
          { text: 'Médiocre' }
        ]
      },
      {
        text: 'La formation vous prépare-t-elle à optimiser de vrais processus industriels ?',
        choices: [
          { text: 'Parfaitement' },
          { text: 'Bien' },
          { text: 'Partiellement' },
          { text: 'Mal' },
          { text: 'Pas du tout' }
        ]
      },
      {
        text: 'Recommanderiez-vous cette formation aux étudiants GIND ?',
        choices: [
          { text: 'Vivement recommandée' },
          { text: 'Recommandée' },
          { text: 'Peut-être' },
          { text: 'Non recommandée' }
        ]
      },
      {
        text: 'Comment jugez-vous l\'équilibre entre théorie et applications pratiques ?',
        choices: [
          { text: 'Parfait' },
          { text: 'Bon' },
          { text: 'Trop théorique' },
          { text: 'Trop pratique' }
        ]
      },
      {
        text: 'Les indicateurs de performance industrielle sont-ils bien expliqués ?',
        choices: [
          { text: 'Très bien' },
          { text: 'Bien' },
          { text: 'Correctement' },
          { text: 'Mal' }
        ]
      },
      {
        text: 'Comment évaluez-vous la diversité des secteurs industriels couverts ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Moyenne' },
          { text: 'Insuffisante' },
          { text: 'Très insuffisante' }
        ]
      },
      {
        text: 'La formation développe-t-elle votre capacité d\'analyse industrielle ?',
        choices: [
          { text: 'Énormément' },
          { text: 'Beaucoup' },
          { text: 'Modérément' },
          { text: 'Peu' }
        ]
      },
      {
        text: 'Comment notez-vous l\'intégration des aspects environnementaux ?',
        choices: [
          { text: 'Excellente' },
          { text: 'Bonne' },
          { text: 'Satisfaisante' },
          { text: 'Insuffisante' }
        ]
      },
      {
        text: 'Les logiciels d\'optimisation présentés sont-ils professionnels ?',
        choices: [
          { text: 'Très professionnels' },
          { text: 'Professionnels' },
          { text: 'Moyennement professionnels' },
          { text: 'Peu professionnels' },
          { text: 'Non professionnels' }
        ]
      },
      {
        text: 'Votre niveau de satisfaction concernant les projets de groupe ?',
        choices: [
          { text: 'Très satisfait' },
          { text: 'Satisfait' },
          { text: 'Moyennement satisfait' },
          { text: 'Insatisfait' }
        ]
      },
      {
        text: 'Comment évaluez-vous la pertinence pour l\'industrie 4.0 ?',
        choices: [
          { text: 'Très pertinente' },
          { text: 'Pertinente' },
          { text: 'Moyennement pertinente' },
          { text: 'Peu pertinente' }
        ]
      },
      {
        text: 'Souhaiteriez-vous une formation avancée en lean manufacturing ?',
        choices: [
          { text: 'Absolument' },
          { text: 'Oui' },
          { text: 'Peut-être' },
          { text: 'Non' },
          { text: 'Pas du tout' }
        ]
      }
    ]
  },

    {
      id: '6',
      title: 'Évaluation - Administration des bases de données',
      formation: 'Administration des bases de données',
      dateCreation: '2025-03-30',
      dateFin: '2025-04-30',
      questions: [
        {
          text: 'Comment évaluez-vous la qualité globale de cette formation en administration BDD ?',
          choices: [
            { text: 'Excellente' },
            { text: 'Très bonne' },
            { text: 'Bonne' },
            { text: 'Moyenne' },
            { text: 'Insuffisante' }
          ]
        },
        {
          text: 'L\'introduction à la conception de bases de données est-elle suffisante ?',
          choices: [
            { text: 'Largement suffisante' },
            { text: 'Suffisante' },
            { text: 'Juste suffisante' },
            { text: 'Insuffisante' }
          ]
        },
        {
          text: 'La partie administration SQL Server est-elle bien couverte ?',
          choices: [
            { text: 'Très bien couverte' },
            { text: 'Bien couverte' },
            { text: 'Moyennement couverte' },
            { text: 'Mal couverte' },
            { text: 'Très mal couverte' }
          ]
        },
        {
          text: 'Comment jugez-vous la progression de SQL Server vers PostgreSQL ?',
          choices: [
            { text: 'Très fluide' },
            { text: 'Fluide' },
            { text: 'Acceptable' },
            { text: 'Abrupte' }
          ]
        },
        {
          text: 'Les techniques d\'optimisation des requêtes sont-elles claires ?',
          choices: [
            { text: 'Très claires' },
            { text: 'Claires' },
            { text: 'Moyennement claires' },
            { text: 'Confuses' },
            { text: 'Très confuses' }
          ]
        },
        {
          text: 'La durée de 2,5 mois est-elle adaptée à ce contenu technique ?',
          choices: [
            { text: 'Parfaitement adaptée' },
            { text: 'Adaptée' },
            { text: 'Un peu courte' },
            { text: 'Un peu longue' }
          ]
        },
        {
          text: 'Comment évaluez-vous l\'expertise du formateur en bases de données ?',
          choices: [
            { text: 'Excellente' },
            { text: 'Très bonne' },
            { text: 'Bonne' },
            { text: 'Moyenne' },
            { text: 'Insuffisante' }
          ]
        },
        {
          text: 'Les exercices pratiques d\'administration sont-ils réalistes ?',
          choices: [
            { text: 'Très réalistes' },
            { text: 'Réalistes' },
            { text: 'Moyennement réalistes' },
            { text: 'Peu réalistes' }
          ]
        },
        {
          text: 'Comment notez-vous la couverture des systèmes distribués ?',
          choices: [
            { text: 'Excellente' },
            { text: 'Bonne' },
            { text: 'Correcte' },
            { text: 'Médiocre' }
          ]
        },
        {
          text: 'La formation vous prépare-t-elle aux défis d\'administration en entreprise ?',
          choices: [
            { text: 'Parfaitement' },
            { text: 'Bien' },
            { text: 'Partiellement' },
            { text: 'Mal' },
            { text: 'Pas du tout' }
          ]
        },
        {
          text: 'Recommanderiez-vous cette formation aux étudiants GINF ?',
          choices: [
            { text: 'Vivement recommandée' },
            { text: 'Recommandée' },
            { text: 'Peut-être' },
            { text: 'Non recommandée' }
          ]
        },
        {
          text: 'Comment jugez-vous l\'équilibre conception/administration/optimisation ?',
          choices: [
            { text: 'Parfait' },
            { text: 'Bon' },
            { text: 'Déséquilibré vers conception' },
            { text: 'Déséquilibré vers administration' }
          ]
        },
        {
          text: 'Les aspects de sécurité des bases de données sont-ils bien traités ?',
          choices: [
            { text: 'Très bien' },
            { text: 'Bien' },
            { text: 'Correctement' },
            { text: 'Mal' }
          ]
        },
        {
          text: 'Comment évaluez-vous la qualité des cas d\'usage présentés ?',
          choices: [
            { text: 'Excellente' },
            { text: 'Bonne' },
            { text: 'Moyenne' },
            { text: 'Médiocre' },
            { text: 'Insuffisante' }
          ]
        },
        {
          text: 'La formation développe-t-elle vos compétences de diagnostic BDD ?',
          choices: [
            { text: 'Énormément' },
            { text: 'Beaucoup' },
            { text: 'Modérément' },
            { text: 'Peu' }
          ]
        },
        {
          text: 'Comment notez-vous la présentation des stratégies de sauvegarde ?',
          choices: [
            { text: 'Excellente' },
            { text: 'Bonne' },
            { text: 'Satisfaisante' },
            { text: 'Insuffisante' }
          ]
        },
        {
          text: 'Les outils d\'administration présentés sont-ils utilisés en entreprise ?',
          choices: [
            { text: 'Très utilisés' },
            { text: 'Utilisés' },
            { text: 'Moyennement utilisés' },
            { text: 'Peu utilisés' },
            { text: 'Obsolètes' }
          ]
        },
        {
          text: 'Votre niveau de satisfaction concernant les travaux dirigés ?',
          choices: [
            { text: 'Très satisfait' },
            { text: 'Satisfait' },
            { text: 'Moyennement satisfait' },
            { text: 'Insatisfait' }
          ]
        },
        {
          text: 'Comment évaluez-vous la pertinence pour les métiers de la donnée ?',
          choices: [
            { text: 'Très pertinente' },
            { text: 'Pertinente' },
            { text: 'Moyennement pertinente' },
            { text: 'Peu pertinente' }
          ]
        },
        {
          text: 'Souhaiteriez-vous approfondir avec une formation en Big Data ?',
          choices: [
            { text: 'Absolument' },
            { text: 'Oui' },
            { text: 'Peut-être' },
            { text: 'Non' },
            { text: 'Pas du tout' }
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