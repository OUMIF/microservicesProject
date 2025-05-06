import { Component, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule ,FormsModule ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  showForgotForm = false;
  isOpened = false;

  openModal(): void {
    this.isOpened = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isOpened = false;
    document.body.style.overflow = 'initial';
  }

  toggleForm() {
    this.showForgotForm = !this.showForgotForm;
  }
 
  triggerAnimation(container: HTMLElement) {
    container.classList.remove('animate');
    setTimeout(() => {
      container.classList.add('animate');
    }, 50);
  }

  
  @Output() enter = new EventEmitter<void>();
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;

  isContentVisible = false;

  onEnterClick() {
    if (!this.isContentVisible) {
      this.isContentVisible = true;
    }
  }
  constructor(private router: Router) {}


  onSubmit() {
    this.router.navigate(['/accueil']); 
  }
}

