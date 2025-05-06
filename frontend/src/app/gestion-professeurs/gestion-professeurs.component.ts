import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Professor {
  photo: string;
  isPhotoUrl?: boolean;
  matricule: string;
  lastName: string;
  firstName: string;
  email: string;
  department: string;
  modules: string[];
  programs: string[];
  yearsOfExperience: number;
  selected?: boolean;
}

interface Column {
  key: keyof Professor | 'select' | 'actions';
  title: string;
}


@Component({
  selector: 'app-gestion-professeurs',
  imports: [CommonModule, FormsModule, SidebarComponent],
  standalone: true,
  templateUrl: './gestion-professeurs.component.html',
  styleUrl: './gestion-professeurs.component.css'
})
export class GestionProfesseursComponent {
  isLoggedIn = false;
  sidebarCollapsed = false;
  searchQuery = '';

  showDeleteConfirmation = false;
  showFilterOptions = false;
  showProfessorForm = false;
  editMode = false;
  selectedDepartment = '';
  selectedProgram = '';

  borderType: string = 'change table style';
  tableSize: string = 'sm';
  tableLayout: string = 'auto';

  columns: Column[] = [
    { key: 'select', title: 'Select' },
    { key: 'photo', title: '' },
    { key: 'matricule', title: 'Matricule' },
    { key: 'lastName', title: 'Nom' },
    { key: 'firstName', title: 'Prénom' },
    { key: 'email', title: 'Email' },
    { key: 'department', title: 'Département' },
    { key: 'modules', title: 'Modules' },
    { key: 'programs', title: 'Filières' },
    { key: 'yearsOfExperience', title: 'Expérience' },
    { key: 'actions', title: 'Actions' }
  ];

  departments = ['Informatique', 'Mathématiques', 'Physique', 'Chimie'];
  programs = ['GINF', 'GSTR', 'GIND', 'G3EI'];
  allModules = ['Algorithmique', 'Base de données', 'Réseaux', 'Systèmes d\'exploitation'];
  currentProfessor: Professor = this.createEmptyProfessor();

  professors: Professor[] = [
    {
      photo: 'assets/Malak.jpg',
      isPhotoUrl: true,
      matricule: 'PROF001',
      lastName: 'Dupont',
      firstName: 'Jean',
      email: 'jean.dupont@example.com',
      department: 'Informatique',
      modules: ['Algorithmique', 'Base de données'],
      programs: ['GINF', 'GSTR'],
      yearsOfExperience: 8
    },
    {
      photo: 'MJ',
      isPhotoUrl: false,
      matricule: 'PROF002',
      lastName: 'Martin',
      firstName: 'Sophie',
      email: 'sophie.martin@example.com',
      department: 'Mathématiques',
      modules: ['Analyse', 'Algèbre'],
      programs: ['GSTR', 'GIND'],
      yearsOfExperience: 12
    },
    {
      photo: 'assets/Malak.jpg',
      isPhotoUrl: true,
      matricule: 'PROF003',
      lastName: 'Leroy',
      firstName: 'Pierre',
      email: 'pierre.leroy@example.com',
      department: 'Physique',
      modules: ['Mécanique', 'Électromagnétisme'],
      programs: ['G3EI'],
      yearsOfExperience: 15
    }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  goToPageInput: number = 1;
  
  sortColumn: keyof Professor = 'email';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  pagedProfessors: Professor[] = [];
  allSelected: boolean = false;

  ngOnInit() {
    this.updateTable();
  }

  onSidebarToggled(event: boolean) {
    this.sidebarCollapsed = event;
  }

  confirmDeleteAll() {
    this.professors = this.professors.filter(prof => !prof.selected);
    this.showDeleteConfirmation = false;
    this.updateTable();
  }

  deleteProfessor(professor: Professor) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      this.professors = this.professors.filter(p => p.matricule !== professor.matricule);
      this.updateTable();
    }
  }

  openEditForm(professor: Professor) {
    this.currentProfessor = { ...professor };
    this.editMode = true;
    this.showProfessorForm = true;
  }

  submitProfessorForm() {
    if (this.editMode) {
      const index = this.professors.findIndex(p => p.matricule === this.currentProfessor.matricule);
      this.professors[index] = this.currentProfessor;
    } else {
      this.professors.push({ 
        ...this.currentProfessor,
        matricule: this.generateNewMatricule(),
        isPhotoUrl: this.isValidUrl(this.currentProfessor.photo)
      });
    }
    this.showProfessorForm = false;
    this.updateTable();
  }

  private generateNewMatricule(): string {
    return 'PROF' + Math.floor(Math.random() * 900 + 100);
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  createEmptyProfessor(): Professor {
    return {
      photo: 'PR',
      matricule: '',
      lastName: '',
      firstName: '',
      email: '',
      department: 'Informatique',
      modules: [],
      programs: [],
      yearsOfExperience: 0
    };
  }

  applyFilters() {
    this.currentPage = 1;
    this.updateTable();
    this.showFilterOptions = false;
  }

  closeFilters() {
    this.showFilterOptions = false;
  }

  public updateTable() {
    let filtered = [...this.professors];

    if (this.selectedDepartment) {
      filtered = filtered.filter(p => p.department === this.selectedDepartment);
    }

    if (this.selectedProgram) {
      filtered = filtered.filter(p => p.programs.includes(this.selectedProgram));
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.lastName.toLowerCase().includes(query) ||
        p.firstName.toLowerCase().includes(query) ||
        p.matricule.includes(query)
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return this.sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    this.professors = filtered;
    this.calculateTotalPages();
    this.applyPagination();
  }

  async generatePDF() {
    try {
      const { default: jsPDF } = await import('jspdf');
      await import('jspdf-autotable');

      const doc = new jsPDF('l', 'mm', 'a4');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Liste des Professeurs', 105, 15, { align: 'center' });
      
      const headers = [
        ['Matricule', 'Nom', 'Prénom', 'Email', 'Département', 'Modules', 'Filières', 'Expérience']
      ];
      
      const data = this.professors.map(prof => [
        prof.matricule,
        prof.lastName,
        prof.firstName,
        prof.email,
        prof.department,
        prof.modules.join(', '),
        prof.programs.join(', '),
        prof.yearsOfExperience + ' ans'
      ]);
      
      (doc as any).autoTable({
        head: headers,
        body: data,
        startY: 25,
        margin: { left: 10, right: 10 },
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [51, 102, 153], textColor: 255, fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 25 },
          2: { cellWidth: 25 },
          3: { cellWidth: 40 },
          4: { cellWidth: 25 },
          5: { cellWidth: 40 },
          6: { cellWidth: 30 },
          7: { cellWidth: 20 }
        }
      });
      
      doc.save(`liste_professeurs_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de l\'export PDF');
    }
  }

  resetFilters() {
    this.borderType = 'change table style';
    this.tableSize = 'sm';
    this.tableLayout = 'auto';
    this.searchQuery = '';
    this.selectedDepartment = '';
    this.selectedProgram = '';
    this.updateTable();
  }
  
  deleteAllSelected() {
    this.professors = this.professors.filter(prof => !prof.selected);
    this.allSelected = false;
    this.updateTable();
  }
  
  toggleSelectAll() {
    this.pagedProfessors.forEach(prof => prof.selected = this.allSelected);
  }
  
  getTableClasses() {
    const classes: string[] = [];
    if (this.borderType === 'bordered') classes.push('table-bordered');
    if (['sm', 'md', 'lg'].includes(this.tableSize)) classes.push(`table-${this.tableSize}`);
    return classes.join(' ');
  }
  
  sortBy(column: keyof Professor) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updateTable();
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.professors.length / this.itemsPerPage);
  }
  
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.professors.length);
    this.pagedProfessors = this.professors.slice(startIndex, endIndex);
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }
  
  onItemsPerPageChange() {
    this.calculateTotalPages();
    this.currentPage = 1;
    this.applyPagination();
  }
  
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    
    if (this.totalPages <= maxPages) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
      let endPage = startPage + maxPages - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxPages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }
    
    return pages;
  }

  public getInitialBackgroundColor(initials: string): string {
    const firstChar = initials.charAt(0).toUpperCase();
    const colorMap: {[key: string]: string} = {
      'A': 'bg-amber-500',
      'B': 'bg-blue-500',
      'C': 'bg-cyan-500',
      'D': 'bg-emerald-500',
      'E': 'bg-fuchsia-500',
      'F': 'bg-green-500',
      'G': 'bg-indigo-500',
      'H': 'bg-lime-500',
      'I': 'bg-orange-500',
      'J': 'bg-pink-500',
      'K': 'bg-purple-500',
      'L': 'bg-red-500',
      'M': 'bg-rose-500',
      'N': 'bg-sky-500',
      'O': 'bg-slate-500',
      'P': 'bg-teal-500',
      'Q': 'bg-violet-500',
      'R': 'bg-yellow-500',
      'S': 'bg-blue-400',
      'T': 'bg-green-400',
      'U': 'bg-red-400',
      'V': 'bg-purple-400',
      'W': 'bg-yellow-400',
      'X': 'bg-pink-400',
      'Y': 'bg-indigo-400',
      'Z': 'bg-teal-400'
    };
    
    return colorMap[firstChar] || 'bg-gray-500';
  }

}
