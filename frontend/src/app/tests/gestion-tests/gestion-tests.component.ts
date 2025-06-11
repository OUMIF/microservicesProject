import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';

interface QuestionStat {
  question: string;
  responses: { [key: string]: number };
}

interface TestStat {
  totalParticipants: number;
  questions: QuestionStat[];
}

interface EvaluationTest {
  id: string;
  title: string;
  formation: string;
  dateCreation: string;
  dateFin: string;
  questions: {
    text: string;
    choices: { text: string }[];
  }[];
}

@Component({
  selector: 'app-gestion-tests',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './gestion-tests.component.html',
  styleUrls: ['./gestion-tests.component.css']
})
export class GestionTestsComponent {
  sidebarCollapsed = false;
  objectKeys = Object.keys;
  selectedTestId: string | null = null;

  onSidebarToggled(event: boolean) {
    this.sidebarCollapsed = event;
  }

  tests: EvaluationTest[] = [
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
    }
  ];

  testStats: { [key: string]: TestStat } = {
    '1': {
      totalParticipants: 1,
      questions: [
        { 
          question: 'Comment évaluez-vous la qualité globale de cette formation React ?', 
          responses: { 
            'Excellente': 1, 
            'Très bonne': 0, 
            'Bonne': 0, 
            'Moyenne': 0, 
            'Insuffisante': 0 
          }
        },
        { 
          question: 'Le contenu de la formation correspond-il à vos attentes ?', 
          responses: { 
            'Parfaitement': 1, 
            'Plutôt bien': 0, 
            'Partiellement': 0, 
            'Peu': 0, 
            'Pas du tout': 0 
          }
        },
        { 
          question: 'La progression pédagogique vous semble-t-elle adaptée ?', 
          responses: { 
            'Très bien adaptée': 1, 
            'Bien adaptée': 0, 
            'Moyennement adaptée': 0, 
            'Mal adaptée': 0 
          }
        },
        { 
          question: 'Comment jugez-vous la clarté des explications du professeur ?', 
          responses: { 
            'Très claire': 1, 
            'Claire': 0, 
            'Acceptable': 0, 
            'Confuse': 0, 
            'Très confuse': 0 
          }
        },
        { 
          question: 'Les exercices pratiques sont-ils suffisamment nombreux ?', 
          responses: { 
            'Largement suffisants': 1, 
            'Suffisants': 0, 
            'Juste suffisants': 0, 
            'Insuffisants': 0 
          }
        },
        { 
          question: 'La durée de la formation (3 mois) vous paraît-elle appropriée ?', 
          responses: { 
            'Parfaite': 1, 
            'Légèrement longue': 0, 
            'Légèrement courte': 0, 
            'Trop longue': 0, 
            'Trop courte': 0 
          }
        },
        { 
          question: 'Recommanderiez-vous cette formation à un collègue ?', 
          responses: { 
            'Certainement': 1, 
            'Probablement': 0, 
            'Peut-être': 0, 
            'Probablement pas': 0, 
            'Certainement pas': 0 
          }
        },
        { 
          question: 'Comment évaluez-vous la qualité des supports de cours ?', 
          responses: { 
            'Excellente': 1, 
            'Bonne': 0, 
            'Correcte': 0, 
            'Médiocre': 0 
          }
        },
        { 
          question: 'Le rythme de la formation vous convient-il ?', 
          responses: { 
            'Parfaitement': 1, 
            'Plutôt bien': 0, 
            'Un peu rapide': 0, 
            'Un peu lent': 0, 
            'Inadapté': 0 
          }
        },
        { 
          question: 'Les concepts React sont-ils bien expliqués ?', 
          responses: { 
            'Très bien': 1, 
            'Bien': 0, 
            'Moyennement': 0, 
            'Mal': 0 
          }
        },
        { 
          question: 'Estimez-vous avoir acquis les compétences attendues ?', 
          responses: { 
            'Complètement': 1, 
            'En grande partie': 0, 
            'Partiellement': 0, 
            'Très peu': 0, 
            'Pas du tout': 0 
          }
        },
        { 
          question: 'Comment jugez-vous l\'organisation générale de la formation ?', 
          responses: { 
            'Très bien organisée': 1, 
            'Bien organisée': 0, 
            'Correctement organisée': 0, 
            'Mal organisée': 0 
          }
        },
        { 
          question: 'La formation vous aide-t-elle dans votre projet professionnel ?', 
          responses: { 
            'Énormément': 1, 
            'Beaucoup': 0, 
            'Modérément': 0, 
            'Peu': 0, 
            'Pas du tout': 0 
          }
        },
        { 
          question: 'Comment évaluez-vous la disponibilité du formateur ?', 
          responses: { 
            'Excellente': 1, 
            'Bonne': 0, 
            'Satisfaisante': 0, 
            'Insuffisante': 0 
          }
        },
        { 
          question: 'Les outils et technologies présentés sont-ils actuels ?', 
          responses: { 
            'Très actuels': 1, 
            'Actuels': 0, 
            'Moyennement actuels': 0, 
            'Dépassés': 0 
          }
        },
        { 
          question: 'Comment notez-vous l\'ambiance de travail durant la formation ?', 
          responses: { 
            'Excellente': 1, 
            'Bonne': 0, 
            'Correcte': 0, 
            'Tendue': 0, 
            'Désagréable': 0 
          }
        },
        { 
          question: 'La formation répond-elle aux besoins du marché du travail ?', 
          responses: { 
            'Parfaitement': 1, 
            'Bien': 0, 
            'Partiellement': 0, 
            'Peu': 0 
          }
        },
        { 
          question: 'Quel est votre niveau de satisfaction global ?', 
          responses: { 
            'Très satisfait': 1, 
            'Satisfait': 0, 
            'Moyennement satisfait': 0, 
            'Insatisfait': 0, 
            'Très insatisfait': 0 
          }
        },
        { 
          question: 'Comment évaluez-vous le rapport qualité/durée de la formation ?', 
          responses: { 
            'Excellent': 1, 
            'Bon': 0, 
            'Correct': 0, 
            'Médiocre': 0 
          }
        },
        { 
          question: 'Souhaiteriez-vous suivre d\'autres formations avec ce même formateur ?', 
          responses: { 
            'Absolument': 1, 
            'Oui': 0, 
            'Peut-être': 0, 
            'Non': 0, 
            'Absolument pas': 0 
          }
        }
      ]
    },
    '2': {
      totalParticipants: 72,
      questions: [
        { 
          question: 'Comment évaluez-vous la qualité globale de cette formation Data Science ?', 
          responses: { 
            'Excellente': 30, 
            'Très bonne': 25, 
            'Bonne': 12, 
            'Moyenne': 4, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'L\'introduction aux bibliothèques Python est-elle suffisante ?', 
          responses: { 
            'Largement suffisante': 35, 
            'Suffisante': 25, 
            'Juste suffisante': 10, 
            'Insuffisante': 2 
          }
        },
        { 
          question: 'La formation couvre-t-elle bien Pandas et NumPy ?', 
          responses: { 
            'Très bien': 40, 
            'Bien': 20, 
            'Moyennement': 8, 
            'Insuffisamment': 3, 
            'Pas du tout': 1 
          }
        },
        { 
          question: 'Comment jugez-vous la progression du niveau débutant vers l\'apprentissage automatique ?', 
          responses: { 
            'Très progressive': 35, 
            'Progressive': 25, 
            'Acceptable': 10, 
            'Trop brutale': 2 
          }
        },
        { 
          question: 'Les exemples pratiques sont-ils pertinents ?', 
          responses: { 
            'Très pertinents': 40, 
            'Pertinents': 20, 
            'Moyennement pertinents': 10, 
            'Peu pertinents': 1, 
            'Pas pertinents': 1 
          }
        },
        { 
          question: 'La durée de 3 mois vous semble-t-elle adaptée pour ce contenu ?', 
          responses: { 
            'Parfaitement adaptée': 35, 
            'Adaptée': 25, 
            'Un peu courte': 10, 
            'Un peu longue': 2 
          }
        },
        { 
          question: 'Comment évaluez-vous l\'expertise du formateur en Data Science ?', 
          responses: { 
            'Excellente': 40, 
            'Très bonne': 20, 
            'Bonne': 10, 
            'Moyenne': 1, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'Les projets pratiques vous permettent-ils d\'appliquer les concepts ?', 
          responses: { 
            'Parfaitement': 45, 
            'Bien': 20, 
            'Partiellement': 5, 
            'Peu': 2 
          }
        },
        { 
          question: 'Comment notez-vous la qualité de l\'enseignement de Matplotlib ?', 
          responses: { 
            'Excellente': 35, 
            'Bonne': 25, 
            'Correcte': 10, 
            'Médiocre': 1, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'La formation vous prépare-t-elle bien aux défis réels de la Data Science ?', 
          responses: { 
            'Très bien': 40, 
            'Bien': 25, 
            'Moyennement': 5, 
            'Mal': 2 
          }
        },
        { 
          question: 'Recommanderiez-vous cette formation à quelqu\'un débutant en Data Science ?', 
          responses: { 
            'Vivement recommandée': 35, 
            'Recommandée': 25, 
            'Peut-être': 10, 
            'Non recommandée': 1, 
            'Fortement déconseillée': 1 
          }
        },
        { 
          question: 'Comment jugez-vous l\'équilibre théorie/pratique ?', 
          responses: { 
            'Parfait': 40, 
            'Bon': 25, 
            'Trop théorique': 5, 
            'Trop pratique': 2 
          }
        },
        { 
          question: 'Les bases de l\'apprentissage automatique sont-elles bien présentées ?', 
          responses: { 
            'Très bien': 45, 
            'Bien': 20, 
            'Correctement': 5, 
            'Mal': 1, 
            'Très mal': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous la qualité des données utilisées dans les exercices ?', 
          responses: { 
            'Excellente': 35, 
            'Bonne': 25, 
            'Moyenne': 10, 
            'Médiocre': 2 
          }
        },
        { 
          question: 'La formation vous donne-t-elle confiance pour vos futurs projets Data Science ?', 
          responses: { 
            'Beaucoup de confiance': 40, 
            'Confiance': 20, 
            'Un peu de confiance': 10, 
            'Peu de confiance': 1, 
            'Aucune confiance': 1 
          }
        },
        { 
          question: 'Comment notez-vous la disponibilité du formateur pour les questions ?', 
          responses: { 
            'Excellente': 45, 
            'Bonne': 20, 
            'Satisfaisante': 5, 
            'Insuffisante': 2 
          }
        },
        { 
          question: 'Les outils et méthodes enseignés sont-ils utilisés en entreprise ?', 
          responses: { 
            'Très utilisés': 40, 
            'Utilisés': 25, 
            'Moyennement utilisés': 5, 
            'Peu utilisés': 2 
          }
        },
        { 
          question: 'Votre niveau de satisfaction concernant l\'organisation pédagogique ?', 
          responses: { 
            'Très satisfait': 45, 
            'Satisfait': 20, 
            'Moyennement satisfait': 5, 
            'Insatisfait': 1, 
            'Très insatisfait': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous la pertinence des cas d\'usage présentés ?', 
          responses: { 
            'Très pertinents': 40, 
            'Pertinents': 25, 
            'Moyennement pertinents': 5, 
            'Peu pertinents': 2 
          }
        },
        { 
          question: 'Souhaiteriez-vous approfondir avec une formation avancée en Data Science ?', 
          responses: { 
            'Absolument': 35, 
            'Oui': 25, 
            'Peut-être': 10, 
            'Non': 1, 
            'Pas du tout': 1 
          }
        }
      ]
    },
    '3': {
      totalParticipants: 68,
      questions: [
        { 
          question: 'Comment évaluez-vous la qualité globale de cette formation Arduino ?', 
          responses: { 
            'Excellente': 30, 
            'Très bonne': 25, 
            'Bonne': 10, 
            'Moyenne': 2, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'L\'introduction aux systèmes embarqués est-elle claire ?', 
          responses: { 
            'Très claire': 40, 
            'Claire': 20, 
            'Acceptable': 7, 
            'Confuse': 1 
          }
        },
        { 
          question: 'La partie pratique avec Arduino est-elle suffisante ?', 
          responses: { 
            'Largement suffisante': 35, 
            'Suffisante': 25, 
            'Juste suffisante': 6, 
            'Insuffisante': 1, 
            'Très insuffisante': 1 
          }
        },
        { 
          question: 'Comment jugez-vous la progression des projets Arduino ?', 
          responses: { 
            'Très bien progressive': 40, 
            'Bien progressive': 20, 
            'Correcte': 7, 
            'Trop rapide': 1 
          }
        },
        { 
          question: 'Les composants électroniques sont-ils bien expliqués ?', 
          responses: { 
            'Très bien': 35, 
            'Bien': 25, 
            'Moyennement': 6, 
            'Mal': 1, 
            'Très mal': 1 
          }
        },
        { 
          question: 'La durée de 2 mois est-elle appropriée pour ce contenu ?', 
          responses: { 
            'Parfaite': 40, 
            'Appropriée': 20, 
            'Un peu courte': 6, 
            'Un peu longue': 2 
          }
        },
        { 
          question: 'Comment évaluez-vous l\'expertise du formateur en électronique ?', 
          responses: { 
            'Excellente': 35, 
            'Très bonne': 25, 
            'Bonne': 6, 
            'Moyenne': 1, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'Les projets pratiques correspondent-ils aux applications réelles ?', 
          responses: { 
            'Parfaitement': 40, 
            'Bien': 20, 
            'Partiellement': 7, 
            'Peu': 1 
          }
        },
        { 
          question: 'Comment notez-vous la qualité du matériel Arduino fourni ?', 
          responses: { 
            'Excellente': 35, 
            'Bonne': 25, 
            'Correcte': 7, 
            'Médiocre': 1 
          }
        },
        { 
          question: 'La formation vous prépare-t-elle à développer vos propres projets ?', 
          responses: { 
            'Très bien': 40, 
            'Bien': 20, 
            'Moyennement': 6, 
            'Mal': 1, 
            'Pas du tout': 1 
          }
        },
        { 
          question: 'Recommanderiez-vous cette formation aux étudiants en G3EI ?', 
          responses: { 
            'Vivement recommandée': 35, 
            'Recommandée': 25, 
            'Peut-être': 7, 
            'Non recommandée': 1 
          }
        },
        { 
          question: 'Comment jugez-vous l\'équilibre théorie électronique/pratique Arduino ?', 
          responses: { 
            'Parfait': 40, 
            'Bon': 20, 
            'Trop théorique': 6, 
            'Trop pratique': 2 
          }
        },
        { 
          question: 'Les concepts de programmation embarquée sont-ils bien transmis ?', 
          responses: { 
            'Très bien': 35, 
            'Bien': 25, 
            'Correctement': 7, 
            'Mal': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous la diversité des capteurs et actionneurs étudiés ?', 
          responses: { 
            'Excellente': 40, 
            'Bonne': 20, 
            'Moyenne': 6, 
            'Insuffisante': 1, 
            'Très insuffisante': 1 
          }
        },
        { 
          question: 'La formation stimule-t-elle votre créativité en électronique ?', 
          responses: { 
            'Énormément': 35, 
            'Beaucoup': 25, 
            'Modérément': 7, 
            'Peu': 1 
          }
        },
        { 
          question: 'Comment notez-vous l\'accompagnement pendant les travaux pratiques ?', 
          responses: { 
            'Excellent': 40, 
            'Bon': 20, 
            'Satisfaisant': 7, 
            'Insuffisant': 1 
          }
        },
        { 
          question: 'Les compétences acquises sont-elles transférables à d\'autres plateformes ?', 
          responses: { 
            'Parfaitement': 35, 
            'Bien': 25, 
            'Partiellement': 6, 
            'Peu': 1, 
            'Pas du tout': 1 
          }
        },
        { 
          question: 'Votre niveau de satisfaction concernant les ressources pédagogiques ?', 
          responses: { 
            'Très satisfait': 40, 
            'Satisfait': 20, 
            'Moyennement satisfait': 7, 
            'Insatisfait': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous la pertinence pour votre filière G3EI ?', 
          responses: { 
            'Très pertinente': 35, 
            'Pertinente': 25, 
            'Moyennement pertinente': 7, 
            'Peu pertinente': 1 
          }
        },
        { 
          question: 'Souhaiteriez-vous une formation avancée en robotique ou IoT ?', 
          responses: { 
            'Absolument': 40, 
            'Oui': 20, 
            'Peut-être': 7, 
            'Non': 1, 
            'Pas du tout': 0 
          }
        }
      ]
    },
    '4': {
      totalParticipants: 62,
      questions: [
        { 
          question: 'Comment évaluez-vous la qualité globale de cette formation en cybersécurité ?', 
          responses: { 
            'Excellente': 30, 
            'Très bonne': 20, 
            'Bonne': 10, 
            'Moyenne': 1, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'L\'introduction aux principes de cybersécurité est-elle complète ?', 
          responses: { 
            'Très complète': 35, 
            'Complète': 20, 
            'Acceptable': 6, 
            'Incomplète': 1 
          }
        },
        { 
          question: 'La partie cryptographie est-elle bien structurée ?', 
          responses: { 
            'Très bien structurée': 40, 
            'Bien structurée': 15, 
            'Moyennement structurée': 5, 
            'Mal structurée': 1, 
            'Très mal structurée': 1 
          }
        },
        { 
          question: 'Comment jugez-vous la complexité des concepts enseignés ?', 
          responses: { 
            'Bien adaptée': 35, 
            'Acceptable': 20, 
            'Trop complexe': 6, 
            'Trop simple': 1 
          }
        },
        { 
          question: 'Les protocoles de sécurité réseau sont-ils clairement expliqués ?', 
          responses: { 
            'Très clairement': 40, 
            'Clairement': 15, 
            'Moyennement': 5, 
            'Confusément': 1, 
            'Très confusément': 1 
          }
        },
        { 
          question: 'La durée de 2 mois est-elle suffisante pour ce contenu dense ?', 
          responses: { 
            'Largement suffisante': 35, 
            'Suffisante': 20, 
            'Juste suffisante': 6, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous l\'expertise du formateur en cybersécurité ?', 
          responses: { 
            'Excellente': 40, 
            'Très bonne': 15, 
            'Bonne': 5, 
            'Moyenne': 1, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'Les cas pratiques de sécurité sont-ils réalistes ?', 
          responses: { 
            'Très réalistes': 35, 
            'Réalistes': 20, 
            'Moyennement réalistes': 6, 
            'Peu réalistes': 1 
          }
        },
        { 
          question: 'Comment notez-vous l\'actualité des menaces présentées ?', 
          responses: { 
            'Très actuelles': 40, 
            'Actuelles': 15, 
            'Moyennement actuelles': 6, 
            'Dépassées': 1 
          }
        },
        { 
          question: 'La formation vous prépare-t-elle aux défis de sécurité en entreprise ?', 
          responses: { 
            'Parfaitement': 35, 
            'Bien': 20, 
            'Partiellement': 6, 
            'Mal': 1, 
            'Pas du tout': 0 
          }
        },
        { 
          question: 'Recommanderiez-vous cette formation aux étudiants GSEA ?', 
          responses: { 
            'Vivement recommandée': 40, 
            'Recommandée': 15, 
            'Peut-être': 6, 
            'Non recommandée': 1 
          }
        },
        { 
          question: 'Comment jugez-vous l\'équilibre entre théorie et outils pratiques ?', 
          responses: { 
            'Parfait': 35, 
            'Bon': 20, 
            'Trop théorique': 6, 
            'Trop pratique': 1 
          }
        },
        { 
          question: 'Les méthodes d\'attaque et de défense sont-elles bien présentées ?', 
          responses: { 
            'Très bien': 40, 
            'Bien': 15, 
            'Correctement': 6, 
            'Mal': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous la qualité des exercices de cryptographie ?', 
          responses: { 
            'Excellente': 35, 
            'Bonne': 20, 
            'Moyenne': 5, 
            'Médiocre': 1, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'La formation développe-t-elle votre esprit critique en sécurité ?', 
          responses: { 
            'Énormément': 40, 
            'Beaucoup': 15, 
            'Modérément': 6, 
            'Peu': 1 
          }
        },
        { 
          question: 'Comment notez-vous la présentation des normes et réglementations ?', 
          responses: { 
            'Excellente': 35, 
            'Bonne': 20, 
            'Satisfaisante': 6, 
            'Insuffisante': 1 
          }
        },
        { 
          question: 'Les outils de sécurité présentés sont-ils utilisés professionnellement ?', 
          responses: { 
            'Très utilisés': 40, 
            'Utilisés': 15, 
            'Moyennement utilisés': 5, 
            'Peu utilisés': 1, 
            'Obsolètes': 1 
          }
        },
        { 
          question: 'Votre niveau de satisfaction concernant les démonstrations pratiques ?', 
          responses: { 
            'Très satisfait': 35, 
            'Satisfait': 20, 
            'Moyennement satisfait': 6, 
            'Insatisfait': 1 
          }
        },
        { 
          question: 'Comment évaluez-vous la pertinence pour les enjeux actuels de sécurité ?', 
          responses: { 
            'Très pertinente': 40, 
            'Pertinente': 15, 
            'Moyennement pertinente': 6, 
            'Peu pertinente': 1 
          }
        },
        { 
          question: 'Souhaiteriez-vous approfondir avec une formation spécialisée en cybersécurité ?', 
          responses: { 
            'Absolument': 35, 
            'Oui': 20, 
            'Peut-être': 6, 
            'Non': 1, 
            'Pas du tout': 0 
          }
        }
      ]
    }
  };

  selectTest(testId: string) {
    if (this.selectedTestId === testId) {
      this.selectedTestId = null;
    } else {
      this.selectedTestId = testId;
    }
  }
}