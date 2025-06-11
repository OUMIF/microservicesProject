import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-compte-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './compte-admin.component.html',
  styleUrl: './compte-admin.component.css'
})
export class CompteAdminComponent {
  sidebarCollapsed = false;
  avatarUrl = 'assets/Malak.jpg';
  firstName = 'Mohamed';
  lastName = 'Jabir';
  email = 'Jabir.Mohamed@gmail.com';
  username = 'Administrateur';
  
  onSidebarToggled(isCollapsed: boolean) {
    this.sidebarCollapsed = isCollapsed;
  }
}