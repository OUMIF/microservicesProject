import { Component, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule ,CommonModule ,FormsModule,ReactiveFormsModule ,NgIf ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  isSubmitted = false;
  showForgotForm = false;
  isOpened = false;
  loginError = '';

  constructor(private authService: AuthService, private router: Router) {}

    loginForm = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(6)] ),
    email: new FormControl('', [Validators.required, Validators.email , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  });



  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  onLogin() {
    this.isSubmitted = true;
    this.loginError = '';

    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };

      this.authService.login(credentials).subscribe({
        next: (response: any) => {
          // Store the token
          if (response.token) {
            this.authService.setToken(response.token);
          }

          console.log('Login response:', response);
          
          if (this.authService.isAdmin()) {
            console.log('Navigating to admin dashboard');
            this.router.navigate(['/accueil']);
          } else if (this.authService.isProfesseur()) {
            console.log('Navigating to professeur dashboard');
            this.router.navigate(['/accueil-prof']);
          } else if (this.authService.isEtudiant()) {
            console.log('Navigating to etudiant dashboard');
            this.router.navigate(['/accueil-etudiant']);
          } else {
            console.log('No matching role found');
            this.loginError = 'No valid role assigned to this account';
          }
        },
        error: (error) => {
          this.loginError = error.error || 'Login failed. Please try again.';
        }
      });
    }
  }


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
}
