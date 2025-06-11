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

interface EvaluationTest {
  id: string;
  title: string;
  formation: string;
  dateCreation: string;
  dateFin: string;
  questions: EvaluationQuestion[];
}

@Component({
  selector: 'app-formation-test',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, RouterModule],
  templateUrl: './formation-test.component.html',
  styleUrls: ['./formation-test.component.css']
})
export class FormationTestComponent implements OnInit {
  course: Course | undefined;
  mayOfferDetails: any;
  augustOfferDetails: any;
  evaluationTests: EvaluationTest[] = [];
  evaluationQuestions: EvaluationQuestion[] = [];
  
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
    },
    {
      title: 'Systèmes embarqués et programmation Arduino',
      tagline: 'Découvrez le monde de l’électronique programmable',
      description: '<p>Apprenez à concevoir et programmer des systèmes embarqués avec Arduino. Idéal pour les étudiants en génie électrique et électronique.</p>',
      imageUrl: 'assets/3.jpg',
      itemId: '3f4g5h6i-77cc-88dd-99ee-00ff11223344'
    },
    {
      title: 'Sécurité des réseaux et cryptographie',
      tagline: 'Protégez vos données et communications',
      description: '<p>Ce cours vous initie aux principes de la cybersécurité, de la cryptographie et des protocoles de sécurité réseau.</p>',
      imageUrl: 'assets/4.jpg',
      itemId: 'aabbccdd-eeff-0011-2233-445566778899'
    },
    {
      title: 'Optimisation des processus industriels',
      tagline: 'Améliorez la performance industrielle',
      description: '<p>Ce module aborde les techniques modernes d’optimisation, la logistique et la gestion de la production industrielle.</p>',
      imageUrl: 'assets/5.jpg',
      itemId: '99887766-5544-3322-1100-aabbccddeeff'
    },
    {
      title: 'Administration des bases de données',
      tagline: 'Gérez efficacement vos données',
      description: '<p>Maîtrisez la conception, l’administration et l’optimisation des bases de données relationnelles avec SQL Server et PostgreSQL.</p>',
      imageUrl: 'assets/6.jpg',
      itemId: '1122aabb-3344-5566-7788-99aabbccdde0'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.initializeEvaluationTests();
  }

  private initializeEvaluationTests(): void {
    this.evaluationTests = [
      {
        id: '1',
        title: 'Évaluation - Développement Web avec React',
        formation: 'Développement Web avec React',
        dateCreation: '2025-06-11',
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
        dateCreation: '2025-06-11',
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
        dateCreation: '2025-05-10',
        dateFin: '2025-06-10',
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
        dateCreation: '2025-04-30',
        dateFin: '2025-05-30',
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
        dateCreation: '2025-04-20',
        dateFin: '2025-05-20',
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
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.course = this.courses.find(c => c.itemId === courseId);
      
      if (this.course) {
        this.loadEvaluationForCourse();
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

  private loadEvaluationForCourse(): void {
    if (!this.course) return;
    
    const test = this.evaluationTests.find(t => 
      t.formation === this.course?.title
    );

    if (test) {
      this.evaluationQuestions = test.questions;
    } else {
      console.error('No evaluation found for course:', this.course.title);
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
    const unanswered = this.evaluationQuestions.some(q => q.selectedAnswer === undefined);
    if (unanswered) {
      alert('Veuillez répondre à toutes les questions avant de soumettre.');
      return;
    }
    
    alert('Merci d\'avoir complété l\'évaluation! Vos réponses ont été enregistrées.');
    // Envoyer les réponses au serveur dans une application réelle
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