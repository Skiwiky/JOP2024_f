import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreation } from 'src/app/model/UserCreation';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth'; // L'URL de votre API Java
  private token: string | null = null;
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }
  signin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { username, password });
  }

  signup(user: UserCreation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }
 
  logout() {
    // Logique de déconnexion, suppression token JWT
    this.setToken("");
    this.isAuthenticated = false;
  }
  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}