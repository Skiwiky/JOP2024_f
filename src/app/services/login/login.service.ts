import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserCreation } from 'src/app/model/UserCreation';
import { User } from 'src/app/model/User';
import { LoginRequest } from 'src/app/model/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/auth'; // L'URL de votre API Java
  private token: string | null = null;
  private user: User = new User;
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }
  signin(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, loginRequest)
    .pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user); 
        this.isAuthenticated = true;
      })
    );;
  }

  signup(user: UserCreation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user).pipe(
      tap(response => {
    console.log(response);
      })
    );
  }
 
  logout() {
    // Logique de déconnexion, suppression token JWT
    this.setToken("");
    this.isAuthenticated = false;
    this.clearUser();
  }

  clearUser() {
   // effacer l'utilisateur
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(){
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  
  getUserRole() {
    return this.user.role;  
  }

  private generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
}