import { Component,HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SafeJoinPipe } from '../safe-join.pipe';
import { forkJoin, take } from 'rxjs';
import { AdminService } from '../services/Admin/admin.service';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Professor {
  id : string;
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
  imports: [CommonModule, FormsModule, SidebarComponent ,SafeJoinPipe],
  standalone: true,
  templateUrl: './gestion-professeurs.component.html',
  styleUrl: './gestion-professeurs.component.css'
})
export class GestionProfesseursComponent implements OnInit{

  constructor(private professorService: AdminService) {}
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

  professors: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  goToPageInput: number = 1;
  
  sortColumn: keyof Professor = 'email';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  pagedProfessors: Professor[] = [];
  allSelected: boolean = false;

  ngOnInit() {    
    this.fetchAndUpdateProfessors();
  }

  fetchAndUpdateProfessors(){
    this.professorService.getAllProfesseurs().pipe(take(1)).subscribe({
      next: (data) => {
        console.log('Fetched professors data:', data);
        this.professors = data.map(item => ({
          id: item.id,
          photo: item.photo ,
          isPhotoUrl: !!item.photoUrl,
          matricule: item.matricule,
          lastName: item.nom,
          firstName: item.prenom,
          email: item.email,
          department: item.departement,
          modules: item.modulesEnseignes ,
          programs: item.professorFilieres ,
          yearsOfExperience: item.yearsOfExperience 
        }));
        this.updateTable();
      }
    });
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
      if (professor.id) {
        this.professorService.deleteProfessorById(professor.id).subscribe({
          next: () => {
            this.professors = this.professors.filter(p => p.id !== professor.id);
            this.updateTable();
          },
          error: err => console.error('Erreur de suppression :', err)
        });
      }
    }
  }

  openEditForm(professor: Professor) {
    this.currentProfessor = { ...professor };
    this.editMode = true;
    this.showProfessorForm = true;
  }

  submitProfessorForm() {
    console.log('Form submitted');
    if (this.editMode) {
      const index = this.professors.findIndex(p => p.matricule === this.currentProfessor.matricule);
      this.professors[index] = this.currentProfessor;
    } else {
      const newProfessor = {
          Matricule: this.generateNewMatricule(),
          Nom: this.currentProfessor.lastName,
          Prenom: this.currentProfessor.firstName,
          Email: this.currentProfessor.email,
          Photo: this.currentProfessor.photo,
          AnneesExperience: this.currentProfessor.yearsOfExperience,
          Departement: this.currentProfessor.department,
          Filieres: this.currentProfessor.programs.join(', '), // Convert array to string
          ModulesEnseignes: this.currentProfessor.modules.join(', '), // Same here
          isPhotoUrl: this.isValidUrl(this.currentProfessor.photo)
      };
      this.professorService.createProfessor(newProfessor).subscribe({
        next: (response) => {
          this.showProfessorForm = false;
          this.currentProfessor = {} as Professor;
          this.fetchAndUpdateProfessors();
        },
        error: (error) => {
          console.error('Erreur lors de la création du professeur :', error);
        }
      });
    }
  }


  public generateNewMatricule(): string {
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
      id:'',
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
  
    deleteAllSelected(professors: Professor[]) {
      const confirmation = confirm('Êtes-vous sûr de vouloir supprimer les professeurs sélectionnés ?');
      if (!confirmation) return;
    
      const selectedIds = professors.filter(p => p.id).map(p => p.id!);
    
      const deletionObservables = selectedIds.map(id => this.professorService.deleteProfessorById(id));
    
      forkJoin(deletionObservables).subscribe({
        next: () => {
          // Remove all deleted profs from local array
          this.professors = this.professors.filter(p => !selectedIds.includes(p.id!));
          this.updateTable();
        },
        error: err => console.error('Erreur de suppression multiple :', err)
      });
    }

    getSelectedProfessors(): Professor[] {
      return this.pagedProfessors.filter(p => p.selected);
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
      'A': '#f59e0b', // amber
      'B': '#3b82f6', // blue
      'C': '#06b6d4', // cyan
      'D': '#10b981', // emerald
      'E': '#d946ef', // fuchsia
      'F': '#22c55e', // green
      'G': '#6366f1', // indigo
      'H': '#84cc16', // lime
      'I': '#f97316', // orange
      'J': '#ec4899', // pink
      'K': '#a855f7', // purple
      'L': '#ef4444', // red
      'M': '#f43f5e', // rose
      'N': '#0ea5e9', // sky
      'O': '#64748b', // slate
      'P': '#14b8a6', // teal
      'Q': '#8b5cf6', // violet
      'R': '#eab308', // yellow
      'S': '#60a5fa', // blue-400
      'T': '#4ade80', // green-400
      'U': '#f87171', // red-400
      'V': '#c084fc', // purple-400
      'W': '#fde047', // yellow-400
      'X': '#f472b6', // pink-400
      'Y': '#818cf8', // indigo-400
      'Z': '#2dd4bf'  // teal-400
    };
  
    return colorMap[firstChar] || '#9ca3af'; // default gray
  }
  
  showProgramsDropdown = false;
  showModulesDropdown = false;

  toggleDropdown(type: 'programs' | 'modules') {
    if (type === 'programs') {
      this.showProgramsDropdown = !this.showProgramsDropdown;
      this.showModulesDropdown = false;
    } else {
      this.showModulesDropdown = !this.showModulesDropdown;
      this.showProgramsDropdown = false;
    }
  }

  toggleSelection(item: string, type: 'programs' | 'modules') {
    const array = type === 'programs' 
      ? this.currentProfessor.programs 
      : this.currentProfessor.modules;

    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
  }

  removeItem(event: Event, item: string, type: 'programs' | 'modules') {
    event.stopPropagation();
    this.toggleSelection(item, type);
  }

  // Pour fermer les dropdowns en cliquant à l'extérieur
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.custom-multiselect')) {
      this.showProgramsDropdown = false;
      this.showModulesDropdown = false;
    }
  }
}
