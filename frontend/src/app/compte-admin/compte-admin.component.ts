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
  firstName = 'Jean';
  lastName = 'Dupont';
  email = 'jean.dupont@example.com';
  username = 'jeandupont';
  
  onSidebarToggled(isCollapsed: boolean) {
    this.sidebarCollapsed = isCollapsed;
  }
}