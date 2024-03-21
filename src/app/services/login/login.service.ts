import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserCreation } from 'src/app/model/UserCreation';
import { User } from 'src/app/model/User';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { StorageService } from '../storage/storage.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/auth'; // L'URL de votre API Java
  private user: User = new User;
  private isAuthenticated = false;

  constructor(private http: HttpClient,private storageService: StorageService, private router:Router) { }
  
  signin(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, loginRequest)
    .pipe(
      tap(response => {
        console.log(response);
        this.storageService.setItem('authToken', response.token);
        this.setUser(response.user);
        this.storageService.setItem('user', JSON.stringify(this.getUser()));
        console.log('affichage user', JSON.parse(this.storageService.getItem('user')));
        this.storageService.setItem('idUser', this.getUser().id);
        console.log('affichage id', JSON.parse(this.storageService.getItem('idUser')));
        this.isAuthenticated = true;
        this.router.navigate(['/home'])
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
    this.storageService.clear();
    this.isAuthenticated = false;
    this.clearUser();
  }

  clearUser() {
   // effacer l'utilisateur
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

  checkSession(): boolean {
    const token = this.storageService.getItem('authToken');
    return !!token;
  }

  private generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storageService.getItem('authToken')}`
    });
  }

  // Méthode pour vérifier si le token expire bientôt
  isTokenExpiringSoon(token: string): Observable<boolean> {
    console.log("token expire soon?");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}/isTokenExpiringSoon`, { headers });
  }

  // Méthode pour renouveler le token
  refreshToken(token: string): Observable<string> {
    console.log("refresh Token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(`${this.apiUrl}/refreshToken`, {}, { headers });
  }
}