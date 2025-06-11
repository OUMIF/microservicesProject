import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarProfComponent } from '../sidebar-prof/sidebar-prof.component';
import { Router } from '@angular/router';

export interface Professor {
  matricule: string;
  lastName: string;
  firstName: string;
  email: string;
  department: string;
  modules: string[];
  programs: string[];
  yearsOfExperience: number;
  photo?: string;
}

// Définir le pipe dans le même fichier
@Pipe({
  name: 'safeJoin',
  standalone: true
})
export class SafeJoinPipe implements PipeTransform {
  transform(value: any[], separator: string = ', '): string {
    if (!value || !Array.isArray(value)) {
      return '';
    }
    return value.join(separator);
  }
}

@Component({
  selector: 'app-compte-prof',
  standalone: true,
  imports: [CommonModule, SidebarProfComponent, SafeJoinPipe], // Ajouter SafeJoinPipe ici
  templateUrl: './compte-prof.component.html',
  styleUrl: './compte-prof.component.css'
})
export class CompteProfComponent implements OnInit {
  sidebarCollapsed = false;

  currentProfessor: Professor = {
    matricule: '',
    lastName: '',
    firstName: '',
    email: '',
    department: '',
    modules: [],
    programs: [],
    yearsOfExperience: 0,
    photo: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadProfessorData();
  }

  loadProfessorData(): void {
    this.currentProfessor = {
      matricule: 'PROF001',
      lastName: 'El Mansouri',
      firstName: 'Amina',
      email: 'ElMansouri.Amina@uae.ac.ma',
      department: 'Informatique',
      modules: ['Programmation Web', 'Base de Données', 'Algorithmique'],
      programs: ['Licence Informatique'],
      yearsOfExperience: 8,
      photo: ''
    };
  }

  onSidebarToggled(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }

  getInitials(): string {
    const firstInitial = this.currentProfessor.firstName ? this.currentProfessor.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = this.currentProfessor.lastName ? this.currentProfessor.lastName.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximale : 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentProfessor.photo = e.target.result;
        this.uploadPhoto(file);
      };
      reader.readAsDataURL(file);
    }
  }

  private uploadPhoto(file: File): void {
    console.log('Uploading photo:', file.name);
    // Ici vous pouvez implémenter l'upload vers votre API
  }

  getExperienceText(): string {
    const years = this.currentProfessor.yearsOfExperience;
    if (years === 0) return 'Débutant';
    if (years === 1) return '1 année';
    return `${years} années`;
  }
}