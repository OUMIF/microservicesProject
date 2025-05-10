import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent {
  sidebarCollapsed = false;
  onSidebarToggled(isCollapsed: boolean) {
    this.sidebarCollapsed = isCollapsed;
  }
}
