import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { forkJoin, take } from 'rxjs';
import { AdminService } from '../services/Admin/admin.service';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Student {
  id?: string;
  photo: string;
  isPhotoUrl?: boolean;
  cne: string;
  nom: string;
  prenom: string;
  email: string;
  lieuDeNaissance: string;
  dateOfBirth: string;
  filiere: string;
  anneeDEtude: string;
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

  constructor(private etudiantService: AdminService) {}

  
  
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
    { key: 'cne', title: 'CNE' },
    { key: 'nom', title: 'Nom' },
    { key: 'prenom', title: 'Prénom' },
    { key: 'email', title: 'Email' },
    { key: 'lieuDeNaissance', title: 'Lieu de Naissance' },
    { key: 'dateOfBirth', title: 'Date de Naissance' },
    { key: 'filiere', title: 'Filière' },
    { key: 'anneeDEtude', title: 'Année d\'étude' },
    { key: 'actions', title: 'Actions' }
  ];

  programs = ['GINF', 'GSTR', 'GIND', 'G3EI'];
  studyYears = ['2021/2022', '2022/2023', '2023/2024', '2024/2025'];
  currentStudent: Student = this.createEmptyStudent();
  
  students: Student[] = [];

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
    this.fetchAndUpdateStudents();
  }

  fetchAndUpdateStudents() {
    this.etudiantService.getAllEtudiants().pipe(take(1)).subscribe({
      next: (data) => {
        console.log('Fetched updated student data:', data);
        this.students = data.map(item => ({
          id: item.id,
          photo: item.photo,
          isPhotoUrl: !!item.photoUrl,
          cne: item.cne,
          nom: item.nom,
          prenom: item.prenom,
          email: item.email,
          lieuDeNaissance: item.lieuDeNaissance,
          dateOfBirth: item.dateOfBirth,
          filiere: item.filiere,
          anneeDEtude: item.anneeDEtude
        }));
        this.updateTable();  // Update the table with the new data
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des étudiants :", error);
      }
    });
  }
  
  submitStudentForm() {
    if (this.editMode) {
      // Update the student in the array
      const index = this.students.findIndex(s => s.cne === this.currentStudent.cne);
      this.students[index] = this.currentStudent;
    } else {
      // Create student via API
      this.etudiantService.createStudent({
        isPhotoUrl: this.isValidUrl(this.currentStudent.photo),
        photo: this.currentStudent.photo,
        cne: this.currentStudent.cne,
        nom: this.currentStudent.nom,
        prenom: this.currentStudent.prenom,
        email: this.currentStudent.email,
        lieuDeNaissance: this.currentStudent.lieuDeNaissance,
        dateOfBirth: this.currentStudent.dateOfBirth,
        filiere: this.currentStudent.filiere,
        anneeDEtude: this.currentStudent.anneeDEtude
      }).subscribe({
        next: (response) => {
          this.showStudentForm = false;
          this.currentStudent = {} as Student;  // Reset the form to an empty student object
          
          // Call the fetchAndUpdateStudents method to refresh the student list
          this.fetchAndUpdateStudents();
        },
        error: (error) => {
          console.error("Erreur lors de la création de l'étudiant :", error);
        }
      });
    }
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
      if (student.id) {
        this.etudiantService.deleteStudentById(student.id).subscribe({
          next: () => {
            this.students = this.students.filter(s => s.id !== student.id);
            this.updateTable();
          },
          error: err => console.error('Erreur de suppression :', err)
        });
      }
    }
  }
  
  deleteAllSelected(students: Student[]) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer les étudiants sélectionnés ?');
    if (!confirmation) return;
  
    const selectedIds = students.filter(s => s.id).map(s => s.id!);
  
    const deletionObservables = selectedIds.map(id => this.etudiantService.deleteStudentById(id));
  
    forkJoin(deletionObservables).subscribe({
      next: () => {
        // Remove all deleted students from local array
        this.students = this.students.filter(s => !selectedIds.includes(s.id!));
        this.updateTable();
      },
      error: err => console.error('Erreur de suppression multiple :', err)
    });
  }

  getSelectedStudents(): Student[] {
    return this.pagedStudents.filter(s => s.selected);
  }
  

  openEditForm(student: Student) {
    this.currentStudent = { ...student };
    this.editMode = true;
    this.showStudentForm = true;
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
      cne: '',
      nom: '',
      prenom: '',
      email: '',
      lieuDeNaissance: '',
      dateOfBirth: new Date().toISOString().split('T')[0],
      filiere: 'GINF',
      anneeDEtude: '2023/2024'
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
      filtered = filtered.filter(s => s.filiere === this.selectedProgram);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.nom.toLowerCase().includes(query) ||
        s.prenom.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[this.sortColumn] as string;
      const bValue = b[this.sortColumn] as string;

      if (this.sortColumn === 'dateOfBirth') {
        const dateA = new Date(aValue).getTime();
        const dateB = new Date(bValue).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
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
        student.cne,
        student.nom,
        student.prenom,
        student.email,
        student.lieuDeNaissance,
        this.formatDate(student.dateOfBirth),
        student.filiere,
        student.anneeDEtude
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

  public getInitialBackgroundColor(initials: string | undefined): string {
    if (!initials || initials.length === 0) {
      return '#ccc'; // fallback color
    }    
    const firstChar = initials.charAt(0).toUpperCase();
    const colorMap: {[key: string]: string} = {
      'A': '#f59e0b', 'B': '#3b82f6', 'C': '#06b6d4', 'D': '#10b981',
      'E': '#d946ef', 'F': '#22c55e', 'G': '#6366f1', 'H': '#84cc16',
      'I': '#f97316', 'J': '#ec4899', 'K': '#a855f7', 'L': '#ef4444',
      'M': '#f43f5e', 'N': '#0ea5e9', 'O': '#64748b', 'P': '#14b8a6',
      'Q': '#8b5cf6', 'R': '#eab308', 'S': '#60a5fa', 'T': '#4ade80',
      'U': '#f87171', 'V': '#c084fc', 'W': '#fde047', 'X': '#f472b6',
      'Y': '#818cf8', 'Z': '#2dd4bf'
    };
  
    return colorMap[firstChar] || '#9ca3af'; // default gray
  }
  
  

  get selectedStudentsCount(): number {
    return this.students.filter(s => s.selected).length;
  }
}