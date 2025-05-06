import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Student {
  photo: string;
  isPhotoUrl?: boolean;
  apogee: string;
  cne: string;
  lastName: string;
  firstName: string;
  email: string;
  birthPlace: string;
  birthDate: string;
  program: string;
  studyYear: string;
  selected?: boolean;
}

interface Column {
  key: keyof Student | 'select' | 'actions';
  title: string;
}

@Component({
  selector: 'app-gestion-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './gestion-etudiants.component.html',
  styleUrl: './gestion-etudiants.component.css'
})
export class GestionEtudiantsComponent implements OnInit {
  isLoggedIn = false;
  sidebarCollapsed = false;
  searchQuery = '';

  showDeleteConfirmation = false;
  showFilterOptions = false;
  showStudentForm = false;
  editMode = false;
  selectedProgram = '';

  borderType: string = 'change table style';
  tableSize: string = 'sm';
  tableLayout: string = 'auto';
  
  columns: Column[] = [
    { key: 'select', title: 'Select' },
    { key: 'photo', title: '' },
    { key: 'apogee', title: 'APOGEE' },
    { key: 'cne', title: 'CNE' },
    { key: 'lastName', title: 'Nom' },
    { key: 'firstName', title: 'Prénom' },
    { key: 'email', title: 'Email' },
    { key: 'birthPlace', title: 'Lieu de Naissance' },
    { key: 'birthDate', title: 'Date de Naissance' },
    { key: 'program', title: 'Filière' },
    { key: 'studyYear', title: 'Année d\'étude' },
    { key: 'actions', title: 'Actions' }
  ];

  programs = ['GINF', 'GSTR', 'GIND', 'G3EI'];
  studyYears = ['2021/2022', '2022/2023', '2023/2024', '2024/2025'];
  currentStudent: Student = this.createEmptyStudent();
  
  students: Student[] = [
    {
      photo: 'assets/Malak.jpg',
      isPhotoUrl: true,
      apogee: '123456',
      cne: 'A123456',
      lastName: 'Doe',
      firstName: 'John',
      email: 'john.doe@example.com',
      birthPlace: 'Casa',
      birthDate: '1995-05-15',
      program: 'GINF',
      studyYear: '2021/2022'
    },
    {
      photo: 'MJ',
      isPhotoUrl: false,
      apogee: '345678',
      cne: 'C345678',
      lastName: 'Johnson',
      firstName: 'Mike',
      email: 'mike.johnson@example.com',
      birthPlace: 'Marrakech',
      birthDate: '1997-03-10',
      program: 'GINF',
      studyYear: '2021/2022'
    },
    {
      photo: 'EB',
      isPhotoUrl: false,
      apogee: '901234',
      cne: 'D901234',
      lastName: 'Brown',
      firstName: 'Emily',
      email: 'emily.brown@example.com',
      birthPlace: 'Tanger',
      birthDate: '1995-11-30',
      program: 'GIND',
      studyYear: '2021/2022'
    },
    {
      photo: 'assets/Malak.jpg',
      isPhotoUrl: true,
      apogee: '789012',
      cne: 'B789012',
      lastName: 'Smith',
      firstName: 'Jane',
      email: 'jane.smith@example.com',
      birthPlace: 'Rabat',
      birthDate: '1996-08-22',
      program: 'GSTR',
      studyYear: '2021/2022'
    },
    {
      photo: 'NS',
      isPhotoUrl: false,
      apogee: '901234',
      cne: 'D901234',
      lastName: 'Brown',
      firstName: 'Emily',
      email: 'emily.brown@example.com',
      birthPlace: 'Tanger',
      birthDate: '1995-11-30',
      program: 'GIND',
      studyYear: '2021/2022'
    },
    {
      photo: 'DW',
      isPhotoUrl: false,
      apogee: '567890',
      cne: 'E567890',
      lastName: 'Wilson',
      firstName: 'David',
      email: 'david.wilson@example.com',
      birthPlace: 'Fès',
      birthDate: '1996-07-18',
      program: 'G3EI',
      studyYear: '2021/2022'
    }
  ];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  goToPageInput: number = 1;
  
  // Sorting
  sortColumn: keyof Student = 'email';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  pagedStudents: Student[] = [];
  allSelected: boolean = false;

  ngOnInit() {
    this.updateTable();
  }

  onSidebarToggled(isCollapsed: boolean) {
    this.sidebarCollapsed = isCollapsed;
  }

  // Méthodes pour la gestion des étudiants
  confirmDeleteAll() {
    this.students = this.students.filter(student => !student.selected);
    this.showDeleteConfirmation = false;
    this.updateTable();
  }

  deleteStudent(student: Student) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.students = this.students.filter(s => s.apogee !== student.apogee);
      this.updateTable();
    }
  }

  openEditForm(student: Student) {
    this.currentStudent = { ...student };
    this.editMode = true;
    this.showStudentForm = true;
  }

  submitStudentForm() {
    if (this.editMode) {
      const index = this.students.findIndex(s => s.apogee === this.currentStudent.apogee);
      this.students[index] = this.currentStudent;
    } else {
      this.students.push({ 
        ...this.currentStudent, 
        apogee: this.generateNewApogee(),
        isPhotoUrl: this.isValidUrl(this.currentStudent.photo)
      });
    }
    this.showStudentForm = false;
    this.updateTable();
  }

  // Méthodes utilitaires
  private generateNewApogee(): string {
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  createEmptyStudent(): Student {
    return {
      photo: 'IN',
      apogee: '',
      cne: '',
      lastName: '',
      firstName: '',
      email: '',
      birthPlace: '',
      birthDate: new Date().toISOString().split('T')[0],
      program: 'GINF',
      studyYear: '2023/2024'
    };
  }

  // Filtrage et recherche
  applyFilters() {
    this.currentPage = 1;
    this.updateTable();
    this.showFilterOptions = false;
  }

  closeFilters() {
    this.showFilterOptions = false;
  }

  // Gestion du tableau
  public updateTable() {
    let filtered = [...this.students];

    if (this.selectedProgram) {
      filtered = filtered.filter(s => s.program === this.selectedProgram);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.lastName.toLowerCase().includes(query) ||
        s.firstName.toLowerCase().includes(query) ||
        s.apogee.includes(query)
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[this.sortColumn] as string;
      const bValue = b[this.sortColumn] as string;

      if (this.sortColumn === 'birthDate') {
        const dateA = new Date(aValue).getTime();
        const dateB = new Date(bValue).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (this.sortColumn === 'apogee') {
        return this.sortDirection === 'asc' 
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return this.sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    this.students = filtered;
    this.calculateTotalPages();
    this.applyPagination();
  }

  // Génération PDF
  async generatePDF() {
    try {
      // Import dynamique pour éviter les problèmes de bundle
      const { default: jsPDF } = await import('jspdf');
      await import('jspdf-autotable');

      const doc = new jsPDF('l', 'mm', 'a4');
      
      // Titre
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Liste des Étudiants', 105, 15, { align: 'center' });
      
      // En-têtes
      const headers = [
        ['APOGEE', 'CNE', 'Nom', 'Prénom', 'Email', 'Lieu Naissance', 'Date Naissance', 'Filière', 'Année']
      ];
      
      // Données
      const data = this.students.map(student => [
        student.apogee,
        student.cne,
        student.lastName,
        student.firstName,
        student.email,
        student.birthPlace,
        this.formatDate(student.birthDate),
        student.program,
        student.studyYear
      ]);
      
      // Génération du tableau
      (doc as any).autoTable({
        head: headers,
        body: data,
        startY: 25,
        margin: { left: 10, right: 10 },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak'
        },
        headStyles: {
          fillColor: [51, 102, 153],
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 20 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 40 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
          7: { cellWidth: 20 },
          8: { cellWidth: 20 }
        }
      });
      
      // Sauvegarde
      doc.save(`liste_etudiants_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de l\'export PDF. Voir la console pour plus de détails.');
    }
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  // Autres méthodes
  resetFilters() {
    this.borderType = 'change table style';
    this.tableSize = 'sm';
    this.tableLayout = 'auto';
    this.searchQuery = '';
    this.selectedProgram = '';
    this.updateTable();
  }
  
  deleteAllSelected() {
    this.students = this.students.filter(student => !student.selected);
    this.allSelected = false;
    this.updateTable();
  }
  
  toggleSelectAll() {
    this.pagedStudents.forEach(student => student.selected = this.allSelected);
  }
  
  getTableClasses() {
    const classes: string[] = [];
    
    if (this.borderType === 'bordered') {
      classes.push('table-bordered');
    }
    
    if (['sm', 'md', 'lg'].includes(this.tableSize)) {
      classes.push(`table-${this.tableSize}`);
    }
    
    return classes.join(' ');
  }
  
  sortBy(column: keyof Student) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updateTable();
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.students.length / this.itemsPerPage);
  }
  
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.students.length);
    this.pagedStudents = this.students.slice(startIndex, endIndex);
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
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
      let endPage = startPage + maxPages - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxPages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  getInitialBackgroundColor(initials: string): string {
    if (!initials || initials.length === 0) {
      return 'bg-gray-500';
    }
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

  get selectedStudentsCount(): number {
    return this.students.filter(s => s.selected).length;
  }
}