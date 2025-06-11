import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Professor {
  id: string;
  name: string;
  photo: string;
  description_prof: string;
  filiere: string;
}

interface Formation {
  Idformation: string;
  title: string;
  sujet: string;
  description: string;
  imageUrl: string;
  filieres: string[];
  professeurs: Professor[];
  programDates: string;
}

@Component({
  selector: 'app-create-formation',
  standalone: true,
  imports: [SidebarComponent, RouterModule, FormsModule, CommonModule],
  templateUrl: './create-formation.component.html',
  styleUrl: './create-formation.component.css'
})
export class CreateFormationComponent {
  sidebarCollapsed = false;
  onSidebarToggled(isCollapsed: boolean) {
    this.sidebarCollapsed = isCollapsed;
  }

  showFormationForm = false;
  editMode = false;
  currentFormation: Formation = {
    Idformation: '',
    title: '',
    sujet: '',
    description: '',
    imageUrl: '',
    filieres: [],
    professeurs: [],
    programDates: ''
  };

  // Propriétés pour la modal de confirmation
  showConfirmationModal = false;
  confirmationData = {
    title: '',
    message: '',
    type: 'delete' as 'delete' | 'warning' | 'info',
    onConfirm: () => {}
  };

  availableFilieres: string[] = ['GINF', 'GSTR', 'G3EI', 'GSEA', 'GIND'];

availableProfesseurs: Professor[] = [
  {
    id: '1',
    name: 'Pr. Amina El Mansouri',
    photo: 'assets/Malak.jpg',
    description_prof: "Experte en développement web et frameworks JavaScript",
    filiere: 'GINF'
  },
  {
    id: '2',
    name: 'Pr. Youssef Berrada',
    photo: 'assets/Malak.jpg',
    description_prof: "Chercheur en intelligence artificielle et data science",
    filiere: 'GSTR'
  },
  {
    id: '3',
    name: 'Pr. Laila Hafidi',
    photo: 'assets/Malak.jpg',
    description_prof: "Spécialiste en systèmes embarqués et robotique",
    filiere: 'G3EI'
  },
  {
    id: '4',
    name: 'Pr. Karim Mahfoud',
    photo: 'assets/Malak.jpg',
    description_prof: "Expert en cybersécurité et réseaux informatiques",
    filiere: 'GSEA'
  },
  {
    id: '5',
    name: 'Pr. Hajar Benali',
    photo: 'assets/Malak.jpg',
    description_prof: "Enseignante-chercheuse en génie industriel et optimisation",
    filiere: 'GIND'
  },
  {
    id: '6',
    name: 'Pr. Mehdi Touzani',
    photo: 'assets/Malak.jpg',
    description_prof: "Consultant en bases de données et systèmes distribués",
    filiere: 'GINF'
  }
];

formations: Formation[] = [
  {
    title: 'Développement Web avec React',
    sujet: 'Maîtrisez les bases du développement front-end moderne',
    description: '<p>Apprenez à créer des interfaces utilisateur dynamiques et performantes avec React, le framework JavaScript populaire pour le développement web.</p>',
    imageUrl: 'assets/1.jpg',
    filieres: ['GINF'],
    Idformation: '1a2b3c4d-11aa-22bb-33cc-44dd55667788',
    professeurs: [
      {
        id: '1',
        name: "Pr. Amina El Mansouri",
        description_prof: "Experte en développement web et frameworks JavaScript",
        photo: "assets/Malak.jpg",
        filiere: 'GINF'
      }
    ],
    programDates: '2025-03-01 to 2025-05-31'
  },
  {
    title: 'Introduction à la Data Science avec Python',
    sujet: 'Exploitez le potentiel de Python pour l’analyse de données',
    description: '<p>Formation pratique sur les bibliothèques Python essentielles pour la data science, comme Pandas, NumPy, et Matplotlib, ainsi que les bases de l’apprentissage automatique.</p>',
    imageUrl: 'assets/2.jpg',
    filieres: ['GINF'],
    Idformation: '9e8d7c6b-55aa-44bb-88cc-99dd11223344',
    professeurs: [
      {
        id: '2',
        name: "Pr. Youssef Berrada",
        description_prof: "Chercheur en intelligence artificielle et data science",
        photo: "assets/Malak.jpg",
        filiere: 'GINF'
      }
    ],
    programDates: '2025-04-15 to 2025-07-15'
  },
  {
    title: 'Systèmes embarqués et programmation Arduino',
    sujet: 'Découvrez le monde de l’électronique programmable',
    description: '<p>Apprenez à concevoir et programmer des systèmes embarqués avec Arduino. Idéal pour les étudiants en génie électrique et électronique.</p>',
    imageUrl: 'assets/3.jpg',
    filieres: ['G3EI, GINF'],
    Idformation: '3f4g5h6i-77cc-88dd-99ee-00ff11223344',
    professeurs: [
      {
        id: '3',
        name: "Pr. Laila Hafidi",
        description_prof: "Spécialiste en systèmes embarqués et robotique",
        photo: "assets/Malak.jpg",
        filiere: 'G3EI'
      }
    ],
    programDates: '2025-02-10 to 2025-04-10'
  },
  {
    title: 'Sécurité des réseaux et cryptographie',
    sujet: 'Protégez vos données et communications',
    description: '<p>Ce cours vous initie aux principes de la cybersécurité, de la cryptographie et des protocoles de sécurité réseau.</p>',
    imageUrl: 'assets/4.jpg',
    filieres: ['GSEA, GINF'],
    Idformation: 'aabbccdd-eeff-0011-2233-445566778899',
    professeurs: [
      {
        id: '4',
        name: "Pr. Karim Mahfoud",
        description_prof: "Expert en cybersécurité et réseaux informatiques",
        photo: "assets/Malak.jpg",
        filiere: 'GSEA'
      }
    ],
    programDates: '2025-05-01 to 2025-06-30'
  },
  {
    title: 'Optimisation des processus industriels',
    sujet: 'Améliorez la performance industrielle',
    description: '<p>Ce module aborde les techniques modernes d’optimisation, la logistique et la gestion de la production industrielle.</p>',
    imageUrl: 'assets/5.jpg',
    filieres: ['GIND, GINF'],
    Idformation: '99887766-5544-3322-1100-aabbccddeeff',
    professeurs: [
      {
        id: '3',
        name: "Pr. Laila Hafidi",
        description_prof: "Spécialiste en systèmes embarqués et robotique",
        photo: "assets/Malak.jpg",
        filiere: 'G3EI'
      },
      {
        id: '5',
        name: "Pr. Hajar Benali",
        description_prof: "Enseignante-chercheuse en génie industriel et optimisation",
        photo: "assets/Malak.jpg",
        filiere: 'GIND'
      }
    ],
    programDates: '2025-03-20 to 2025-06-20'
  },
  {
    title: 'Administration des bases de données',
    sujet: 'Gérez efficacement vos données',
    description: '<p>Maîtrisez la conception, l’administration et l’optimisation des bases de données relationnelles avec SQL Server et PostgreSQL.</p>',
    imageUrl: 'assets/6.jpg',
    filieres: ['GINF'],
    Idformation: '1122aabb-3344-5566-7788-99aabbccdde0',
    professeurs: [
      {
        id: '6',
        name: "Pr. Mehdi Touzani",
        description_prof: "Consultant en bases de données et systèmes distribués",
        photo: "assets/Malak.jpg",
        filiere: 'GINF'
      }
    ],
    programDates: '2025-01-15 to 2025-03-30'
  }
];



  // Méthode pour ouvrir la modal de confirmation
  openConfirmationModal(title: string, message: string, type: 'delete' | 'warning' | 'info', onConfirm: () => void) {
    this.confirmationData = {
      title,
      message,
      type,
      onConfirm
    };
    this.showConfirmationModal = true;
  }

  // Méthode pour fermer la modal de confirmation
  closeConfirmationModal() {
    this.showConfirmationModal = false;
  }

  // Méthode pour confirmer l'action
  confirmAction() {
    this.confirmationData.onConfirm();
    this.closeConfirmationModal();
  }

  openCreationForm() {
    this.showFormationForm = true;
    this.editMode = false;
    this.selectedFile = null;
    this.selectedFileName = '';
    this.currentFormation = {
      Idformation: this.generateFormationId(),
      title: '',
      sujet: '',
      description: '',
      imageUrl: '',
      filieres: [],
      professeurs: [],
      programDates: ''
    };
  }

  generateFormationId() {
    return 'FORM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  toggleSelection(item: string, type: 'filieres') {
    const index = this.currentFormation[type].indexOf(item);
    if (index > -1) {
      this.currentFormation[type].splice(index, 1);
    } else {
      this.currentFormation[type].push(item);
    }
  }

  toggleProfessorSelection(prof: Professor) {
    const index = this.currentFormation.professeurs.findIndex(p => p.id === prof.id);
    if (index === -1) {
      this.currentFormation.professeurs.push({...prof});
    } else {
      this.currentFormation.professeurs.splice(index, 1);
    }
  }

  isProfessorSelected(prof: Professor): boolean {
    return this.currentFormation.professeurs.some(p => p.id === prof.id);
  }

  submitFormationForm() {
    console.log('Formation soumise:', this.currentFormation);
    console.log('Image sélectionnée:', this.selectedFile);

    this.selectedFile = null;
    this.selectedFileName = '';
    
    if (!this.editMode) {
      this.formations.push({...this.currentFormation});
    } else {
      const index = this.formations.findIndex(f => f.Idformation === this.currentFormation.Idformation);
      if (index !== -1) {
        this.formations[index] = {...this.currentFormation};
      }
    }
    
    this.showFormationForm = false;
  }

  closeForm() {
    this.showFormationForm = false;
  }

  showFilieresDropdown = false;
  showProfesseursDropdown = false;

  toggleDropdown(type: 'filieres' | 'professeurs') {
    if (type === 'filieres') {
      this.showFilieresDropdown = !this.showFilieresDropdown;
    } else {
      this.showProfesseursDropdown = !this.showProfesseursDropdown;
    }
  }

  removeItem(event: Event, item: any, type: 'filieres' | 'professeurs') {
    event.stopPropagation();
    if (type === 'filieres') {
      const index = this.currentFormation.filieres.indexOf(item);
      if (index > -1) {
        this.currentFormation.filieres.splice(index, 1);
      }
    } else {
      const index = this.currentFormation.professeurs.findIndex(p => p.id === item.id);
      if (index > -1) {
        this.currentFormation.professeurs.splice(index, 1);
      }
    }
  }

  selectedFile: File | null = null;
  selectedFileName: string = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.currentFormation.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  editFormation(formation: Formation) {
    this.currentFormation = { ...formation };
    this.showFormationForm = true;
    this.editMode = true;
    this.selectedFileName = formation.imageUrl.split('/').pop() || '';
  }

  // Méthode modifiée pour utiliser la modal de confirmation
  deleteFormation(formation: Formation) {
    this.openConfirmationModal(
      'Supprimer la formation',
      `Êtes-vous sûr de vouloir supprimer la formation "${formation.title}" ? Cette action est irréversible.`,
      'delete',
      () => {
        this.formations = this.formations.filter(f => f.Idformation !== formation.Idformation);
      }
    );
  }

  showAllProfessors: { [key: string]: boolean } = {};
  showStudentsList: { [key: string]: boolean } = {};

  studentsByFiliere: { [key: string]: any[] } = {
  'GINF': [
    { id: '1', name: 'Ahmed Ben Ali', email: 'ahmed@example.com', filiere: 'GINF' },
    { id: '2', name: 'Sara Mansouri', email: 'sara@example.com', filiere: 'GINF' },
    { id: '3', name: 'Mohamed Khaled', email: 'mohamed@example.com', filiere: 'GINF' },
    { id: '4', name: 'Fatima Zahra', email: 'fatima@example.com', filiere: 'GINF' },
    { id: '5', name: 'Nabil Chraibi', email: 'nabil@example.com', filiere: 'GINF' },
    { id: '6', name: 'Aicha El Idrissi', email: 'aicha@example.com', filiere: 'GINF' },
    { id: '7', name: 'Hassan Amrani', email: 'hassan@example.com', filiere: 'GINF' },
    { id: '8', name: 'Zineb Raji', email: 'zineb@example.com', filiere: 'GINF' },
    { id: '9', name: 'Oussama Naji', email: 'oussama@example.com', filiere: 'GINF' },
    { id: '10', name: 'Ikram Ziani', email: 'ikram@example.com', filiere: 'GINF' },
    { id: '11', name: 'Yassir Ouahidi', email: 'yassir@example.com', filiere: 'GINF' }
  ],
  'GSTR': [
    { id: '12', name: 'Youssef Tazi', email: 'youssef@example.com', filiere: 'GSTR' },
    { id: '13', name: 'Laila Benali', email: 'laila@example.com', filiere: 'GSTR' },
    { id: '14', name: 'Nourredine Meziane', email: 'nourredine@example.com', filiere: 'GSTR' },
    { id: '15', name: 'Soukaina Idrissi', email: 'soukaina@example.com', filiere: 'GSTR' },
    { id: '16', name: 'Ilyas Hamdouchi', email: 'ilyas@example.com', filiere: 'GSTR' },
    { id: '17', name: 'Rania Khalloufi', email: 'rania@example.com', filiere: 'GSTR' },
    { id: '18', name: 'Hamza Raji', email: 'hamza@example.com', filiere: 'GSTR' },
    { id: '19', name: 'Amal Amrani', email: 'amal@example.com', filiere: 'GSTR' },
    { id: '20', name: 'Fouad Bakkali', email: 'fouad@example.com', filiere: 'GSTR' },
    { id: '21', name: 'Dounia Lahlou', email: 'dounia@example.com', filiere: 'GSTR' },
    { id: '22', name: 'Younes Semlali', email: 'younes@example.com', filiere: 'GSTR' }
  ],
  'G3EI': [
    { id: '23', name: 'Karim El Fassi', email: 'karim@example.com', filiere: 'G3EI' },
    { id: '24', name: 'Imane El Bouhali', email: 'imane@example.com', filiere: 'G3EI' },
    { id: '25', name: 'Samir Boulahya', email: 'samir@example.com', filiere: 'G3EI' },
    { id: '26', name: 'Naoufal Tazi', email: 'naoufal@example.com', filiere: 'G3EI' },
    { id: '27', name: 'Aya Bennis', email: 'aya@example.com', filiere: 'G3EI' },
    { id: '28', name: 'Mehdi Qachach', email: 'mehdi@example.com', filiere: 'G3EI' },
    { id: '29', name: 'Latifa Zouine', email: 'latifa@example.com', filiere: 'G3EI' },
    { id: '30', name: 'Ismail Idrissi', email: 'ismail@example.com', filiere: 'G3EI' },
    { id: '31', name: 'Hiba Kharbouch', email: 'hiba@example.com', filiere: 'G3EI' },
    { id: '32', name: 'Rachid El Alami', email: 'rachid@example.com', filiere: 'G3EI' },
    { id: '33', name: 'Salma Bennani', email: 'salma@example.com', filiere: 'G3EI' }
  ],
  'GSEA': [
    { id: '34', name: 'Nadia Chakir', email: 'nadia@example.com', filiere: 'GSEA' },
    { id: '35', name: 'Omar El Yacoubi', email: 'omar@example.com', filiere: 'GSEA' },
    { id: '36', name: 'Manal Othmani', email: 'manal@example.com', filiere: 'GSEA' },
    { id: '37', name: 'Bilal Zouiten', email: 'bilal@example.com', filiere: 'GSEA' },
    { id: '38', name: 'Hasnaa Azouzi', email: 'hasnaa@example.com', filiere: 'GSEA' },
    { id: '39', name: 'Yasmine Mouline', email: 'yasmine@example.com', filiere: 'GSEA' },
    { id: '40', name: 'Ali Kharbouchi', email: 'ali@example.com', filiere: 'GSEA' },
    { id: '41', name: 'Houda El Jouhari', email: 'houda@example.com', filiere: 'GSEA' },
    { id: '42', name: 'Tarik Senhaji', email: 'tarik@example.com', filiere: 'GSEA' },
    { id: '43', name: 'Meriem Lachhab', email: 'meriem@example.com', filiere: 'GSEA' },
    { id: '44', name: 'Yahya Bouzidi', email: 'yahya@example.com', filiere: 'GSEA' }
  ],
  'GIND': [
    { id: '45', name: 'Omar Bennani', email: 'omar@example.com', filiere: 'GIND' },
    { id: '46', name: 'Zineb Touhami', email: 'zineb@example.com', filiere: 'GIND' },
    { id: '47', name: 'Amine Lahlou', email: 'amine@example.com', filiere: 'GIND' },
    { id: '48', name: 'Siham Jaziri', email: 'siham@example.com', filiere: 'GIND' },
    { id: '49', name: 'Rida Ait Ouarab', email: 'rida@example.com', filiere: 'GIND' },
    { id: '50', name: 'Ikram Bellakhdar', email: 'ikram@example.com', filiere: 'GIND' },
    { id: '51', name: 'Othmane El Ghazali', email: 'othmane@example.com', filiere: 'GIND' },
    { id: '52', name: 'Malika Kassi', email: 'malika@example.com', filiere: 'GIND' },
    { id: '53', name: 'Anas Jaidi', email: 'anas@example.com', filiere: 'GIND' },
    { id: '54', name: 'Nisrine Hammani', email: 'nisrine@example.com', filiere: 'GIND' },
    { id: '55', name: 'Fouzia Jellouli', email: 'fouzia@example.com', filiere: 'GIND' }
  ]
};


  toggleProfessorsView(formationId: string) {
    this.showAllProfessors[formationId] = !this.showAllProfessors[formationId];
  }

  selectedFormationId: string | null = null;

  toggleStudentsList(formationId: string) {
    this.selectedFormationId = this.selectedFormationId === formationId ? null : formationId;
  }

  getEtudiantsByFormationId(formationId: string) {
    const formation = this.formations.find(f => f.Idformation === formationId);
    if (!formation || !formation.filieres || formation.filieres.length === 0) {
      return [];
    }
    
    let allStudents: any[] = [];
    formation.filieres.forEach(filiere => {
      const studentsInFiliere = this.studentsByFiliere[filiere] || [];
      allStudents = allStudents.concat(studentsInFiliere);
    });
    
    return allStudents;
  }

  // Méthode modifiée pour utiliser la modal de confirmation
  deleteStudent(studentId: string, formationId: string) {
    const student = this.getEtudiantsByFormationId(formationId).find(s => s.id === studentId);
    if (student) {
      this.openConfirmationModal(
        'Supprimer l\'étudiant',
        `Êtes-vous sûr de vouloir supprimer l'étudiant "${student.name}" de cette formation ?`,
        'delete',
        () => {
          const formation = this.formations.find(f => f.Idformation === formationId);
          if (formation && formation.filieres) {
            formation.filieres.forEach(filiere => { 
              if (this.studentsByFiliere[filiere]) {
                this.studentsByFiliere[filiere] = this.studentsByFiliere[filiere].filter(
                  student => student.id !== studentId
                );
              }
            });
          }
        }
      );
    }
  }

  getFormationTitle(formationId: string): string {
    const formation = this.formations.find(f => f.Idformation === formationId);
    return formation ? formation.title : '';
  }
}