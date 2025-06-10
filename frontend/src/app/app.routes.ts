import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionEtudiantsComponent } from "./gestion-etudiants/gestion-etudiants.component";
import { GestionProfesseursComponent } from "./gestion-professeurs/gestion-professeurs.component";
import { CompteAdminComponent } from "./compte-admin/compte-admin.component";
import { CreateFormationComponent } from "./create-formation/create-formation.component";
import { CreateTestComponent } from "./create-test/create-test.component";
import { AccueilEtudiantComponent } from "./Users/etudiant/accueil-etudiant/accueil-etudiant.component";
import { FormationTestComponent } from "./Users/etudiant/formation-test/formation-test.component";

export const routes: Routes = [
    {
        path:'',
        redirectTo:'welcome',
        pathMatch:'full'
    },
    {
        path: 'welcome',
        loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
    },
      
    { 
        path: 'accueil',
        loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent)
    },
    {
        path: 'gestion-etudiants',
        loadComponent: () => import('./gestion-etudiants/gestion-etudiants.component').then(m => m.GestionEtudiantsComponent)
    },
    {
        path: 'gestion-professeurs',
        loadComponent: () => import('./gestion-professeurs/gestion-professeurs.component').then(m => m.GestionProfesseursComponent)
    },
    {
        path: 'compte-admin',
        loadComponent: () => import('./compte-admin/compte-admin.component').then(m => m.CompteAdminComponent)
    },
    {
        path: 'create-formation',
        loadComponent: () => import('./create-formation/create-formation.component').then(m => m.CreateFormationComponent)
    },
    {
        path: 'create-test',
        loadComponent: () => import('./create-test/create-test.component').then(m => m.CreateTestComponent)
    },
    {
        path: 'tests',
        loadComponent: () => import('./tests/gestion-tests/gestion-tests.component').then(m => m.GestionTestsComponent)
    },
    {
        path: 'test/:id',
        loadComponent: () => import('./tests/test-details/test-details.component').then(m => m.TestDetailsComponent)
    },
    {
        path: 'prof',
        loadComponent: () => import('./Users/prof/prof.component').then(m => m.ProfComponent)
    },
    {
        path: 'accueil-etudiant',
        loadComponent: () => import('./Users/etudiant/accueil-etudiant/accueil-etudiant.component').then(m => m.AccueilEtudiantComponent)
    },
    {
        path: 'formation-test/:id',
        loadComponent: () => import('./Users/etudiant/formation-test/formation-test.component').then(m => m.FormationTestComponent)
    },  
];
