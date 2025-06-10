import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      }),
      tap((response: any) => {
        if (response.token && response.role) {
          this.setToken(response.token);
          this.setRole(response.role);  // Store the role
        }
      })
    );
  }

  // Store token in localStorage (with check for browser environment)
  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('auth_token', token);
    }
  }

  // Get token from localStorage (with check for browser environment)
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    console.log(jwtDecode(token));
    return jwtDecode(token);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/accueil']);
  }

  // Store the role in localStorage (with check for browser environment)
  setRole(role: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('role', role);
    }
  }

  getRole(): string[] | null {
    const decoded = this.decodeToken();
    return decoded?.role || null; // Now returns an array
  }

  isAdmin(): boolean {
    const roles = this.getRole();
    return roles ? roles.includes('Admin') : false;
  }

  isProfesseur(): boolean {
    const roles = this.getRole();
    return roles ? roles.includes('Professeur') : false; // Note case sensitivity
  }

  isEtudiant(): boolean {
    const roles = this.getRole();
    return roles ? roles.includes('Etudiant') : false;
  }
}