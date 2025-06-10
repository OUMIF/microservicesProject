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

  availableFilieres: string[] = ['Business', 'Informatique', 'Marketing', 'Finance', 'Management'];

  availableProfesseurs: Professor[] = [
    {
      id: '1',
      name: 'Dr. John Smith',
      photo: 'assets/1.jpg',
      description_prof: "15 ans d'expérience en Data Science",
      filiere: 'Business'
    },
    {
      id: '2',
      name: 'Pr. Jane Doe',
      photo: 'assets/2.jpg',
      description_prof: "Spécialiste en Intelligence Artificielle",
      filiere: 'Informatique'
    }
  ];

  formations: Formation[] = [
  {
    title: 'Développement Web avec React',
    sujet: 'Maîtrisez les bases du développement front-end moderne',
    description: '<p>Apprenez à créer des interfaces utilisateur dynamiques et performantes avec React, le framework JavaScript populaire pour le développement web.</p>',
    imageUrl: 'assets/1.jpg',  // logo React
    filieres: ['Génie Informatique'],
    Idformation: '1a2b3c4d-11aa-22bb-33cc-44dd55667788',
    professeurs: [
      {
        id: '1',
        name: "Pr. Amina El Mansouri",
        description_prof: "Experte en développement web et frameworks JavaScript ",
        photo: "assets/Malak.jpg",
        filiere: 'Génie Informatique'
      }
    ],
    programDates: '2025-03-01 to 2025-05-31'
  },
  {
    title: 'Introduction à la Data Science avec Python',
    sujet: 'Exploitez le potentiel de Python pour l’analyse de données',
    description: '<p>Formation pratique sur les bibliothèques Python essentielles pour la data science, comme Pandas, NumPy, et Matplotlib, ainsi que les bases de l’apprentissage automatique.</p>',
    imageUrl: 'assets/2.jpg',  // logo Python
    filieres: ['Génie Informatique'],
    Idformation: '9e8d7c6b-55aa-44bb-88cc-99dd11223344',
    professeurs: [
      {
        id: '2',
        name: "Pr. Youssef Berrada",
        description_prof: "Chercheur en intelligence artificielle et data science ",
        photo: "assets/Malak.jpg",
        filiere: 'Génie Informatique'
      }
    ],
    programDates: '2025-04-15 to 2025-07-15'
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
    'Business': [
      { id: '1', name: 'Ahmed Ben Ali', email: 'ahmed@example.com', filiere: 'Business' },
      { id: '2', name: 'Sara Mansouri', email: 'sara@example.com', filiere: 'Business' },
      { id: '3', name: 'Mohamed Khaled', email: 'mohamed@example.com', filiere: 'Business' }
    ],
    'Informatique': [
      { id: '4', name: 'Youssef Tazi', email: 'youssef@example.com', filiere: 'Informatique' },
      { id: '5', name: 'Laila Benali', email: 'laila@example.com', filiere: 'Informatique' }
    ],
    'Marketing': [
      { id: '6', name: 'Karim El Fassi', email: 'karim@example.com', filiere: 'Marketing' }
    ],
    'Finance': [
      { id: '7', name: 'Nadia Chakir', email: 'nadia@example.com', filiere: 'Finance' }
    ],
    'Management': [
      { id: '8', name: 'Omar Bennani', email: 'omar@example.com', filiere: 'Management' }
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