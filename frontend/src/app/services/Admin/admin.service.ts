import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'https://localhost:5000/admin';

  constructor(private http: HttpClient) {}

  getAllEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/All-Etudiant`);
  }

  getAllProfesseurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/All-Professeur`);
  }

  createProfessor(professor: any) {
    return this.http.post(`${this.baseUrl}/create-professeur`, professor);
  }

  createStudent(newStudent: any){
    return this.http.post(`${this.baseUrl}/create-etudiant`, newStudent);
  }
  
  deleteStudentById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-etudiant/${id}`);
  }

  deleteProfessorById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-professeur/${id}`);
  }
}
