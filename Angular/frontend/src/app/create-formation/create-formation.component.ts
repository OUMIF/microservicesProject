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

  // Adding the missing availableFilieres property
  availableFilieres: string[] = ['Business', 'Informatique', 'Marketing', 'Finance', 'Management'];

  // Professor list
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
      title: 'Data Science Principles',
      sujet: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/1.jpg',
      filieres: ['Business'], // Fixed: Changed from string to string array
      Idformation: '1f5f67c1-45e8-451a-bda4-de4b2571571c',
      professeurs: [
        {
          id: '1',
          name: "Dr. John Smith",
          description_prof: "Professeur en Data Science avec 15 ans d'expérience",
          photo: "assets/Malak.jpg",
          filiere: 'Business'
        }
      ],
      programDates: '2025-06-01 to 2025-08-31'
    },
    {
      title: 'Data Science Principles',
      sujet: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/2.jpg',
      filieres: ['Business'], // Fixed: Changed from string to string array
      Idformation: '2f5f67c1-45e8-451a-bda4-de4b2571571c',
      professeurs: [
        {
          id: '1',
          name: "Dr. John Smith",
          description_prof: "Professeur en Data Science avec 15 ans d'expérience",
          photo: "assets/Malak.jpg",
          filiere: 'Business'
        }
      ],
      programDates: '2025-07-01 to 2025-09-30'
    },
    {
      title: 'Data Science Principles',
      sujet: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/3.jpg',
      filieres: ['Business'], // Fixed: Changed from string to string array
      Idformation: '3f5f67c1-45e8-451a-bda4-de4b2571571c',
      professeurs: [
        {
          id: '1',
          name: "Dr. John Smith",
          description_prof: "Professeur en Data Science avec 15 ans d'expérience",
          photo: "assets/Malak.jpg",
          filiere: 'Business'
        }
      ],
      programDates: '2025-08-01 to 2025-10-31'
    },
    {
      title: 'Data Science Principles',
      sujet: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/4.jpg',
      filieres: ['Business'], // Fixed: Changed from string to string array
      Idformation: '4f5f67c1-45e8-451a-bda4-de4b2571571c',
      professeurs: [
        {
          id: '1',
          name: "Dr. John Smith",
          description_prof: "Professeur en Data Science avec 15 ans d'expérience",
          photo: "assets/Malak.jpg",
          filiere: 'Business'
        }
      ],
      programDates: '2025-09-01 to 2025-11-30'
    },
    {
      title: 'Data Science Principles',
      sujet: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/5.jpg',
      filieres: ['Business'], // Fixed: Changed from string to string array
      Idformation: '5f5f67c1-45e8-451a-bda4-de4b2571571c',
      professeurs: [
        {
          id: '1',
          name: "Dr. John Smith",
          description_prof: "Professeur en Data Science avec 15 ans d'expérience",
          photo: "assets/Malak.jpg",
          filiere: 'Business'
        }
      ],
      programDates: '2025-10-01 to 2025-12-31'
    },
    {
      title: 'Data Science Principles',
      sujet: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/2.jpg',
      filieres: ['Business'], // Fixed: Changed from string to string array
      Idformation: '6f5f67c1-45e8-451a-bda4-de4b2571571c',
      professeurs: [
        {
          id: '1',
          name: "Dr. John Smith",
          description_prof: "Professeur en Data Science avec 15 ans d'expérience",
          photo: "assets/Malak.jpg",
          filiere: 'Business'
        }
      ],
      programDates: '2025-11-01 to 2026-01-31'
    }
  ];

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
      // Ajoute le professeur avec sa description prédéfinie
      this.currentFormation.professeurs.push({...prof});
    } else {
      this.currentFormation.professeurs.splice(index, 1);
    }
  }

  isProfessorSelected(prof: Professor): boolean {
    return this.currentFormation.professeurs.some(p => p.id === prof.id);
  }

  submitFormationForm() {
    // Ajouter la logique de soumission ici
    console.log('Formation soumise:', this.currentFormation);
    console.log('Image sélectionnée:', this.selectedFile);

    this.selectedFile = null;
    this.selectedFileName = '';
    
    // Add the new formation to the list if in creation mode
    if (!this.editMode) {
      this.formations.push({...this.currentFormation});
    } else {
      // Update existing formation if in edit mode
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

  // Dropdown properties
  showFilieresDropdown = false;
  showProfesseursDropdown = false;

  // Dropdown methods
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
      
      // Créer un URL temporaire pour l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.currentFormation.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }



    // Ajoutez dans CreateTestComponent
  editFormation(formation: Formation) {
    this.currentFormation = { ...formation };
    this.showFormationForm = true;
    this.editMode = true;
    this.selectedFileName = formation.imageUrl.split('/').pop() || '';
  }

  deleteFormation(formation: Formation) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette formation ?');
    if (confirmation) {
      this.formations = this.formations.filter(f => f.Idformation !== formation.Idformation);
    }
  }


}