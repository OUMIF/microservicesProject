import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-prof',
  imports: [RouterModule,CommonModule],
  standalone: true,
  templateUrl: './sidebar-prof.component.html',
  styleUrl: './sidebar-prof.component.css'
})
export class SidebarProfComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }
}
